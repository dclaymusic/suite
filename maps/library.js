
function buildLibrary()
{
    gameMap = [
    
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,102,102,102,102,102,102,102,102,102,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,120,119,120,119,120,119,120,119,120,121,129,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,119,102,102,102,117,102,102,102,119,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,120,101,101,101,101,101,101,101,120,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,119,101,101,101,101,101,101,101,119,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,120,101,101,101,101,101,101,101,120,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,119,101,101,101,101,101,101,101,119,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,120,102,102,102,102,102,102,102,120,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,109,119,120,119,120,119,120,119,120,119,109,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,102,102,102,102,102,120,102,102,102,102,102,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,118,101,101,101,101,101,101,101,101,101,
        101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
    ]

    //102-108, 109-115
    for(let m = 0; m < gameMap.length; m++)
    { 
        if(gameMap[m] == 102 || gameMap[m] == 109) 
        {
            gameMap[m] += randomInt(6);
        }
    }


    selectSnd('ROOM1',0,true);
    selectSnd('ROOM4',0,true);
    selectSnd('ROOM5',0,true);


    var starting_pos = [];
	starting_pos = [19,10];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    title = gameState.level;

}

function drawLibrary()
{
    if(levelBuildTick) { buildLibrary(); levelBuildTick = false; }
    
    for(let y = 0; y < mapH; y++)
    {
        for(let x = 0; x < mapW; x++)
        {
            var tile = tileTypes[gameMap[toIndex(x,y)]];
            ctx.drawImage(tile.img, x*tileW, y*tileH, tileW, tileH);
        }
    }

    drawCharacter();

    if(tick)
    {
        if(playerY() == 6) { light = 132; }
        else { light = 130; }
        //light handlers
        if(playerTile() == 121) { //left
            setPlayerTile(125); 
            if(gameMap[toIndex(playerX()+2,playerY())] == 126)
            { 
                setTileTo(playerX()+1,playerY(),light); 
                bookLightSoundHandler(playerX()+1,playerY());
            }
        }
        if(playerTile() == 122) {  //right
            setPlayerTile(126); 
            if(gameMap[toIndex(playerX()-2,playerY())] == 125)
            { setTileTo(playerX()-1,playerY(),light); bookLightSoundHandler(playerX()-1,playerY()); }

        }
        if(playerTile() == 123) { //left
            setPlayerTile(127); 
            if(gameMap[toIndex(playerX()+2,playerY())] == 128)
            { setTileTo(playerX()+1,playerY(),light); bookLightSoundHandler(playerX()+1,playerY()); }
        }
        if(playerTile() == 124) { //right
            setPlayerTile(128); 
            if(gameMap[toIndex(playerX()-2,playerY())] == 127)
            { setTileTo(playerX()-1,playerY(),light); bookLightSoundHandler(playerX()-1,playerY()); }
        }

        //19,3 turns to 102 when all lights are on
        if(gameMap[toIndex(3,3)] == 130 && 
            gameMap[toIndex(4,9)] == 130 && 
            gameMap[toIndex(10,4)] == 130 && 
            gameMap[toIndex(25,2)] == 130)
            {
                setTileTo(19,3,133);
            }
        
        revealTiles();

        let p = tileTypes[playerTile()].snd;
        if(p != undefined)
        { selectSnd(p,0); }

        if(playerX() == 19 && playerY() == 11) { gameState.level = 'The QUEEN\'S Suite.'; levelBuildTick = true; selectSnd('exit-step', 0); clearAllBackgroundSnd(0.1); 
            stopRec();
        }

    
    }
}




