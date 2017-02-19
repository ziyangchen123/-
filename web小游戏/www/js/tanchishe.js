var BlOCK_SIZE=12; //格子大小
var COLS=40; //列数
var ROWS=30; //行数
var snake=[]; //蛇的数组
var toGo=3; //方向
var snakeCount=4; //蛇身的大小
var interval=null; //定时器
var foodX=0; //食物的X坐标
var foodY=0; //食物的Y坐标
var onMark=null; //分数
var isPause=false; //暂停
var reset=true;
function draw(){
	//开始绘图
	var c=document.getElementById('canvas').getContext('2d');
	

	//清除矩形
	c.clearRect(0,0,BlOCK_SIZE*COLS,BlOCK_SIZE*ROWS);
	//画横线
	for (var i = 0; i <=ROWS; i++) {
		c.beginPath();
		c.moveTo(0,BlOCK_SIZE*i);
		c.lineTo(BlOCK_SIZE*COLS,BlOCK_SIZE*i);
		c.strokeStyle="gray";
		c.stroke();
	}
	//画竖线
	for 
		(var i = 0; i <=COLS; i++) {
		c.beginPath();
		c.moveTo(BlOCK_SIZE*i,0);
		c.lineTo(BlOCK_SIZE*i,BlOCK_SIZE*ROWS);
		c.strokeStyle="gray";
		c.stroke();
	}

	//画蛇		c.strokeStyle="red";
	for (var i = 0; i < snake.length; i++) {
		c.beginPath();
		c.fillStyle="green";
		c.fillRect(snake[i].x,snake[i].y,BlOCK_SIZE,BlOCK_SIZE);
		c.moveTo(snake[i].x,snake[i].y);
		c.lineTo(snake[i].x+BlOCK_SIZE,snake[i].y);
		c.lineTo(snake[i].x+BlOCK_SIZE,snake[i].y+BlOCK_SIZE);
		c.lineTo(snake[i].x,snake[i].y+BlOCK_SIZE);
		c.closePath;
		c.strokeStyle="red";
		c.stroke();

	}

	//画食物
	c.beginPath();
	c.fillStyle="yellow";
	c.fillRect(foodX,foodY,BlOCK_SIZE,BlOCK_SIZE);
	c.moveTo(foodX,foodY);
	c.lineTo(foodX+BlOCK_SIZE,foodY);
	c.lineTo(foodX+BlOCK_SIZE,foodY+BlOCK_SIZE);
	c.lineTo(foodX,foodY+BlOCK_SIZE);
	c.closePath();
	c.strokeStyle="red";
	c.stroke();

}
//游戏初始化
function Start(){
	for( var i = 0; i < snakeCount; i++){
                snake[i] = {x: i * BlOCK_SIZE, y: 0};
            }
            addFood();
            draw();
            onMark.innerHTML = 0;
}
window.onload=function(){
	draw();
	
}
//运动（最重要的！）
function move(){

	switch(toGo){
		case 1: //左边
			snake.push({ x : snake[snakeCount-1].x - BlOCK_SIZE,y:snake[snakeCount-1].y});
			break;
		case 2: //上边
			snake.push({ x : snake[snakeCount-1].x,y:snake[snakeCount-1].y - BlOCK_SIZE});
			break;
		case 3: //右边
			snake.push({ x : snake[snakeCount - 1].x + BlOCK_SIZE, y: snake[snakeCount - 1].y});
			break;
		case 4: //下边
			snake.push({ x : snake[snakeCount-1].x,y:snake[snakeCount-1].y + BlOCK_SIZE});
			break;
		default:;

	}
	snake.shift();
	
	isEat();
	isDie();
	draw();
}
//吃食物
function isEat(){
	if (snake[snakeCount-1].x==foodX&&snake[snakeCount-1].y==foodY) {
		onMark.innerHTML=(parseInt(onMark.innerHTML) + 1).toString();
	addFood();
	addSnake();
	}

}
//制作食物
function addFood(){
	foodX = Math.floor(Math.random() * (COLS - 1)) * BlOCK_SIZE;
    foodY = Math.floor(Math.random() * (ROWS - 1)) * BlOCK_SIZE;
}
//长大
function addSnake(){
	snakeCount++;
	snake.unshift({x:100000,y:100000});
}
//死亡
function isDie(){
	if (snake[snakeCount-1].x==-20||snake[snakeCount-1].y== BlOCK_SIZE * ROWS||
		snake[snakeCount-1].x==BlOCK_SIZE * COLS||snake[snakeCount-1].y == -20) {
		clearInterval(interval);
		alert("Game Over");
	}
	for (var i = 0; i <snakeCount-1; i++) {
		if(snake[snakeCount-1].x==snake[i].x&&snake[snakeCount-1].y==snake[i].y){
		clearInterval(interval);
		alert("Game Over");

		}
	}
}
//游戏操作
function keyDown(key){
	switch(key){
		case 37://左
			if (toGo!=1&&toGo!=3) 
				toGo=1;break;
		case 38://上
			if (toGo!=2&&toGo!=4) 
				toGo=2;break;
		case 39://右
			if (toGo!=1&&toGo!=3) 
				toGo=3;break;
		case 40://下
			if (toGo!=2&&toGo!=4) 
				toGo=4;break;	
		case 32://暂停
			if (isPause) {
				interval=setInterval(move,100);
				isPause=false;
				document.getElementById('pause').innerHTML = "Pause";
			}else{
                   clearInterval(interval);
                   isPause = true;
                   document.getElementById('pause').innerHTML = "Start";
                   }
            break;
            default:;
	}
}
//加载界面
window.onload=function(){
	//setTimeout("location.reload();",1);
	 //location.reload();
	 var ref=document.getElementById('refresh');
	onMark=document.getElementById('mark_con');
	var yard=document.getElementById('yard');
	var start=document.getElementById('starts');
	COLS=Math.floor(yard.offsetWidth/BlOCK_SIZE);
	ROWS=Math.floor(yard.offsetHeight/BlOCK_SIZE);
	Start();
	start.onclick=function(){interval=setInterval(move,100);}
	ref.onclick=function(){Start();};
	document.onkeydown=function(event){
		event=event||window.event;
		keyDown(event.keyCode);
	}
}