//The class that represents the Pac Man object
class PacMan extends Entity
{
    //#region Fields--------------------------------------------------------

    static #_oBoard;        //Link to game board
    static #_oPacManConfig; //Pac man configuration object
    #_rCurrentAngleDelta;   //Pac Man's current mouth opening/closing angle
    #_bOpenMouth;           //Status of Pac Man's mouth position(true/false - openning/closing)

    //#endregion //Fields

    //#region Properties----------------------------------------------------
    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    //Main constructor
    //Arguments:
    //  -   oBoard          - Link to instance of game board
    //  -   oPacManConfig   - Pac man configuration object
    //  -   oCanvas         - Link to instance of canvas object
    //Return:
    //  -   None
    constructor(oBoard, oPacManConfig, oCanvas)
    {
        PacMan.#_oBoard = oBoard;
        PacMan.#_oPacManConfig = oPacManConfig;

        var iPacManDiametr = PacMan.#_oPacManConfig.BodyRadius*2;

        super(oCanvas,oBoard.RightEntityLimit,oBoard.DownEntityLimit,iPacManDiametr,iPacManDiametr);
        
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Moves a Entity up
    //Arguments:
    //  -   oBoard      - Link to game board
    //  -   arrEntities - List of entities participating in the game
    //Return:
    //  -   true/false - Was moved/not
    MoveUp(oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(oBoard != -1 && arrEntities != -1 && this.#IsUpDirectionFree(arrEntities,oBoard.BoardSpeed) && this.Center_Y>oBoard.TopEntityLimit)
        {
            this.#setY(this.Center_Y - oBoard.BoardSpeed);
            this._iCurrentDirection = Direction.Up;
            bIsMoved = true;
        }

        return bIsMoved;
    }

    //Moves a Entity down
    //Arguments:
    //  -   oBoard      - Link to game board
    //  -   arrEntities - List of entities participating in the game
    //Return:
    //  -   true/false - Was moved/not
    MoveDown(oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(oBoard != -1 && arrEntities != -1 && this.#IsDownDirectionFree(arrEntities,oBoard.BoardSpeed) && this.Center_Y<oBoard.DownEntityLimit)
        {
            this.#setY(this.Center_Y + oBoard.BoardSpeed);
        this._iCurrentDirection = Direction.Down;
            bIsMoved = true;
        }

        return bIsMoved
    }

    //Moves a Entity right
    //Arguments:
    //  -   oBoard      - Link to game board
    //  -   arrEntities - List of entities participating in the game
    //Return:
    //  -   true/false - Was moved/not
    MoveRight(oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(oBoard != -1 && arrEntities != -1 && this.#IsRightDirectionFree(arrEntities,oBoard.BoardSpeed) && this.Center_X<oBoard.RightEntityLimit)
        {
            this.#setX(this.#_rCenter_X + oBoard.BoardSpeed);
            this._iCurrentDirection = Direction.Right;
            bIsMoved = true;
        }

        return bIsMoved
    }

    //Moves a Entity left
    //Arguments:
    //  -   oBoard      - Link to game board
    //  -   arrEntities - List of entities participating in the game
    //Return:
    //  -   true/false - Was moved/not
    MoveLeft(oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(oBoard != -1 && arrEntities != -1 && this.#IsLeftDirectionFree(arrEntities,oBoard.BoardSpeed) && this.Center_X>oBoard.LeftEntityLimit)
        {
            this.#setX(this.#_rCenter_X - oBoard.BoardSpeed);
            this._iCurrentDirection = Direction.Left;
            bIsMoved = true;
        }

        return bIsMoved
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


    OnKeyPressed(event)
    {
        switch(Direction.GetKeyDirByName(event.key))
        {
            case Direction.Down:
                if(pacMan.Center_Y>rPacManStartPos_Y)
                    pacMan.MoveUp(speed);
            break;

            case Direction.Down:
                if(pacMan.Center_Y<rPacManEndPos_Y)
                    pacMan.MoveDown(speed);
            break;

            case Direction.Down:
                if(pacMan.Center_X>rPacManStartPos_X)
                    pacMan.MoveLeft(speed);
            break;

            case Direction.Down:
                if(pacMan.Center_X<rPacManEndPos_X)
                    pacMan.MoveRight(speed);
            break;

        };
    }

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Draws Pac Man
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #draw()
    {
        this._clearEntity();
        switch(this._iCurrentDirection)
        {
            case Direction.Up:
                this.#drawBody((Math.PI/4+Math.PI/4)-Math.PI*this.#_rCurrentAngleDelta,(Math.PI+Math.PI/4+Math.PI/4) - Math.PI*this.#_rCurrentAngleDelta);
                this.#drawEye(this.Center_X - this.#_rBodyRadius/2,this.Center_Y - this.#_rBodyRadius/2.5);
            break;
            case Direction.Down:
                this.#drawBody(Math.PI*0.5 + Math.PI - Math.PI*this.#_rCurrentAngleDelta,Math.PI*0.5 - Math.PI*this.#_rCurrentAngleDelta);
                this.#drawEye(this.Center_X - this.#_rBodyRadius/2,this.Center_Y + this.#_rBodyRadius/2.5);
            break;
            case Direction.Right:
                this.#drawBody(Math.PI*this.#_rCurrentAngleDelta,Math.PI + Math.PI*this.#_rCurrentAngleDelta,true);
                this.#drawEye(this.Center_X + this.#_rBodyRadius/2.5,this.Center_Y - this.#_rBodyRadius/2);
            break;
            case Direction.Left:
                this.#drawBody(Math.PI + Math.PI*this.#_rCurrentAngleDelta,Math.PI*this.#_rCurrentAngleDelta,true);
                this.#drawEye(this.Center_X - this.#_rBodyRadius/2.5,this.Center_Y - this.#_rBodyRadius/2);
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
        this.#drawCircle(this.Center_X,this.Center_Y,this.#_rBodyRadius,-(rStartAngle),-(rEndAngle),bFirstCounterClockwise,this.#_sBodyColor);
        this.#drawCircle(this.Center_X,this.Center_Y,this.#_rBodyRadius,rStartAngle,rEndAngle,bSecondCounterClockwise,this.#_sBodyColor);
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
        this.#drawCircle(rCenter_X,rCenter_Y,this.#_rEyeRadius,0,Math.PI*2,false,this.#_sEyeColor);
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
                this.#_rCurrentAngleDelta = this.#_rCurrentAngleDelta + this.#_rAngleDelta;
            else
                this.#_bOpenMouth = false;
        }
        else
        {
            if(this.#_rCurrentAngleDelta>0.05)
                this.#_rCurrentAngleDelta =this.#_rCurrentAngleDelta - this.#_rAngleDelta;
            else
                this.#_bOpenMouth = true;
        }
    }

    //#endregion //Private Methods
}