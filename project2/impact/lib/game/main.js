ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.sound',	
	'impact.timer',

	'game.levels.forest',
	'game.levels.lake',
	'game.levels.castle',
	'game.levels.topDown',
	'game.levels.boss',
	'game.levels.phys',

	'plugins.box2d.game'
	
	
)

.defines(function(){

MyGame = ig.Game.extend({

	
	gravity: 300,
	instructText: new ig.Font( 'media/04b03.font.png' ),
	statText: new ig.Font('media/04b03.font.png'), 
	showStats: false,
	statMatte: new ig.Image('media/stat-matte.png'),
	levelTimer: new ig.Timer(),
	levelExit: null,
	stats: {time: 0, kills: 0, deaths: 0},
	lives: 3,
	lifeSprite: new ig.Image('media/lives.png'),


	init: function() {
		// Initialize your game here; bind keys etc.

		ig.music.add('media/sounds/Swing Lo Magellan.*');
		//ig.music.add('media/sounds/Star Theme.*');

		ig.music.volume = 0.5;
		ig.music.play();

		this.loadLevel(LevelForest);

		//binding keys
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.SPACE, 'jump');
		ig.input.bind(ig.KEY.X, 'shoot');
		ig.input.bind(ig.KEY.SHIFT, 'switch'); 
		ig.input.bind(ig.KEY.C, 'continue');

	},

	update: function() {

		//making screen follow player
		var player = this.getEntitiesByType(EntityPlayer)[0];
		if(player)
		{
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
			if(player.accel.x > 0 && this.instructText)
			{
				this.instructText = null;
			}
		}



		// Update all entities and backgroundMaps
		if(!this.showStats)
		{
			this.parent();
		}
		else
		{
			if(ig.input.state('continue'))
			{
				this.showStats = false;
				this.levelExit.nextLevel();
				this.parent();
			}
		}

		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if(this.instructText)
		{
			var x = ig.system.width/2,
			y = ig.system.height - 10;
			this.instructText.draw(
			'Move with Arrow Keys, Space jumps, X shoots, Shift switches weapons.', x, y, ig.Font.ALIGN.CENTER);
		}

		 if(this.showStats)
		 {
		 	this.statMatte.draw(0,0);
		 	var x = ig.system.width/2;
		 	var y = ig.system.height/2 - 20;
		 	this.statText.draw('Level Completed', x, y, ig.Font.ALIGN.CENTER);
		 	this.statText.draw('Time: ' + this.stats.time, x, y + 30, ig.Font.ALIGN.CENTER);
		 	this.statText.draw('Kills: ' + this.stats.kills, x, y + 50, ig.Font.ALIGN.CENTER);
		 	this.statText.draw('Deaths: ' + this.stats.deaths, x, y + 70, ig.Font.ALIGN.CENTER);
		 	this.statText.draw('Press C to continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
		 }


		 this.statText.draw('Lives', 5, 5);
		 for(var i = 0; i < this.lives; i++)
		 {
		 	this.lifeSprite.draw(((this.lifeSprite.width + 2) * i) + 5, 15);
		 }
		// Add your own drawing code here

	},

	loadLevel: function(data)
	{
		this.stats = {time: 0, kills: 0, deaths: 0};
		this.parent(data);
		this.levelTimer.reset();

	},

	toggleStats: function(levelExit)
	{
		this.showStats = true;
		this.stats.time = Math.round(this.levelTimer.delta());
		this.levelExit = levelExit;
	},

	gameOver:function()
	{
		ig.finalStats = ig.game.stats;
		ig.system.setGame(GameOverScreen);
	}
});

StartScreen = ig.Game.extend({
	instructText: new ig.Font('media/04b03.font.png'),
	background: new ig.Image('media/start_screen.png'),

	init: function()
	{
		ig.input.bind(ig.KEY.SPACE, 'start');
	},

	update: function()
	{
		if(ig.input.pressed('start'))
		{
			ig.system.setGame(InstructionScreen);
		}

		this.parent();
	},

	draw: function()
	{
		this.parent();
		this.background.draw(0,0);
		var x = ig.system.width/2,
		y = ig.system.height - 10;
		this.instructText.draw('Press SPACE to start', x+40, y, ig.Font.ALIGN.CENTER);


	}
});

InstructionScreen = ig.Game.extend({
	instructText: new ig.Font('media/04b03.font.png'),

	init: function()
	{
		ig.input.bind(ig.KEY.SPACE, 'start');
	},

	update:function()
	{
		if(ig.input.pressed('start'))
		{
			ig.system.setGame(MyGame);
		}
	},

	draw:function()
	{
		this.parent();
		var x = ig.system.width/2,
		y = ig.system.height/2;
		this.instructText.draw('You have been trapped in your dreams.', x, y, ig.Font.ALIGN.CENTER );
		this.instructText.draw('You must destroy the nightmare devil with music to escape.', x, y + 10, ig.Font.ALIGN.CENTER );
		this.instructText.draw('Find the correct crystal to advance to the next dream stage.', x, y + 20 , ig.Font.ALIGN.CENTER );
		this.instructText.draw('There are many false crystals. BEWARE!!!', x, y + 30, ig.Font.ALIGN.CENTER );
		this.instructText.draw('Try to find the friendly ghost in each level for a prize. GOOD LUCK!', x, y + 40, ig.Font.ALIGN.CENTER );

	}


});

GameOverScreen = ig.Game.extend({

	instructText: new ig.Font('media/04b03.font.png'),
	gameOver: new ig.Image('media/game_over.png'),
	stats: {},

	init:function()
	{
		ig.input.bind(ig.KEY.SPACE, 'start');
		this.stats = ig.finalStats;
	},

	update:function()
	{
		if(ig.input.pressed('start'))
		{
			ig.system.setGame(StartScreen);
		}
		this.parent();
	},

	draw:function()
	{
		this.parent();
		var x = ig.system.width/2;
		var y = ig.system.height/2  -20;
		
		var score = (this.stats.kills * 100) - (this.stats.deaths * 50);
		this.gameOver.draw(0,0);
		this.instructText.draw('Total Kills: ' + this.stats.kills, x, y+30, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Total Deaths: ' + this.stats.deaths, x, y + 40, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Score: ' + score, x, y + 50, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Thank you for playing!', x, y + 60, ig.Font.ALIGN.CENTER);
		this.instructText.draw('Press Space to continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
		
	},
});




PhysGame = ig.Box2DGame.extend({
	
	gravity: 100, // All entities are affected by this
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: '#1b2026',
	stats: {},
	
	init: function() {
		ig.music.add('media/sounds/Star Theme.*')
		ig.music.next();
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.SPACE, 'jump' );
		ig.input.bind( ig.KEY.X, 'shoot' );
		//ig.input.bind( ig.KEY.C, 'continue');
		
		
		
		this.loadLevel( LevelPhys );
	},
	
	loadLevel: function( data ) {
		this.parent( data );
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].preRender = true;
		}
	},
	
	update: function() {
		// Update all entities and BackgroundMaps
		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPhys_player )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}

		// if(ig.input.pressed('continue'))
		// {
		// 	ig.system.setGame(GameOverScreen);
		// }

		this.parent();

	},
	
	draw: function() {
		// Draw all entities and BackgroundMaps


		this.parent();
		this.font.draw( 'YOU WIN! YOU CAN FLY NOW!', 2, 2 );
		
	}
});





// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 320, 240, 2 );

});
