ig.module(
  'game.entities.devil'
)

.requires(
  'impact.entity'
)

.defines(function()
{
  EntityDevil = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/devil_sheet.png', 64 , 64),
    size: {x: 64, y: 64},
    maxVel: {x: 100, y:100},
    flip: false,
    friction: {x: 150, y: 0},
    speed: 50,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    health: 800,
    deathSFX: new ig.Sound('media/sounds/Hit_Hurt.mp3'),


    init: function(x, y, settings)
    {
      this.parent(x, y, settings);
      this.addAnim('idle', 0.3, [0,1]);
    },


    update: function()
    {
      //return if near an edge
      if(!ig.game.collisionMap.getTile(
        this.pos.x + (this.flip ? +4 : this.size.x -4) ,
        this.pos.y + this.size.y+1))
      {
        this.flip = !this.flip;
      }
      var xdir = this.flip ? -1 : 1;
      this.vel.x = this.speed * xdir;
      this.currentAnim.flip.x = this.flip;
      this.parent();
    },


    handleMovementTrace: function(res)
    {
      this.parent(res);
      if(res.collision.x)
      {
        this.flip = !this.flip;
      }
      if(res.collision.y)
      {
        this.vel.y = -this.vel.y;
      }
    },

    check: function(other)
    {
      other.receiveDamage(10, this);
    },

     receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
          ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 20, this.pos.y + 10, {particles: 100, colorOffset: 1});
          ig.game.spawnEntity(EntityFireball, this.pos.x + 20, this.pos.y + 15, {flip: this.flip});
    },
    kill: function(){
        this.deathSFX.play();
        ig.finalStats = ig.game.stats;
        ig.game.stats.kills += 10;
        this.parent();
        //ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 20, this.pos.y + 10, {colorOffset: 1});
        //ig.game.gameOver();
        ig.system.setGame(PhysGame);
    }

  });

EntityFireball = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/Fireball.png', 16, 16),
    size: {x: 16, y: 16},
    maxVel: {x:200, y:0},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,


    init: function(x,y,settings)
    {
      this.parent(x + (settings.flip ? -4 : 8),y + 16 ,settings);
      this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
      this.addAnim('idle', 0.2, [0,1,2,3]);

    },

    handleMovementTrace: function(res)
    {
      this.parent(res);
      if(res.collision.x || res.collision.y)
      {
        this.kill();
      }
    },

    check: function(other)
    {
      other.receiveDamage(20, this);
      this.kill();
    },

  });



});