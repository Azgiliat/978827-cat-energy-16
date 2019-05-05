"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("realese/css"))
    .pipe(server.stream());
});

gulp.task("clean", function() {
  return del("realese");
});

gulp.task("copy", function() {
  return gulp.src( [
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("realese"))
});

gulp.task("build_this", gulp.series("clean", "css", "copy"));

gulp.task("update", function(done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "realese/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "update"));
  gulp.watch("source/*.html", gulp.series("copy", "update"));
});

gulp.task("start", gulp.series("build_this", "server"));
