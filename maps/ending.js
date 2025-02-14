function buildEnd()
{
    gameMap = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

    ]

    var starting_pos = [];
	// starting_pos = [14,6];
    starting_pos = [comingTo[0],comingTo[1]];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    title = gameState.level;
    selectSnd('door-entered', 0); 

    document.getElementById('loadscreen').style.display = 'block';
    document.getElementById('title').innerHTML = "<span class='pica'>WE MEET AT LAST,</span>"
    document.getElementById('description').innerHTML = 
        'O gentle soul and kindred creative spirit! <br>I\'ve heard much of your talents and am eager to share my compositions with you.<br>Shall we listen?'
    document.getElementById('description').style.lineHeight = '2rem'
    document.getElementById('title').style.marginBottom = '5px';
    document.getElementById('infotext').innerHTML = 'Browse the compositions below.'
    document.getElementById('infotext').style.marginTop = '0px';
    document.getElementById('infotext').style.paddingBottom = '20px';
    document.getElementById('loadtext').style.display = 'none';


    document.getElementById('game').style.display = 'none';
    document.getElementById('downloads').style.display = 'flex';
    document.getElementById('downloads').style.flexDirection = 'row';
    document.getElementById('downloads').style.justifyContent = 'space-around';

    


}

function drawEnd()
{
    if(levelBuildTick) { buildEnd(); levelBuildTick = false; }
    
    for(let y = 0; y < mapH; y++)
    {
        for(let x = 0; x < mapW; x++)
        {
            var tile = tileTypes[gameMap[toIndex(x,y)]];
            ctx.drawImage(tile.img, x*tileW, y*tileH, tileW, tileH);
        }
    }
}


// //playAllSoundsFunction
// var rec = new Recorder(gainNode);
// rec.record();


//  rec.stop()
//  rec.exportWAV(function(blob){
//  // document.getElementById('playback').remove();
//  let thisObj = URL.createObjectURL(blob);
//  // let pb = new Audio(thisObj);
//  let d = document.getElementById('mvt1');
//  // pb.controls = true;
//  // pb.controlsList = "noplaybackrate";
//  // pb.id = 'playback';
//  // document.getElementById('footer').appendChild(pb);
//  d.href = thisObj;
//  d.download = 'I.wav'});




// recording = setTimeout(function(){
//     rec.stop()
//     rec.exportWAV(function(blob){

//     // document.getElementById('playback').remove();
//     let thisObj = URL.createObjectURL(blob);
//     // let pb = new Audio(thisObj);
//     let d = document.getElementById('mvt1');
//     // pb.controls = true;
//     // pb.controlsList = "noplaybackrate";
//     // pb.id = 'playback';
//     // document.getElementById('footer').appendChild(pb);
//     d.href = thisObj;
//     d.style.visibility = 'visible'; 
//     d.download = 'nokia.wav'
//     });
//  }, tempo*mapH);



function startRec()
{
    setTimeout(() => {
        rec[currentRec] = new Recorder(masterGain);
        rec[currentRec].record();  
    }, 250);
}

function stopRec()
{
    setTimeout(() => {
 
        rec[currentRec].stop()
        rec[currentRec].exportWAV(function(blob){
        // document.getElementById('playback').remove();
        let thisObj = URL.createObjectURL(blob);
        // let pb = new Audio(thisObj);
        let d = document.getElementById(`d${currentRec+1}`);

        
        let a = document.createElement('audio');
        a.id = (`a${currentRec+1}`);
        a.src = thisObj;
        let p = document.getElementById(`p${currentRec+1}`);
        let thisOne = currentRec;
        p.onclick = function(){
            
            pClicked[thisOne] = !pClicked[thisOne];
            // console.log(pClicked[thisOne], thisOne);

            if(pClicked[thisOne]) { 
                p.style.backgroundColor = '#F2E698';
                p.style.color = '#2E1C14';
                a.currentTime = 0;
                a.play();
                a.onended = function() {
                    pClicked[thisOne] = false;
                    p.style.backgroundColor = '#2E1C14';
                    p.style.color = '#FFFFFF'; 
                };
            }
            else
            {
                p.style.backgroundColor = '#2E1C14';
                p.style.color = '#FFFFFF'; 
                a.pause();
            }
            // if(nowPlaying != null)
            // {
            //        nowPlaying.pause();
            //        nowPlaying.currentTime = 0;
            //        nowPlaying = a;
            //        nowPlaying.play();
            // }
            // else
            // {
            //     nowPlaying = a;
            //     nowPlaying.play();   
            // }
            // a.play();
        }

        // pb.controls = true;
        // pb.controlsList = "noplaybackrate";
        // pb.id = 'playback';
        // document.getElementById('footer').appendChild(pb);
        // d.src = thisObj;
        d.href = thisObj;
        
        // d.onclick = function(){ window.open(d.href, '_blank').focus(); }
        let n;
        if(currentRec == 0) { n = 'I'; }
        if(currentRec == 1) { n = 'II'; }
        if(currentRec == 2) { n = 'III'; }
        if(currentRec == 3) { n = 'IV'; }
        if(currentRec == 4) { n = 'V'; }

        d.onclick = function(){ d.download = `The Queen's Suite: Part ${n}.wav`; }
        currentRec++;
        // d.download = 'I.wav' 
    });
    }  ,300);
}


let nowPlaying = null;
let currentButton = null;
let pClicked = [false,false,false,false,false];