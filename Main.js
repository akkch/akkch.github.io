var monstConf;
var oBoard;
var oBoardConfig;
var oCellTypeConfig
var oMonstConf;
var monsters = [];






var oPacManConf;
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
    oBoard.Draw(10, 10, oCellTypeConfig);

    oMonstConf = new MonstersConfig();
    Monsters.Run(oBoard,oMonstConf)


    oPacManConf = new PacManConfig();
    pacMan = new PacMan(oBoard,oPacManConf);

 }

function DrawCell()
{
    context = canvas.getContext('2d');
    context.strokeRect(0, 0, 80, 80);
}