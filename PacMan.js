//The class that represents the Pac Man object
class PacMan extends Entity
{
    //#region Fields--------------------------------------------------------

    #_oPacManConfig;        //Pac man configuration object
    #_rCurrentAngleDelta;   //Pac Man's current mouth opening/closing angle
    #_bOpenMouth;           //Status of Pac Man's mouth position(true/false - openning/closing)
    #_bBlinkFlag = false;   //Indication flag - Pca Man should be blinked with different color
    #_bBlinkToggle = false; //Indication flag - for blinking implementation(true - draw pacman/false - clear him)
    #_iBlinkNum = 100;      //Number of blinks
    #_bBlinkCount = 0;      //Couner of blinks
    #_iScore = 10;          //Score
    #_iEatenCount = 0;      //Number of eaten balls or candies
    #_bDead = false;        //Indication flag - Score is negative - stop game
    #_oDomElWakaSound;      //Pac man sound when moving
    #_oDomElDeadSound;      //Pac man sound when Died
    #_oDomElMonsterSound;   //Intersection between Pac man and Monster sound

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Number of eaten balls or candies getter
    get iEatenAmount()
    {
        return this.#_iEatenCount;
    }

    //Score getter
    get iScore()
    {
        return this.#_iScore;
    }

    //Score setter
    set iScore(value)
    {
        this.#_iScore = value;

        if(this.#_iScore < 0)
            this.bDead = true;
    }

    //Indication flag - Score is negative - stop game getter
    get bDead()
    {
        return this.#_bDead;
    }

    //Indication flag - Pac Man is dead getter
    set bDead(value)
    {
        if(value == true)
            this.#_oDomElDeadSound.play();
        
        this.#_bDead = value;
    }

    //Indication flag - Pca Man should be blinked with different color getter
    get BlinkFlag()
    {
        return this.#_bBlinkFlag;
    }

    //Indication flag - Pca Man should be blinked with different color setter
    set BlinkFlag(value)
    {
        this.#_bBlinkFlag = value;
        if(this.#_bBlinkFlag == true)
            this.#_bBlinkCount = 0;
    }

    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    //Main constructor
    //Arguments:
    //  -   oBoard          - Link to instance of game board
    //  -   oPacManConfig   - Pac man configuration object
    //Return:
    //  -   None
    constructor(oBoard, oPacManConfig)
    {
        var oPacManCanvas = document.getElementById(oPacManConfig.sCanvasName);

        var iPacManDiametr = oPacManConfig.rBodyRadius*2;

        super(oPacManCanvas,oBoard,oBoard.RightEntityLimit,oBoard.DownEntityLimit,iPacManDiametr,iPacManDiametr);

        this.#_oPacManConfig = oPacManConfig;
        this.#_rCurrentAngleDelta = 0;

        this.#_oDomElWakaSound = this.#setSound(this.#_oPacManConfig.sSoundPath)
        this.#_oDomElDeadSound =  this.#setSound(this.#_oPacManConfig.sDeadSoundPath);
        this.#_oDomElMonsterSound =  this.#setSound(this.#_oPacManConfig.sMonsterSoundPath);
        new Timer(this,Entity._oBoard.BoardSpeed,-1);
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Play Pac Man intersection music
    IntersecMonsterSound()
    {
        this.#_oDomElMonsterSound.play();
    }
    
    //Moves a Pac Man up
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveUp()
    {
        var oData = false;
        var i;
        var j;
        
        oData = super._moveUp();

        
        if(this.rCenter_Y - Entity._oBoard.arrBoardCells[oData.i][oData.j].rCenter_Y <= 8 && Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten == false)
        {
            Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten = true;
            this.iScore += Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore
            
            if(Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore < 0)
            {
                this.BlinkFlag = true;
            }
            else
            {
                this.#_iEatenCount++;
            }
                
        }
    }

    //Moves a Pac Man down
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveDown()
    {
        var oData = false;
        
        oData = super._moveDown();

        if(Entity._oBoard.arrBoardCells[oData.i][oData.j].rCenter_Y - this.rCenter_Y <= 8 && Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten == false)
        {
            Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten = true;
            this.iScore += Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore
            
            if(Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore < 0)
            {
                this.BlinkFlag = true;
            }
            else
            {
                this.#_iEatenCount++;
            }
        }
    }

    //Moves a Pac Man right
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveRight()
    {
        var oData = false;
        
        oData = super._moveRight();

        if(Entity._oBoard.arrBoardCells[oData.i][oData.j].rCenter_X - this.rCenter_X <= 8 && Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten == false)
        {
            Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten = true;
            this.iScore += Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore
            console.log(this.iScore);

            if(Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore < 0)
            {
                this.BlinkFlag = true;
            }
            else
            {
                this.#_iEatenCount++;
            }
        }
    }

    //Moves a Pac Man left
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveLeft()
    {
        var oData = false;
        
        oData = super._moveLeft();

        if(this.rCenter_X - Entity._oBoard.arrBoardCells[oData.i][oData.j].rCenter_X <= 8 && Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten == false)
        {
            Entity._oBoard.arrBoardCells[oData.i][oData.j].bEaten = true;
            this.iScore += Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore

            if(Entity._oBoard.arrBoardCells[oData.i][oData.j].iScore < 0)
            {
                this.BlinkFlag = true;
            }
            else
            {
               this.#_iEatenCount++;
            }
        }
    }

    //On tick event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    OnTick()
    {
        this.#draw();
    }

    //Key presssed event handler event handler
    //Arguments:
    //  -   event  - Event data
    //  -   pacman - Link to current instance
    //Return:
    //  -   None
    static OnKeyPressed(event, pacman)
    {
        switch(Direction.GetKeyDirByName(event.key))
        {
            case Direction.Up:
                pacman.MoveUp();
            break;

            case Direction.Down:
                pacman.MoveDown();
            break;

            case Direction.Left:
                pacman.MoveLeft();
            break;

            case Direction.Right:
                pacman.MoveRight();
            break;

        };
    }

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Draws regular or blinking Pac Man
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #draw()
    {
        if(!this.#_bBlinkFlag)
        {
            this._clearEntity();
            this.#drawPacMan();
        }
        else
        {
            if(this.#_bBlinkFlag && !this.#_bBlinkToggle)
            {
                
                this._clearEntity();
                if(this.#_bBlinkFlag)
                {
                    this.#_bBlinkToggle = true;
                }
            }
            else
            {
                this.#drawPacMan();

                if(this.#_bBlinkFlag)
                {
                    this.#_bBlinkToggle = false;
                    this.#_bBlinkCount++;
                    this.#_bBlinkFlag = this.#_bBlinkCount <= this.#_iBlinkNum;
                }
            }
        }
    }

    //Draws regular Pac Man
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #drawPacMan()
    {
        switch(this._iCurrentDirection)
        {
            case Direction.Up:
                this.#drawBody((Math.PI/4+Math.PI/4)-Math.PI*this.#_rCurrentAngleDelta,(Math.PI+Math.PI/4+Math.PI/4) - Math.PI*this.#_rCurrentAngleDelta);
                this.#drawEye(this.rCenter_X - this.#_oPacManConfig.rBodyRadius/2,this.rCenter_Y - this.#_oPacManConfig.rBodyRadius/2.5);
            break;
            case Direction.Down:
                this.#drawBody(Math.PI*0.5 + Math.PI - Math.PI*this.#_rCurrentAngleDelta,Math.PI*0.5 - Math.PI*this.#_rCurrentAngleDelta);
                this.#drawEye(this.rCenter_X - this.#_oPacManConfig.rBodyRadius/2,this.rCenter_Y + this.#_oPacManConfig.rBodyRadius/2.5);
            break;
            case Direction.Right:
                this.#drawBody(Math.PI*this.#_rCurrentAngleDelta,Math.PI + Math.PI*this.#_rCurrentAngleDelta,true);
                this.#drawEye(this.rCenter_X + this.#_oPacManConfig.rBodyRadius/2.5,this.rCenter_Y - this.#_oPacManConfig.rBodyRadius/2);
            break;
            case Direction.Left:
                this.#drawBody(Math.PI + Math.PI*this.#_rCurrentAngleDelta,Math.PI*this.#_rCurrentAngleDelta,true);
                this.#drawEye(this.rCenter_X - this.#_oPacManConfig.rBodyRadius/2.5,this.rCenter_Y - this.#_oPacManConfig.rBodyRadius/2);
            break;

            default:
                console.log("Error: wrong direction was received")
                break;
        }
    }

    //Draws the body of Pac Man(drawn with 2 half circles)
    //Arguments:
    //  -   rStartAngle             - The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
    //  -   rEndAngle               - The ending angle, in radians
    //  -   bFirstCounterClockwise  - Specifies whether the first half circle should be counterclockwise or clockwise
    //  -   bSecondCounterClockwise - Specifies whether the second half circle should be counterclockwise or clockwise
    //Return:
    //  -   None
    #drawBody(rStartAngle, rEndAngle,bFirstCounterClockwise = false,bSecondCounterClockwise = false)
    {
        var sColor;

        if(!this.#_bBlinkFlag)
        {
            sColor = this.#_oPacManConfig.sBodyColor
        }
        else
        {
            sColor = this.#_oPacManConfig.sBodyBlinkColor
        }

        this.#drawCircle(this.rCenter_X,this.rCenter_Y,this.#_oPacManConfig.rBodyRadius,-(rStartAngle),-(rEndAngle),bFirstCounterClockwise,sColor);
        this.#drawCircle(this.rCenter_X,this.rCenter_Y,this.#_oPacManConfig.rBodyRadius,rStartAngle,rEndAngle,bSecondCounterClockwise,sColor);
        this.#setAngle();
    }

    //Draws the eye of Pac Man
    //Arguments:
    //  -   rCenter_X   - The x-coordinate of the center of the eye
    //  -   rCenter_Y   - The y-coordinate of the center of the eye
    //Return:
    //  -   None
    #drawEye(rCenter_X,rCenter_Y)
    {
        this.#drawCircle(rCenter_X,rCenter_Y,this.#_oPacManConfig.rEyeRadius,0,Math.PI*2,false,this.#_oPacManConfig.sEyeColor);
    }

    //Draws a circle with a filled body
    //Arguments:
    //  -   rCenter_X           - The x-coordinate of the center of the circle
    //  -   rCenter_Y           - The y-coordinate of the center of the circle
    //  -   rRadius             - The radius of the circle
    //  -   rStartAngle         - The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
    //  -   rEndAngle           - The ending angle, in radians
    //  -   bCounterClockwise   - Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
    //  -   sColor              - Body background color
    //Return:
    //  -   None
    #drawCircle(rCenter_X,rCenter_Y,rRadius,rStartAngle,rEndAngle,bCounterClockwise,sColor)
    {
        this._oContext.beginPath();
        this._oContext.arc(rCenter_X,rCenter_Y,rRadius,rStartAngle,rEndAngle,bCounterClockwise);
        this._oContext.fillStyle = sColor;
        this._oContext.fill();
    }

    //Set the current delta of Pac Man's mouth opening/closing angle
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #setAngle()
    {
        if(this.#_bOpenMouth)
        {
            if(this.#_rCurrentAngleDelta<0.2)
                this.#_rCurrentAngleDelta = this.#_rCurrentAngleDelta + this.#_oPacManConfig.rAngleDelta;
            else
                this.#_bOpenMouth = false;
        }
        else
        {
            if(this.#_rCurrentAngleDelta>0.05)
                this.#_rCurrentAngleDelta =this.#_rCurrentAngleDelta - this.#_oPacManConfig.rAngleDelta;
            else
                this.#_bOpenMouth = true;
        }
    }

    //Get an existing sound DOM element, or define a new one if it doesn't exist
     //Arguments:
    //  -   sSoundPath - Path to sound element in the DOM
    //Return:
    //  -   Link to sound instance in the DOM
    #setSound(sSoundPath)
    {
        var oDomElSound = document.getElementById(sSoundPath);
        if(!oDomElSound)
        {
            oDomElSound= document.createElement("audio");
            oDomElSound.src = this.#_oPacManConfig.sMonsterSoundPath;
            oDomElSound.setAttribute("preload", "auto");
            oDomElSound.setAttribute("controls", "none");
            oDomElSound.style.display = "none";
            document.body.appendChild(oDomElSound);
        }

        return oDomElSound
    }

    //#endregion //Private Methods
}