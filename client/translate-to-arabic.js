#!/usr/bin/env node
/**
 * Automatic Translation Script using Google Translate API
 * This script reads all English translation files and auto-translates them to Arabic
 *
 * Setup:
 * 1. npm install google-translate-api-x
 * 2. Set GOOGLE_TRANSLATE_API_KEY environment variable (optional for free tier)
 * 3. Run: node translate-to-arabic.js
 */

const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x").default;

const EN_DIR = path.join(__dirname, "../src/locals/en");
const AR_DIR = path.join(__dirname, "../src/locals/ar");

// List of translation files to process
const FILES = [
  "buttons.json",
  "common.json",
  "pages.json",
  "auth.json",
  "doctors.json",
  "labs.json",
  "drugs.json",
  "static.json",
  "payment.json",
  "address.json",
];

/**
 * Recursively translate an object's string values
 */
async function translateObject(obj, depth = 0, maxDepth = 5) {
  if (depth > maxDepth) return obj;

  const translated = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      try {
        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));

        const result = await translate({
          text: value,
          from: "en",
          to: "ar",
        });

        translated[key] = result.text;
        console.log(
          `✓ Translated: "${value.substring(0, 30)}..." -> "${result.text.substring(0, 30)}..."`,
        );
      } catch (error) {
        console.warn(
          `⚠ Translation failed for: "${value}". Using English as fallback.`,
        );
        translated[key] = value;
      }
    } else if (typeof value === "object" && value !== null) {
      translated[key] = await translateObject(value, depth + 1, maxDepth);
    } else {
      translated[key] = value;
    }
  }

  return translated;
}

/**
 * Main translation process
 */
async function translateAll() {
  console.log("🌍 Starting Arabic Translation Process...\n");

  // Create AR directory if it doesn't exist
  if (!fs.existsSync(AR_DIR)) {
    fs.mkdirSync(AR_DIR, { recursive: true });
    console.log(`✓ Created directory: ${AR_DIR}\n`);
  }

  for (const file of FILES) {
    const enFilePath = path.join(EN_DIR, file);
    const arFilePath = path.join(AR_DIR, file);

    try {
      console.log(`📖 Processing ${file}...`);

      // Read English file
      const enContent = fs.readFileSync(enFilePath, "utf8");
      const enObject = JSON.parse(enContent);

      // Translate to Arabic
      const arObject = await translateObject(enObject);

      // Write Arabic file
      fs.writeFileSync(arFilePath, JSON.stringify(arObject, null, 2), "utf8");

      console.log(`✓ Successfully created ${file}\n`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
      console.error(`  Make sure ${enFilePath} exists\n`);
    }
  }

  console.log("✅ Translation Complete!");
  console.log(`All Arabic translation files have been saved to: ${AR_DIR}`);
  console.log(
    "\nNote: Review translations for accuracy, especially medical terms and proper nouns.",
  );
}

// Run the translation
translateAll().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
