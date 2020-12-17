const gulp = require("gulp");
var lessPath = ["./pages/**/*.less"];
/**
 * 本地监视less的文件
 */
gulp.task("less", function() {
  return gulp
    .src(lessPath)
    .pipe($.plumber())
    .pipe($.less())
    .pipe(
      $.rename(function(path) {
        path.extname = ".wxss";
      })
    )
    .pipe(gulp.dest("./"));
});

// 静态服务器
gulp.task("style", function() {
  gulp.watch(lessPath, ["less"]);
});
