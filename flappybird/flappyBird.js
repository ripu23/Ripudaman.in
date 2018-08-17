var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var bg = new Image();
bg.src = 'images/bg.png';

var bird = new Image();
bird.src = 'images/bird.png';

var pipeNorth = new Image();
pipeNorth.src = 'images/pipeNorth.png';

var pipeSouth = new Image();
pipeSouth.src = 'images/pipeSouth.png';

var ground = new Image();
ground.src = 'images/fg.png';


var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;


document.addEventListener('keydown', moveUp);

function moveUp (e){
    bY -= 25;
    
}

var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}


function draw() {
    
    ctx.drawImage(bg, 0, 0);
    
    
    for(let i = 0; i < pipe.length; i++){
    	
    		constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;
        
        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }
        //collision
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - ground.height){
            ctx.rect(70, 200, 150, 100);
            ctx.fillStyle = "#6b58afc4";
            ctx.fill();
            ctx.fillStyle = "black"
            ctx.font = "20px Changa one"
            ctx.fillText("Score: "+score, 75, 230);
            return;
        }
        
        if(pipe[i].x == 5){
            score++;
        }
        
    }
    
   
    ctx.drawImage(ground, 0, cvs.height - ground.height);
    ctx.drawImage(bird, bX, bY);
    bY += gravity;
    ctx.fillStyle = "black"
    ctx.font = "20px Changa one"
    ctx.fillText("Score: "+score, 10, cvs.height - 30);
    ctx.font = "10px Changa one"
    ctx.fillText("*use any key to play ", 10, cvs.height -10);
    
    
    
   requestAnimationFrame(draw);
    
}
draw();

