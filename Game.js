//Class which represented game behavior
class Game
{
    //#region Fields--------------------------------------------------------

    static #_oBoard;                                //Link to board instance
    static #_oBoardCanvasContext;                   //Link to board canvas context instance
    static #_oPacMan;                               //Link to pacman instance

    static #_sPlayerName;                           //Player name
    static #_iTimeCount;                            //Time counter
    static #_iTimeMinutes;                          //Game time minutes
    static #_iTimeSeconds;                          //Game time seconds
    static #_oDomElGameTime;                        //Link to element in the DOM which intended for game time presentation
    static #_oDomElGameScore;                       //Link to element in the DOM which intended for game score presentation
    static #_oDomElBestScore;                       //Link to element in the DOM which intended for game best score presentation
    static #_oDomElCurrentTime;                     //Link to element in the DOM which intended for current time presentation

    static #_iTmpBestScore = 0;                     //Best score for browser which not support local storage
    static #_sBestScoreParName = "BestScore";       //Local storage parameter name for storing of best score
    static #_sBestScorePlayerParName = "UserName";  //Local storage parameter name for storing of user name(which get a best score)

    static #_oMonsterConfig;                        //Link to monster config instance
    static #_iAnimateFont = 10;                     //Start animation font
    static #_oAnimateTimer;                         //Link to animation timer instance
    static #_bBoardCanvasAnimated = false;          //Indication flag - true/false - board during animation/not

    static bClearNeeded = false;                    //Indication flag - game should be cleared

    //#endregion //Fields

    //#region Public Methods------------------------------------------------

    //Initialization
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static Init()
    {
        Game.#_oDomElGameTime = document.getElementById("Player1_Time_Present");
        Game.#_oDomElGameScore = document.getElementById("Player1_Score_Present");
        Game.#_oDomElBestScore = document.getElementById("BestScore");
        Game.#_oDomElCurrentTime = document.getElementById("CurrentTime");
    }

