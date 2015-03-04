ig.module
(
'game.entities.fire'
)

.requires('impact.entity')

.defines(function()
{
	EntityFire = ig.Entity.extend({

		_wmDrawBox: true,
		_wmScalable: true,
		_wmBoxColor: 'rgba(255, 0, 0, .8)',
		size: {x: 16, y: 16},
		
		checkAgainst: ig.Entity.TYPE.BOTH,
		damage: 1000000,

		update: function()
		{

		},

		check: function(other)
		{
			other.kill();
		},

	});
});