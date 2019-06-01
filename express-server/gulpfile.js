var gulp = require("gulp");
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var gulpCopy = require('gulp-copy');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var INTERVAL = 10000;
var usePolling = true;
/**
 * Build Express server
 */
function cleanDist() {
  return gulp.src('./dist/**/*.map', './dist/**/*.js', './dist/**/*.json', {read: false})
  .pipe(clean());
}

function configCopy() {
  return gulp.src('./src/config/*.json')
    .pipe(gulp.dest('dist/config'));
}

function downloadDirCopy() {
  return gulp.src('./src/download/**')
    .pipe(gulp.dest('dist/download'));
}

function sourceMaps() {
  const tsProject = typescript.createProject('./tsconfig.json');
  tsProject.options.outDir = './dist';
  return gulp.src('./src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write("./", {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest('./dist/'));
}

function cleanDistTs() {
  return gulp.src('./dist/**/*.ts', {read: false})
  .pipe(clean());
}

function compile() {
  var tsProject = typescript.createProject('./tsconfig.json');
  var tsResult = gulp.src('./src/**/*.ts')
      // .pipe(sourcemaps.init())
      .pipe(tsProject());
      // .pipe(gulpSourceMaps.write('.', { sourceRoot: '.' }));
  return tsResult.pipe(gulp.dest('dist'));
}
exports.cleanDist = cleanDist;
exports.configCopy = configCopy;
exports.compile = compile;
exports.sourceMaps = sourceMaps;
exports.downloadDirCopy = downloadDirCopy;
exports.cleanDistTs = cleanDistTs;

var build = gulp.series(cleanDist, configCopy, downloadDirCopy, sourceMaps);

gulp.task('build', build);
gulp.task('clean', cleanDist);
gulp.task('configCopy', configCopy);
gulp.task('downloadDirCopy', downloadDirCopy);

gulp.task('watch', function () {
  console.log('watchスタート...');
  gulp.watch(
    './src/**/*.ts', 
    { interval: INTERVAL, usePolling: usePolling },
    build
  );
});
// gulp.task('build', function () {
//   gulp.src('./src/config/*.json', {read: false})
//     .pipe(gulp.dest('dist/config'));
//   // var sourcemapResult = gulp.src('./src/**/*.ts')
//   //   .pipe(sourcemaps.init()) 
//   //   .pipe(sourcemaps.write('./'))
//   //   .pipe(gulp.dest('dist'));
//   var tsProject = typescript.createProject('./tsconfig.json');
//   var tsResult = gulp.src('./src/**/*.ts')
//       .pipe(tsProject());
//   return tsResult.pipe(gulp.dest('dist'));
// });

// gulp.task('watch', function () {
//     console.log('watchスタート...');
//     gulp.watch(
//       './src/**/*.ts', 
//       { interval: INTERVAL, usePolling: usePolling },
//       function () {
//         console.log('ファイルの変更があったため再ビルドを行います...');
//         gulp.src('./src/config/*.json')
//           .pipe(gulp.dest('dist/config'));
//         var tsProject = typescript.createProject('./tsconfig.json');
//         var tsResult = gulp.src('./src/**/*.ts')
//             .pipe(tsProject());
//           console.log(tsResult);
//         return tsResult.pipe(gulp.dest('dist'));
//       }
//     );
// });

// gulp.task("build", () => {
//   var pj = typescript.createProject("./tsconfig.json");

//   gulp.src([
//       "./src/**/*.ts",
//       "./src/*.ts",
//       "!./node_modules/**"
//     ])
//     .pipe(pj())
//     .js
//     .pipe(concat("./dist/index.js"))
//     .pipe(gulp.dest("./"));
// });