const gulp = require('gulp');
const ts = require('gulp-typescript');
const gutil = require('gulp-util');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');


gulp.task('directories', function() {
    return gulp.src('*.*', { read: false })
        .pipe(gulp.dest('./logs'))
});

gulp.task('logs', function() {
    return string_src("app.log", '=====LOG START====\n')
        .pipe(gulp.dest('logs/'));
})

gulp.task('scripts', gulp.series('directories', 'logs', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
}));

gulp.task('watch', gulp.series('scripts', () => {
    gulp.watch('src/**/*.ts', ['scripts']);
}));

gulp.task('assets', function() {
    return gulp.src(JSON_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('watch', 'assets'));


function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function() {
        this.push(new gutil.File({
            cwd: "",
            base: "",
            path: filename,
            contents: Buffer.from(string)
        }))
        this.push(null)
    }
    return src
}