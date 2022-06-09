var monstConf;
var oBoard;
var oBoardConfig;
var monsters = [];
var rPacManStartPos_X = 40;
var rPacManStartPos_Y = 40;

window.onload = function()
 {

    oBoardConfig = new BoardConfig();
    oBoard = new Board();

    oBoard.Draw(oBoardConfig, 10, 10);

    monstConf = new MonstersConfig();

    setMonsters();

    setInterval(startMonsters,50);
  //  startMonsters();

 }

 function startMonsters()
 {
    monsters[0].Run(oBoard, monsters);
    monsters[1].Run(oBoard, monsters);
    monsters[2].Run(oBoard, monsters);
    monsters[3].Run(oBoard, monsters);
 }
 function setMonsters()
 {
    var MosterCanvas = document.getElementById(monstConf.CanvasName);
    monsters[0] = new Monster(MosterCanvas,rPacManStartPos_X, rPacManStartPos_Y,monstConf.ArrImagePath[0],monstConf.ImageSize);
    monsters[1] = new Monster(MosterCanvas,rPacManStartPos_X, rPacManStartPos_Y+100,monstConf.ArrImagePath[1],monstConf.ImageSize);
    monsters[2] = new Monster(MosterCanvas,rPacManStartPos_X, rPacManStartPos_Y+100*2,monstConf.ArrImagePath[2],monstConf.ImageSize);
    monsters[3] = new Monster(MosterCanvas,rPacManStartPos_X, rPacManStartPos_Y+100*3,monstConf.ArrImagePath[3],monstConf.ImageSize);
 }

//  function startMonster(monster, iDir, arrMonsters)
// {
//     var bMoved = false;
//     switch(iDir)
//     {
//         case 0:
//             if(monster.Center_Y>rPacManStartPos_Y)
//             {
//                 bMoved = monster.MoveUp(speed,-1,monsters);
//             }
//         break;

//         case 1:
//             if(monster.Center_Y<rPacManEndPos_Y)
//             {
//                 bMoved = monster.MoveDown(speed,-1,monsters);
//             }
//         break;

//         case 2:
//             if(monster.Center_X>rPacManStartPos_X)
//             {
//                 bMoved = monster.MoveLeft(speed,-1,monsters);
//             } 
//         break;

//         case 3:
//             if(monster.Center_X<rPacManEndPos_X)
//             {
//                 bMoved = monster.MoveRight(speed,-1,monsters);
//             }
//         break;

//         default:
//             alert("error : " + iDir);
//             currentDircetion = DIR_RIGHT;
//             break
//     };

//     if(bMoved == true)
//     {
//         coords.innerHTML = "X : " + monster.X + ", Y : " + monster.Y;
//         monster.Draw();
//     }
//     else
//     {
//         iDir = Math.floor(Math.random() * 4);
//     }

//     return iDir;
// }



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