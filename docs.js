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
    console.log("📢 Generating SDK documentation...");

    // Generate JSDoc JSON
    console.log("Generating JSDoc JSON...");
    await execPromise(`npx jsdoc -X -c ${JSDOC_CONFIG} > ${JSDOC_OUTPUT}`);

    // Read JSDoc JSON
    console.log("📖 Reading JSDoc JSON...");
    const jsdocData = JSON.parse(fs.readFileSync(JSDOC_OUTPUT, "utf8"));

    jsdocData.forEach((item) => { item.id = item.longname; });

    // Process main module (Pass Full jsdocData)
    return await generateMarkdownFile("geoflo", jsdocData, "geoflo.md");

    // Detect `@module geoflo`
    const mainModule = jsdocData.find((item) => item.kind === "module" && item.name === "geoflo");
    if (!mainModule) {
        console.error("❌ ERROR: Main module 'geoflo' not found.");
        process.exit(1);
    }
    console.log("✅ Found main module: geoflo");

    // Extract all `@mixin`
    const mixins = jsdocData.filter((item) => item.kind === "mixin");
    console.log(`📦 Found ${mixins.length} mixins.`);

    // Sidebar structure
    const sidebarItems = [];
    const mixinSidebar = [];

    sidebarItems.push({ type: "doc", id: "sdk/geoflo" });

    // Process each mixin
    for (const mixin of mixins) {
        const mixinName = mixin.name;
        const sanitizedMixinName = mixinName.replace(/[^a-zA-Z0-9_-]/g, "_");
        const markdownFile = `${sanitizedMixinName}.md`;

        console.log(`🔹 Processing mixin: ${mixinName}`);

        // Generate Markdown (Pass Full jsdocData)
        //await generateMarkdownFile(mixinName, jsdocData, markdownFile);

        // Add mixin to sidebar
        mixinSidebar.push({ type: "doc", id: `sdk/${sanitizedMixinName}` });
    }

    // Process additional Markdown files in `docs/sdk`
    console.log("📂 Scanning for existing markdown files...");
    const docFiles = fs.readdirSync(OUTPUT_DIR).filter((file) => file.endsWith(".md"));

    // Add other files to sidebar (ensuring no duplicates)
    docFiles.forEach((file) => {
        const id = `sdk/${file.replace(".md", "")}`;
        if (
            !sidebarItems.some((item) => item.id === id) &&
            !mixinSidebar.some((item) => item.id === id)
        ) {
            mixinSidebar.push({ type: "doc", id });
        }
    });

    // Sort sidebar alphabetically
    sidebarItems.sort((a, b) => a.id.localeCompare(b.id));
    mixinSidebar.sort((a, b) => a.id.localeCompare(b.id));

    // Generate `sidebars.js`
    console.log("🛠️ Generating sidebars.js...");
    const sidebarContent = `
        /** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
        const sidebars = {
        docs: [
            {
            type: "category",
            label: "GeoFlo SDK",
            collapsed: false,
            items: ${JSON.stringify(sidebarItems, null, 2)},
            },
            {
            type: "category",
            label: "Mixins",
            collapsed: false,
            items: ${JSON.stringify(mixinSidebar, null, 2)},
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