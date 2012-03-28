var GM = GM || {};

GM.brick = function(){
	var x = 0,
		y = 0,
		width = 40,
		height = 20;
			
	var pub = {
		
		fwd:function(){
			x = x;
			y = y;
			ctx.fillStyle = "rgb(175,59,59)";
			ctx.fillRect(x, y, width, height);
		},
		setPos:function(newX, newY){
			x = newX;
			y = newY;
		},
		getX:function(){
			return x;
		},
		
		getY:function(){
			return y;
		},
		getHiWi:function(){
			return {w:width, h:height}; 
		},
		getRotation:function(){
			return rotation;
		}
	};
	return pub;
};

