function drawTitle()
{

    // ctx.font = "45px italic";
    // ctx.textAlign = "start";
    // ctx.fillStyle = 'grey';
    // ctx.fillText(title, tileW*0.5, tileH*12.5);
    
    if(title == "The QUEEN\'S Suite.")
    {
        ctx.font = "45px italic";
        ctx.textAlign = "start";
        ctx.fillStyle = white;
        ctx.fillText('The', tileW*0.5, tileH*12.5);
        ctx.font = "45px pica";
        ctx.fillText("QUEEN\'S", tileW*2.1, tileH*12.5);
        ctx.font = "45px italic";
        ctx.fillText("Suite.", tileW*6.4, tileH*12.5)
    }
    else
    {
        ctx.font = "45px italic";
        ctx.textAlign = "start";
        ctx.fillStyle = white;
        ctx.fillText(title, tileW*0.5, tileH*12.5);
    }	
}

function updateTitle(message)
{
    title = message;
}
