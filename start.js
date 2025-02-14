/* All functions that involve CSS and handling menu items */

function startGame() { 

    // let infoimg = document.getElementById('infoimg');
    // infoimg.style.visibility = 'visible';

    document.getElementById('loadscreen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('icons').style.display = 'none';

    //masterGain.gain.linearRampToValueAtTime(-0.001, (audioCtx.currentTime)); 
    //setTimeout(() => { masterGain.gain.linearRampToValueAtTime(1, (audioCtx.currentTime) + 5.0); }, 5000);

    hasStarted = true;
    canMove = true;
    levelBuildTick = true;
    selectSnd('door-entered',0);
    
}

let imgSrc = [];
let images = [];

function initImg()
{
	//this requires a different sound for every tile/item type
	for (const [key] of Object.entries(tileTypes)) {
		if(tileTypes[key].src != undefined) {
            tileTypes[key].img = new Image(tileW, tileH);
            tileTypes[key].img.src = 'img/' + tileTypes[key].src + '.png';
        }
        if(tileTypes[key].player != undefined)
        {
            tileTypes[key].playerImg = new Image(tileW, tileH);
            tileTypes[key].playerImg.src = 'img/' + tileTypes[key].player + '.png'; 
        }
	}

    // titleImg = new Image(600,300);
    // titleIMg.src = 'title.png'
}


function loadbarHandler()
{

    //before start -- CHANGE LATER
    // if(checkBuffers() == numberOfSounds)
    if(checkBuffers() >= 1)
    {
        allBuffersLoaded = true;
        let loadtext = document.getElementById('loadtext');
        loadtext.innerHTML = 'Press SPACE to begin.';
    }
    else 
    { } //opening state;
}

//check buffers
function checkBuffers()
{
    let buffCount = 0;
    for(let n = 0; n < buffers.length; n++)
    {
        if(buffers[n] != null) { buffCount++; }
    }
    return buffCount;
}

function frameRate()
{
    ////////////frame rate check
    ctx.fillStyle = "#ff0000";
    ctx.font = "30px Andale Mono";
    ctx.textAlign = "start";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);
}
