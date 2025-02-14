function buildFireplaceRoom()
{
    gameMap = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 61,61,63,61,61,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 53,1, 1, 53,1, 1, 53,1, 62,59,60,59,62,1, 53,1, 1, 53,1, 1, 53,1, 1, 1, 1,
        1, 1, 1, 1, 73,1, 1, 73,1, 1, 73,1, 62,60,57,60,61,1, 73,1, 1, 73,1, 1, 73,1, 1, 1, 1,
        1, 1, 1, 1, 74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,1, 1, 1, 1,
        1, 1, 1, 1, 75,74,69,69,69,69,69,69,69,74,75,74,69,69,69,69,69,69,69,74,75,1, 1, 1, 1,
        1, 1, 1, 70,74,75,76,66,66,68,66,66,78,75,74,75,76,66,66,68,66,66,78,75,74,71,1, 1, 1,
        1, 1, 1, 70,75,74,76,66,66,67,66,66,78,74,75,74,76,66,66,67,66,66,78,74,75,71,1, 1, 1,
        1, 1, 1, 70,74,75,76,66,66,68,66,66,78,75,74,75,76,66,66,68,66,66,78,75,74,71,1, 1, 1,
        1, 1, 1, 1, 75,74,69,69,69,69,69,69,69,74,75,74,69,69,69,69,69,69,69,74,75,1, 1, 1, 1,
        1, 1, 1, 1, 74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,75,74,1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 52,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

    ]

    //special spots
	//this requires a different sound for every tile/item type
	for (const [key] of Object.entries(pushables)) {
        pushables[key].xSpecial = pushables[key].specialChoices[randomInt(pushables[key].specialChoices.length-1)];
        gameMap[toIndex(pushables[key].xSpecial,pushables[key].y)] = 65;
    }

    var starting_pos = [];
	starting_pos = [14,10];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    title = gameState.level;
    
    selectSnd('fireplace1',0,true);
    selectSnd('fireplace2',0,true);


    //set timer at beginning
    timer = setInterval(() => {
        pushableHandler();
    }, 500);

}

function drawFireplaceRoom()
{
    if(levelBuildTick) { buildFireplaceRoom(); levelBuildTick = false; }
    
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

        if(playerX() == 4 && playerY() == 3 && playerTile() == 73) {
            setPlayerTile(72);
            setTileTo(4,2,54); 
            selectSnd('f-lantern1',0);
            setTimeout(() => {
                if(gameState.level == 'The Fireplace Room.'){
                    setTileTo(4,2,53);
                    setTileTo(4,3,73);
                }
            }, 5000);
            // else if(playerTile() == 73) { setTileTo(4,2,53); }
        }
        if(playerX() == 7 && playerY() == 3 && playerTile() == 73) {
            setPlayerTile(72);
            setTileTo(7,2,54); 
            selectSnd('f-lantern2',0);
            setTimeout(() => {
                if(gameState.level == 'The Fireplace Room.'){
                setTileTo(7,2,53);
                setTileTo(7,3,73);}
            }, 5000);
            // else if(playerTile() == 73) { setTileTo(7,2,53); }
        }
        if(playerX() == 10 && playerY() == 3 && playerTile() == 73) {
            setPlayerTile(72);
            setTileTo(10,2,54); 
            selectSnd('f-lantern3',0);
            setTimeout(() => {
                if(gameState.level == 'The Fireplace Room.'){
                setTileTo(10,2,53);
                setTileTo(10,3,73);}
            }, 5000);
        }

        if(playerX() == 18 && playerY() == 3 && playerTile() == 73) {
            setPlayerTile(72);
            setTileTo(18,2,54); 
            selectSnd('f-lantern4',0);
            setTimeout(() => {
                if(gameState.level == 'The Fireplace Room.'){
                setTileTo(18,2,53);
                setTileTo(18,3,73);}
            }, 5000);
            // else if(playerTile() == 73) { setTileTo(18,2,53); }
        }
        if(playerX() == 21 && playerY() == 3 && playerTile() == 73) {
            setPlayerTile(72);
            setTileTo(21,2,54); 
            selectSnd('f-lantern5',0);
            setTimeout(() => {
                if(gameState.level == 'The Fireplace Room.'){
                setTileTo(21,2,53);
                setTileTo(21,3,73);}
            }, 5000);

            // else if(playerTile() == 73) { setTileTo(21,2,53); }
        }
        if(playerX() == 24 && playerY() == 3 && playerTile() == 73) {
            setPlayerTile(72);
            setTileTo(24,2,54); 
            selectSnd('f-lantern6',0);
            setTimeout(() => {
                if(gameState.level == 'The Fireplace Room.'){
                setTileTo(24,2,53);
                setTileTo(24,3,73);}
            }, 5000);
            // else if(playerTile() == 73) { setTileTo(24,2,53); }
        }

        // 7,4 = fireplace

        if(playerTile() == 71) //move left
        {
            player.placeAt(4,playerY());
            selectSnd('swish3',-0.75);
        }
        if(playerTile() == 70) //move right
        {
            player.placeAt(24,playerY());
            selectSnd('swish2',0.75);
        }

        let p = tileTypes[playerTile()].snd;
        if(p != undefined)
        { selectSnd(p,0); }

        // pushable targets
        for (const [key] of Object.entries(pushables)) {
            //toggle switches on and off
            let lx = pushables[key].leftSwitch[0];
            let ly = pushables[key].leftSwitch[1];
            let rx = pushables[key].rightSwitch[0];
            let ry = pushables[key].rightSwitch[1];

            //78 = left off, 79 = left on
            if(playerX() == lx && playerY() == ly) {
                //if switch is off
                if(playerTile() == 78)
                {
                    //if right switch is on, move immediately
                    if(gameMap[toIndex(rx,ry)] == 77) //if right switch is on, move left immediately
                    { gameMap[toIndex(rx,ry)] = 76; }
                    setPlayerTile(79);
                    pushables[key].direction = 'left';
                }
                //if switch is already on
                else if(playerTile() == 79)
                {
                    setPlayerTile(78);
                    pushables[key].direction = 'stop';
                    checkForTriggers();
                }
            }
            //76 = right off, 77 = right on
            if(playerX() == rx && playerY() == ry) {
                //if switch is off
                if(playerTile() == 76)
                {
                    //if right switch is on, move immediately
                    if(gameMap[toIndex(lx,ly)] == 79) //if left switch is on, move right immediately
                    { gameMap[toIndex(lx,ly)] = 78; }
                    setPlayerTile(77);
                    pushables[key].direction = 'right';
                }
                //if switch is already on
                else if(playerTile() == 77)
                {
                    setPlayerTile(76);
                    pushables[key].direction = 'stop';
                    checkForTriggers();
                    
                }
            }
        } 

        //activate V
        if(playerTile() == 63) { setPlayerTile(64); selectSnd('v-activated',0); selectSnd('v-swell',0,true); }


        //exit
        if(playerX() == 14 && playerY() == 11) { 
            clearInterval(timer);
            gameState.level = 'The QUEEN\'S Suite.'; levelBuildTick = true; selectSnd('exit-step', 0); clearAllBackgroundSnd(0.1);
            stopRec();
        }
    }
}

