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

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("release/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("release/img"));
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
    .pipe(gulp.dest("release/css"))
    .pipe(server.stream());
});

gulp.task("clean", function() {
  return del("release");
});

gulp.task("copy", function() {
  return gulp.src( [
    "source/fonts/*.woff2",
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("release"))
});

gulp.task("build_this", gulp.series("clean", "css","webp","images" , "copy"));

gulp.task("update", function(done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "release/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "update"));
  gulp.watch("source/*.html", gulp.series("copy", "update"));
});

gulp.task("start", gulp.series("build_this", "server"));
