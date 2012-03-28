var GM = GM || {};

var player,
	ball,
	gravity = 10,
	velocity = 5,
	FPS = 30,
	maxNumBricks = 5,
	gameWidth = $('#GameField').width(),
	gameHeight = $('#GameField').height(),
	missiles = [],
	blocks = [],
	pi = Math.PI,
	gameTimer;

GM.manager = function(){
			
	var _self = {
		pageLoad: function(){
			//Call PageLoad Functions of the Objects
			pub.gametimer();
			pub.getInput();
			player = new GM.player();
			
			for(var i=0; i<maxNumEnemies; i++){
				enemy = new GM.enemy();
				enemies.push(enemy);
				enemies[i].setPos(Math.floor(Math.random() * gameWidth), Math.floor(Math.random() * gameHeight));
			}	
		},
		getInput: function(){
			$(document).keypress(function(event) {
				if (event.keyCode == '37') {
					player.moveLeft();
				}else if(event.keyCode == '39'){
					player.moveRight();
				}
			});
		},
		'bindMouseInput' : function () {
			$('#GameField').bind('mousemove', function(e){
				//player.headFor(e.pageX, e.pageY);
				player.goTo(e.pageX, e.pageY);
			
			});
		},
		
		gametimer: function(){
			setInterval(pub.draw, 1000 / FPS);
		},
		collision:function(object, object2){
			boxU = object.getHiWi();
			boxE = object2.getHiWi();
			playerLeft = object.getX();
			enemyLeft = object2.getX();
		  playerRight = playerLeft + boxU.w;
		  enemyRight = enemyLeft + boxE.w;
		  playerTop = object.getY();
		  enemyTop = object2.getY();
			
		  playerBottom = playerTop + boxU.h;
		  enemyBottom = enemyTop + boxE.h;

		  if (playerBottom < enemyTop) return false;
		  if (playerTop > enemyBottom) return false;
		  if (playerRight < enemyLeft) return false;
		  if (playerLeft > enemyRight) return false;

		  return true;
		},
		draw: function(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			player.fwd();
			ball.fwd();
			if(_self.collision(player, ball)){
				ball.reflectTopBottom()
			}
			if(blocks.length){
				for(var i = 0; i<blocks.length; i++){
					blocks[i].fwd();
					if(_self.collision(ball, blocks[i])){
						ball.reflectTopBottom()
						blocks.splice(i, 1);
					}
				}
			}
		}
	}		
	
	var pub = {
		'init': function(){
			
			//Call PageLoad Functions of the Objects
			pub.gameTimer();
			
			//Bind Inputs
		//_self.bindKeyInput();
			_self.bindMouseInput();
			
			//Create Player
			player = new GM.player();
			
			// Create Ball
			ball = new GM.ball();
			ball.setPos(Math.floor(Math.random() * gameWidth), Math.floor(Math.random() * gameHeight));
			
			//Create blocks
			for(var i=0; i<maxNumBricks; i++){
				block = new GM.brick();
				blocks.push(block);
				blockHW = blocks[i].getHiWi();
				var blockX = (blockHW.w + 20) *  i +10;
				blocks[i].setPos( blockX, 10 );
			}
			
		},
		gameTimer: function(){
			gameTimer = setInterval( _self.draw, 1000 / FPS);
		},
		endTimer : function() {
			clearInterval(gameTimer);
		}

	};
	return pub;
};