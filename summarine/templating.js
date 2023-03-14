const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');

let loader = new TwingLoaderFilesystem("summarine/templates");
let twing = new TwingEnvironment(loader);

async function wrapTemplate(htmlContent, currentColour) {
    return twing.render('view.html', {
        markdown: htmlContent,
        color: currentColour
    }).then((output) => {
        return output;
    });
}

module.exports = { wrapTemplate };