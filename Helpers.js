//The class that represents the Entity object
class Entity
{
    //#region Fields--------------------------------------------------------

    static _oBoard;    //Link to game board

    _iBodyWidth;       //Entity width
    _iBodyHeight;      //Entity height

    #_rCenter_X;        //Point on the X-axis
    #_rCenter_Y;        //Point on the Y-axis
    _oCanvas;           //Link to canvas
    _oContext;          //Link to canvas context
    _iCurrentDirection; //Entity's current direction

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Getter for The x-coordinate of the center of the Entity in current position
    get rCenter_X()
    {
        return this.#_rCenter_X;
    }

    //Getter for The y-coordinate of the center of the Entity in current position
    get rCenter_Y()
    {
        return this.#_rCenter_Y;
    }

    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    //Main constructor
    //Arguments:
    //  -   oCanvas     - Link to instance of canvas object
    //  -   rCenter_X   - The x-coordinate of the center of the Entity
    //  -   rCenter_Y   - The y-coordinate of the center of the Entity
    //  -   iBodyWidth  - Entity width
    //  -   iBodyHeight - Entity height
    //Return:
    //  -   None
    constructor(oCanvas,oBoard,rCenter_X, rCenter_Y, iBodyWidth, iBodyHeight)
    {
        this._oCanvas = oCanvas;
        Entity._oBoard = oBoard;
        this._oContext = this._oCanvas.getContext('2d');
        this.#_rCenter_X = rCenter_X;
        this.#_rCenter_Y = rCenter_Y;
        this._iBodyWidth = iBodyWidth;
        this._iBodyHeight = iBodyHeight;
        this._iCurrentDirection = Direction.Right;
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Clear the Pacman canvas
    Clear()
    {
        this._oContext.clearRect(0, 0, this._oCanvas.width, this._oCanvas.height);
    }

    //#endregion //Public Methods

    //#region Protected Methods------------------------------------------------

    //Moves a Entity up
    //Arguments:
    //  -   rSpeedRatio - The ratio of the speed of monsters relative to the speed of the board
    //Return:
    //  -   None
    _moveUp(rSpeedRatio = 1)
    {
        var bIsMoved = false;
        var indexes = this.#getIndexes();

        var i = Math.ceil(indexes.i_raw);
        var j = Math.ceil(indexes.j_raw);

        if(this.rCenter_Y>Entity._oBoard.TopEntityLimit && (this.rCenter_X + Entity._oBoard.BoardCellSize/2)%Entity._oBoard.BoardCellSize == 0 && !Entity._oBoard.arrBoardCells[i][j].bUpBoard)
        {
            this.#setY(this.rCenter_Y - Entity._oBoard.BoardSpeed*rSpeedRatio);
            this._iCurrentDirection = Direction.Up;

            bIsMoved = true;
        }
        else
        {
           // console.log(indexes.i + " " + indexes.j);
        }
            
        return { bIsMoved , i , j }
    }

    //Moves a Entity down
    //Arguments:
    //  -   rSpeedRatio - The ratio of the speed of monsters relative to the speed of the board
    //Return:
    //  -   None
    _moveDown(rSpeedRatio = 1)
    {
        var bIsMoved = false;
        var indexes = this.#getIndexes();

        var i = Math.floor(indexes.i_raw);
        var j = Math.floor(indexes.j_raw);

        if(this.rCenter_Y<Entity._oBoard.DownEntityLimit && (this.rCenter_X + Entity._oBoard.BoardCellSize/2)%Entity._oBoard.BoardCellSize == 0 && !Entity._oBoard.arrBoardCells[i][j].bDownBoard)
        {
            this.#setY(this.rCenter_Y + Entity._oBoard.BoardSpeed*rSpeedRatio);
            this._iCurrentDirection = Direction.Down;
            bIsMoved = true;
        }
        else
        {
           // console.log("Down : " + indexes.i + " " + indexes.j);
        }
            
        return { bIsMoved , i , j }
    }

    //Moves a Entity right
    //Arguments:
    //  -   rSpeedRatio - The ratio of the speed of monsters relative to the speed of the board
    //Return:
    //  -   None
    _moveRight(rSpeedRatio = 1)
    {
        var bIsMoved = false;
        var indexes = this.#getIndexes();

        var i = Math.floor(indexes.i_raw);
        var j = Math.floor(indexes.j_raw);
        
        if(this.rCenter_X<Entity._oBoard.RightEntityLimit && (this.rCenter_Y + Entity._oBoard.BoardCellSize/2)%Entity._oBoard.BoardCellSize == 0 && !Entity._oBoard.arrBoardCells[i][j].bRightBoard)
        {
            this.#setX(this.#_rCenter_X + Entity._oBoard.BoardSpeed*rSpeedRatio);
            this._iCurrentDirection = Direction.Right;
            bIsMoved = true;
        }
            
        return { bIsMoved , i , j }
    }

    //Moves a Entity left
    //Arguments:
    //  -   rSpeedRatio - The ratio of the speed of monsters relative to the speed of the board
    //Return:
    //  -   None
    _moveLeft(rSpeedRatio = 1)
    {
        var bIsMoved = false;
        var indexes = this.#getIndexes();

        var i = Math.ceil(indexes.i_raw);
        var j = Math.ceil(indexes.j_raw);
        
        if(this.rCenter_X>Entity._oBoard.LeftEntityLimit && (this.rCenter_Y + Entity._oBoard.BoardCellSize/2)%Entity._oBoard.BoardCellSize == 0 && !Entity._oBoard.arrBoardCells[i][j].bLeftBoard)
        {
            this.#setX(this.#_rCenter_X - Entity._oBoard.BoardSpeed*rSpeedRatio);
            this._iCurrentDirection = Direction.Left;
            bIsMoved = true;
        }
            
        return { bIsMoved , i , j }
    }

    //Clear the Entity from current position
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    _clearEntity()
    {
        this._oContext.clearRect(this.rCenter_X - this._iBodyWidth/2, this.rCenter_Y - this._iBodyHeight/2, this._iBodyWidth , this._iBodyHeight);
    }

    //#endregion //Protected Methods

    //#region Private Methods-----------------------------------------------

    //Setter for The x-coordinate of the center of the Entity.
    //Implemented through regular method(not setter) because should be private
    //Arguments:
    //  -   value - New coordinate at Y-axis
    //Return:
    //  -   None
    #setX(value)
    {
        this._clearEntity();
        this.#_rCenter_X = value;
    }

    //Setter for The y-coordinate of the center of the Entity.
    //Implemented through regular method(not setter) because should be private
    //Arguments:
    //  -   value - New coordinate at Y-axis
    //Return:
    //  -   None
    #setY(value)
    {
        this._clearEntity();
        this.#_rCenter_Y = value;
    }

    //Get cel indexes by coordinates
    #getIndexes()
    {
        var i_raw;
        var j_raw;

        i_raw = (this.rCenter_Y + Entity._oBoard.BoardCellSize/2)/Entity._oBoard.BoardCellSize -1;
        j_raw = (this.rCenter_X + Entity._oBoard.BoardCellSize/2)/Entity._oBoard.BoardCellSize -1;

        return {i_raw,j_raw};
    }

    //#endregion //Private Methods
}

//Class represents directional flags(For using as Enum)
class Direction
{
    static Up = 0;
    static Down = 1;
    static Right = 2;
    static Left = 3;

