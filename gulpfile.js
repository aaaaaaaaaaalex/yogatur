let project_folder = require("path").basename(__dirname),
    source_folder  = "app",

    fs = require("fs"),

    path = {
        build:{
            html: project_folder +"/",
            css: project_folder +"/css/",
            js: project_folder +"/js/",
            img: project_folder +"/img/",
            fonts: project_folder +"/fonts/"
        },
        app:{
            html: source_folder +"/index.html",
            scss: source_folder +"/scss/style.scss",
            js: source_folder +"/js/script_jQuery.js",
            img: source_folder +"/img/**/*.+(png|jpg|gif|ico|svg|webp|webmanifest)",
            fonts: source_folder +"/fonts/**/*.{eot, woff, woff2, ttf, svg, otf}",
        },
        watch:{
            html: source_folder +"/**/*.html",
            scss: source_folder +"/scss/**/*.scss",
            js: source_folder +"/js/**/*.js",
            img: source_folder +"/img/**/*.+(png|jpg|gif|ico|svg|webp|webmanifest)",
        },
        clean: "./" + project_folder
    },

    {src, dest} = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    groupmedia = require("gulp-group-css-media-queries"),
    cleancss = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    wepbcss = require("gulp-webpcss"),
    svgsprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter");
    
function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder
        }
    });
};

function html() {
    return src(path.app.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream()) 
};

function css() {
    return src(path.app.scss)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(groupmedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 10 version"],
                grid: true
            })
        )
        .pipe(wepbcss({webpClass: '.webp',noWebpClass: '.no-webp'}))
        .pipe(dest(path.build.css))
        .pipe(cleancss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
};

function js() {
    return src(path.app.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream()) 
};

function images() {
    return src(path.app.img)
        .pipe(webp({
            quality: 95
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.app.img))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 95, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream()) 
};

function fonts() {
    src([source_folder + "/fonts/*.ttf"])
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src([source_folder + "/fonts/*.ttf"])
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
};

gulp.task("otf2ttf", function () {
    return src([source_folder + "/fonts/*.otf"])
        .pipe(fonter({
            formats: ["ttf"]
        }))
        .pipe(dest(source_folder + "/fonts/"))
});

gulp.task("svgSprite", function () {
    return gulp.src([source_folder + "/iconsprite/*.svg"])
        .pipe(svgsprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg", //sprite file name
                    //example: true
                }
            },
        }
        ))
        .pipe(dest(path.build.img))
});

function fontsStyle() {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss'); 
    if (file_content == '') { 
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb); 
        return fs.readdir(path.build.fonts, function (err, items) { 
            if (items) { 
                let c_fontname; 
                for (var i = 0; i < items.length; i++) { 
                    let fontname = items[i].split('.'); 
                    fontname = fontname[0]; 
                    if (c_fontname != fontname) { 
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb); 
                    } 
                    c_fontname = fontname; 
                } 
            } 
        }) 
    }
};
    
function cb() {

};

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
};

function cleanDist() {
    return del(path.clean);
};

let build = gulp.series(cleanDist, gulp.parallel(html, js, css, images, fonts), fontsStyle),
    watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;



// Error
// npm i webp-converter@2.2.3 -D



// для работы таска "svgsprite" создай папочку "iconsprite" в корне каталога с файлом чтото.svg