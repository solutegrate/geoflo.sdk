const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const jsdoc2md = require("jsdoc-to-markdown");

// Paths
const MAIN_MODULE = "geoflo";
const JSDOC_CONFIG = path.resolve(__dirname, "jsdoc.config.json");
const JSDOC_OUTPUT = path.resolve(__dirname, "docs/jsdoc-output.json");
const OUTPUT_DIR = path.resolve(__dirname, "docs/sdk");
const SIDEBAR_FILE = path.resolve(__dirname, "docs/sidebars.js");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

(async () => {
    console.log("📢 Generating SDK documentation...");

    // Generate JSDoc JSON
    console.log("Generating JSDoc JSON...");
    await execPromise(`npx jsdoc -X -c ${JSDOC_CONFIG} > ${JSDOC_OUTPUT}`);

    // Read JSDoc JSON
    console.log("📖 Reading JSDoc JSON...");
    let jsdocData = JSON.parse(fs.readFileSync(JSDOC_OUTPUT, "utf8"));
    jsdocData = jsdocData.filter(item => !item.undocumented);
    jsdocData.forEach((item) => { item.id = item.longname; });

    // Process main module (Pass Full jsdocData)
    await generateMarkdownFile(MAIN_MODULE, jsdocData, MAIN_MODULE + ".md");

    // **Sidebar structure**
    const sidebarItems = [{ type: "doc", id: `sdk/${MAIN_MODULE}` }];

    // **Generate `sidebars.js`**
    console.log("🛠️ Generating sidebars.js...");

    const sidebarContent = `
        /** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
        const sidebars = {
        docs: [
            {
            type: "category",
            label: "SDK",
            collapsed: false,
            items: ${JSON.stringify(sidebarItems, null, 2)},
            }
        ],
        };

        module.exports = sidebars;
    `;

    fs.writeFileSync(SIDEBAR_FILE, sidebarContent, "utf8");
    console.log(`📄 Sidebar file created: ${SIDEBAR_FILE}`);

    console.log("✅ SDK documentation generation complete!");
})();

/**
 * Generates Markdown for a given module/mixin.
 * @param {string} name - Name of the module/mixin.
 * @param {Array} data - Complete JSDoc JSON data.
 * @param {string} fileName - Output Markdown file name.
 */
async function generateMarkdownFile(name, data, fileName) {
    const outputPath = path.join(OUTPUT_DIR, fileName);

    console.log(`\n📝 Generating Markdown for: ${name}`);
    console.log(`✅ Sending complete jsdocData to jsdoc2md for ${name}`);
    
    // Generate Markdown for entire dataset
    const markdown = await jsdoc2md.render({ data: data });
    if (!markdown.trim()) console.warn(`⚠️ WARNING: Generated empty Markdown for ${name}`);

    // Write Markdown file
    fs.writeFileSync(outputPath, markdown, "utf8");
    console.log(`📄 Markdown written: ${outputPath}`);
}

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