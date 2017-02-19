window.onload=function(){
	var sidebar=document.getElementById('sidebar').getElementsByTagName('li');
	var content=document.getElementById('content').getElementsByTagName('div');

	content[1].style.display="none";
	sidebar[0].className="TabbedPanelsTabSelected ";
	sidebar[0].onclick=function(){
		this.className="TabbedPanelsTabSelected ";
		sidebar[1].className="TabbedPanelsTab";
		content[1].style.display="none";
		content[0].style.display="block"

	}
		sidebar[1].onclick=function(){
		this.className="TabbedPanelsTabSelected ";
		sidebar[0].className="TabbedPanelsTab";
		content[1].style.display="block";
		content[0].style.display="none"
	}
}
