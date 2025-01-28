const fs = require("fs");
const path = require("path");
const jsdoc2md = require("jsdoc-to-markdown");

// Paths
const SRC_DIR = path.resolve(__dirname, "src"); // Absolute path to src
const OUTPUT_DIR = path.resolve(__dirname, "docs/sdk"); // Absolute path to docs/sdk
const SIDEBAR_FILE = path.resolve(__dirname, "docs/sidebars.js"); // Absolute path to sidebars.js

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

console.log("Generating SDK documentation...");

// Generate Markdown for all source files
const files = fs.readdirSync(SRC_DIR).filter((file) => file.endsWith(".js"));
const sidebarItems = [];

files.forEach((file) => {
  const inputFile = path.join(SRC_DIR, file);
  const outputFile = path.join(OUTPUT_DIR, file.replace(".js", ".md"));

  // Generate Markdown
  const markdown = jsdoc2md.renderSync({ files: inputFile });
  fs.writeFileSync(outputFile, markdown, "utf8");
  console.log(`Generated: ${outputFile}`);

  // Add to sidebar items
  const fileNameWithoutExtension = file.replace(".js", "");
  sidebarItems.push(`sdk/${fileNameWithoutExtension}`);
});

// Generate sidebars.js
console.log("Generating sidebars.js...");
const sidebarContent = `
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "SDK",
      items: ${JSON.stringify(sidebarItems, null, 2)},
    },
  ],
};

module.exports = sidebars;
`;

fs.writeFileSync(SIDEBAR_FILE, sidebarContent, "utf8");
console.log(`Generated: ${SIDEBAR_FILE}`);
console.log("SDK documentation generation complete!");
