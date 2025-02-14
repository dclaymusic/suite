function buildGarden()
{
    gameMap = [
        301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,
        301,301,301,301,303,303,303,303,303,303,303,303,303,303,315,303,303,303,303,303,301,301,302,301,301,301,301,301,301,
        301,301,301,324,316,316,316,303,303,303,303,316,303,303,303,303,316,303,303,303,303,303,316,324,324,301,301,301,301,
        301,301,301,301,324,324,316,316,316,316,316,316,316,316,316,316,316,316,316,316,316,316,316,324,324,324,324,301,301,
        301,301,301,301,301,324,316,337,337,337,337,337,316,324,324,316,324,324,324,324,316,354,316,316,316,316,324,301,301,
        301,301,301,301,301,324,316,337,337,337,345,337,316,316,366,367,366,316,316,316,316,354,354,316,336,316,324,301,301,
        301,301,324,324,324,324,316,337,316,316,316,337,337,316,367,368,367,316,354,354,354,354,354,316,324,316,324,301,301,
        301,301,324,316,316,316,316,316,316,346,316,316,316,316,366,367,366,316,316,316,354,354,316,316,316,316,324,301,301,
        301,301,324,316,354,354,354,354,316,346,346,346,346,316,316,316,337,337,337,316,354,354,316,324,324,324,324,301,301,
        301,301,324,316,316,316,316,316,316,346,346,346,346,346,346,316,337,337,337,316,316,316,316,324,301,301,301,301,301,
        301,301,301,303,303,303,303,303,316,316,316,316,316,316,316,323,316,316,316,316,303,303,303,301,301,301,301,301,301,
        301,301,301,301,301,301,301,301,301,303,303,303,303,303,303,303,303,303,303,301,301,301,301,301,301,301,301,301,301,
        301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301, 

    ]

    for(let m = 0; m < gameMap.length; m++)
    {
        if(gameMap[m] == 303) { gameMap[m] = 303+randomInt(11); }
        if(gameMap[m] == 316) { gameMap[m] = 316+randomInt(6); }
        if(gameMap[m] == 324) { gameMap[m] = 324+randomInt(11); }
        if(gameMap[m] == 337) { gameMap[m] = 337+randomInt(7); }
        if(gameMap[m] == 346) { gameMap[m] = 346+randomInt(7); }
        if(gameMap[m] == 354) { gameMap[m] = 354+randomInt(11); }
    }

    selectSnd('garden-drone1',-0.25,true);
    selectSnd('garden-drone2',0.25,true);
    selectSnd('garden-texture1',-0.5,true);
    selectSnd('garden-texture2',0.5,true);
    selectSnd('ROOM3',1,true);
    selectSnd('ROOM1',-1,true);
    selectSnd('ROOM6',0,true);

    var starting_pos = [];
	starting_pos = [22,2];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    title = gameState.level;

}

function drawGarden()
{
    if(levelBuildTick) { buildGarden(); levelBuildTick = false; }
    
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

        gardenCountCheck();

        //tree
        if(playerTile() == 368) { 
            selectSnd('y-activated',0)
            selectSnd('y-swell',0);
            setPlayerTile(369); 
        }

        let p = tileTypes[playerTile()].snd;
        if(p != undefined)
        { selectSnd(p,0); }

        //exit
        if(playerX() == 22 && playerY() == 1) { 
            clearInterval(timer);
            gameState.level = 'The QUEEN\'S Suite.'; levelBuildTick = true; selectSnd('exit-step', 0); clearAllBackgroundSnd(0.1); 
            stopRec();
        }
    }
}

var gardenTileCount = 0;

function gardenCountCheck()
{
    if(playerTile() == 315 || playerTile() == 323 || playerTile() == 336 || playerTile() == 345)
    {
        if(playerTile() == 315) { gameMap[toIndex(14,6)] = 371; }
        if(playerTile() == 323) { gameMap[toIndex(16,6)] = 371; }
        if(playerTile() == 336) { gameMap[toIndex(15,5)] = 371; }
        if(playerTile() == 345) { gameMap[toIndex(15,7)] = 371; }
        selectSnd(tileTypes[playerTile()].snd,0);
        gardenTileCount++;
        setPlayerTile(370);
    }

    if(gardenTileCount == 4)
    {
        gameMap[toIndex(14,6)] = 366;
        gameMap[toIndex(16,6)] = 366;
        gameMap[toIndex(15,5)] = 366;
        gameMap[toIndex(15,7)] = 366;
        //15,6 is tree
    }
}