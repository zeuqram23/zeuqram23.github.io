ig.module('game.entities.topdown')

.requires('impact.entity')

.defines(function() {

    EntityTopdown = ig.Entity.extend({

        
        size: {
            x: 16,
            y: 16
        },


        _wmDrawBox: true,
        _wmScalable: true,
        zIndex: 0,
        _wmBoxColor: 'rgba(0,0,255,0.5)',

        gravityFactor: 0,

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

                this.parent();
            }
        },

        check: function(other)
        {
        	if(this.touches(other))
        	{
        		other.topDown = true;
        	}
        	
        }


    })

});