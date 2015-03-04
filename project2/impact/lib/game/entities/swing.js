ig.module( 'game.entities.swing')

.requires('impact.entity')

.defines(function() 
{
	
	EntitySwing = ig.Entity.extend(
	{

		animSheet: new ig.AnimationSheet('media/rope_swing.png', 2, 32),
		size: {x: 2, y: 32},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		


		init: function(x,y,settings)
		{
			this.startPosition = {x:x, y:y};
			this.parent(x,y,settings);
			this.addAnim('walk', 1, [0]);
			this.currentAnim.pivot.y = 0;
		},

		draw: function() { this.parent();},

		update:function() {
			var player = ig.game.getEntitiesByType(EntityPlayer);
			if(this.touches(player[0]))
			{
				return;
			}
			else
				this.currentAnim.angle = 0;		
				this.pos.x = this.startPosition.x;

		},

		check: function(other)
		{
			other.onSwing = true;
			if(this.touches(other))
			{
				this.currentAnim.angle += (other.flip ? (Math.PI/2 * ig.system.tick) : (Math.PI/2 * -ig.system.tick));

				if(other.flip)
				{
					this.pos.x -= Math.cos(0.0261799388);
				}
				else
					this.pos.x += Math.cos(0.0261799388);
			}

		},	


	});
	
});