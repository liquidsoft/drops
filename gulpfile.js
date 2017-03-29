const
    gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    browserify = require("browserify"),
    watchify = require("watchify"),
    eventStream = require("event-stream"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    rename = require("gulp-rename");

/*
 -------------------------------
 JS Compile function
 -------------------------------
 */

function compileJS() {
    var bundler = browserify("./src/js/index.js", {debug: true}).transform("babelify", {presets: ["es2015"]});

    return bundler.bundle()
        .on("error", function (error) {
            console.error(error);
            this.emit("end");
        })
        .pipe(source("drops.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist"));
}

/*
 -------------------------------
 Tasks
 -------------------------------
 */

gulp.task("watch-js", () => {
    return gulp.watch("./src/js/**/*.js", ["build-js"]);
});

gulp.task("build-js", () => {
    return compileJS();
});

gulp.task("build-sass", () => {
    return gulp.src("./src/sass/index.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer())
        .pipe(rename("drops.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("watch-sass", () => {
    return gulp.watch("./src/sass/**/*.scss", ["build-sass"]);
});

gulp.task("build", ["build-sass", "build-js"]);
gulp.task("watch", ["watch-sass", "watch-js"]);

gulp.task("default", ["watch"]);