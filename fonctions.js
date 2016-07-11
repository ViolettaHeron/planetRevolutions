var nbStars = (window.innerHeight/100*window.innerWidth/10);

function init(){
	var can = document.getElementById('sky')
	putSize(can);
	drawStars(can);
	drawPlanets(can);
	//drawTarget(can);
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

	for(var i = 0;i<nbStars;i++){
		var hue=Math.floor(Math.random()*45+173), sat=Math.floor(Math.random()*10+56),lum=Math.floor(Math.random()*20+80)
		starsColor = "hsl("+hue+", "+sat+"%, "+lum+"%)"

		ctx.fillStyle = starsColor;
		var x=Math.random()*maxWidth, y=Math.random()*maxHeight;
		var l=Math.random()<0.999?Math.random()*1.5+0.5:Math.random()*3+1;

		ctx.fillRect(x,y,l,l);		

	}
	

	

}

function drawTarget(can){
	var ctx = can.getContext("2d");

	var initialWidth = can.width/12;
	var gap = ((can.width-initialWidth)/2)/10

	var maxHeight = can.height;
	var maxWidth = can.width;

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
		ctx.closePath();
		ctx.restore();
	}
}


function drawPlanets(can){
	var ctx = can.getContext("2d");
	var size = can.width/50

	var initialGap = can.width/12;
	var gap = ((can.width-initialGap)/2)/10

	var maxHeight = can.height;
	var maxWidth = can.width;

	

	for(var i=0;i<9;i++){
		var x = (maxWidth/2)+(4+i)*Math.cos(t)*size;		// 4=magic number
		var y = (maxHeight/2)+(4+i)*Math.sin(t)*size;		// 4=magic number

		var t = 2*Math.PI+0.5*i;

		ctx.beginPath();
		ctx.fillStyle = "#FFFFC4";
		ctx.arc(x, y, size, 0, 2 * Math.PI, false);
		ctx.fill()
		ctx.closePath();
	}
}


/*
* events
*/
function addEvents(can){
	window.addEventListener('resize', function(){
		nbStars = (window.innerHeight/100*window.innerWidth/10);
		putSize(can);
		drawStars(can);
		drawPlanets(can);
	}
	, true);
}

