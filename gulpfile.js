const gulp = require('gulp');
gulp.task('copyFiles',async  function(){
  var src = `C:/Users/mostafa/source/repos/Servarena/v16dashboard`;
  var task1 =  gulp.src(['src/**/*']).pipe(gulp.dest(`${src}/src`));
  var task2 = gulp.src(['package.json','package-lock.json','angular.json']).pipe(gulp.dest(src));
  return [task1, task2];
})

