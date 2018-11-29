"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});
gulp.task("copy", function(){
  gulp.src("source/fonts/*")
    .pipe(gulp.dest("build/fonts"));
  
  gulp.src("source/img/*")
    .pipe(gulp.dest("build/img"));
  
  gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
})
gulp.task("serve", ["copy", "style"], function() {

  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("build/*.html").on("change", server.reload);
});
