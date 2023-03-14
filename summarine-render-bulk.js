const summarine = require("./summarine/render");
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

    directories.forEach(filename => {
        const outputFile = `${outputDirectory}/${filename}.html`;

        summarine.render(coursePath, filename, settings).then(htmlContent => {
            fs.writeFile(outputFile, htmlContent, () => { });
        });
    });
});


