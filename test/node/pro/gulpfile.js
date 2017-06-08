var gulp = require('gulp');
var browserSync = require('browser-sync');//引入浏览器同步包
var miniCss = require('gulp-clean-css'); //压缩css的包
var uglifyJS= require('gulp-uglify');//压缩js
var seq = require('gulp-sequence'); //队列方式执行任务
var rev = require('gulp-rev'); //对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//路径替换

//写第一个任务
gulp.task('show',function(){
  console.log('第一个gulp任务，什么都不干');
});

// 浏览器同步任务
gulp.task('browser-sync',function(){
  browserSync.init({
    server:{ //开启服务器
      baseDir:'./' //目录路径
    },
    browser: "chrome"
  });
  gulp.watch(['*.html','src/css/*.css']).on('change',
  browserSync.reload
  )

})


// 压缩css
gulp.task('css',function(){
  return gulp.src('./home/css/*.css')
  .pipe(miniCss())
  .pipe(gulp.dest('./home/dist/css'))
})

// 压缩js
gulp.task('js',function(){
  return gulp.src('./src/js/*.js')
  .pipe(uglifyJS())
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('default',seq('js','css'));

//移动html
gulp.task('copyhtml',function(){
  return gulp.src('./home/images/*')
  .pipe(gulp.dest('./home/dist/images'))
})

//修改文件路径
gulp.task('thcss', function () {
    return gulp.src('src/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});
gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', './index.html'])
    .pipe( revCollector({
        replaceReved: true,
        dirReplacements: {
            'css': '/dist/css',
            '/js/': '/dist/js/',
        }
    }) )
    .pipe( gulp.dest('dist') );
});
