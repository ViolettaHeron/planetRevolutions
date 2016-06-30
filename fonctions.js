var nbStars = 1000;

function init(){
	var can = document.getElementById('sky')
	drawStars(can);
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


	console.log(starsColor);

}