let pushables = {
    1: { y: 6, xStart: 7, xEnd: 11, location: 9, direction: 'stop', specialChoices: [7,8,10,11], leftSwitch: [12,6], rightSwitch: [6,6], tile:68 },
    2: { y: 7, xStart: 7, xEnd: 11, location: 9, direction: 'stop', specialChoices: [7,8,10,11], leftSwitch: [12,7], rightSwitch: [6,7], tile:67 },
    3: { y: 8, xStart: 7, xEnd: 11, location: 9, direction: 'stop', specialChoices: [7,8,10,11], leftSwitch: [12,8], rightSwitch: [6,8], tile:68 },
    4: { y: 6, xStart: 17, xEnd: 21, location: 19, direction: 'stop', specialChoices: [17,18,20,21],leftSwitch: [22,6], rightSwitch: [16,6], tile:68 },
    5: { y: 7, xStart: 17, xEnd: 21, location: 19, direction: 'stop', specialChoices: [17,18,20,21],leftSwitch: [22,7], rightSwitch: [16,7], tile:67 },
    6: { y: 8, xStart: 17, xEnd: 21, location: 19, direction: 'stop', specialChoices: [17,18,20,21],leftSwitch: [22,8], rightSwitch: [16,8], tile:68 }
}

function pushableHandler()
{
    for (const [key] of Object.entries(pushables)) {
        let y = pushables[key].y;
        let xs = pushables[key].xStart;
        let xe = pushables[key].xEnd;

        if(pushables[key].direction == 'left')
        {
            //remember old x
            let xo = pushables[key].location;

            //move pushable
            if(pushables[key].location > xs) { pushables[key].location -= 1; }
            else { pushables[key].location = xe; }

            //redraw maps
            if(xo == pushables[key].xSpecial) { 
                gameMap[toIndex(xo,y)] = 65; 
            }
            else { 
                gameMap[toIndex(xo,y)] = 66; 
            }

            gameMap[toIndex(pushables[key].location,y)] = pushables[key].tile;
        }
        if(pushables[key].direction == 'right')
        {
            //remember old x
            let xo = pushables[key].location;

            //move pushable
            if(pushables[key].location < xe) { pushables[key].location += 1; }
            else { pushables[key].location = xs; }

            //redraw maps
            if(xo == pushables[key].xSpecial) { gameMap[toIndex(xo,y)] = 65; }
            else { gameMap[toIndex(xo,y)] = 66; }

            gameMap[toIndex(pushables[key].location,y)] = pushables[key].tile;
        }


        //handling sonud
        if(pushables[key].direction != 'stop')
        {
            //left table
            if(pushables[key].xStart-7 == 0) {             
                selectSnd(tableSounds[pushables[key].y-6][pushables[key].location-7],0); 
            }
            //right table
            if(pushables[key].xStart-7 == 10) {             
                selectSnd(tableSounds[pushables[key].y-3][pushables[key].location-17],0); 
            }
        }



    }
}

function checkForTriggers()
{
    let count = 0;
    for (const [key] of Object.entries(pushables)) 
    {
        if(pushables[key].direction == 'stop' && pushables[key].location == pushables[key].xSpecial)
        { count++; }
    }
    if(count == 6)
    {
        selectSnd('fire-out',0);
        clearAllBackgroundSnd(0);
        setTileTo(14,1,63);
        setTileTo(13,2,75); setTileTo(14,2,74); setTileTo(15,2,75);
        setTileTo(13,3,74); setTileTo(14,3,58); setTileTo(15,3,74);
    }
    
}

let tableSounds = [
    ['table1a','table1b','table1c','table1d','table1e'], //7,6 - 11,6
    ['table2a','table2b','table2c','table2d','table2e'], //7,7 - 11,7
    ['table3a','table3b','table3c','table3d','table3e'], //7,8 - 11,8,
    ['table4a','table4b','table4c','table4d','table4e'], //17,6 - 21,6
    ['table5a','table5b','table5c','table5d','table5e'], //17,7 - 21,7
    ['table6a','table6b','table6c','table6d','table6e'], //17,8 - 21,8
]

let timerClick = 0;