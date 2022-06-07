var context;
var canvas;
var pacMan;
var monster1;
var monster2;
var monster3;
var monster4;

monsters = [];

var rDelta = 0.05;
var rAngle = 0;
var bOpenMouth = true;

var rPacManStartPos_X = 40;
var rPacManStartPos_Y = 40;
var rPacManEndPos_X = 760;
var rPacManEndPos_Y = 760;
var rPacManRadius = 30;
var speed = 5;

var iMonster1Dir;
var iMonster2Dir;
var iMonster3Dir;
var iMonster4Dir;

window.onload = function()
 {

     canvas = document.getElementById('PacManCanvas');
    // var ctx = canvas.getContext('2d');
    // Board.Draw(10,10,ctx);

    setMonsters();

    iMonster1Dir = Math.floor(Math.random() * 4);
    iMonster2Dir = Math.floor(Math.random() * 4);
    iMonster3Dir = Math.floor(Math.random() * 4);
    iMonster4Dir = Math.floor(Math.random() * 4);

   // startMonster();

    setInterval(startMonsters,50);

 }

 function startMonsters()
 {
    iMonster1Dir = startMonster(monsters[0], iMonster1Dir);
    iMonster2Dir = startMonster(monsters[1], iMonster2Dir);
    iMonster3Dir = startMonster(monsters[2], iMonster3Dir);
    iMonster4Dir = startMonster(monsters[3], iMonster4Dir);
 }

 function startMonster(monster, iDir, arrMonsters)
{
    var bMoved = false;
    switch(iDir)
    {
        case 0:
            if(monster.Center_Y>rPacManStartPos_Y)
            {
                bMoved = monster.MoveUp(speed,-1,monsters);
            }
        break;

        case 1:
            if(monster.Center_Y<rPacManEndPos_Y)
            {
                bMoved = monster.MoveDown(speed,-1,monsters);
            }
        break;

        case 2:
            if(monster.Center_X>rPacManStartPos_X)
            {
                bMoved = monster.MoveLeft(speed,-1,monsters);
            } 
        break;

        case 3:
            if(monster.Center_X<rPacManEndPos_X)
            {
                bMoved = monster.MoveRight(speed,-1,monsters);
            }
        break;

        default:
            alert("error : " + iDir);
            currentDircetion = DIR_RIGHT;
            break
    };

    if(bMoved == true)
    {
        coords.innerHTML = "X : " + monster.X + ", Y : " + monster.Y;
        monster.Draw();
    }
    else
    {
        iDir = Math.floor(Math.random() * 4);
    }

    return iDir;
}

 function setMonsters()
{
    monsters[0] = new Monster(document.getElementById('Monster1'),rPacManStartPos_X, rPacManStartPos_Y,"Resources/monster1.png",64);
    monsters[1] = new Monster(document.getElementById('Monster2'),rPacManStartPos_X, rPacManStartPos_Y+100,"Resources/monster2.png",64);
    monsters[2] = new Monster(document.getElementById('Monster3'),rPacManStartPos_X, rPacManStartPos_Y+100*2,"Resources/monster3.png",64);
    monsters[3] = new Monster(document.getElementById('Monster4'),rPacManStartPos_X, rPacManStartPos_Y+100*3,"Resources/monster4.png",64);
}

function setPacMan()
{
    pacMan = new PacMan(canvas,rPacManStartPos_X, rPacManStartPos_Y);

    document.addEventListener('keydown', (event) => {
    var name = event.key;

    switch(name)
    {
        case "ArrowUp":
            if(pacMan.Center_Y>rPacManStartPos_Y)
                pacMan.MoveUp(speed);
        break;

        case "ArrowDown":
            if(pacMan.Center_Y<rPacManEndPos_Y)
                pacMan.MoveDown(speed);
        break;

        case "ArrowLeft":
            if(pacMan.Center_X>rPacManStartPos_X)
                pacMan.MoveLeft(speed);
        break;

        case "ArrowRight":
            if(pacMan.Center_X<rPacManEndPos_X)
                pacMan.MoveRight(speed);
        break;

        default:
            alert("error : " + name);
            currentDircetion = DIR_RIGHT;
            break
    };
    }, false);
}


function start()
{
    coords.innerHTML = "X : " + pacMan.X + ", Y : " + pacMan.Y;
    pacMan.Draw();
}

function DrawCell()
{
    context = canvas.getContext('2d');
    context.strokeRect(0, 0, 80, 80);
}