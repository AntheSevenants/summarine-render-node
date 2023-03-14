const summarine = require("./summarine/render");

if (process.argv.length < 4) {
    throw Error("Not all arguments were supplied");
}

const coursePath = process.argv[2];
const filename = process.argv[3];

summarine.render(coursePath, filename).then(htmlContent => {
    console.log(htmlContent);
});