    //Run game
    //Arguments:
    //  -   sPlayerName - player name
    //Return:
    //  -   None
    static Run(sPlayerName)
    {
        Game.Clear();

        Game.#_sPlayerName = sPlayerName;
        Game.#_iTimeCount = 0;
        Game.#boardInit();
        Game.#pacManInit();
        Game.#monstersInit();
        Game.#showBestScoreField();
        new Timer(Game,Entity._oBoard.BoardSpeed,-1);

        Game.bClearNeeded = true;
    }

    
    //On tick event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static OnTick()
    {
        if(Monster.IsThereIntersection(Game.#_oPacMan.rCenter_X, Game.#_oPacMan.rCenter_Y) && !Game.#_oPacMan.BlinkFlag)
        {
            Game.#_oPacMan.IntersecMonsterSound();
            Game.#_oPacMan.BlinkFlag = true;
            Game.#_oPacMan.iScore += Game.#_oMonsterConfig.iScore;
        }

        if(Game.#_oPacMan.bDead)
        {
            Game.Clear();
            Game.#_iAnimateFont = 10;
            Game.#_oAnimateTimer = window.setInterval(Game.#gameOver, 50);
        }
        
        if(Game.#_oPacMan.iEatenAmount == GameConfig.iItemsAmount)
        {
            Game.Clear();
            Game.#_iAnimateFont = 10;
            Game.#_oAnimateTimer = window.setInterval(Game.#gameWin, 50);
        }

        if(Game.#_iTimeCount%1000 == 0)
        {
            let totalSeconds = Game.#_iTimeCount/1000;
            Game.#_iTimeMinutes = Math.floor(totalSeconds/60);
            Game.#_iTimeSeconds = totalSeconds%60;
            Game.#showCurrentTime();
            Game.#_oDomElGameTime.innerHTML = "Game Time : " + Game.#_iTimeMinutes + ":" + Game.#_iTimeSeconds;
        }
            

        Game.#_oDomElGameScore.innerHTML = "Game Score : " + Game.#_oPacMan.iScore;
        Game.#_iTimeCount+=10;
    }
    
    //Clear the game
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static Clear()
    {
        if(Game.bClearNeeded)
        {
            window.clearInterval(Game.#_oAnimateTimer);
            Game.#_oDomElGameTime.innerHTML = "";
            Game.#_oDomElGameScore.innerHTML = "";
            Game.#_oDomElBestScore.innerHTML = "";

            Timer.Clear();
            Game.#_oPacMan.Clear();
            Monster.Clear();
        }

        if(Game.bClearNeeded || Game.#_bBoardCanvasAnimated)
        {
            Game.#clearBoardCanvas();
            Game.bClearNeeded = false;
        }
    }
    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Board initialization
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #boardInit()
    {
        CellsContent.SetConfig(new CellTypeConfig());
        Game.#_oBoard = new Board(new BoardConfig());
        Game.#_oBoardCanvasContext = Game.#_oBoard.oBoardContext;
        Game.#_oBoard.Draw();
    }

    //Pacman initialization
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #pacManInit()
    {
        Game.#_oPacMan = new PacMan(Game.#_oBoard ,new PacManConfig());

        document.addEventListener('keydown',Game.KeyPressedHandler);
    }

    //Monsters initialization
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #monstersInit()
    {
        Game.#_oMonsterConfig = new MonstersConfig();
        for(let i=0;i<Game.#_oMonsterConfig.ArrImagePath.length;i++)
        {
            new Monster(Game.#_oBoard,Game.#_oMonsterConfig);
        }
    }

    //Game finished handling
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #gameWin()
    {
        Game.#setBestScore();
        Game.#_bBoardCanvasAnimated = true;
        Game.#_oBoardCanvasContext.font = "italic " + Game.#_iAnimateFont++ + "px Arial";
        Game.#_oBoardCanvasContext.shadowBlur = 10;
        Game.#_oBoardCanvasContext.shadowColor = "rgb(40,40,40)";
        Game.#_oBoardCanvasContext.shadowOffsetX = 8;
        Game.#_oBoardCanvasContext.shadowOffsetY = 8;
        Game.#_oBoardCanvasContext.textAlign = "center";
        Game.#_oBoardCanvasContext.fillStyle = "#ededed";
        Game.#_oBoardCanvasContext.fillText("You Win", 400, 370);
        Game.#_oBoardCanvasContext.fillText("You score : " + Game.#_oPacMan.iScore, 400, 370 + Game.#_iAnimateFont);
        Game.#_oBoardCanvasContext.fillText("You time : " + Game.#_iTimeMinutes + ":" + Game.#_iTimeSeconds, 400, 370 + Game.#_iAnimateFont + Game.#_iAnimateFont);

        if(Game.#_iAnimateFont > 110)
        {
            window.clearInterval(Game.#_oAnimateTimer);
            if(confirm("Are you want to play again?"))
            {
                Game.Run(Options.Player1Name);
            }
        }
    }

    //Game over handling
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #gameOver()
    {
        Game.#_bBoardCanvasAnimated = true;
        Game.#_oBoardCanvasContext.font = "italic " + Game.#_iAnimateFont++ + "px Arial";
        Game.#_oBoardCanvasContext.shadowBlur = 10;
        Game.#_oBoardCanvasContext.shadowColor = "rgb(40,40,40)";
        Game.#_oBoardCanvasContext.shadowOffsetX = 8;
        Game.#_oBoardCanvasContext.shadowOffsetY = 8;
        Game.#_oBoardCanvasContext.textAlign = "center";
        Game.#_oBoardCanvasContext.fillStyle = "#ededed";
        Game.#_oBoardCanvasContext.fillText("Game Over", 400, 370);
        Game.#_oBoardCanvasContext.fillText("You time : " + Game.#_iTimeMinutes + ":" + Game.#_iTimeSeconds, 400, 370 + Game.#_iAnimateFont);


        if(Game.#_iAnimateFont > 110)
        {
            window.clearInterval(Game.#_oAnimateTimer);
            if(confirm("Are you want to try again?"))
            {
                Game.Run(Options.Player1Name);
            }
        }
    }

    //Key pressed event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static KeyPressedHandler(event)
    {
        PacMan.OnKeyPressed(event,Game.#_oPacMan)
    }

    //Best score definition
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #setBestScore()
    {
        var iBestScore;

        if (typeof(Storage) != "undefined")
        {
            iBestScore = localStorage.getItem(Game.#_sBestScoreParName);
            if(Game.#_oPacMan.iScore>iBestScore)
            {
                localStorage.setItem(Game.#_sBestScorePlayerParName, Game.#_sPlayerName);
                localStorage.setItem(Game.#_sBestScoreParName, Game.#_oPacMan.iScore);
            }
                
        }
        else
        {
            iBestScore = Game.#_iTmpBestScore;
            if(iCurrentScore>iBestScore)
            {
                if(Game.#_iTmpBestScore = iCurrentScore)
                {
                    Game.Run(Options.Player1Name);
                }
            }
        }

        
    }

    //Best score presentation handling
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #showBestScoreField()
    {
        if (typeof(Storage) != "undefined" && localStorage.getItem(Game.#_sBestScoreParName) != null)
        {
            let bestScore = localStorage.getItem(Game.#_sBestScoreParName)
            Game.#_oDomElBestScore.innerHTML = "The best result [" + bestScore + "] was obtained by the player under the nickname " + localStorage.getItem(Game.#_sBestScorePlayerParName);
        }
        else
        {
            Game.#_oDomElBestScore.innerHTML = "You best result is [" + Game.#_iTmpBestScore + "]";
        }
    }

    //Clear voard canvas
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #clearBoardCanvas()
    {
        Game.#_oBoardCanvasContext.shadowBlur = 0;
        Game.#_oBoardCanvasContext.shadowOffsetX = 0;
        Game.#_oBoardCanvasContext.shadowOffsetY = 0;
        window.clearInterval(Game.#_oAnimateTimer);
        Game.#_oBoard.Clear();

        document.removeEventListener('keydown',Game.KeyPressedHandler);
    }

    //Show current time
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #showCurrentTime()
    {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var helloText;

        // add a zero in front of numbers<10
        m = Game.#checkTime(m);
        s = Game.#checkTime(s);

        switch(true)
        {
            case h<=12 && h>6:
                helloText = "Good morning";
                break;
            case h<=18 && h>12:
                helloText = "Good day";
                break;
            case h<=24 && h>18:
                helloText = "Good evening";
                break;
            case h<=612 && h>24:
                helloText = "Good night";
                break;
        }

        Game.#_oDomElCurrentTime.innerHTML = helloText + " " + Game.#_sPlayerName + " its "  + h + ":" + m + ":" + s;
    }

    //Format time digits
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static #checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    //#endregion //Private Methods

}