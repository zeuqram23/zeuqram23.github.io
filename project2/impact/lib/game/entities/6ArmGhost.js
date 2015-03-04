ig.module(
  'game.entities.6ArmGhost'
)

.requires(
  'impact.entity'
)

.defines(function()
{
  Entity6ArmGhost = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/6ArmGhost.png', 60, 60),
    size: {x: 60, y: 60},
    maxVel: {x: 100, y:100},
    flip: true,
    friction: {x: 150, y: 0},
    speed: 0,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    health: 50,
    deathSFX: new ig.Sound('media/sounds/Hit_Hurt.mp3'),


    init: function(x, y, settings)
    {
      this.parent(x, y, settings);
      this.addAnim('idle', 0.15, [0,1,2,3]);
    },


    update: function()
    {
      //return if near an edge
      if(!ig.game.collisionMap.getTile(
        this.pos.x + (this.flip ? +4 : this.size.x -4),
        this.pos.y + this.size.y+1))
      {
        this.flip = !this.flip;
      }
      var xdir = this.flip ? -1 : 1;
      this.vel.x = this.speed * xdir;
      this.currentAnim.flip.x = !this.flip;
      this.parent();
    },


    handleMovementTrace: function(res)
    {
      this.parent(res);
      if(res.collision.x)
      {
        this.flip = !this.flip;
      }
    },

    check: function(other)
    {
      other.receiveDamage(10, this);
    },

        receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 20, this.pos.y + 10, {particles: 2, colorOffset: 1});
    },
    kill: function(){
        this.deathSFX.play();
        ig.game.stats.kills ++;
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 20, this.pos.y + 10, {colorOffset: 1});
    }

  });
});
