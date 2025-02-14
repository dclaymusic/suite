function buildGallery()
{
    gameMap = [
        401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,
        401,401,401,401,403,401,401,404,401,401,404,401,401,404,401,401,404,401,401,404,401,401,404,401,401,402,401,401,401,
        401,406,430,408,410,418,416,416,416,416,416,416,416,416,416,417,417,417,417,417,417,417,417,417,419,411,414,401,401,
        401,401,411,430,411,420,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,420,430,401,401,401,
        401,406,410,408,430,420,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,420,431,414,401,401,
        401,401,431,430,431,420,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,420,410,401,401,401,
        401,406,430,408,410,420,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,420,411,414,401,401,
        401,401,411,430,411,420,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,420,430,401,401,401,
        401,406,410,408,430,419,416,416,416,416,416,416,416,416,416,417,417,417,417,417,417,417,417,417,418,431,414,401,401,
        401,401,431,430,431,410,411,430,431,410,411,430,431,410,411,430,431,410,411,430,431,410,411,430,431,410,401,401,401,
        401,401,401,401,401,401,401,429,401,401,429,401,401,429,401,401,429,401,401,429,401,401,429,401,401,401,401,401,401,
        401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,
        401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,


    ]

    var starting_pos = [];
	starting_pos = [4,2];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    title = gameState.level;

    //sculptures
    selectSnd('a-text1',0.5,true);
    setGain('a-text1',0,0);
    selectSnd('a-text2',0.25,true);
    setGain('a-text2',0,0);
    selectSnd('a-text3',-0.25,true);
    setGain('a-text3',0,0);
    selectSnd('a-text4',-0.5,true);
    setGain('a-text4',0,0);

    //paintings
    selectSnd('a-p1',-0.75,true);
    setGain('a-p1',0,0);
    selectSnd('a-p2',-0.5,true);
    setGain('a-p2',0,0);
    selectSnd('a-p3',-0.25,true);
    setGain('a-p3',0,0);
    selectSnd('a-p4',0.25,true);
    setGain('a-p4',0,0);
    selectSnd('a-p5',0.5,true);
    setGain('a-p5',0,0);
    selectSnd('a-p6',0.75,true);
    setGain('a-p6',0,0);

}