    static GetKeyDirByName(name)
    {
        switch(name)
        {
            case "ArrowUp":
                return Direction.Up;
            break;

            case "ArrowDown":
                return Direction.Down;
            break;

            case "ArrowLeft":
                return Direction.Left;
            break;

            case "ArrowRight":
                return Direction.Right;
            break;
        };
    }
}

//The class represents data about all possible cell content types
class CellsContent
{
    //#region Fields--------------------------------------------------------

    static arrTypes         = [];   //An array that stores all possible cell content types
    static arrRemainTypes   = [];	//The array stores the number of remaining elements for each type that can be thrown onto the board.The array stores the number of remaining elements for each type that can be thrown onto the board.
    static NoLeftElements = -1;     //Indication flag - no elements from this type

    //#endregion //Fields

    //#region Public Methods------------------------------------------------

    //Filling an Array with Possible Types
    //Arguments:
    //  -   oCellTypeConfig
    //Return:
    //  -   None
    static SetConfig(oCellTypeConfig)
    {
        for(let i=0;i<oCellTypeConfig.arrIds.length;i++)
        {
            CellsContent.arrTypes[i] = new Type(oCellTypeConfig.arrIds[i], oCellTypeConfig.arrScores[i], oCellTypeConfig.arrImgPathes[i], oCellTypeConfig.iTypeImgSize, oCellTypeConfig.arrSndPathes[i]);
            CellsContent.arrRemainTypes[i] = oCellTypeConfig.iCellsAmount*oCellTypeConfig.arrRatios[i];
        }
    }

