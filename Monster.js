//The class that represents the list of Monster objects
class Monsters
{
    //#region Fields--------------------------------------------------------

    static #_oMonstConf = new MonstersConfig();
    static iInitialPos_X = 40;
    static iInitialPos_Y = 40;
    static iStep = 80;

    //#endregion //Fields

    //#region Public Methods------------------------------------------------

    //Runs all the monsters
    //Arguments:
    //  -   oBoard    - Link to the game board
    //Return:
    //  -   None
    static Run(oBoard)
    {
        var MosterCanvas = document.getElementById(Monsters.#_oMonstConf.CanvasName);
        for(let i=0;i<Monsters.#_oMonstConf.ArrImagePath.length;i++)
        {
            new Monster(oBoard,MosterCanvas,Monsters.iInitialPos_X, Monsters.#setInitPosition(i,Monsters.iInitialPos_Y) ,Monsters.#_oMonstConf.ArrImagePath[i],Monsters.#_oMonstConf.ImageSize);
        }
    }
    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Set initial position of current moster
    //Arguments:
    //  -   iMonsterNum             - Number of current monster
    //  -   iFirstMonsteInitCoord   - Initial position of first monster coordinate
    //Return:
    //  -   Initial position of current moster
    static #setInitPosition(iMonsterNum, iFirstMonsteInitCoord)
    {
        return iFirstMonsteInitCoord + (iMonsterNum*Monsters.iStep);
    }

    //#endregion //Private Methods
}


//The class that represents the Monster object
class Monster extends Entity
{
    //#region Fields--------------------------------------------------------

    static #_arrMonsters = [];  //List of monster instances
    static #_oBoard;            //Link to game board
    #_sImagePath;               //Path to Monster image
    #_oImg;		                //Link to image
    #_iImgSize;                 //Image size in pixels
    #_bMoved;                   //Moving indication flag

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
    constructor(oBoard, oCanvas, rCenter_X, rCenter_Y, sImagePath, iImgSize)
    {
        super(oCanvas,rCenter_X,rCenter_Y,iImgSize,iImgSize);
        
        this.#_sImagePath = sImagePath;
        this.#_iImgSize = iImgSize;

        this.#_oImg = new Image();
        this.#_oImg.src = this.#_sImagePath;
        this.#draw();

        this.#_bMoved = false;

        Monster.#_oBoard = oBoard;
        Monster.#_arrMonsters.push(this);

        new Timer(this,Monster.#_oBoard.BoardSpeed,-1);
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //On tick event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    OnTick()
    {
        switch(this._iCurrentDirection)
        {
            case 0:
                this.#_bMoved = super.MoveUp(Monster.#_oBoard,Monster.#_arrMonsters);
            break;
    
            case 1:
                this.#_bMoved = super.MoveDown(Monster.#_oBoard,Monster.#_arrMonsters);
            break;
    
            case 2:
                this.#_bMoved = super.MoveRight(Monster.#_oBoard,Monster.#_arrMonsters);
            break;
    
            case 3:
                this.#_bMoved = super.MoveLeft(Monster.#_oBoard,Monster.#_arrMonsters);
            break;
    
            default:
                alert("Error direction was received : " + this._iCurrentDirection);
                this._iCurrentDirection = Direction.Right;
                break
        };
    
        if(this.#_bMoved == true)
        {
            this.#draw();
        }
        else
        {
            this._iCurrentDirection = Math.floor(Math.random() * 4);
        }
    }
    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Draws Monster
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #draw()
    {
        this._clearEntity();
        this.#drawImage(this._oContext, this.#_oImg, this.#GetImgCoord(this.Center_X), this.#GetImgCoord(this.Center_Y));
    }

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