ig.module(
  'game.entities.false_crystal'
)

.requires(
  'impact.entity'
)

.defines(function()
{
  EntityFalse_crystal = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/crystal.png', 64, 64),
    size: {x: 54, y: 64},
    offset: {x:10, y:0},
    maxVel: {x: 0, y:0},
    flip: true,
    friction: {x: 150, y: 0},
    speed: 0,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    health: 1000,
    
    init: function(x, y, settings)
    {
      this.parent(x, y, settings);
      this.addAnim('animate', 0.15, [3,2,1,0]);
    },


    update: function()
    {
      //return if near an edge
      // if(!ig.game.collisionMap.getTile(
      //   this.pos.x + (this.flip ? +4 : this.size.x -4) ,
      //   this.pos.y + this.size.y+1))
      // {
      //   this.flip = !this.flip;
      // }
      // var xdir = this.flip ? -1 : 1;
      // this.vel.x = this.speed * xdir;
      // this.currentAnim.flip.x = !this.flip;
      this.parent();
    },


    handleMovementTrace: function(res)
    {
      // this.parent(res);
      // if(res.collision.x)
      // {
      //   this.flip = !this.flip;
      // }
    },

    check: function(other)
    {
      //this.receiveDamage(10, this);
      other.kill();
    },

  });
});