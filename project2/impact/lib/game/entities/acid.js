ig.module
(
'game.entities.acid'
)

.requires('impact.entity')

.defines(function()
{
	EntityAcid = ig.Entity.extend({

		_wmDrawBox: true,
		_wmScalable: true,
		_wmBoxColor: 'rgba(0, 255, 0, .8)',
		size: {x: 16, y: 16},
		
		checkAgainst: ig.Entity.TYPE.B,
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