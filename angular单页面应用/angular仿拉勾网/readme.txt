1.这是我写的一个仿拉勾网的单页面应用，如果要看页面具体效果，请进入根目录下使用gulp命令:gulp或者gulp serve，
最好在chrome浏览器下，用手机模拟器方式浏览，如果样式错乱，请多刷新几次。
2.src文件夹是源代码，build是生产环境代码，dist是用gulp压缩之后的生产环境。整个工程是在gulp和bower下构建的。请在gulp环境下运行。具体
任务可以看gulpfile.js。具体包依赖关系请看bower.json。
3.本项目只包含前端页面，所有AJAX请求都是用的data文件夹内的假数据，并且在代码内将post方法进行了改造。主要是为了是功能更加全面。
4.页面主要是用的路由构成，src目录中：js代码在srcipt文件夹下，style文件夹内用的是less文件,vender内是angularjs的源代码,view内是
html的模板，image文件内是图像，data内是代码用的json数据。