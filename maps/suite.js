function buildSuite()
{
    gameMap = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 2, 6, 3, 1, 1, 1, 1, 20,19,20,1, 1, 1, 1, 2, 8, 3, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 12,1, 1, 17,1, 1, 1, 13,1, 1, 1, 17,1, 1, 12,1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 13,14,13,16,13,14,13,14,13,14,13,16,13,14,13,1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 17,16,13,14,13,14,13,14,13,14,13,14,13,14,13,16,17,1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 13,14,13,16,13,14,13,14,13,14,13,16,13,14,13,1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 12,1, 1, 17,1, 1, 1, 13,1, 1, 1, 17,1, 1, 12,1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 4, 9, 5, 1, 1, 1, 1, 1, 12,1, 1, 1, 1, 1, 4, 11,5, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 10,5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

    ]

    var starting_pos = [];
	// starting_pos = [14,6];
    starting_pos = [comingTo[0],comingTo[1]];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    title = gameState.level;

    let roomCount = 0;

    //TESTING ENDING
    // gameMap[toIndex(14,3)] = 12;

    //check to see which rooms have been visited and close them off
    if(roomsVisited[0]) { 
        gameMap[toIndex(7,4)] = 19; roomCount++; 
        gameMap[toIndex(7,3)] = 21;
    } // 7,4 = fireplace
    if(roomsVisited[1]) { 
        gameMap[toIndex(21,4)] = 19; roomCount++; 
        gameMap[toIndex(21,3)] = 23;
    } // 21,4 = library
    if(roomsVisited[4]) { 
        gameMap[toIndex(21,8)] = 19; roomCount++; 
        gameMap[toIndex(21,9)] = 26;

    } // 21,8 = gallery
    if(roomsVisited[3]) { 
        gameMap[toIndex(14,9)] = 19; roomCount++; 
        gameMap[toIndex(14,10)] = 25;
    } // 14,9 = garden
    if(roomsVisited[2]) { 
        gameMap[toIndex(7,8)] = 19; roomCount++;
        gameMap[toIndex(7,9)] = 24; 
    } // 7, 8 = chapel

    if(roomCount == 5) { 
        //queen's door open, lanterns on
        gameMap[toIndex(14,3)] = 12;
        gameMap[toIndex(14,2)] = 22;
        gameMap[toIndex(13,3)] = 27;
        gameMap[toIndex(15,3)] = 27;
    }

    //
    for(let i = 0; i < suiteLanterns.length; i++)
    {
        gameMap[toIndex(suiteLanterns[i][0],suiteLanterns[i][1])] = suiteLanterns[i][2];
        gameMap[toIndex(suiteLanterns[i][3],suiteLanterns[i][4])] = suiteLanterns[i][5];
    }

    //update icons
    for(let i = 1; i < 6; i++)
    {
        // write orderVisited
        let icon = document.getElementById(`icon${i}`);
        icon.src = `img/${orderVisited[i-1]}.png`;
    }

}

function drawSuite()
{

    if(levelBuildTick) { buildSuite(); levelBuildTick = false; }
    
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

        //lantern handling
        swapTile(15,16);
        if(playerX() == 7 && playerY() == 6) {
            let t1,t2;
            if(playerTile() == 15) { setTileTo(6,6,18); t1 = 18, t2 = playerTile(); }
            else if(playerTile() == 16) { setTileTo(6,6,17); t1 = 17, t2 = playerTile(); }
            suiteLanterns[0] = [playerX(),playerY(),t2,6,6,t1];
        }

        if(playerX() == 10 && playerY() == 5) {
            let t1,t2;
            if(playerTile() == 15) { setTileTo(10,4,18); t1 = 18, t2 = playerTile(); }
            else if(playerTile() == 16) { setTileTo(10,4,17); t1 = 17, t2 = playerTile(); }
            suiteLanterns[1] = [playerX(),playerY(),t2,10,4,t1];
        }

        if(playerX() == 18 && playerY() == 5) {
            let t1,t2;
            if(playerTile() == 15) { setTileTo(18,4,18); t1 = 18, t2 = playerTile(); }
            else if(playerTile() == 16) { setTileTo(18,4,17); t1 = 17, t2 = playerTile(); }
            suiteLanterns[2] = [playerX(),playerY(),t2,18,4,t1];
        }

        if(playerX() == 21 && playerY() == 6) {
            let t1,t2;
            if(playerTile() == 15) { setTileTo(22,6,18); t1 = 18, t2 = playerTile(); }
            else if(playerTile() == 16) { setTileTo(22,6,17); t1 = 17, t2 = playerTile(); }
            suiteLanterns[3] = [playerX(),playerY(),t2,22,6,t1];
        }

        if(playerX() == 10 && playerY() == 7) {
            let t1,t2;
            if(playerTile() == 15) { setTileTo(10,8,18); t1 = 18, t2 = playerTile(); }
            else if(playerTile() == 16) { setTileTo(10,8,17); t1 = 17, t2 = playerTile(); }
            suiteLanterns[4] = [playerX(),playerY(),t2,10,8,t1];
        }

        if(playerX() == 18 && playerY() == 7) {
            let t1,t2;
            if(playerTile() == 15) { setTileTo(18,8,18); t1 = 18, t2 = playerTile(); }
            else if(playerTile() == 16) { setTileTo(18,8,17); t1 = 17, t2 = playerTile(); }
            suiteLanterns[5] = [playerX(),playerY(),t2,18,8,t1];
        }

        let p = tileTypes[playerTile()].snd;
        if(p != undefined)
        { selectSnd(p,0); }

        // 14,3 = ending
        if(playerX() == 14 && playerY() == 3) { gameState.level = 'The End.'; levelBuildTick = true; selectSnd('door-entered', 0); 
            clearAllBackgroundSnd(0); }

        // 7,4 = fireplace
        if(playerX() == 7 && playerY() == 4) { gameState.level = 'The Fireplace Room.'; levelBuildTick = true; selectSnd('door-entered', 0); 
            clearAllBackgroundSnd(0); roomsVisited[0] = true; comingTo = [7,5]; startRec(); 
            orderVisited.push('i-fireplace');
        }
        // 21,4 = library
        if(playerX() == 21 && playerY() == 4) { gameState.level = 'The Library.'; levelBuildTick = true; selectSnd('door-entered', 0); 
            clearAllBackgroundSnd(0); roomsVisited[1] = true; comingTo = [21,5]; startRec();
            orderVisited.push('i-library'); 
        }
        // 21,7 = gallery
        if(playerX() == 21 && playerY() == 8) { gameState.level = 'The Gallery.'; levelBuildTick = true; selectSnd('door-entered', 0); 
            clearAllBackgroundSnd(0); roomsVisited[4] = true; comingTo = [21,7]; startRec(); 
            orderVisited.push('i-gallery');
        }
        // 14,8 = garden
        if(playerX() == 14 && playerY() == 9) { gameState.level = 'The Garden.'; levelBuildTick = true; selectSnd('door-entered', 0); 
            clearAllBackgroundSnd(0); roomsVisited[3] = true; comingTo = [14,8]; startRec(); 
            orderVisited.push('i-garden');
        }
        // 7, 7 = chapel
        if(playerX() == 7 && playerY() == 8) { gameState.level = 'The Chapel.'; levelBuildTick = true; selectSnd('door-entered', 0);
            clearAllBackgroundSnd(0); roomsVisited[2] = true; comingTo = [7,7]; startRec(); 
            orderVisited.push('i-chapel');
        }
    }
}