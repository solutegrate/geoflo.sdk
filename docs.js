const fs = require("fs");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");

// Paths
const SRC_DIR = path.resolve(__dirname, "src"); // Source directory
const INDEX_FILE = path.resolve(__dirname, "index.js"); // Main entry file
const OUTPUT_DIR = path.resolve(__dirname, "docs/sdk"); // Output directory

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
  console.log("Generating SDK documentation...");

  const SIDEBAR_FILE = path.resolve(__dirname, "sidebars.js");
  const sidebarItems = [];

  // Get all JavaScript files in the src directory
  const files = fs.readdirSync(SRC_DIR)
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join(SRC_DIR, file));

  // Add the main index.js file
  files.unshift(INDEX_FILE);

  for (const file of files) {
    const outputFile = path.join(OUTPUT_DIR, path.basename(file).replace(".js", ".md"));

    try {
      console.log(`Processing file: ${file}`);
      const markdown = await jsdoc2md.render({ files: file });

      if (markdown.trim().length === 0) {
        console.warn(`WARNING: Generated empty Markdown for ${file}`);
      }

      console.log(`Generated Markdown for ${file}:\n${markdown}`);
      fs.writeFileSync(outputFile, markdown, "utf8");

      const fileNameWithoutExtension = file.replace(".js", "");
      sidebarItems.push(`sdk/${fileNameWithoutExtension}`);
    } catch (error) {
      console.error(`ERROR processing ${file}:`, error);
    }
  }

  // Generate sidebars.js
  console.log("Generating sidebars.js...");
  
  const sidebarContent = `
    /** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
    const sidebars = {
      docs: [
        {
          type: "category",
          label: "SDK Reference",
          items: ${JSON.stringify(sidebarItems, null, 2)},
        },
      ],
    };

    module.exports = sidebars;
  `;

  fs.writeFileSync(SIDEBAR_FILE, sidebarContent, "utf8");
  console.log(`Generated: ${SIDEBAR_FILE}`);
  console.log("SDK documentation generation complete!");
})();
