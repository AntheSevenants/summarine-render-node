const summarine = require("./summarine/render");
const Templating = require("./summarine/templating");
const fs = require('fs');

if (process.argv.length < 3) {
    throw Error("Please supply course folder path");
}

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

const coursePath = process.argv[2];

fs.readFile("summarine/settings.json", 'utf8', (err, settings) => {
    if (err) {
        console.error(err);
        return;
    }

    settings = JSON.parse(settings);

    let directories = getDirectories(coursePath).filter(
        directory => !directory.startsWith("."));

    const outputDirectory = "output/";
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
    }

    let groups = {}

    directories.forEach(filename => {
        const outputFile = `${outputDirectory}/${filename}.html`;
        const fileMetaPath = `${coursePath}/${filename}/meta.json`;

        const fileMeta = JSON.parse(fs.readFileSync(fileMetaPath, { encoding: "utf8" }));

        if (!(fileMeta["group"] in groups)) {
            groups[fileMeta["group"]] = [];
        }

        groups[fileMeta["group"]].push(filename);

        summarine.render(coursePath, filename, settings).then(htmlContent => {
            fs.writeFile(outputFile, htmlContent, () => { });
        });
    });

    const courseMetaPath = `${coursePath}/meta.json`;
    const courseMeta = JSON.parse(fs.readFileSync(courseMetaPath, { encoding: "utf8" }));

    const indexFile = `${outputDirectory}/index.html`;

    Templating.renderOverview(groups, courseMeta["colour"]).then(htmlOverview => {
        fs.writeFile(indexFile, htmlOverview, () => { });
    });
});