function drawGallery()
{
    if(levelBuildTick) { buildGallery(); levelBuildTick = false; }
    
    for(let y = 0; y < mapH; y++)
    {
        for(let x = 0; x < mapW; x++)
        {
            var tile = tileTypes[gameMap[toIndex(x,y)]];
            ctx.drawImage(tile.img, x*tileW, y*tileH, tileW, tileH);
        }
    }

    drawPainting();

    drawCharacter();

    if(tick)
    {

        // //spotlight handling
        swapTile(412,413);

        if(playerX() == 7 && playerY() == 10) { 
            if(playerTile() == 413) { painting[0] = true; gameMap[toIndex(7,1)] = 405; 
                setGain('a-p1',1.0,0);
            }
            else { painting[0] = false; gameMap[toIndex(7,1)] = 404;
                setGain('a-p1',0.0,0);
            }
        }

        if(playerX() == 10 && playerY() == 10) { 
            if(playerTile() == 413) { painting[1] = true; gameMap[toIndex(10,1)] = 405; 
                setGain('a-p2',1.0,0);

            }
            else { painting[1] = false; gameMap[toIndex(10,1)] = 404;
                setGain('a-p2',0.0,0);
            }
        }

        if(playerX() == 13 && playerY() == 10) { 
            if(playerTile() == 413) { painting[2] = true; gameMap[toIndex(13,1)] = 405;
                setGain('a-p3',1.0,0); 

            }
            else { painting[2] = false; gameMap[toIndex(13,1)] = 404;
                setGain('a-p3',0.0,0);
            }
        }

        if(playerX() == 16 && playerY() == 10) { 
            if(playerTile() == 413) { painting[3] = true; gameMap[toIndex(16,1)] = 405; 
                setGain('a-p4',1.0,0);

            }
            else { painting[3] = false; gameMap[toIndex(16,1)] = 404;
                setGain('a-p4',0.0,0);
            }
        }

        if(playerX() == 19 && playerY() == 10) { 
            if(playerTile() == 413) { painting[4] = true; gameMap[toIndex(19,1)] = 405; 
                setGain('a-p5',1.0,0);

            }
            else { painting[4] = false; gameMap[toIndex(19,1)] = 404;
                setGain('a-p5',0.0,0);
            }
        }

        if(playerX() == 22 && playerY() == 10) { 
            if(playerTile() == 413) { painting[5] = true; gameMap[toIndex(22,1)] = 405; 
                setGain('a-p6',1.0,0);
            }
            else { painting[5] = false; gameMap[toIndex(22,1)] = 404;
                setGain('a-p6',0.0,0);
            }
        }

        //sculpture handler
        swapTile(414,415);
        if(playerX() == 26 && playerY() == 2) { 
            if(playerTile() == 415) { 
                    setGain('a-text1',1.0,0);
                    gameMap[toIndex(1,2)] = 407; 
                    gameMap[toIndex(3,2)] = 409;
                }
            else { 
                    setGain('a-text1',0.0,0);
                    gameMap[toIndex(1,2)] = 406;
                    gameMap[toIndex(3,2)] = 408;
                }
        }

        if(playerX() == 26 && playerY() == 4) { 
            if(playerTile() == 415) { 
                    setGain('a-text2',1.0,0);
                    gameMap[toIndex(1,4)] = 407; 
                    gameMap[toIndex(3,4)] = 409;
                }
            else {
                    setGain('a-text2',0.0,0);
                    gameMap[toIndex(1,4)] = 406;
                    gameMap[toIndex(3,4)] = 408;
                }
        }

        if(playerX() == 26 && playerY() == 6) { 
            if(playerTile() == 415) { 
                    setGain('a-text3',1.0,0);
                    gameMap[toIndex(1,6)] = 407; 
                    gameMap[toIndex(3,6)] = 409;
                }
            else { 
                    setGain('a-text3',0.0,0);
                    gameMap[toIndex(1,6)] = 406;
                    gameMap[toIndex(3,6)] = 408;
                }
        }

        if(playerX() == 26 && playerY() == 8) { 
            if(playerTile() == 415) { 
                    setGain('a-text4',1.0,0);
                    gameMap[toIndex(1,8)] = 407; 
                    gameMap[toIndex(3,8)] = 409;
                }
            else { 
                    setGain('a-text4',0.0,0);
                    gameMap[toIndex(1,8)] = 406;
                    gameMap[toIndex(3,8)] = 408;
                }
        }

        if(gameMap[toIndex(26,2)] == 415 &&
        gameMap[toIndex(26,4)] == 415 &&
        gameMap[toIndex(26,6)] == 415 &&
        gameMap[toIndex(26,8)] == 415 && gameMap[toIndex(7,10)] == 429)
        {

            selectSnd('a-swell',0,true);
            for(let i = 7; i < 23; i += 3)
            {
                gameMap[toIndex(i,10)] = 412;
            }

        }

        if(gameMap[toIndex(7,10)] == 413 && gameMap[toIndex(10,10)] == 413 && gameMap[toIndex(13,10)] == 413 &&
        gameMap[toIndex(16,10)] == 413 && gameMap[toIndex(19,10)] == 413 && gameMap[toIndex(22,10)] == 413 && 
        gameMap[toIndex(25,1)] == 402)
        {
            gameMap[toIndex(25,1)] = 421; //z icon unlocked
            fadeOutBackgroundSnd('a-swell',1);
            selectSnd('a-swellsequence',0,true);
        }

        //pick up z icon
        if(playerTile() == 421) { setPlayerTile(410); selectSnd('z-acquired',0); }

        

        let p = tileTypes[playerTile()].snd;
        if(p != undefined)
        { selectSnd(p,0); }

        //exit
        if(playerX() == 4 && playerY() == 1) { 
            clearInterval(timer);
            gameState.level = 'The QUEEN\'S Suite.'; levelBuildTick = true; selectSnd('exit-step', 0); clearAllBackgroundSnd(0.1);
            stopRec();
        }
    }
}

var painting = [false,false,false,false,false,false];

function drawPainting()
{
    let sx = 6*tileW;
    let sy = 3*tileH;

    var bg = tileTypes[422];
    ctx.drawImage(bg.img, sx, sy, tileW*18, tileH*5);

    for(let i = 0; i < painting.length; i++)
    {
        if(painting[i])
        {
            let t = i+423;
            var tile = tileTypes[t];
            ctx.drawImage(tile.img, sx, sy, tileW*18, tileH*5);
        }
    }
    
}