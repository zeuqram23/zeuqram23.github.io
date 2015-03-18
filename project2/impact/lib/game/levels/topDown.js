ig.module( 'game.levels.topDown' )
.requires( 'impact.image','game.entities.topdown','game.entities.levelexit','game.entities.crystal','game.entities.false_crystal','game.entities.NPC','game.entities.player' )
.defines(function(){
LevelTopDown=/*JSON[*/{
	"entities": [
		{
			"type": "EntityTopdown",
			"x": -16,
			"y": -16,
			"settings": {
				"size": {
					"x": 660,
					"y": 676
				}
			}
		},
		{
			"type": "EntityLevelexit",
			"x": 436,
			"y": 256,
			"settings": {
				"level": "castle",
				"size": {
					"x": 52,
					"y": 60
				}
			}
		},
		{
			"type": "EntityCrystal",
			"x": 442,
			"y": 256
		},
		{
			"type": "EntityFalse_crystal",
			"x": 90,
			"y": 320
		},
		{
			"type": "EntityFalse_crystal",
			"x": 250,
			"y": 384
		},
		{
			"type": "EntityFalse_crystal",
			"x": 310,
			"y": 96
		},
		{
			"type": "EntityFalse_crystal",
			"x": 110,
			"y": 548
		},
		{
			"type": "EntityNPC",
			"x": 524,
			"y": 508
		},
		{
			"type": "EntityPlayer",
			"x": 20,
			"y": 588
		}
	],
	"layer": [
		{
			"name": "BG",
			"width": 1,
			"height": 1,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/dusk_sky.png",
			"repeat": true,
			"preRender": true,
			"distance": "3",
			"tilesize": 20,
			"foreground": false,
			"data": [
				[1]
			]
		},
		{
			"name": "main",
			"width": 40,
			"height": 40,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/castle_tiles.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,3],
				[3,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,3,2,2,2,2,2,2,2,3,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,2,3,2,2,2,2,2,2,2,3,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,2,2,3,3,3,2,2,2,3],
				[3,2,2,2,3,3,3,3,3,3,3,14,3,3,3,2,2,2,2,2,2,2,2,14,2,2,2,3,2,2,2,3,3,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,3,3,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,2,3,2,2,3,3,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,3,2,2,3,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,14,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,14,3,14,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,3,2,2,2,14],
				[3,2,2,2,3,3,3,3,2,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,2,2,14,2,2,2,2,2,2,2,2,3,2,2,2,3],
				[3,2,2,2,3,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,3],
				[3,2,2,2,3,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,3],
				[3,2,2,2,3,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,14,2,2,2,2,2,2,2,2,2,2,2,2,3],
				[3,2,2,2,14,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,3,3,14,3,14,3,3,3,3,3,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,3,2,2,2,2,2,2,3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3],
				[3,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,2,2,2,2,3],
				[3,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,2,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,2,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,2,3,3,3,3,2,2,2,2,3],
				[3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,3,2,2,2,3,2,2,2,3,2,2,3,2,2,2,2,3],
				[3,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,14,2,2,3,2,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3,2,2,3,2,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,3,2,2,2,3,2,2,3,2,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,3,2,2,3,3,3,3,3,3,3,3,3,14,2,2,2,3,3,3,3,3,2,2,3,2,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
				[3,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
				[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
			]
		},
		{
			"name": "collision",
			"width": 40,
			"height": 40,
			"linkWithCollision": false,
			"visible": 0,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1],
				[1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
				[1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1],
				[1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,0,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			]
		}
	]
}/*]JSON*/;
LevelTopDownResources=[new ig.Image('media/dusk_sky.png'), new ig.Image('media/castle_tiles.png')];
});