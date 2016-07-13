var nbStars = (window.innerHeight/100*window.innerWidth/10);
var planets = [
	{
		name:"Mercure",
		color:"#cc3300",
		size:1,
		initialPos:1,
		speed:4.7
	},{
		name:"Venus",
		color:"#ff9900",
		size:1.1,
		initialPos:8,
		speed:3.2
	},{
		name:"Terre",
		color:"#0099cc",
		size:1.2,
		initialPos:3,
		speed:2.9
	},{
		name:"Mars",
		color:"#ff3300",
		size:1,
		initialPos:4,
		speed:2.4
	},{
		name:"Jupiter",
		color:"#ffcc66",
		size:1.6,
		initialPos:2,
		speed:1.3
	},{
		name:"Saturne",
		color:"#ffff99",
		size:1.4,
		initialPos:6,
		speed:0.9
	},{
		name:"Uranus",
		color:"#00ccff",
		size:1.2,
		initialPos:1,
		speed:0.6
	},{
		name:"Neptune",
		color:"#33ccff",
		size:1.1,
		initialPos:7,
		speed:0.5
	},{
		name:"Pluton",
		color:"#993300",
		size:0.5,
		initialPos:5,
		speed:0.4
	},
]


function init(){
	var can = document.getElementById('sky');
	var p_can = document.getElementById('planetsPath');
	putSize(can);
	putSquareSize(p_can);
	drawStars(can);
	//drawPlanets(can);
	//drawTarget(p_can);
	addEvents(can,p_can);
	movePlanets(p_can);
}

function putSize(can){
	can.height = window.innerHeight;
	can.width = window.innerWidth;
}

function putSquareSize(can){
	var l = window.innerHeight>window.innerWidth ? window.innerWidth : window.innerHeight;
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

	for(var i = 0;i<planets.length;i++){
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
	var size = can.width/65

	var initialGap = can.width/20;
	var gap = ((can.width-initialGap)/2)/10

	var maxHeight = can.height;
	var maxWidth = can.width;

	ctx.beginPath();
	ctx.fillStyle = "#ffff9a";
	ctx.arc((maxWidth/2), (maxHeight/2), size, 0, 2 * Math.PI, false);
	ctx.fill()
	ctx.closePath();
	
	for(var i=0;i<planets.length;i++){

		speed = (planets.length-i+1)*planets[i].speed/2;
		var x = (maxWidth/2)+(2+i)*Math.cos(t*speed+planets[i].initialPos)*gap;		// 2 = magic number
		var y = (maxHeight/2)+(2+i)*Math.sin(t*speed+planets[i].initialPos)*gap;	// 2 = magic number


		ctx.beginPath();
		ctx.fillStyle = planets[i].color;
		ctx.arc(x, y, size*planets[i].size, 0, 2 * Math.PI, false);
		ctx.fill()
		ctx.closePath();
	}
}


/*
* events
*/
function addEvents(can,p_can){
	window.addEventListener('resize', function(){
		nbStars = (window.innerHeight/100*window.innerWidth/10);
		putSize(can);
		putSquareSize(p_can);
		drawStars(can);
		drawPlanets(p_can);
	}
	, true);
}

function movePlanets(p_can){
	var t=0;
	setInterval(function(){ 
		p_can.getContext("2d").clearRect(0, 0, p_can.width, p_can.height);
		drawPlanets(p_can,t);
		t+=0.005;
	}, 30);
}