//handles revealing tiles
function revealTiles()
{

    let pX = playerX();
    let pY = playerY();
    let tile = playerTile();
    let drawStart = [], map = [], drawW, drawH;
    let pathFound = false;

    if(pX == 3 && pY == 5 && tile != 116)
    {
        setPlayerTile(116);
        if(gameMap[toIndex(pX,pY+1)] == 101) //moving down
        {
            drawStart = [3,6];
            drawW = 1;
            drawH = 2;
            map = [120,109];
            pathFound = true;
        }
        else if(gameMap[toIndex(pX,pY-1)] == 101) //moving up
        {
            drawStart = [1,1];
            drawW = 5;
            drawH = 5
            map = [
                102,102,102,102,102,
                102,119,120,119,109,
                102,123,129,124,102,
                102,119,120,119,102,
                102,102,109,102,102
            ];
            pathFound = true;
        }
    }


    if(pX == 5 && pY == 2 && tile != 116) {
        setPlayerTile(116);
        if(gameMap[toIndex(pX+1,pY)] == 101) //moving right
        {
            drawStart = [6,2];
            drawW = 3;
            drawH = 1;
            map = [119,120,109];
            pathFound = true;
        }
        else if(gameMap[toIndex(pX-1,pY)] == 101) //moving left
        {
            drawStart = [1,1];
            drawW = 5
            drawH = 5
            map = [
                102,102,102,102,102,
                102,119,120,119,102,
                102,123,129,124,102,
                102,119,120,119,102,
                102,102,109,102,102
            ];
            pathFound = true;
        }
    }

    if(pX == 8 && pY == 2 && tile != 116) {
        setPlayerTile(116);
        if(gameMap[toIndex(pX+1,pY)] == 101) //moving right
        {
            drawStart = [8,1];
            drawW = 5;
            drawH = 7;
            map = [
                102,102,102,102,102,
                109,120,119,120,102,
                102,119,102,119,102,
                102,123,129,124,102,
                102,119,102,119,102,
                102,120,119,120,102,
                102,102,109,102,102
            ];
            pathFound = true;
        }
        else if(gameMap[toIndex(pX-1,pY)] == 101) //moving left
        {
            drawStart = [5,2];
            drawW = 3;
            drawH = 1;
            map = [109,119,120];
            pathFound = true;
        }
    }

    if(pX == 3 && pY == 7 && tile != 116) {
        setPlayerTile(116);
    	if(gameMap[toIndex(pX,pY+1)] == 101) //moving down
        {
    		drawStart = [2,7];
    		drawW = 5;
    		drawH = 4;
    		map = [
    			102,109,102,102,102,
    			102,120,119,120,102,
    			102,121,129,122,109,
    			102,102,102,102,102
    		];
            pathFound = true;

        }
    	else if(gameMap[toIndex(pX,pY-1)] == 101) //moving up
        {
    		drawStart = [3,5];
    		drawW = 1
    		drawH = 2
    		map = [109,120];
            pathFound = true;

        }
    }

    if(pX == 6 && pY == 9 && tile != 116) {
        setPlayerTile(116);
        if(gameMap[toIndex(pX-1,pY)] == 101) //moving left
        {
            drawStart = [2,7];
            drawW = 5;
            drawH = 4;
            map = [
                102,109,102,102,102,
                102,120,119,120,102,
                102,121,129,122,109,
                102,102,102,102,102
            ];
            pathFound = true;

        }
    }

    if(pX == 10 && pY == 7 && tile != 116)
    {
        setPlayerTile(116);
        if(gameMap[toIndex(pX,pY-1)] == 101) //moving up
        {
            drawStart = [8,1];
            drawW = 5;
            drawH = 7;
            map = [
                102,102,102,102,102,
                109,120,119,120,102,
                102,119,102,119,102,
                102,123,129,124,102,
                102,119,102,119,102,
                102,120,119,120,102,
                102,102,109,102,102
            ];
            pathFound = true;

        }
    }

    if(pX == 14 && pY == 9 && tile != 116) //moving left
    {
        setPlayerTile(116);
        if(gameMap[toIndex(pX-1,pY)] == 101)
        {
            drawStart = [6,7];
            drawW = 8;
            drawH = 3;
            map = [
                    101,101,101,101,109,101,101,101,
                    101,101,101,101,119,101,101,101,
                    109,119,120,119,120,119,120,119];
            pathFound = true;
        }
    }

    if(pX == 24 && pY == 9 && tile != 116) //moving right
    {
        setPlayerTile(116);
        if(gameMap[toIndex(pX+1,pY)] == 101)
        {
            drawStart = [25,9];
            drawW = 2;
            drawH = 1;
            map = [119,109];
            pathFound = true;
        }
    }

    if(pX == 26 && pY == 9 && tile != 116) //moving right
    {
        setPlayerTile(116);
        if(gameMap[toIndex(pX+1,pY)] == 101)
        {
            drawStart = [26,1];
            drawW = 2;
            drawH = 9;
            map = [
                102,119,
                122,120,
                102,119,
                102,120,
                102,119,
                102,120,
                102,119,
                102,120,
                109,119
            ];
            pathFound = true;
        }
    }

    if(pX == 19 && pY == 3 && tile == 133) //moving down
    {
        setPlayerTile(116);
        if(gameMap[toIndex(pX,pY+1)] == 101)
        {
            drawStart = [17,4];
            drawW = 5;
            drawH = 3;
            map = [
                101,101,120,101,101,
                102,120,119,120,102,
                102,121,131,122,102
            ];
            pathFound = true;
        }
    }

    if(pathFound)
    {
        for(let x = drawStart[0]; x < drawStart[0]+drawW; x++)
        {
            for(let y = drawStart[1]; y < drawStart[1]+drawH; y++)
            {
                let m = map[toDrawIndex(x-drawStart[0],y-drawStart[1],drawW)];
                if(m == 102 || m == 109) { m += randomInt(6); }
                gameMap[toIndex(x,y)] = m;
            }
        }
        selectSnd('book-open',0);
        setPlayerTile(116);
    }

}


function bookLightSoundHandler(x,y)
{
    if(x== 3 && y == 3) { selectSnd('candle1',-0.5,true); }
    if(x== 4 && y == 9) { selectSnd('candle2',-0.25,true); }
    if(x== 10 && y == 4) { selectSnd('candle3',0,true); }
    if(x== 25 && y == 2) { selectSnd('candle4',0.75,true); }
    if(y == 6) 
    { 
        selectSnd('candle-w',0); //W light sound
        selectSnd('candle-swell-loop',0,true); //W light sound

    }
}