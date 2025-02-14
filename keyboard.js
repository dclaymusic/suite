//Tile Stuff
var floorTypes = {
    solid : 0,
    path : 1,
    destructible : 2,
    ice : 3,
    conveyorU : 4,
    conveyorD : 5,
    conveyorL : 6,
    conveyorR : 7
};

var directions = {
    up : 0,
    right : 1,
    down : 2,
    left : 3
};
var keysDown = {
    32 : false,
    65 : false,
    87 : false,
    68 : false,
    83 : false
};

var keysUp = {
    32 : false,
    65 : false,
    87 : false,
    68 : false,
    83 : false
};



function spaceHandler()
{
    if(!hasStarted && allBuffersLoaded == true && keysDown[32])
    { 
        startGame();
        isPlaying = true;
        // initTimer();
    }
    else if(!allBuffersLoaded)
    { } 
}

function processMovement(currentFrameTime)
{
    if(!player.processMovement(currentFrameTime))
    {
        //adding these IF conditionals makes it impossible to move at a diagonal.
        if(((keysDown[87] && keysDown[65]) || 
            (keysDown[87] && keysDown[68]) ||
            (keysDown[83] && keysDown[65]) ||
            (keysDown[83] && keysDown[68]) //||
            // openingTitleTick == true 
            )) {}

            else
            {
                if(hasStarted)
                {
                    //otherwise just move
                    if(keysDown[87] && player.canMoveUp()) { player.moveUp(currentFrameTime); }
                    if(keysDown[83] && player.canMoveDown()) { player.moveDown(currentFrameTime); }
                    if(keysDown[65] && player.canMoveLeft()) { player.moveLeft(currentFrameTime); }
                    if(keysDown[68] && player.canMoveRight()) { player.moveRight(currentFrameTime); }
                }	
            }

    }

}