var nbStars = 1000;

function init(){
	var can = document.getElementById('sky')
	putSize(can);
	drawStars(can);
	addEvents(can);
}

function putSize(can){
	can.height = window.innerHeight;
	can.width = window.innerWidth;
}

function drawStars(can){
	var ctx = can.getContext("2d");
	
	var maxHeight = can.height;
	var maxWidth = can.width;


	var initialWidth = can.width/12;
	var gap = ((can.width-initialWidth)/2)/10

	for(var i = 0;i<nbStars;i++){
		var hue=Math.floor(Math.random()*45+173), sat=Math.floor(Math.random()*10+56),lum=Math.floor(Math.random()*20+80)
		starsColor = "hsl("+hue+", "+sat+"%, "+lum+"%)"

		ctx.fillStyle = starsColor;
		var x=Math.random()*maxWidth, y=Math.random()*maxHeight;
		var l=Math.random()<0.999?Math.random()*1.5+0.5:Math.random()*3+1;

		ctx.fillRect(x,y,l,l);		

	}
	ctx.fillStyle = "#ffffff";

	var scale = 0.35;
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'white';

	for(var i = 0;i<9;i++){
		ctx.save();
		ctx.scale(1, scale);
		ctx.beginPath();
		ctx.arc((maxWidth/2), (maxHeight/2)/scale, (initialWidth+gap*i), 2 * Math.PI, 0, false);
		ctx.stroke();
		ctx.restore();
		//scale -= 0.02;
	}

}


/*
* events
*/
function addEvents(can){
	window.addEventListener('resize', function(){
		putSize(can);
		drawStars(can);
	}
	, true);
}
