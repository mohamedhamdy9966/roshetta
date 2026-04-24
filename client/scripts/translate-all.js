const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x");

const EXTRACTED_FILE = path.join(__dirname, "all-texts.json");
const LOCALES_DIR = path.join(__dirname, "../public/locales");

async function translateText(text, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await translate(text, { to: "ar" });
      return result.text;
    } catch {
      if (i === retries - 1) {
        console.log(`  ❌ Failed: "${text}"`);
        return text;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

async function main() {
  console.log("📖 Loading extracted texts...\n");

  if (!fs.existsSync(EXTRACTED_FILE)) {
    console.error("❌ Run npm run extract-texts first!");
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(EXTRACTED_FILE, "utf-8"));
  const texts = data.texts;

  console.log(`🌐 Translating ${texts.length} texts to Arabic...\n`);

  const enTranslations = {};
  const arTranslations = {};

  let count = 0;
  for (const item of texts) {
    count++;
    const key = item.suggested_key;
    const english = item.english;

    console.log(`[${count}/${texts.length}] "${english}"`);

    const arabic = await translateText(english);

    enTranslations[key] = english;
    arTranslations[key] = arabic;

    console.log(`  ✅ → "${arabic}"\n`);

    // Delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Create directories and save files
  if (!fs.existsSync(LOCALES_DIR)) {
    fs.mkdirSync(LOCALES_DIR, { recursive: true });
  }

  const enPath = path.join(LOCALES_DIR, "en");
  const arPath = path.join(LOCALES_DIR, "ar");

  if (!fs.existsSync(enPath)) fs.mkdirSync(enPath, { recursive: true });
  if (!fs.existsSync(arPath)) fs.mkdirSync(arPath, { recursive: true });

  fs.writeFileSync(
    path.join(enPath, "translation.json"),
    JSON.stringify(enTranslations, null, 2),
  );

  fs.writeFileSync(
    path.join(arPath, "translation.json"),
    JSON.stringify(arTranslations, null, 2),
  );

  // Create a mapping file for reference
  const mapping = {};
  for (const item of texts) {
    mapping[item.suggested_key] = {
      english: item.english,
      arabic: arTranslations[item.suggested_key],
      files: item.files,
    };
  }

  fs.writeFileSync(
    path.join(__dirname, "translation-mapping.json"),
    JSON.stringify(mapping, null, 2),
  );

  console.log("\n✅ Translation complete!");
  console.log(`📊 Statistics:`);
  console.log(`   - Total texts: ${texts.length}`);
  console.log(`   - English file: ${enPath}/translation.json`);
  console.log(`   - Arabic file: ${arPath}/translation.json`);
  console.log(`   - Mapping file: scripts/translation-mapping.json`);
  console.log("\n📖 Next steps:");
  console.log("1. Review translations in public/locales/ar/translation.json");
  console.log(
    '2. Update your components to use t("key") instead of hardcoded text',
  );
  console.log(
    "3. Check translation-mapping.json to see which key corresponds to which text",
  );
}

main().catch(console.error);
