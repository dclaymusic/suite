let buffers = [];
let sounds = [
	//sounds with no tile trigger
	'ROOM1','ROOM2','ROOM3','ROOM4','ROOM5','ROOM6','ROOM7a','ROOM7b','door-entered','exit-step',
    //fireplace
    'fireplace1','fireplace2','fire-out','v-activated','v-swell',
    'f-lantern1','f-lantern2','f-lantern3','f-lantern4','f-lantern5','f-lantern6',
    'table1a','table1b','table1c','table1d','table1e',
    'table2a','table2b','table2c','table2d','table2e',
    'table3a','table3b','table3c','table3d','table3e',
    'table4a','table4b','table4c','table4d','table4e',
    'table5a','table5b','table5c','table5d','table5e',
    'table6a','table6b','table6c','table6d','table6e',

	//library
	'book-open','candle1','candle2','candle3','candle4','candle-w','candle-swell-loop',

    //garden
    'garden-drone1','garden-drone2','garden-texture1','garden-texture2',
    'y-activated','y-swell',

    //chapel
    'c-tile-unlock','match1','match2','match3','hasfire',
    'pyre1','pyre2','pyre3','pyre4','pyre5','x-activated','wood4',

    //gallery
    'a-swellsequence','a-swell',
    'a-text1','a-text2','a-text3','a-text4',
    'a-p1','a-p2','a-p3','a-p4','a-p5','a-p6',
    'z-acquired'

];
const numberOfSounds = 203;




function initSnd() 
{
	var AudioContext = window.AudioContext || window.webkitAudioContext;   
	audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();

    for (const [key] of Object.entries(tileTypes)) {
        if(tileTypes[key].snd != undefined) { sounds.push(tileTypes[key].snd) }
    }

	for(let i = 0; i < sounds.length; i++)
	{
		buffers[i] = null;
		loadSnd(i);
	}

    // console.log(sounds.length)
}


//select a sound by it's filename
function selectSnd(name,pan,loop) {
    for(let i = 0; i < sounds.length; i++)
    {
        if(sounds[i] == name)
        {
            loadSnd(i);
            playSnd(i,pan,loop,name); // pan default for now
        }
    }
}

//load sound so it's ready to play
function loadSnd(index) {
    const request = new XMLHttpRequest();
    request.open("GET", `./snd/${sounds[index]}.mp3`);
    request.responseType = "arraybuffer";
    request.onload = function() {
    let undecodedAudio = request.response;
    audioCtx.decodeAudioData(undecodedAudio, (data) => buffers[index] = data);
    };
    request.send();
};

//play a sound
function playSnd(index, pan, loop, name) { //loop and name arguments are for bg sounds only
    const source = audioCtx.createBufferSource();
    const panNode = audioCtx.createStereoPanner();
    source.buffer = buffers[index];
    panNode.pan.setValueAtTime(pan, audioCtx.currentTime);
    const gainNode = audioCtx.createGain();
    if(loop != undefined) { 
        source.loop = true;
    }
    //I moved this so that all sounds will fade out when leaving a room. Not sure how laggy this will make it.
    activeSounds.push([name,source,gainNode,panNode]);
    source.connect(gainNode);
    gainNode.connect(panNode);
    panNode.connect(masterGain);
    masterGain.connect(audioCtx.destination)
        source.start(audioCtx.currentTime); // play the source immediately
};

function clearAllBackgroundSnd(delayTime)
{
    if(delayTime == undefined)
    { delayTime = 0; }
    if(activeSounds.length > 0)
    {
        for(let i = 0; i < activeSounds.length; i++)
        {
            activeSounds[i][2].gain.linearRampToValueAtTime(0, (audioCtx.currentTime + delayTime));
            activeSounds[i][1].stop(audioCtx.currentTime + delayTime);
        }
    }
    activeSounds = [];
}

function fadeOutBackgroundSnd(name,timeInSeconds)
{
    if(activeSounds.length > 0)
    {
        for(let i = 0; i < activeSounds.length; i++)
        {
            if(activeSounds[i][0] == name)
            {
                activeSounds[i][2].gain.linearRampToValueAtTime(-0.001, (audioCtx.currentTime + timeInSeconds));
                setTimeout(function(){activeSounds[i][1].stop(audioCtx.currentTime); }, timeInSeconds*1000);
            }
        }

    }
}

function setGain(name,gain,timeInSeconds)
{
    if(activeSounds.length > 0)
    {
        for(let i = 0; i < activeSounds.length; i++)
        {
            if(activeSounds[i][0] == name)
            {
                activeSounds[i][2].gain.linearRampToValueAtTime(gain, (audioCtx.currentTime + timeInSeconds));
            }
        }

    }
}

function spatialGain(name,targetX,targetY,scaleOfFade)
{
    //where targetX, targetY is the location of the sound
    if(activeSounds.length > 0)
    {
        for(let i = 0; i < activeSounds.length; i++)
        {
            if(activeSounds[i][0] == name)
            {
                //lower scale of fade (i.e. 0.05) = more subtle fade, louder overall gain
                let prox = calculateProximity(playerX(),playerY(),targetX,targetY,scaleOfFade);
                activeSounds[i][2].gain.linearRampToValueAtTime(prox, (audioCtx.currentTime + 0.1));


                //handling panning
                let x = targetX-playerX();
                let sig = 1 / (1 + Math.exp(-(2/mapW) * x));//sigmoid logistics function
                setPan(name,sig);
            }
        }
    }
}


function setPan(name,pan)
{
    for(let i = 0; i < activeSounds.length; i++)
    {
        if(activeSounds[i][0] == name)
        {
            // console.log(name,pan);
            activeSounds[i][3].pan.setValueAtTime(pan, audioCtx.currentTime);
        }
    }
}



function calculateProximity(characterX, characterY, pointX, pointY, mod) {
    // Calculate the distance between the character and the point
    const distance = Math.sqrt(Math.pow(pointX - characterX, 2) + Math.pow(pointY - characterY, 2));

    // Return a value that decreases gradually as the distance increases
    // For example, the value could be calculated as 1 / (1 + distance)
    const proximity = 1 / (1 + distance * mod); //lower decimal mod = subtler fade

    return proximity;
}