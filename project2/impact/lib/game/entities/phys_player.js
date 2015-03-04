ig.module(
	'game.entities.phys_player'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){

EntityPhys_player = ig.Box2DEntity.extend({
	size: {x: 21, y:32},
	offset: {x: 0, y: 0},
	
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!
	
	animSheet: new ig.AnimationSheet( 'media/hero_sheet_horizontal.png', 21, 32 ),	
	
	flip: false,

	jumpSFX: new ig.Sound('media/sounds/Jump.mp3'),
    shootSFX: new ig.Sound('media/sounds/Shoot.mp3'),
    
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
        this.addAnim('run', 0.15, [32,33,34,35]);
        this.addAnim('jump', 0.15, [40,41,42,43]);
        this.addAnim('fall', 0.15 , [24,25,26,27]);
        this.addAnim('attack', 0.10, [44,45,46,47]);

		if(!ig.global.wm) {
			this.body.SetFixedRotation(true);
		}
	},
	
	
	update: function() {
		// move left or right
		if( ig.input.state('left')) 
		{
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(-100,0), this.body.GetPosition() );
			this.currentAnim = this.anims.run;
			this.flip = true;
		}
		else if( ig.input.state('right')) 
		{
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(100,0), this.body.GetPosition() );
			this.currentAnim = this.anims.run;
			this.flip = false;
		}
		else if( ig.input.state('down'))
		{
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(0,100), this.body.GetPosition() );
			this.currentAnim = this.anims.fall;
		}
		else if( ig.input.pressed('jump') ) {
			this.body.ApplyImpulse( new Box2D.Common.Math.b2Vec2(0,-90), this.body.GetPosition() );
			this.currentAnim = this.anims.jump.rewind();
			this.jumpSFX.play();
		}
		// shoot
		else if( ig.input.pressed('shoot') ) {
			this.shootSFX.play();
			var x = this.pos.x + (this.flip ? -15 : 25 );
			var y = this.pos.y + 13;
			ig.game.spawnEntity( EntityProjectile, x, y, {flip:this.flip} );
			this.currentAnim = this.anims.attack.rewind();
		}
		else if (this.currentAnim == this.anims.jump)
		{
			if(this.currentAnim.loopCount)
			{
				this.currentAnim = this.anims.idle;
			}
		}
		else if(this.currentAnim == this.anims.attack)
		{
			if(this.currentAnim.loopCount)
			{
				this.currentAnim = this.anims.idle;
			}
		}
		// else if(this.currentAnim == this.anims.fall)
		// {
		// 	if(this.currentAnim.loopCount)
		// 	{
		// 		this.currentAnim = this.anims.idle;
		// 	}
		// }

		else
		{
			this.currentAnim = this.anims.run;
		}




		
		
		
	
		
		this.currentAnim.flip.x = this.flip;
		
		// move!
		this.parent();
	}
});


EntityProjectile = ig.Box2DEntity.extend({
	size: {x: 13, y: 8},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, 
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!
	timer: null,
		
	animSheet: new ig.AnimationSheet( 'media/eighth_note.png', 13, 8 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.currentAnim.flip.x = settings.flip;
		
		var velocity = (settings.flip ? -50 : 50);
		this.body.ApplyImpulse( new Box2D.Common.Math.b2Vec2(velocity,0), this.body.GetPosition() );
		this.timer = new ig.Timer();
	},
	update: function()
	{
		this.parent();
		if(this.timer.delta() > 2)
		{
			this.kill();
			return;
		}
	},

});

});

