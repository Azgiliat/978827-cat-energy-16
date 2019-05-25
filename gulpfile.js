"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var csso = require("gulp-csso");
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task("min-js", function () {
  return gulp.src( ["source/js/form-check.js",
                    "source/js/menu-open.js"])
        .pipe(uglify())
        .pipe(rename({suffix:"-min"}))
        .pipe(gulp.dest("build/js"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("min-css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cleanCSS())
    .pipe(rename("style-min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src( [
    "source/fonts/*.{woff2,woff}",
    "source/img/**",
    "source/*.html",
    "source/js/picturefill-min.js"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
});

gulp.task("build_this", gulp.series("clean", "css", "min-css", "min-js", "sprite", "webp", "images", "copy"));

gulp.task("update", function(done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "min-css", "update"));
  gulp.watch("source/*.html", gulp.series("copy", "update"));
  gulp.watch("source/**/*.js", gulp.series("copy", "update"));
});

gulp.task("start", gulp.series("build_this", "server"));
