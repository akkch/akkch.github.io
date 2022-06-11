var monstConf;
var oBoard;
var oBoardConfig;
var oCellTypeConfig
var oMonstConf;
var monsters = [];






var rPacManStartPos_X = 40;
var rPacManStartPos_Y = 40;
var rPacManEndPos_X = 760;
var rPacManEndPos_Y = 760;
var pacMan;
var speed = 5;

window.onload = function()
 {

    oBoardConfig = new BoardConfig();
    oBoard = new Board(oBoardConfig);

    
    oCellTypeConfig = new CellTypeConfig();
    oBoard.Draw(10, 10);

    oMonstConf = new MonstersConfig();
    Monsters.Run(oBoard,oMonstConf)

    // setPacMan();
    // window.setInterval(start, 10);

 }

function setPacMan()
{
    var canvas = document.getElementById("BoardCanvas");
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