    //Get a random type or "CellContentTypesId.NoRemainType" if there are no elements left
    //Arguments:
    //  -   None
    //Return:
    //  -   A random type or "CellContentTypesId.NoRemainType" if there are no elements left
    static GetRandomType()
    {
        var iTypeId = CellsContent.NoLeftElements;

        if(CellsContent.#IsThereRemainType())
        {
            do
            {
                iTypeId = Math.floor(Math.random() * Type.length);
            }while(!CellsContent.#IsTypeLeft(iTypeId));
        }

        if(iTypeId != CellsContent.NoLeftElements)
        {
            CellsContent.arrRemainTypes[iTypeId]--;
            let currType = CellsContent.arrTypes[iTypeId].Clone();
            currType.oSound = CellsContent.arrTypes[iTypeId].oSound;
            return currType;
        }

        return CellsContent.NoLeftElements;
    }

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Checks if there are elements left that can be thrown on the board
    //Arguments:
    //  -   None
    //Return:
    //  -   true/false - left/not
    static #IsThereRemainType()
    {
        for(let i=0; i<this.arrRemainTypes.length;i++)
        {
            if(CellsContent.#IsTypeLeft(i))
            {
                return true;
            }
        }

        return false;
    }

    //Checks if there are elements of the requested type left
    //Arguments:
    //  -   iTypeId - ID of requested type
    //Return:
    //  -   true/false - left/not
    static #IsTypeLeft(iTypeId)
    {
        return CellsContent.arrRemainTypes[iTypeId]>0;
    }

    //#endregion //Private Methods

}

//The class represents the content type of the cell
class Type
{
    //#region Fields--------------------------------------------------------

    #_sImagePath;   //Path to type image
    #_oImg;		    //Link to image
    #_oSound;		//Link to sound
    #_iImgSize;     //Image size in pixels

    iID;     //Type ID
    iScore;  //Type points amount

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Image size getter
    get iImageSize()
    {
        return this.#_iImgSize;
    }

    //Link to sound element in the DOM getter
    get oSound()
    {
        return this.#_oSound;
    }

    //Link to sound element in the DOM setter
    set oSound(value)
    {
        this.#_oSound = value;
    }

    //#endregion //Properties

    //#region Constructors--------------------------------------------------
       
    //Main constructor
    //Arguments:
    //  -   iID         - Entity ID
    //  -   iScore      - Number of points
    //  -   sImagePath  - Path to image
    //  -   iImgSize    - Size of image
    //  -   sSndPath  - Path to sound
    //Return:
    //  -   None
    constructor(iID, iScore, sImagePath, iImgSize, sSndPath)
    {
        this.iID = iID;
        this.iScore = iScore;
        this.#_sImagePath = sImagePath;
        this.#_iImgSize = iImgSize;

        this.#_oSound = document.getElementById(sSndPath);

        if(!this.#_oSound)
        {
            this.#_oSound = document.createElement("audio");
            this.#_oSound.src = sSndPath;
            this.#_oSound.setAttribute("preload", "auto");
            this.#_oSound.setAttribute("controls", "none");
            this.#_oSound.setAttribute("id", sSndPath);
            this.#_oSound.style.display = "none";
            document.body.appendChild(this.#_oSound);
        }
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------
    
    //Draws the type on the canvas according to the requested coordinates
    //Arguments:
    //  -   oContext    - Canvas context
    //  -   rCenterX    - Cell center X-axis coordinate
    //  -   rCenterY    - Cell center Y-axis coordinate
    //Return:
    //  -   None
    Draw(oContext, rCenterX, rCenterY)
    {
        this.#_oImg = new Image();
        this.#_oImg.src = this.#_sImagePath;
        this.#drawImage(oContext, this.#_oImg, this.#GetImgCoord(rCenterX), this.#GetImgCoord(rCenterY));
    }

    //Cloning the current instance to a new instance
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    Clone()
    {
        return new Type(this.iID,this.iScore,this.#_sImagePath,this.#_iImgSize);
    }

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Calculate the initial image coordinate relative to the center
    //Arguments:
    //  -   rCenterCoord    - Cell center requested coordinate
    //Return:
    //  -   Calculated coordinate
    #GetImgCoord(rCenterCoord)
    {
        return rCenterCoord - this.#_iImgSize/2;
    }

    //Draw type image
    //Arguments:
    //  -   oContext    - Context of opearated canvas
    //  -   oImg        - Image instance
    //  -   rX          - Coordinate at X-axis
    //  -   rY          - Coordinate at Y-axis
    //Return:
    //  -   None
    #drawImage(oContext, oImg, rX, rY)
    {
        oImg.onload = function()
        {
            oContext.drawImage(oImg,rX,rY);
        }
    }

    //#endregion //Private Methods

}

//A class that allows to get setinterval behavior in multiple contexts
class Timer
{
    //#region Fields--------------------------------------------------------

    static #_oInstances = [];   //List of timer instances
    static #_oTimer;            //Link to timer object
    #_oOnTickInstance;          //Subscriber to the OnTick event
    #_iTicksCount;              //Couner of ticks of the current instance
    #_iRepetitionsCount;        //Counter of repetitions of the current instance
    #_iTicks;                   //Delay in ticks between current instance function calls
    #_iNumOfRepetitions;        //Number of repetitions for current instance function calls

    //#endregion //Fields

    //#region Constructors--------------------------------------------------

    //Static constructor - Main timer start
    static
    {
        window.setInterval(Timer.OnTickEventHandler, 10);
    }

    //Main constructor
    //Arguments:
    //  -   oOnTickInstance   - Subscriber to the OnTick event(Must be include OnTick function)
    //  -   delayMs           - Delay in ms between current instance function calls
    //  -   NumOfRepetitions  - Number of repetitions for current instance function calls
    //Return:
    //  -   None
    constructor(oOnTickInstance, delayMs=10, NumOfRepetitions=-1)
    {
        this.#_oOnTickInstance = oOnTickInstance;
        this.#_iTicksCount = 0;
        this.#_iTicks = (delayMs/10)|0;
        this.#_iNumOfRepetitions = NumOfRepetitions;
        Timer.#_oInstances.push(this);
    }
    
    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Clear interval and all instances
    static Clear()
    {
        window.clearInterval(Timer.#_oTimer);
        Timer.#_oInstances.length = 0;
    }

    //Main timer tick event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static OnTickEventHandler()
    {
        for(var i in Timer.#_oInstances)
        {
            Timer.#_oInstances[i].#OnTick();
        }
    }
    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Current instance OnTick event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #OnTick()
    {
        if(this.#_iTicksCount >= this.#_iTicks)
        {
            this.#_oOnTickInstance.OnTick();
            this.#_iTicksCount = 0;

            if(this.#_iNumOfRepetitions > -1)
            {
                this.#_iRepetitionsCount++;
                if(this.#_iRepetitionsCount >= this.#_iNumOfRepetitions)
                {
                    this.#stop();
                }
            }
        }
        this.#_iTicksCount ++; 
    }

    //Current instance timer stop
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #stop()
    {
        var index = Timer.#_oInstances.indexOf(this);
        Timer.#_oInstances.splice(index, 1);
    }

    //#endregion //Private Methods

}
