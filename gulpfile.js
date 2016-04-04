var gulp=require('gulp'),
    shell=require('gulp-shell');

gulp.task('watch',shell.task('watchify -d -r ./browser.js:docxhub -o dist/docxhub.js'))
    .task('build', shell.task('babel src --watch --source-maps --out-dir lib'))
    .task('buildspec', shell.task('babel spec/src --watch --source-maps --out-dir spec/fixture'))

    .task('test', shell.task('jasmine'))
    .task('karma', shell.task('karma start'))

    .task('default', function(){
        gulp.watch(['lib/*.js'],['test'])
    })
