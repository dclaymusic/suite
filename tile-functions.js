function randomInt(max)
{
    rand_val = Math.floor(Math.random() * Math.floor(max + 1))
    return rand_val;
}

function toIndex(x, y)
{
	return((y * mapW) + x);
}

function toDrawIndex(x,y,w)
{
    return((y * w) + x);  
}

function playerX()
{
    return player.position[0]/tileW;
}

function playerY()
{
    return player.position[1]/tileH;
}

function setPlayerTile(t)
{
    gameMap[toIndex(playerX(),playerY())] = t;
}

function setTileTo(x,y,t)
{
    gameMap[toIndex(x,y)] = t;
}

function playerTile()
{
    return gameMap[toIndex(playerX(),playerY())];
}

function swapTile(t1,t2)
{
    if(playerTile() == t1)
    {
        setPlayerTile(t2);
    }
    else if(playerTile() == t2)
    {
        setPlayerTile(t1);
    }
}