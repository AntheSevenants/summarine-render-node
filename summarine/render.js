const fs = require('fs');

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

async function render(coursePath, filename, settings) {
    const resourcesFolderPath = `${coursePath}/.resources/`;
    const courseMetaPath = `${coursePath}/meta.json`;
    const filePath = `${coursePath}/${filename}/`;
    const fileContentPath = `${filePath}/content.md`;

    const markdownContent = await fs.readFileSync(fileContentPath, { encoding: "utf8" });
    const courseMeta = await fs.readFileSync(courseMetaPath, { encoding: "utf8" })

    // todo: current color

    return md.render(markdownContent);
}

module.exports = { render };