ig.module('game.entities.NPC')

.requires('impact.entity')

.defines(function()
{
	EntityNPC = ig.Entity.extend({

		animSheet: new ig.AnimationSheet('media/npc.png', 16, 32),
		size: {x:16, y:32},
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,


		init: function(x,y,settings)
		{
			this.parent(x,y,settings);
			this.addAnim('idle', 0.15, [0,1,2,3]);
		},

		update: function()
		{
			this.currentAnim = this.anims.idle;
			this.parent();
		},

		check: function(other)
		{
			ig.game.lives++;
			this.kill();
		},

	});
	
});