//The class that represents the Pac Man object
class PacMan extends Entity
{
    //#region Fields--------------------------------------------------------

    #_rAngleDelta;          //Step/Delta to change the angle when drawing the opening/closing of the mouth of Pac Man
    #_rCurrentAngleDelta;   //Pac Man's current mouth opening/closing angle
    #_sBodyColor;           //Pac Man's body background color
    #_rBodyRadius;          //Pac Man's body radius
    #_sEyeColor;            //Pac Man's eye background color
    #_rEyeRadius;           //Pac Man's eye radius
    #_bOpenMouth;           //Status of Pac Man's mouth position(true/false - openning/closing)

    //#endregion //Fields

    //#region Properties----------------------------------------------------
    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    //Main constructor
    //Arguments:
    //  -   oCanvas             - Link to instance of canvas object
    //  -   rCenter_Y           - The x-coordinate of the center of the Pac Man
    //  -   rCenter_Y           - The y-coordinate of the center of the Pac Man
    //  -   rBodyRadius         - (Optional)Pac Man's body radius. Default - Right
    //  -   rEyeRadius          - (Optional)Pac Man's eye radius. Default - Right
    //  -   sBodyColor          - (Optional)Pac Man's body background color. Default - Right
    //  -   sEyeColor           - (Optional)Pac Man's eye background color. Default - Right
    //Return:
    //  -   None
    constructor(oCanvas,rCenter_X, rCenter_Y, rBodyRadius = 30, rEyeRadius = 5, sBodyColor = "mediumslateblue", sEyeColor = "black")
    {
        var iSideSize = rBodyRadius*2;
        super(oCanvas,rCenter_X,rCenter_Y,iSideSize,iSideSize);

        this.#_sBodyColor = sBodyColor;
        this.#_sEyeColor = sEyeColor;
        this.#_rAngleDelta = 0.05;
        this.#_rCurrentAngleDelta = 0;
        this.#_rBodyRadius = rBodyRadius;
        this.#_rEyeRadius = rEyeRadius;
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Draws Pac Man
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    Draw()
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

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

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