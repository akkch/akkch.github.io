//The class that represents the Monster object
class Monster extends Entity
{
    //#region Fields--------------------------------------------------------

    #_sImagePath;   //Path to Monster image
    #_oImg;		    //Link to image
    #_iImgSize;     //Image size in pixels

    //#endregion //Fields

    //#region Properties----------------------------------------------------
    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    //Main Constructor
    //Arguments:
    //  -   oCanvas     - Link to instance of canvas object
    //  -   rCenter_Y   - The x-coordinate of the center of the Pac Man
    //  -   rCenter_Y   - The y-coordinate of the center of the Pac Man
    //  -   sImagePath  - Path to Monster image
    //  -   iImgSize    - Size of Monster image(In px)
    //Return:
    //  -   None
    constructor(oCanvas,rCenter_X, rCenter_Y, sImagePath, iImgSize)
    {
        super(oCanvas,rCenter_X,rCenter_Y,iImgSize,iImgSize);
        
        this.#_sImagePath = sImagePath;
        this.#_iImgSize = iImgSize;

        this.#_oImg = new Image();
        this.#_oImg.src = this.#_sImagePath;
        this.Draw();
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Draws Monster
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    Draw()
    {
        this._clearEntity();
        this.#drawImage(this._oContext, this.#_oImg, this.#GetImgCoord(this.Center_X), this.#GetImgCoord(this.Center_Y));
    }

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Draw type image
    //Arguments:
    //  -   oContext    - Canvas context
    //  -   oImg        - Image instance
    //  -   rX          - Image location X-axis coordinate
    //  -   rY          - Image location Y-axis coordinate
    //Return:
    //  -   None
    #drawImage(oContext, oImg, rX, rY)
    {
        if(!oImg.complete )
            oImg.onload = function()
            {
                oContext.drawImage(oImg,rX,rY);
            }
        else
        oContext.drawImage(oImg,rX,rY);
    }

    //Calculate the initial image coordinate relative to the center
    //Arguments:
    //  -   rCenterCoord    - Cell center requested coordinate
    //Return:
    //  -   Calculated coordinate
    #GetImgCoord(rCenterCoord)
    {
        return rCenterCoord - this.#_iImgSize/2;
    }

    //#endregion //Private Methods
}