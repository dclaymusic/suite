function buildChapel()
{
    gameMap = [
        201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,
        201,201,201,201,201,201,201,201,201,201,201,201,202,203,204,203,202,201,201,201,201,201,201,201,201,201,201,201,201,
        201,201,208,202,222,222,222,202,203,201,207,202,203,222,222,222,203,202,207,201,203,202,222,222,222,202,208,201,201,
        201,201,202,203,202,212,222,203,202,203,202,203,202,222,214,222,202,203,202,203,202,203,222,212,202,203,202,201,201,
        201,201,203,216,222,222,222,202,203,201,203,202,216,222,222,222,216,202,203,201,203,202,222,222,222,216,203,201,201,
        201,201,202,203,202,203,202,203,202,201,201,203,202,203,202,203,202,203,201,201,202,203,202,203,202,203,202,201,201,
        201,201,201,201,205,201,201,201,205,201,201,201,205,201,221,201,205,201,201,201,205,201,201,201,205,201,201,201,201,//
        201,201,202,203,202,203,202,203,202,201,202,203,202,203,202,203,202,203,202,201,202,203,202,203,202,203,202,201,201,
        201,201,203,216,222,222,222,202,203,201,203,202,216,222,203,222,216,202,203,201,203,202,222,222,222,216,203,201,201,
        201,201,202,203,202,212,222,203,202,203,202,203,202,222,210,222,202,203,202,203,202,203,222,212,202,203,202,201,201,
        201,201,208,202,222,222,222,202,203,201,208,202,203,222,222,222,203,202,208,201,203,202,222,222,222,202,208,201,201,
        201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,
        201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,

    ]

    var starting_pos = [];
	starting_pos = [14,5];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    title = gameState.level;

    selectSnd('ROOM7a',-0.5,true);
    selectSnd('ROOM7b',0.5,true);
    selectSnd('hasfire',0,true);
    setGain('hasfire',0.0,0); 


}

