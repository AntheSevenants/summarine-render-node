const summarine = require("./summarine/render");
const fs = require('fs');

if (process.argv.length < 4) {
    throw Error("Not all arguments were supplied");
}

const coursePath = process.argv[2];
const filename = process.argv[3];

fs.readFile("summarine/settings.json", 'utf8', (err, settings) => {
    if (err) {
        console.error(err);
        return;
    }
    
    settings = JSON.parse(settings);

    summarine.render(coursePath, filename, settings).then(htmlContent => {
        fs.writeFile("test.html", htmlContent, () => {});
    });
});


