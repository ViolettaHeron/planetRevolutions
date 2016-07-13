var nbStars = (window.innerHeight/100*window.innerWidth/10);
var planets = [
	{
		name:"Mercure",
		color:"#cc3300",
		size:1
	},{
		name:"Venus",
		color:"#ff9900",
		size:1.1
	},{
		name:"Terre",
		color:"#0099cc",
		size:1.2
	},{
		name:"Mars",
		color:"#ff3300",
		size:1
	},{
		name:"Jupiter",
		color:"#ffcc66",
		size:2.4
	},{
		name:"Saturne",
		color:"#ffff99",
		size:2
	},{
		name:"Uranus",
		color:"#00ccff",
		size:1.2
	},{
		name:"Neptune",
		color:"#33ccff",
		size:1.1
	},{
		name:"Pluton",
		color:"#993300",
		size:0.5
	},
]


function init(){
	var can = document.getElementById('sky');
	var p_can = document.getElementById('planetsPath');
	putSize(can);
	putSquareSize(p_can);
	drawStars(can);
	//drawPlanets(can);
	//drawTarget(can);
	addEvents(can);
	movePlanets(p_can);
}

function putSize(can){
	can.height = window.innerHeight;
	can.width = window.innerWidth;
}

function putSquareSize(can){
	var l = window.innerHeight>window.innerWidth ? window.innerWidth : window.innerHeight;
	console.log(l);
	can.height = l;
	can.width = l;
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


function drawPlanets(can,t){
	var ctx = can.getContext("2d");
	var size = can.width/60

	var initialGap = can.width/12;
	var gap = ((can.width-initialGap)/2)/10

	var maxHeight = can.height;
	var maxWidth = can.width;

	for(var i=0;i<9;i++){
		var x = (maxWidth/2)+(4+2*i)*Math.cos(Math.PI*t*(i+1))*size;		// 4=magic number
		var y = (maxHeight/2)+(4+2*i)*Math.sin(Math.PI*t*(i+1))*size;		// 4=magic number

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

function movePlanets(can){
	var t=0;
	setTimeout(function(){ 
		can.getContext("2d").clearRect(0, 0, can.width, can.height);
		drawPlanets(can,t);
		t+=0.02;
	}, 100);
}