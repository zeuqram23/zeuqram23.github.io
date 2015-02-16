

//make the canvas~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);

//variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
var score = 0;

var wizardX = 40,
    wizardY = 40,
    wizardVelocity = 25,
    dead = false,
    awake = false;

//ghost variables//
var chaseFactor = .5,
    ghostX =200,
    ghostY = 200,
    ghostTicks = 7 - chaseFactor;

//wizard image//
var wizardReady = false;
var wizardImage = new Image();
wizardImage.onload = function()
{
    wizardReady = true;
};
wizardImage.src = "images/wizardWalking.png";


//ghost image//
var ghostReady = false;
var ghostImage = new Image();
ghostImage.onload = function()
{
    ghostReady = true;
};
ghostImage.src = "images/ghostWalking.png";


//sprite object~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function sprite (options)
{
    var that = {},
        frameIndex = 0,
        tickCount = 0;

    that.context = options.context;
    that.height = options.height;
    that.width = options.width;
    that.image = options.image;
    that.numFrames = options.numFrames || 1;
    that.ticksPerFrame = options.ticksPerFrame || 10;
    that.xPos = options.xPos;
    that.yPos = options.yPos;
    that.isWizard = options.isWizard;


    that.update = function()
    {
        tickCount += 1;

        if(tickCount > that.ticksPerFrame)
        {

            tickCount = 0;

            //check if frame is in range
            if (frameIndex < that.numFrames - 1)
            {
                frameIndex += 1
            }
            else
            {
                frameIndex = 0;
            }
        }
    };

    that.render = function()
    {


        if(that.isWizard == false)
        {

            that.context.drawImage(
                that.image,
                frameIndex * that.width / that.numFrames,
                0,
                that.width / that.numFrames,
                that.height,
                ghostX,
                ghostY,
                that.width / that.numFrames,
                that.height
            );

        }


        else
        {
            that.context.clearRect(wizardX, wizardY, that.width / that.numFrames, that.height);
            that.context.drawImage(
                that.image,
                frameIndex * that.width / that.numFrames,
                0,
                that.width / that.numFrames,
                that.height,
                wizardX,
                wizardY,
                that.width / that.numFrames,
                that.height
            );
            //ghost collision detection
            collisionDetect();
        }


    };

    return that;
}


//making the sprites ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
var wizardSprite = sprite({

    context: canvas.getContext("2d"),
    height: 40,
    width: 100,
    image: wizardImage,
    numFrames: 4,
    ticksPerFrame: 10,
    xPos: wizardX,
    yPos: wizardY,
    isWizard: true
});

var ghostSprite = sprite({

    context: canvas.getContext("2d"),
    height: 40,
    width: 150,
    image: ghostImage,
    numFrames: 6,
    ticksPerFrame: ghostTicks,
    xPos: ghostX,
    yPos: ghostY,
    isWizard: false
});


//event listeners ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
window.addEventListener("keydown", onKeyDown, false);
function onKeyDown(evt)
{
    if(evt.keyCode == 37) // left
    {

        context.clearRect(wizardX, wizardY, 25, 40);
        wizardX -= wizardVelocity;


        //border collision detection
        if(wizardX < 0)
        {
            wizardX = 0;
        }

    }

    if(evt.keyCode == 38) // up
    {

        context.clearRect(wizardX, wizardY, 25, 40);
        wizardY -= wizardVelocity;


        //border collision detection
        if(wizardY < 0)
        {
            wizardY = 0;
        }


    }

    if(evt.keyCode == 39) // right
    {
        context.clearRect(wizardX, wizardY, 25, 40);
        wizardX += wizardVelocity;


        //border collision detection
        if(wizardX > canvas.width - 25)
        {
            wizardX = canvas.width - 25;
        }
    }

    if(evt.keyCode == 40) // down
    {

        context.clearRect(wizardX, wizardY, 25, 40);
        wizardY += wizardVelocity;


        //border collision detection
        if(wizardY > canvas.height - 40)
        {
            wizardY = canvas.height - 40;
        }
    }

    if(evt.keyCode == 32) //space bar
    {
        gameStart();
    }
}


//utility functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


function collisionDetect()
{
    if( wizardX <= ghostX + 25 && wizardX + 25 >= ghostX  &&
        wizardY <= ghostY + 40 && wizardY + 40 >= ghostY  )
    {
        dead = true;
    }
}

function ghostChase()
{

    context.clearRect(ghostX, ghostY, 25, 40);
    //x direction
    if(ghostX >= wizardX)
    {
        ghostX = ghostX - chaseFactor;
    }
     if(ghostX < wizardX)
    {
       ghostX = ghostX + chaseFactor;
    }

    context.clearRect(ghostX, ghostY, 25, 40);
    //y direction
    if(ghostY >= wizardY)
    {
        ghostY = ghostY - chaseFactor;
    }
     if (ghostY < wizardY)
    {
        ghostY = ghostY + chaseFactor;
    }

    chaseFactor += .001;


}





//game loop ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
var gameLoop = function()
{

     if(dead == false) {


        requestAnimationFrame(gameLoop);

        wizardSprite.update();
        wizardSprite.render();

        ghostChase();
        ghostSprite.update();
        ghostSprite.render();


        if (score > 998) {
            awake = true;
            nirvana();
        }
        else
        {
            score++;
        }


        //score
        context.clearRect(7,0,500,30);
        context.font = "20px Georgia";
        context.fillText("Score: " + score, 20, 20);
    }
    else if(dead == true && awake == false)
    {
        gameOver();
    }

};


function gameOver()
{

    window.removeEventListener("keydown", onKeyDown);
    context.clearRect(0,0,canvas.width, canvas.height);
    context.font = "20px Georgia";
    context.fillText("YOU ARE DEAD", canvas.width / 4, canvas.height / 2);
    context.fillText ("SCORE: " + score, canvas.width / 4, canvas.height / 2.5);
    document.body.removeChild(audio);


}

function nirvana()
{

    window.removeEventListener("keydown", onKeyDown);
    context.clearRect(0,0,canvas.width, canvas.height);
    context.font = "16px Georgia";
    context.fillText("congratulations", canvas.width / 8, canvas.height / 3.25);
    context.fillText ("you woke up from the nightmare", canvas.width / 8, canvas.height / 4.5);
}


//starting the game~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

window.onload = function()
{
    gameLoop();
};
