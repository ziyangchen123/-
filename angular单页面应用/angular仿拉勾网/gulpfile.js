var gulp=require('gulp');
var $=require('gulp-load-plugins')();
var open=require('open');
var less = require('gulp-less');
var path = require('path');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

//定义全局变量
var app={
	srcPath: 'src/',
	devPth: 'build/',
	prdPath: 'dist/',
};
//开始任务
gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js')//读取文件，遍历该文件夹下面的所有.js文件
	.pipe(gulp.dest(app.devPth+'vender'))//拷贝到该目录下
	.pipe(gulp.dest(app.prdPath+'vender'))//拷贝到该目录下
	.pipe($.connect.reload());
});

gulp.task('html',function(){
	gulp.src(app.srcPath+'**/*.html')
	.pipe(gulp.dest(app.devPth))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
})

gulp.task('json',function(){
	gulp.src(app.srcPath+'data/**/*.json')
	.pipe(gulp.dest(app.devPth+'data'))
	.pipe(gulp.dest(app.prdPath+'data'))
	.pipe($.connect.reload());
})
//less任务有问题,国内CNPM gulp-less 有问题，无法运行
gulp.task('less',function(){
	gulp.src(app.srcPath+'style/index.less')
	.pipe($.plumber())
	.pipe($.less())
	.pipe(gulp.dest(app.devPth+'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath+'css'))
	.pipe($.connect.reload());
});



gulp.task('js',function(){
	gulp.src(app.srcPath+ 'script/**/*.js')
	.pipe($.plumber())
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPth+'js')) 
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath+'js'))
	.pipe($.connect.reload());
})
gulp.task('image',function(){
	gulp.src(app.srcPath+'image/**/*')
	.pipe(gulp.dest(app.devPth+'image'))
	// .pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath+'image'))
	.pipe($.connect.reload());
})
gulp.task('build',['image','js','lib','html','json','less'])

gulp.task('clean',function(){
	gulp.src([app.devPth,app.prdPath])
	.pipe($.clean())
})

//创建一个服务器
gulp.task('serve',['build'],function(){
	$.connect.server({
		root:[app.devPth],
		livereload:true,
		port:3000
	});
	//启动
	open('http://localhost:3000');
	//监听文件变动，如果有变动自动刷新
	gulp.watch('bower_components/**/*',['lib']);
	gulp.watch(app.srcPath+'script/**/*.js',['js']);
	
	gulp.watch(app.srcPath+'**/*.html',['html']);
	gulp.watch(app.srcPath+'data/**/*.json',['json']);
	gulp.watch(app.srcPath+'style/**/*.less',['less']);
	gulp.watch(app.srcPath+'image/**/*',['image']);

});
gulp.task('default',['serve']);