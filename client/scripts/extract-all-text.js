const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Configuration
const SRC_DIR = path.join(__dirname, "../src");
const OUTPUT_FILE = path.join(__dirname, "all-texts.json");

// Function to extract text from files
function extractTextFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const texts = new Set();

  // Remove comments first
  const noComments = content
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .replace(/\/\/.*/g, ""); // Remove single-line comments

  // Pattern 1: Text between tags (handles JSX)
  const tagPattern = />([^<>{}\n]+?)</g;
  let match;
  while ((match = tagPattern.exec(noComments)) !== null) {
    const text = match[1].trim();
    if (isValidText(text)) texts.add(text);
  }

  // Pattern 2: Text in quotes (props, variables)
  const quotePattern = /["']([^"']{3,})["']/g;
  while ((match = quotePattern.exec(noComments)) !== null) {
    const text = match[1].trim();
    if (isValidText(text)) texts.add(text);
  }

  // Pattern 3: Template literals without variables
  const templatePattern = /`([^`${}]+)`/g;
  while ((match = templatePattern.exec(noComments)) !== null) {
    const text = match[1].trim();
    if (isValidText(text)) texts.add(text);
  }

  return Array.from(texts);
}

function isValidText(text) {
  // Filter conditions
  if (!text || text.length < 2 || text.length > 100) return false;
  if (text.startsWith("{") || text.startsWith("}")) return false;
  if (text.startsWith("import") || text.startsWith("export")) return false;
  if (text.includes("=>") || text.includes("function")) return false;
  if (text.includes("const ") || text.includes("let ") || text.includes("var "))
    return false;
  if (text.includes("return") || text.includes("if") || text.includes("else"))
    return false;
  if (text.includes("className=") || text.includes("onClick=")) return false;
  if (text.includes("http://") || text.includes("https://")) return false;
  if (/^[0-9\s\W]+$/.test(text)) return false; // Numbers and symbols only
  if (!/[a-zA-Z]/.test(text)) return false; // Must contain English letters

  return true;
}

function main() {
  console.log("🔍 Scanning all React components...\n");

  // Find all JS/JSX files
  const files = glob.sync(`${SRC_DIR}/**/*.{js,jsx}`, {
    ignore: [
      "**/node_modules/**",
      "**/*.test.js",
      "**/*.spec.js",
      "**/i18n.js",
      "**/vite.config.js",
    ],
  });

  console.log(`📁 Found ${files.length} files\n`);

  const allTexts = new Map(); // Use Map to track where text appears

  files.forEach((file) => {
    const texts = extractTextFromFile(file);
    if (texts.length > 0) {
      console.log(
        `  📄 ${path.relative(SRC_DIR, file)}: ${texts.length} text(s)`,
      );
      texts.forEach((text) => {
        if (!allTexts.has(text)) {
          allTexts.set(text, []);
        }
        allTexts.get(text).push(path.relative(SRC_DIR, file));
      });
    }
  });

  // Convert to array for output
  const result = {
    total_files_scanned: files.length,
    total_unique_texts: allTexts.size,
    extracted_date: new Date().toISOString(),
    texts: [],
  };

  for (const [text, files] of allTexts.entries()) {
    result.texts.push({
      english: text,
      files: files,
      suggested_key: text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 50),
    });
  }

  // Save to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

  console.log(`\n✅ Extraction complete!`);
  console.log(`📊 Found ${allTexts.size} unique English texts`);
  console.log(`📄 Saved to: ${OUTPUT_FILE}`);
  console.log(
    `\n📝 Next step: Run npm run translate-all to translate these texts`,
  );
}

main();