function drawChapel()
{
    if(levelBuildTick) { buildChapel(); levelBuildTick = false; }
    
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
        
        //if i off and you have fire, toggle to i on and turn fire off
        if(playerTile() == 205 && hasFire) { setPlayerTile(206); }
        //else if i on, turn fire on
        else if(playerTile() == 206) { hasFire = true; toggleFirePath(); }

        //if T off and you have fire, toggle to T on and fire off, Y block disappears
        if(playerTile() == 208 && hasFire) { setPlayerTile(209); hasFire = false; toggleFirePath(); }

        //if Y off and you have fire, toggle to Y on and fire off
        if(playerTile() == 217 && hasFire) { setPlayerTile(218); hasFire = false; toggleFirePath(); }
        if(playerTile() == 219 && hasFire) { setPlayerTile(220); hasFire = false; toggleFirePath(); }

        //if V off and you have fire, toggle to V on and fire off
        if(playerTile() == 210 && hasFire) { setPlayerTile(211); hasFire = false; toggleFirePath(); 
            
        }
        if(playerTile() == 212 && hasFire) { setPlayerTile(213); hasFire = false; toggleFirePath(); 

        }

        
        if(playerX() == 5 && playerY() == 3 && playerTile() == 213) { selectSnd('pyre1',-0.75, true); firstPyreCheck(); }
        if(playerX() == 5 && playerY() == 9 && playerTile() == 213) { selectSnd('pyre5',-0.5, true); firstPyreCheck(); }
        if(playerX() == 23 && playerY() == 3 && playerTile() == 213) { selectSnd('pyre3',0.75, true); firstPyreCheck(); }
        if(playerX() == 23 && playerY() == 9 && playerTile() == 213) { selectSnd('pyre4',0.5, true);firstPyreCheck(); }
        if(playerX() == 14 && playerY() == 9 && playerTile() == 211) { selectSnd('pyre2',0, true); firstPyreCheck(); }


        //if X off and you have fire, toggle to X on and fire off
        if(playerTile() == 214 && hasFire) { setPlayerTile(215); hasFire = false; toggleFirePath(); 
            selectSnd('x-activated',0); selectSnd('match2',0,true); 
        }

        //if this is the cross or an i, you have fire
        if(playerTile() == 221) { hasFire = true; toggleFirePath(); }

        let p = tileTypes[playerTile()].snd;
        if(p != undefined)
        { selectSnd(p,0); }

        //unlocking tiles

        // 2,2 unlocks 3,4
        if(playerX() == 2 && playerY() == 2 && playerTile() == 209 && gameMap[toIndex(3,4)] == 216) 
        { gameMap[toIndex(3,4)] = 217; selectSnd('c-tile-unlock',0); }

        // 2,10 unlocks 3,8
        if(playerX() == 2 && playerY() == 10 && playerTile() == 209 && gameMap[toIndex(3,8)] == 216) 
        { gameMap[toIndex(3,8)] = 217; selectSnd('c-tile-unlock',0);}

        // 10,10 and 18,10 unlocks 12,8 and 16,8
        if(
            ((playerX() == 10 && playerY() == 10) || (playerX() == 18 && playerY() == 10)) &&
            (gameMap[toIndex(12,8)] == 216 && gameMap[toIndex(16,8)] == 216) && 
            (gameMap[toIndex(10,10)] == 209 && gameMap[toIndex(18,10)] == 209)
        )
        { 
            gameMap[toIndex(12,8)] = 219; selectSnd('c-tile-unlock',0);
            gameMap[toIndex(16,8)] = 219;
        }

        // 26,10 unlocks 25,8
        if(playerX() == 26 && playerY() == 10 && playerTile() == 209 && gameMap[toIndex(25,8)] == 216) 
        { gameMap[toIndex(25,8)] = 217; selectSnd('c-tile-unlock',0); }
    

        // 26,2 unlocks 25,4
        if(playerX() == 26 && playerY() == 2 && playerTile() == 209 && gameMap[toIndex(25,4)] == 216) 
        { gameMap[toIndex(25,4)] = 217; selectSnd('c-tile-unlock',0); }
    
        // 5,3 / 5,9 / 14,9 / 23,3 / 23,9 unlock 10,2 and 18,2
        let clist = [[5,3],[5,9],[14,9],[23,3],[23,9]];
        let ponc = false;
        let oncount = 0;
        for(let c = 0; c < clist.length; c++)
        {
            if(playerX() == clist[c][0] && playerY() == clist[c][1]) { ponc = true; }
            if(gameMap[toIndex(clist[c][0],clist[c][1])] == 211 || gameMap[toIndex(clist[c][0],clist[c][1])] == 213)
            { oncount++; }
        }
        if(ponc && oncount == 5 && gameMap[toIndex(10,2)] == 207)
        {
            gameMap[toIndex(10,2)] = 208; gameMap[toIndex(18,2)] = 208; selectSnd('c-tile-unlock',0);
        }

        // 10,2 and 18,2 unlock 12,4 and 16,4
        if(
            ((playerX() == 10 && playerY() == 2) || (playerX() == 18 && playerY() == 2)) &&
            (gameMap[toIndex(12,4)] == 216 && gameMap[toIndex(16,4)] == 216) && 
            (gameMap[toIndex(10,2)] == 209 && gameMap[toIndex(18,2)] == 209)
        )
        { 
            gameMap[toIndex(12,4)] = 219; selectSnd('c-tile-unlock',0);
            gameMap[toIndex(16,4)] = 219; 
        }

        // 12,4 and 16,4 turns 14,4 to 203
        if(
            ((playerX() == 12 && playerY() == 4) || (playerX() == 16 && playerY() == 4)) &&
            (gameMap[toIndex(12,4)] == 220 && gameMap[toIndex(16,4)] == 220) &&
            gameMap[toIndex(14,4)] != 203)
            { gameMap[toIndex(14,4)] = 203; selectSnd('wood4',0); }

        //exit
        if(playerX() == 14 && playerY() == 1) { 
            clearInterval(timer);
            gameState.level = 'The QUEEN\'S Suite.'; levelBuildTick = true; selectSnd('exit-step', 0); clearAllBackgroundSnd(0.1);
            stopRec();
        }
    }
}

var hasFire = false;
var firstPyre = false;

function toggleFirePath()
{
    if(hasFire) { 
        tileTypes[202].player = 'c-02p2'; 
        tileTypes[203].player = 'c-02p2'; 
    }
    else { 
        tileTypes[202].player = 'c-02p1'; 
        tileTypes[203].player = 'c-02p1'; 
    }
    tileTypes[202].playerImg.src = 'img/' + tileTypes[202].player + '.png'; 
    tileTypes[203].playerImg.src = 'img/' + tileTypes[203].player + '.png'; 

    if(hasFire) { setGain('hasfire',1.0,0.01); }
    else { setGain('hasfire',0.0,0.25); }
}

function firstPyreCheck()
{
    if(!firstPyre)
    {
        selectSnd('match1',0,true);
        firstPyre = true;
    }
}