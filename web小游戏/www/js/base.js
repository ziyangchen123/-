var startX=startY=0;
var d=-1;
var stopNum=0;
var getArr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var scoress=0;
var scores=document.getElementById('score').getElementsByTagName('span')[0];

window.onload=function(){
	
	var tables=document.getElementById('table');
	var btn=document.getElementById('refresh');
	
	
	// 绑定事件
	tables.addEventListener("touchstart",touchstartFunc,false);
	tables.addEventListener("touchmove",touchmoveFunc,false);
	tables.addEventListener('touchend', touchEndFunc, false); 
	btn.addEventListener("click",start,false);
	start();
	
}
	

function refs(){
	
	var num=0;
	for(j=0;j<16;j++)
	{
		if(getArr[j]!=0)
		{
			num++;
		}
	}
	if (num==16) {
		alert("游戏结束!");
		start();	
	}
}
function touchstartFunc(event){
	
	event=event || window.event;
	try
	{
		event.preventDefault();
		// 获取第一次坐标
		var touch = event.touches[0];
		startX=Number(touch.pageX);
		startY=Number(touch.pageY);
		
	}
	catch(er)
	{}


}
function touchmoveFunc(event){
	
	event=event || window.event;
	try{

		event.preventDefault();
		// 获取第一次坐标
		var touch = event.touches[0];
		var x=Number(touch.pageX);
		var y=Number(touch.pageY);
		// 判断滑动方向
		        if((y-startY)>0&&Math.abs((y-startY)/(x-startX))>1)
				{
					d=0;
				}
				else if(y-startY<0&&Math.abs((y-startY)/(x-startX))>1)
				{
					d=1;
				}
				else if((x-startX)>0&&Math.abs((y-startY)/(x-startX))<1)
				{
					d=2;
				}
				else
				{
					d=3;
				}
 				
	
	}
	catch(er)
	{}
}
function touchEndFunc(event){
	
	event= event || window.event;
	event.preventDefault();
	huaDong();
	

}
function huaDong(){
	switch(d){
		case 0:
		//向下滑动
			down();
			break ;
		case 1:
		//向上滑动
			up();
			break;
		case 2:
		//向右滑动
			right();
			break;
		case 3:
		//向左滑动
			left();
			break;
		default:
			break;
	}
}
// 键盘控制
document.onkeypress=function(event){
			var event=window.event?window.event:event;
			   if (event.keyCode=='119' )
			   {
				up();//上
			   }
			   if(event.keyCode=='115')
			   {
			   		down();//下
			   }
			    if(event.keyCode=='100')
			   {
			   		right();
			   }
			    if(event.keyCode=='97')
			   {
			   		left();
			   }
}
//初始化显示界面
function start(){
	getArr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for(i=0;i<16;i++)
	{
		
		
			document.getElementById(i).innerText="";
		
	}
	d=-1;
	scoress=0;
	scores.innerHTML="";
	var i=Math.floor(Math.random()*16);
	getArr[i]=2;
	var  i=Math.floor(Math.random()*16);
	getArr[i]=2;
	
	donum();
}
function donum()
{	
	for(i=0;i<16;i++)
	{
		if(getArr[i]!=0)
		{
			document.getElementById(i).innerText=getArr[i];
			refs();

		}
		else
		{
			document.getElementById(i).innerText="";
		}
	}
	d=-1;
	
	
	
}

function randomDo(){

	
		while(1)
		{
			i=Math.floor(Math.random()*16);
			if(getArr[i]==0)
			{
				var rn=Math.ceil(Math.random()*10);
				if(rn>0&&rn<=6)
				{
					getArr[i]=2;

				}
				else if(rn>6&&rn<=9)
				{
					getArr[i]=4;
				}
				else
				{
					getArr[i]=8;
				}
					
				break;
			}
		}
	


		donum();

}

function down()

{
	
		
	for(var num=12;num<=15;num++)
	{
		if(getArr[num]==getArr[num-4])
		{
			getArr[num]=parseInt(getArr[num-4])+parseInt(getArr[num]);

			scoress+=getArr[num];
			scores.innerHTML=scoress;
			getArr[num-4]=0;
			if(getArr[num-8]==getArr[num-12])
			{
				getArr[num-8]=parseInt(getArr[num-8])+parseInt(getArr[num-12]);
				getArr[num-12]=0;
				scoress+=getArr[num-8];
				scores.innerHTML=scoress;
			}
		}
		else if(getArr[num-4]==getArr[num-8])
		{
			getArr[num-4]=parseInt(getArr[num-8])+parseInt(getArr[num-4]);
			getArr[num-8]=0;
			scoress+=getArr[num-4];
			scores.innerHTML=scoress;
		}
		else if(getArr[num-8]==getArr[num-12])
		{
			getArr[num-8]=parseInt(getArr[num-12])+parseInt(getArr[num-8]);
			getArr[num-12]=0;
			scoress+=getArr[num-8];
			scores.innerHTML=scoress;
		}
		
		
		for(var j=num;j>=num-8;j=j-4)
		{
			if(getArr[j]==0)
			{
				for(var i=j-4;i>=0;i=i-4)
				{
					if(getArr[i]!=0)
					{
						getArr[j]=getArr[i];
						getArr[i]=0;
						break;
					}

				}

			};

		try{
			if(getArr[j+4]==getArr[j])
		{
			getArr[j+4]=parseInt(getArr[j+4])+parseInt(getArr[j]);

			scoress+=getArr[j+4];
			scores.innerHTML=scoress;
			getArr[j]=0;
		}
	}
		catch(e){

		}

		}
		
	}
	
	donum();
	randomDo();


}


