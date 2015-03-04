/* ladder.js */
ig.module('game.entities.ladder')

.requires('impact.entity')

.defines(function() {

    EntityLadder = ig.Entity.extend({

        size: {
            x: 16,
            y: 16
        },

        

        _wmDrawBox: true,
        _wmScalable: true,
        zIndex: 0,
        nature: 'ladder',
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/ladder.png', 16, 16),

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
           
        },

        update: function() {},

        draw: function() {
            if(!ig.global.wm) {

                // Draw tiles except the first one.
                if( this.currentAnim ) {
                    var tilesize = ig.game.collisionMap.tilesize;
                    var tile_height = this.size.y / tilesize;
                    for(var i=1; i<tile_height; i++) {
                        this.currentAnim.draw(
                            this.pos.x - this.offset.x - ig.game._rscreen.x,
                            this.pos.y - this.offset.y - ig.game._rscreen.y + (i * tilesize)
                        );
                    }
                }

                // Draw first tile, and debug info.
                this.parent();
            }
        },

        check: function(other)
        {
        	if(this.touches(other))
        	{
        		other.onLadder = true;
        	}
        	
        }


    });

});