import {Board} from './Board.js';

//The class that represents the Pac Man object
export class PacMan extends Entity
{
    //#region Fields--------------------------------------------------------

    static #_oPacManConfig; //Pac man configuration object
    #_rCurrentAngleDelta;   //Pac Man's current mouth opening/closing angle
    #_bOpenMouth;           //Status of Pac Man's mouth position(true/false - openning/closing)

    //#endregion //Fields

    //#region Constructors--------------------------------------------------

    //Main constructor
    //Arguments:
    //  -   oBoard          - Link to instance of game board
    //  -   oPacManConfig   - Pac man configuration object
    //Return:
    //  -   None
    constructor(oBoard, oPacManConfig)
    {
        var oPacManCanvas = document.getElementById(oPacManConfig.CanvasName);

        PacMan.#_oPacManConfig = oPacManConfig;

        var iPacManDiametr = PacMan.#_oPacManConfig.BodyRadius*2;

        super(oPacManCanvas,oBoard,oBoard.RightEntityLimit,oBoard.DownEntityLimit,iPacManDiametr,iPacManDiametr);

        this.#_rCurrentAngleDelta = 0;

        document.addEventListener('keydown',(event) => 
        {
            PacMan.OnKeyPressed(event,this)
        });
        
        new Timer(this,Entity._oBoard.BoardSpeed,-1);
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Moves a Pac Man up
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveUp()
    {
        super._moveUp();
    }

    //Moves a Pac Man down
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveDown()
    {
        super._moveDown();
    }

    //Moves a Pac Man right
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveRight()
    {
        super._moveRight();
    }

    //Moves a Pac Man left
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    MoveLeft()
    {
        super._moveLeft();
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
                this.#drawEye(this.Center_X - PacMan.#_oPacManConfig.BodyRadius/2,this.Center_Y - PacMan.#_oPacManConfig.BodyRadius/2.5);
            break;
            case Direction.Down:
                this.#drawBody(Math.PI*0.5 + Math.PI - Math.PI*this.#_rCurrentAngleDelta,Math.PI*0.5 - Math.PI*this.#_rCurrentAngleDelta);
                this.#drawEye(this.Center_X - PacMan.#_oPacManConfig.BodyRadius/2,this.Center_Y + PacMan.#_oPacManConfig.BodyRadius/2.5);
            break;
            case Direction.Right:
                this.#drawBody(Math.PI*this.#_rCurrentAngleDelta,Math.PI + Math.PI*this.#_rCurrentAngleDelta,true);
                this.#drawEye(this.Center_X + PacMan.#_oPacManConfig.BodyRadius/2.5,this.Center_Y - PacMan.#_oPacManConfig.BodyRadius/2);
            break;
            case Direction.Left:
                this.#drawBody(Math.PI + Math.PI*this.#_rCurrentAngleDelta,Math.PI*this.#_rCurrentAngleDelta,true);
                this.#drawEye(this.Center_X - PacMan.#_oPacManConfig.BodyRadius/2.5,this.Center_Y - PacMan.#_oPacManConfig.BodyRadius/2);
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
        this.#drawCircle(this.Center_X,this.Center_Y,PacMan.#_oPacManConfig.BodyRadius,-(rStartAngle),-(rEndAngle),bFirstCounterClockwise,PacMan.#_oPacManConfig.BodyColor);
        this.#drawCircle(this.Center_X,this.Center_Y,PacMan.#_oPacManConfig.BodyRadius,rStartAngle,rEndAngle,bSecondCounterClockwise,PacMan.#_oPacManConfig.BodyColor);
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
        this.#drawCircle(rCenter_X,rCenter_Y,PacMan.#_oPacManConfig.EyeRadius,0,Math.PI*2,false,PacMan.#_oPacManConfig.EyeColor);
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
                this.#_rCurrentAngleDelta = this.#_rCurrentAngleDelta + PacMan.#_oPacManConfig.AngleDelta;
            else
                this.#_bOpenMouth = false;
        }
        else
        {
            if(this.#_rCurrentAngleDelta>0.05)
                this.#_rCurrentAngleDelta =this.#_rCurrentAngleDelta - PacMan.#_oPacManConfig.AngleDelta;
            else
                this.#_bOpenMouth = true;
        }
    }

    //#endregion //Private Methods
}