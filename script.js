let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');
canvas.style.border = '9px solid #2B424E';


let gameBg = new Image();
gameBg.src = './Images/game_background_4.png';

let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let stopBtn = document.querySelector('#stop');
let instructions = document.querySelector('p')
let intervalId = 0;
let gameOver = false;


let spaceship = new Image();
spaceship.src = './Images/skull_in_a_ufo_spacecraft.png';
let spaceshipX = 1, spaceshipY = 1;

let beam = new Image();
beam.src = './Images/laserYellow2.png'
let beamHeigth = 100;
let beamWidth = 100;

let isRigth = false;
let isLeft = false;
let isUp = false;
let isDown = false;
let isShoot = false;




let audio = new Audio('./Sound/POL-night-crickets.mp3');

let shipAudio = new Audio('./Sound/flight_1.wav');

let splashAudio = new Audio('./Sound/impactsplat01.mp3.flac');

let cowW = new Image();
cowW.src = './Images/whiteCow.png';
let cowWX = 1150;
let cowWY = 595;

let cowB = new Image();
cowB.src = './Images/brownCow.png'
let cowBX = 950;
let cowBY = 595;

let cowSpeed = 4
let randomCowspeed = Math.random() * cowSpeed;

let cowSpeedB = 3
let randomCowspeedB = Math.random() * cowSpeedB;

let cowBHeigth =100;
let cowBWidth = 100;
let cowWHeigth = 100;
let cowWWidth = 100;

let cowsX = [
    {x: cowWX, y: 600},
    {x: cowWX +300, y: 600},
    {x: cowWX +450, y: 600},
]

let cowsB = [
    {x: cowBX, y: 600},
    {x: cowBX +350, y: 600},
    {x: cowBX +550, y: 600},
]

let blood = new Image();
blood.src = './Images/bloodsplater400×400 pixels.png'
let maxW = canvas.width - 150;
 let maxH = canvas.height - 101;


let score = 0;

let quarters = new Image();
quarters.src = './Images/Endgame.jpg';



let i = 0;       

 function drawScore (){
    ctx.font = '50px Bold Verdana';
    ctx.fillStyle = '#2B424E';
    ctx.fillText(`Brown Cows: ${score} `, 504, 60);   
 }


function animation() {

    ctx.drawImage(gameBg, 0, 0)
    
    drawScore ()

    
    

   
        
 
        for(let i=0; i<cowsX.length; i++) {
            ctx.drawImage(cowW, cowsX[i].x, 600, 100, 100 ) 
            ctx.drawImage(cowB, cowsB[i].x, 595, 100, 100)
            cowsX[i].x = cowsX[i].x - randomCowspeed 
            cowsB[i].x = cowsB[i].x - randomCowspeedB 
    
            if(cowsX[i].x + cowW.width < 0) {
                cowsX[i].x = 1250
            }
    
            if(cowsB[i].x + cowB.width < 0) {
                cowsB[i].x = 1250
            }
    
            if( spaceshipX +25 >= cowsB[i].x &&  spaceshipX +25  <= cowsB[i].x + cowBHeigth &&  spaceshipY +100 + beamHeigth >= cowBY ){
                cowsB[i].x = Math.floor(Math.random()* maxW + 1250);
                ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150); 
                score++;
                splashAudio.play(); 
                ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150); 
                
            } 
            if((spaceshipX +25) + beamWidth  > cowsB[i].x  &&  (spaceshipX +25) + beamWidth  <= cowsB[i].x + cowBWidth &&  spaceshipY +100 + beamHeigth >= cowBY ){
                cowsB[i].x = Math.floor(Math.random()* maxW + 1250);
                ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150); 
                score++ ;
                splashAudio.play();
               ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150);
               
            } 

            if( spaceshipX +25 >= cowsX[i].x &&  spaceshipX +25  <= cowsX[i].x + cowWHeigth &&  spaceshipY +100 + beamHeigth >= cowWY ){
                cowsX[i].x = 1250;
                ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150); 
                score--  ;
                splashAudio.play();
               ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150);
               
            } 
            if((spaceshipX +25) + beamWidth  > cowsX[i].x  &&  (spaceshipX +25) + beamWidth  <= cowsX[i].x + cowWWidth &&  spaceshipY +100 + beamHeigth >= cowWY ){
                cowsX[i].x = 1250;
                ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150); 
                score-- ;
                splashAudio.play();
                ctx.drawImage(blood,spaceshipX +25, spaceshipY +100, 100, 150);
                
            } 
        }
 
        ctx.drawImage(spaceship,spaceshipX,spaceshipY , 150, 101)


        ctx.drawImage(beam,spaceshipX +25,spaceshipY +100 , 100, 100 )








    
        if (isRigth && spaceshipX + 150 < canvas.width ) {
            spaceshipX += 7;
            shipAudio.play();
        }
        if (isLeft && spaceshipX > 0 ) {
            spaceshipX -= 7 ;
            shipAudio.play();
        }
        if (isDown && spaceshipY + 100 < canvas.height -50 ) {
            spaceshipY += 7 ;
            shipAudio.play(); 
        }
        if (isUp && spaceshipY  > 0) {
           spaceshipY -= 7 ;
           shipAudio.play();
        }
        
            
    
     if (score > 4) {
        handleEndGame ()
     } 

        
        

    
    if (gameOver) {
        handleEndGame ()
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }
   
    
     

}





function handleEndGame () {
    
    cancelAnimationFrame(intervalId);
    gameOver = true;
    ctx.drawImage(quarters,0, 0, 1249, 700);
    audio.pause();
    shipAudio.pause();
    splashAudio.pause();
    restartBtn.style.display = 'block';
    
}


function handleStart () {
    startBtn.style.display = 'none';
    canvas.style.display ='block';
    animation();
    audio.play();
    audio.volume = 0.1;
    shipAudio.volume =0.1;
    audio.loop();
    stopBtn.style.display = 'block';
    instructions.style.displayv = 'none';
}




window.addEventListener('load', () => {

    canvas.style.display = 'none'
    restartBtn.style.display = 'none'
    stopBtn.style.display = 'none'
    startBtn.addEventListener('click', () => {
    handleStart ()

      
  })

  stopBtn.addEventListener('click', () => {
    handleEndGame ()
  })

  restartBtn.addEventListener('click', () => {
    handleStart ()
  })

  document.addEventListener("keydown", (event) => {
if (event.key == "ArrowLeft") {
    isLeft = true;
    isRigth = false;
}
if (event.key == "ArrowRight") {
    isRigth = true;
    isLeft = false;
}
if (event.key == "ArrowUp") {
    isUp = true;
    isDown = false;
}
if (event.key == "ArrowDown") {
    isDown = true;
    isUp = false;
}
if (event.key == "Tab") {

}

  })

  document.addEventListener("keyup", () => {
    isLeft = false;
    isRigth = false;
    isUp = false;
    isDown = false;
  })


  })