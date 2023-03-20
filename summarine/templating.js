const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');

let loader = new TwingLoaderFilesystem("summarine/templates");
let twing = new TwingEnvironment(loader);

async function wrapTemplate(htmlContent, currentCourse, currentColour) {
    return twing.render('view.html', {
        markdown: htmlContent,
        color: currentColour,
        course: currentCourse
    }).then((output) => {
        return output;
    });
}

async function renderOverview(groups, currentCourse, currentColour) {
    return twing.render("overview.html", {
        groups: groups,
        color: currentColour,
        course: currentCourse
    }).then((output) => { return output; });
}

module.exports = { wrapTemplate, renderOverview };