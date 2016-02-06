//
// All routes for assets will go here
// ---------------------------------------------------------------------------------------------
module.exports = {
        dev: {
            scripts: './app/assets/scripts',
            fonts: './app/assets/fonts/**/*',
            images: './app/assets/img/**/*',
            styles: './app/assets/sass',
            hbs: {
                    root: './app/assets/templates',
                    partials: './app/assets/templates/partials'
                },
            root: './app'
        },
        dist: {
            scripts: './wbarahona.github.io/assets/scripts',
            fonts: './wbarahona.github.io/assets/fonts',
            images: './wbarahona.github.io/assets/img',
            styles: './wbarahona.github.io/assets/css',
            root: './wbarahona.github.io'
        }
    }
