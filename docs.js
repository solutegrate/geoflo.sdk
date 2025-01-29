const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const jsdoc2md = require("jsdoc-to-markdown");

// Paths
const JSDOC_CONFIG = path.resolve(__dirname, "docs/jsdoc.config.json");
const JSDOC_OUTPUT = path.resolve(__dirname, "docs/jsdoc-output.json");
const OUTPUT_DIR = path.resolve(__dirname, "docs/sdk");
const SIDEBAR_FILE = path.resolve(__dirname, "docs/sidebars.js");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
    console.log("Generating SDK documentation...");

    // Generate JSDoc JSON
    console.log("Generating JSDoc JSON...");
    await execPromise(`npx jsdoc -X -c ${JSDOC_CONFIG} > ${JSDOC_OUTPUT}`);

    // Read JSDoc JSON
    console.log("Reading JSDoc JSON...");
    let jsdocData = JSON.parse(fs.readFileSync(JSDOC_OUTPUT, "utf8"));

    jsdocData = jsdocData.map((item, index) => ({
        ...item,
        id: item.id || `${item.kind}-${item.longname || item.name || `item-${index}`}`,
    }));

    // Extract the main module (`geoflo`)
    const mainModule = jsdocData.find((item) => item.kind === "module" && item.name === "geoflo");
    if (!mainModule) {
        console.error("ERROR: Main module 'geoflo' not found in JSDoc output.");
        process.exit(1);
    }

    console.log("Main module 'geoflo' found.");

    // Extract mixins
    const mixins = jsdocData.filter((item) => item.kind === "mixin");
    console.log(`Found ${mixins.length} mixins.`);

    const sidebarItems = ["sdk/geoflo"]; // Start with the main module in the sidebar

    // Process the main module
    await generateMarkdownFile("geoflo", [mainModule], "geoflo.md");

    // Process each mixin
    for (const mixin of mixins) {
        const mixinName = mixin.name;
        const sanitizedMixinName = mixinName.replace(/[^a-zA-Z0-9_-]/g, "_");
        const markdownFile = `${sanitizedMixinName}.md`;

        console.log(`Processing mixin: ${mixinName}`);

        // Find functions and properties belonging to this mixin
        const mixinEntries = jsdocData.filter((entry) => entry.memberof === mixinName);

        if (mixinEntries.length === 0) {
            console.warn(`WARNING: No members found for mixin: ${mixinName}`);
        } else {
            console.log(`Found ${mixinEntries.length} members for mixin: ${mixinName}`);
        }

        // Generate Markdown
        await generateMarkdownFile(mixinName, [mixin, ...mixinEntries], markdownFile);

        // Add to sidebar
        sidebarItems.push(`sdk/${sanitizedMixinName}`);
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

/**
 * Generates Markdown for a given module/mixin.
 * @param {string} name - Name of the module/mixin.
 * @param {Array} data - Array of JSDoc items.
 * @param {string} fileName - Output Markdown file name.
 */
async function generateMarkdownFile(name, data, fileName) {
    const outputPath = path.join(OUTPUT_DIR, fileName);

    console.log(`\n🔹 Generating Markdown for: ${name}`);

    // Filter only relevant kinds
    const validData = data.filter((item) =>
        ["function", "property", "class", "member", "constant", "method"].includes(item.kind)
    );

    if (validData.length === 0) {
        console.warn(`⚠️ WARNING: No valid functions/properties found for ${name}`);
        console.log("🔍 DEBUG: Full data for module/mixin:", JSON.stringify(data, null, 2)); // DEBUG LOG
        return;
    }

    console.log(`✅ Sending ${validData.length} items to jsdoc2md for ${name}`);
    console.log(JSON.stringify(validData, null, 2)); // DEBUGGING LOG

    // Generate Markdown using jsdoc2md
    const markdown = await jsdoc2md.render({
        data: validData,
        configure: "docs/jsdoc.config.json",
        template: fs.readFileSync(path.resolve(__dirname, "docs/template.hbs"), "utf8"),
        undocumented: true // <-- Force inclusion
    });

    if (!markdown.trim()) {
        console.warn(`⚠️ WARNING: Generated empty Markdown for ${name}`);
    }

    // Write Markdown file
    fs.writeFileSync(outputPath, markdown, "utf8");
    console.log(`📄 Markdown written: ${outputPath}`);
}

/**
 * Executes a shell command and returns a Promise.
 * @param {string} command - Command to execute.
 */
function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Command failed: ${command}`);
                return reject(new Error(`Error: ${error.message}\n${stderr}`));
            }
            resolve(stdout);
        });
    });
}
