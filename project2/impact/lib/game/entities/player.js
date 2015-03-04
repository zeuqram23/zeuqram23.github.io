ig.module(
  'game.entities.player'
)

.requires(
  'impact.entity'
)

.defines(function()
{

  EntityPlayer = ig.Entity.extend({

      animSheet: new ig.AnimationSheet('media/hero_sheet_horizontal.png', 21, 32),
      size: {x: 19, y: 32},
      offset: {x:0, y:0},
      flip: false,
      maxVel: {x: 100, y: 150},
      friction: {x:600, y:0},
      accelGround: 400,
      accelAir: 200,
      jump: 200,
      onLadder: false,
      inWater: false,
      topDown: false,
      onSwing: false,
      zIndex: 256,
      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.NONE,
      collides: ig.Entity.COLLIDES.PASSIVE,
      health: 20,
      weapon: 0,
      totalWeapons: 3,
      activeWeapon: "EntityBullet",
      startPosition: null,
      invincible: false,
      invincibleDelay: 2,
      invincibleTimer: null,
      swingTimer: null,
      _wmDrawBox: true,
      _wmBoxColor: 'rgba(255, 0, 0, 0.7)',
      jumpSFX: new ig.Sound('media/sounds/Jump.mp3'),
      shootSFX: new ig.Sound('media/sounds/Shoot.mp3'),
      deathSFX: new ig.Sound('media/sounds/Hit_Hurt.mp3'),
      switchSFX: new ig.Sound('media/sounds/Switch.mp3'),





      init: function(x, y, settings)
      {
        this.startPosition = {x:x, y:y};
        this.parent(x,y,settings);
        //adding animations
        this.addAnim('idle', 1, [0]);
        this.addAnim('run', 0.15, [0,1,2,3]);
        this.addAnim('jump', 0.3, [41,42,43]);
        this.addAnim('fall', 0.15 , [24,25,26,27]);
        this.addAnim('wallHang', 1, [16]);
        this.addAnim('attack', 0.10, [44,45,46,47]);
        this.addAnim('climb', 0.15, [28,29,30,31]);
        this.addAnim('idleClimb',1, [28]);
        this.addAnim('swim', 0.15, [16,17,18,19]);
        this.addAnim('goUp', 0.15, [8,9,10,11]);
        this.addAnim('goDown', 0.15, [12,13,14,15]);
        this.addAnim('topDownIdle', 1, [8]);
        this.addAnim('swing', 1, [41]);

        this.invincibleTimer = new ig.Timer();
        this.makeInvincible();


      },

      update: function(){
        //moving left/right
        var accel = this.standing ? this.accelGround : this.accelAir;
        
        if( ig.input.state('left'))
        {
          this.accel.x = -accel;
          this.flip = true;
        }

        else if( ig.input.state('right'))
        {
          this.accel.x = accel;
          this.flip = false;
        }

        else
        {
          this.accel.x = 0;
        }

        //jumping
        if(this.standing && ig.input.pressed('jump'))
        {

          this.vel.y = -this.jump;
          this.jumpSFX.play();
        }

        



        if(ig.input.pressed('switch'))
        {
          this.switchSFX.play();
          this.weapon++;
          if(this.weapon >= this.totalWeapons)
          {
            this.weapon = 0;
          }
          switch(this.weapon)
          {
            case(0):
              this.activeWeapon = "EntityBullet";
              break;
            case(1):
              this.activeWeapon = "EntityGrenade";
              break;
            case(2):
              this.activeWeapon = "EntityWave";
              break;
          }
        }

        //on a ladder controls

        if(this.onLadder == true)
        {
          this.friction.y = 999;
          

          if(ig.input.state('up'))
          {
            //this.currentAnim = this.anims.climb;
            this.vel.y = -this.jump;
          }
          if(ig.input.state('down'))
          {
            //this.currentAnim = this.anims.climb;
            this.vel.y = this.jump;
          }
        }
        if(this.onLadder == false)
        {
          this.friction.y = 0;
        }

        //swing stuff
        if(this.onSwing == true)
        {
          this.friction.y = 99;
          this.friction.x = 999;
          this.currentAnim.pivot.y = 0;

         this.currentAnim.angle += (this.flip ? (Math.PI/2 * ig.system.tick) : (Math.PI/2 * -ig.system.tick));

          if(this.flip == false)
          {
            this.pos.x += Math.cos(0.0261799388);
            this.pos.y -= Math.sin(0.0261799388);
            if(ig.input.pressed('jump')){
              this.currentAnim.angle = 0;
              this.vel.x = this.jump*1.25;
              this.vel.y = -this.jump;
            }
              
          }
          else if(this.flip == true)
          {
            this.pos.x -= Math.cos(0.0261799388);
            this.pos.y -= Math.sin(0.0261799388);
            if(ig.input.pressed('jump')){
              this.currentAnim.angle = 0;
              this.vel.x = -this.jump *1.25;
              this.vel.y = -this.jump;
            }
          }

        }

        if(this.onSwing == false)
        {
          this.currentAnim.angle = 0;
        }


        //water and topdown stuff;
        if(this.inWater == true || this.topDown == true)
        {
          this.friction.y = 990;
          this.friction.x = 999;
          if(ig.input.state('up'))
          {
            this.vel.y = -this.jump + 100;
          }
          if(ig.input.state('down'))
          {
            this.vel.y = this.jump - 100;
          }
          if(ig.input.state('right'))
          {
            this.vel.x = accel;
          }
          if(ig.input.state('left'))
          {
            this.vel.x = -accel;
          }
        }

       
          //shooting!
        if(ig.input.pressed('shoot'))
        {
          this.currentAnim = this.anims.attack.rewind();
          ig.game.spawnEntity (this.activeWeapon, this.pos.x, this.pos.y, {flip: this.flip});
          this.shootSFX.play();
        }

       

        //setting animations based on speed of player
        if(this.currentAnim == this.anims.attack)
        {
          if(this.currentAnim.loopCount)
          {
            this.currentAnim=this.anims.idle;
          }
        }
        else if(this.onSwing == true)
        {
          this.currentAnim = this.anims.swing;
        }
        else if(this.topDown == false )
        {
          if(this.vel.y < 0 && this.onLadder == false && this.inWater == false)
          {
            this.currentAnim = this.anims.jump;
          }
          else if(this.vel.y < 0 && this.onLadder == true)
          {
            this.currentAnim = this.anims.climb;
          }
          else if(this.vel.y < 0 && this.inWater == true)
          {
            this.currentAnim = this.anims.swim;
          }
          else if(this.vel.y > 149 && this.onLadder == false && this.inWater == false)
          {
            this.currentAnim = this.anims.fall;
          }
          else if(this.vel.y > 0 && this.onLadder == true)
          {
            this.currentAnim = this.anims.climb;
          }
          else if(this.vel.y > 0 && this.inWater == true)
          {
            this.currentAnim = this.anims.swim;
          }
          else if(this.vel.x != 0 && this.standing && this.inWater == false)
          {
            this.currentAnim = this.anims.run;
          }
          else if(this.vel.x !=0 && this.inWater)
          {
            this.currentAnim = this.anims.swim;
          }
          else if(this.vel.x == 0 && this.vel.y == 0 && this.onLadder == true)
          {
            this.currentAnim = this.anims.idleClimb;
          }
          else if(this.vel.x == 0 && this.vel.y == 0 && this.inWater == true)
          {
            this.currentAnim = this.anims.swim;
          }
          else
          {
            this.currentAnim = this.anims.idle;
          }
        }
        else
        {
          if(this.vel.y > 0)
          {
            this.currentAnim = this.anims.goDown;
          }
          else if(this.vel.y < 0)
          {
            this.currentAnim = this.anims.goUp;
          }
          else if(this.vel.x != 0)
          {
            this.currentAnim = this.anims.run;
          }
          else
          {
            this.currentAnim = this.anims.topDownIdle;
          }
        }

        this.currentAnim.flip.x = this.flip;

        if(this.invincibleTimer.delta() > this.invincibleDelay)
        {
          this.invincible = false;
          this.currentAnim.alpha = 1;
        }

       


        this.onLadder = false;
        this.inWater = false;
        this.topDown =false;
        if(this.onSwing == false)
        {
          this.currentAnim.angle = 0;
        }
        this.onSwing = false;

       // this.pos.x = this.pos.x;
       // this.pos.y = this.pos.y;
        //move!
        this.parent();
      },

      handleMovementTrace: function(res)
      {
        this.parent(res);
        if(this.standing == false)
        {
          if(res.collision.x)
          {
            this.currentAnim = this.anims.wallHang;
            this.currentAnim.alpha = 1;
            this.currentAnim.flip.x = this.flip;
            if(ig.input.pressed('jump'))
            {
              this.jumpSFX.play();
              this.vel.y = -this.jump;
            }
          }
        }
        

      },

      kill: function()
      {

        this.deathSFX.play();
        this.parent();
        ig.game.respawnPosition = this.startPosition;
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack: this.onDeath()});
        
      },

      onDeath:function()
      {
        ig.game.stats.deaths ++;
        ig.game.lives --;
        if(ig.game.lives < 0)
        {
          ig.game.gameOver();
        }
        else
        {
          
          ig.game.spawnEntity(EntityPlayer, ig.game.respawnPosition.x, ig.game.respawnPosition.y);
        }
      },

      makeInvincible: function()
      {
        this.invincible = true;
        this.invincibleTimer.reset();
      },



      recieveDamage: function(amount, from)
      {
        if(this.invincible)
        {
          return;
        }
        this.parent(amount,from);
      },

      draw: function()
      {
        if(this.invincible)
        {
          this.currentAnim.alpha = this.invincibleTimer.delta()/ this.invincibleDelay * 1;
        }
        this.parent();

      },



  });

  EntityBullet = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/eighth_note.png', 13, 8),
    size: {x: 13, y: 8},
    maxVel: {x:200, y:0},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,


    init: function(x,y,settings)
    {
      this.parent(x + (settings.flip ? -4 : 8),y + 16 ,settings);
      this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
      this.addAnim('idle', 0.2, [0]);

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
      other.receiveDamage(5, this);
      this.kill();
    }


  });

  EntityWave = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/sound_wave.png', 8, 16),
    size: {x: 8, y: 16},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,
    timer: null,
    lifetime: 0.15,
    flip: false,


    init: function(x,y,settings)
    {
      this.flip = settings.flip;
      this.parent(x + (settings.flip ? -12 : 25),y + 8 ,settings);
      this.addAnim('idle',0.2 , [0]);
      if (this.flip == true)
      {
        this.anims.idle.flip.x = true;
      }
      this.timer = new ig.Timer();

    },

    check: function(other)
    {
      other.receiveDamage(50, this);
      //this.kill();
    },

    update: function()
    {
      if(this.timer.delta() > this.lifetime)
      {
        this.kill();
      }
    },

    kill: function()
    {
      for(var i=0; i < 50; i++)
          ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
        this.parent();
    }
  });

  EntityGrenade = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/2_eighth_notes.png', 7, 7),
    size: {x: 7, y:7},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.BOTH,
    collides: ig.Entity.COLLIDES.PASSIVE,
    maxVel: {x: 200, y:200},
    bounciness: 0.6,
    bounceCounter: 0,


    init: function(x,y,settings)
    {
      this.parent(x + (settings.flip ? -10 : 15), y - 9, settings);
      this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
      this.vel.y = -(50 + (Math.random() * 100));
      this.addAnim('idle', 0.2, [0,1,2,3]);
    },

    handleMovementTrace: function(res)
    {
      this.parent(res);
      if(res.collision.x || res.collision.y)
      {
        //only bounces 3 times
        this.bounceCounter++;
        if(this.bounceCounter > 3)
        {
          this.kill();
        }
      }
    },

    check: function(other)
    {
      other.receiveDamage(10, this);
      this.kill();
    },

    kill: function()
    {
      for(var i=0; i < 20; i++)
          ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
        this.parent();
    }
  });




 EntityDeathExplosion = ig.Entity.extend({
        lifetime: 2,
        callBack: null,
        particles: 25,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
                for(var i = 0; i < this.particles; i++)
                    ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
            },

            update: function() {
                if( this.idleTimer.delta() > this.lifetime ) {
                    this.kill();
                    if(this.callBack)
                        this.callBack();
                    return;
                }
            },
    });


    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        type: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim( 'idle', 0.2, [frameID] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });


   EntityGrenadeParticle = ig.Entity.extend({
        size: {x: 1, y: 1},
        maxVel: {x: 160, y: 200},
        lifetime: 1,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 40, y: 50},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.LITE,
        animSheet: new ig.AnimationSheet( 'media/explosion.png', 1, 1 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 10 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            var frameID = Math.round(Math.random()*7);
            this.addAnim( 'idle', 0.2, [frameID] );
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });

});