function up()
{
	for(var num=3;num>=0;num--)
	{
		if(getArr[num]==getArr[num+4])
		{
			getArr[num]=parseInt(getArr[num+4])+parseInt(getArr[num]);
			getArr[num+4]=0;
			scoress+=getArr[num];
			scores.innerHTML=scoress;

			if(getArr[num+8]==getArr[num+12])
			{
				getArr[num+8]=parseInt(getArr[num+8])+parseInt(getArr[num+12]);
				getArr[num+12]=0;
				scoress+=getArr[num+8];
				scores.innerHTML=scoress;
			}
		}
		else if(getArr[num+4]==getArr[num+8])
		{
			getArr[num+4]=parseInt(getArr[num+8])+parseInt(getArr[num+4]);
			getArr[num+8]=0;
			scoress+=getArr[num+4];
			scores.innerHTML=scoress;
		}
		else if(getArr[num+8]==getArr[num+12])
		{
			getArr[num+8]=parseInt(getArr[num+12])+parseInt(getArr[num+8]);
			getArr[num+12]=0;
			scoress+=getArr[num+8];
			scores.innerHTML=scoress;
		}
		
		
		for(var j=num;j<=num+8;j=j+4)
		{
			if(getArr[j]==0)
			{
				for(var i=j+4;i<=15;i=i+4)
				{
					if(getArr[i]!=0)
					{
						getArr[j]=getArr[i];
						getArr[i]=0;
						break;
					}
				}
			};
			try{
			if(getArr[j-4]==getArr[j])
		{
			getArr[j-4]=parseInt(getArr[j-4])+parseInt(getArr[j]);

			scoress+=getArr[j-4];
			scores.innerHTML=scoress;
			getArr[j]=0;
		}
	}
		catch(e){
			
		}
		}
		
	}
	donum();
	randomDo();
}


function right()
{
	for(var num=15;num>=3;num=num-4)
	{
		if(getArr[num]==getArr[num-1])
		{
			getArr[num]=parseInt(getArr[num-1])+parseInt(getArr[num]);
			getArr[num-1]=0;
			scoress+=getArr[num];
			scores.innerHTML=scoress;
			if(getArr[num-2]==getArr[num-3])
			{
				getArr[num-2]=parseInt(getArr[num-2])+parseInt(getArr[num-3]);
				getArr[num-3]=0;
				scoress+=getArr[num-2];
				scores.innerHTML=scoress;
			}
		}
		else if(getArr[num-1]==getArr[num-2])
		{
			getArr[num-1]=parseInt(getArr[num-2])+parseInt(getArr[num-1]);
			getArr[num-2]=0;
			scoress+=getArr[num-1];
			scores.innerHTML=scoress;
		}
		else if(getArr[num-2]==getArr[num-3])
		{
			getArr[num-2]=parseInt(getArr[num-3])+parseInt(getArr[num-2]);
			getArr[num-3]=0;
			scoress+=getArr[num-2];
			scores.innerHTML=scoress;
		}
		
		for(var j=num;j>=num-2;j=j-1)
		{
			if(getArr[j]==0)
			{
				for(var i=j-1;i>=num-3;i=i-1)
				{
					if(getArr[i]!=0)
					{
						getArr[j]=getArr[i];
						getArr[i]=0;
						break;
					}
				}
			};
			try{
			if(getArr[j+1]==getArr[j])
		{
			getArr[j+1]=parseInt(getArr[j+1])+parseInt(getArr[j]);

			scoress+=getArr[j+1];
			scores.innerHTML=scoress;
			getArr[j]=0;
		}
	}
		catch(e){
			
		}
		}
	}
	donum();
	randomDo();
}
function left()
{
	for(var num=0;num<=12;num=num+4)
	{
		if(getArr[num]==getArr[num+1])
		{
			getArr[num]=parseInt(getArr[num+1])+parseInt(getArr[num]);
			getArr[num+1]=0;
			scoress+=getArr[num];
			scores.innerHTML=scoress;
			if(getArr[num+2]==getArr[num+3])
			{
				getArr[num+2]=parseInt(getArr[num+2])+parseInt(getArr[num+3]);
				getArr[num+3]=0;
				scoress+=getArr[num+2];
				scores.innerHTML=scoress;
			}
		}
		else if(getArr[num+1]==getArr[num+2])
		{
			getArr[num+1]=parseInt(getArr[num+2])+parseInt(getArr[num+1]);
			getArr[num+2]=0;
			scoress+=getArr[num+1];
			scores.innerHTML=scoress;
		}
		else if(getArr[num+2]==getArr[num+3])
		{
			getArr[num+2]=parseInt(getArr[num+3])+parseInt(getArr[num+2]);
			getArr[num+3]=0;
			scoress+=getArr[num+2];
			scores.innerHTML=scoress;
		}
		
		for(var j=num;j<=num+2;j=j+1)
		{
			if(getArr[j]==0)
			{
				for(var i=j+1;i<=num+3;i=i+1)
				{
					if(getArr[i]!=0)
					{
						getArr[j]=getArr[i];
						getArr[i]=0;
						break;
					}
				}
			};
		try{
			if(getArr[j-1]==getArr[j])
		{
			getArr[j-1]=parseInt(getArr[j-1])+parseInt(getArr[j]);

			scoress+=getArr[j-1];
			scores.innerHTML=scoress;
			getArr[j]=0;
		}
	}
		catch(e){
			
		}
		}
	}
	donum();
	randomDo();
}