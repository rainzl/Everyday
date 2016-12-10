
/*
新的画布参数   新的画布的宽度，高度，
 */
function newCanvas(x,y,r,img){
	var newCanvas = document.createElement('canvas');
	canvas.width = r,canvas.height = r;
	var newCxt = newCanvas.getContext('2d');
	newCxt.save();
	newCxt.beginPath();
	var img1 = new Image();
	img1.src = img;
	img1.onload = function () {
		var pattern = newCxt.createPattern(img1,'no-repeat');
		newCxt.fillStyle = pattern;
		newCxt.arc(x,y,r,0,2*Math.PI);
		newCxt.fill();
		newCxt.closePath();
		newCxt.restore();
	}
	return newCxt;
}




