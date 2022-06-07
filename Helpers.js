//The class that represents the Entity object
class Entity
{
    //#region Fields--------------------------------------------------------

    #_iBodyWidth;       //Entity width
    #_iBodyHeight;      //Entity height

    #_rCenter_X;        //Point on the X-axis
    #_rCenter_Y;        //Point on the Y-axis
    _oCanvas;           //Link to canvas
    _oContext;          //Link to canvas context
    _iCurrentDirection; //Entity's current direction

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Getter for The x-coordinate of the center of the Entity in current position
    get Center_X()
    {
        return this.#_rCenter_X;
    }

    //Getter for The y-coordinate of the center of the Entity in current position
    get Center_Y()
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
    constructor(oCanvas,rCenter_X, rCenter_Y, iBodyWidth, iBodyHeight)
    {
        this._oCanvas = oCanvas;
        this._oContext = this._oCanvas.getContext('2d');
        this.#_rCenter_X = rCenter_X;
        this.#_rCenter_Y = rCenter_Y;
        this.#_iBodyWidth = iBodyWidth;
        this.#_iBodyHeight = iBodyHeight;
        this._iCurrentDirection = Direction.Right;
    }

    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Moves a Pac Man up
    //Arguments:
    //  -   iDelta  - The distance to move the Entity up from the current position
    //Return:
    //  -   true/false - Was moved/not
    MoveUp(iDelta,oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(arrEntities != -1 && this.#IsUpDirectionFree(arrEntities,iDelta))
        {
            this.#setY(this.Center_Y - iDelta);
            this._iCurrentDirection = Direction.Up;
            bIsMoved = true;
        }

        return bIsMoved;
    }

    //Moves a Pac Man down
    //Arguments:
    //  -   iDelta  - The distance to move the Entity down from the current position
    //Return:
    //  -   true/false - Was moved/not
    MoveDown(iDelta,oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(arrEntities != -1 && this.#IsDownDirectionFree(arrEntities,iDelta))
        {
            this.#setY(this.Center_Y + iDelta);
        this._iCurrentDirection = Direction.Down;
            bIsMoved = true;
        }

        return bIsMoved
    }

    //Moves a Pac Man right
    //Arguments:
    //  -   iDelta  - The distance to move the Entity right from the current position
    //Return:
    //  -   true/false - Was moved/not
    MoveRight(iDelta,oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(arrEntities != -1 && this.#IsRightDirectionFree(arrEntities,iDelta))
        {
            this.#setX(this.#_rCenter_X + iDelta);
            this._iCurrentDirection = Direction.Right;
            bIsMoved = true;
        }

        return bIsMoved
    }

    //Moves a Pac Man left
    //Arguments:
    //  -   iDelta  - The distance to move the Entity left from the current position
    //Return:
    //  -   true/false - Was moved/not
    MoveLeft(iDelta,oBoard = -1, arrEntities = -1)
    {
        var bIsMoved = false;
        if(arrEntities != -1 && this.#IsLeftDirectionFree(arrEntities,iDelta))
        {
            this.#setX(this.#_rCenter_X - iDelta);
            this._iCurrentDirection = Direction.Left;
            bIsMoved = true;
        }

        return bIsMoved
    }

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Check if an entity instance is on the same row as this instance
    //Arguments:
    //  -   oEntity - Requested entity instance
    //  -   iDelta  - The distance to move the Entity from the current position
    //Return:
    //  -   true/false - Located on the same row/not
    #InRow(oEntity,iDelta)
    {
        return (this.Center_Y-this.#_iBodyHeight/2 - iDelta) < (oEntity.Center_Y + oEntity.#_iBodyHeight/2) && (this.Center_Y+this.#_iBodyHeight/2 + iDelta) > (oEntity.Center_Y - oEntity.#_iBodyHeight/2);
    }

    //Check if an entity instance is on the same column as this instance
    //Arguments:
    //  -   oEntity - Requested entity instance
    //  -   iDelta  - The distance to move the Entity from the current position
    //Return:
    //  -   true/false - Located on the same column/not
    #inCol(oEntity,iDelta)
    {
        return ((this.Center_X-this.#_iBodyHeight/2 - iDelta) < (oEntity.Center_X + oEntity.#_iBodyHeight/2) && (this.Center_X+this.#_iBodyHeight/2 + iDelta) > (oEntity.Center_X - oEntity.#_iBodyHeight/2));
    }

    //Check if there is any entity at the top of this instance.
    //Arguments:
    //  -   arrEntities - List of entities for check
    //  -   iDelta      - The distance to move the Entity from the current position
    //Return:
    //  -   true/false  - Direction is free/not
    #IsUpDirectionFree(arrEntities,iDelta)
    {
        var bIsFree = true;

        for(let i=0;i<arrEntities.length && bIsFree;i++)
        {
            if(!(this.#_rCenter_X == arrEntities[i].#_rCenter_X && this.#_rCenter_Y == arrEntities[i].#_rCenter_Y))
            {
                if(!this.#inCol(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_Y - this.#_iBodyHeight/2 - iDelta)  < (arrEntities[i].Center_Y + arrEntities[i].#_iBodyHeight/2) && (this.Center_Y - this.#_iBodyHeight/2 - iDelta)  > (arrEntities[i].Center_Y - arrEntities[i].#_iBodyHeight/2))
                    {
                        bIsFree = false;
                    }
                    else
                    {
                        bIsFree = true;
                    }
                }
            }
        }

        return bIsFree;

    }

    //Check if there is any entity at the down of this instance.
    //Arguments:
    //  -   arrEntities - List of entities for check
    //  -   iDelta      - The distance to move the Entity from the current position
    //Return:
    //  -   true/false  - Direction is free/not
    #IsDownDirectionFree(arrEntities,iDelta)
    {
        var bIsFree = true;

        for(let i=0;i<arrEntities.length && bIsFree;i++)
        {
            if(!(this.#_rCenter_X == arrEntities[i].#_rCenter_X && this.#_rCenter_Y == arrEntities[i].#_rCenter_Y))
            {
                if(!this.#inCol(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_Y + this.#_iBodyHeight/2 + iDelta)  > (arrEntities[i].Center_Y - arrEntities[i].#_iBodyHeight/2) && (this.Center_Y + this.#_iBodyHeight/2 + iDelta)  < (arrEntities[i].Center_Y + arrEntities[i].#_iBodyHeight/2))
                    {
                        bIsFree = false;
                    }
                    else
                    {
                        bIsFree = true;
                    }
                }
            }
        }

        return bIsFree;
        
    }

    //Check if there is any entity at the right of this instance.
    //Arguments:
    //  -   arrEntities - List of entities for check
    //  -   iDelta      - The distance to move the Entity from the current position
    //Return:
    //  -   true/false  - Direction is free/not
    #IsRightDirectionFree(arrEntities,iDelta)
    {
        var bIsFree = true;

        for(let i=0;i<arrEntities.length && bIsFree;i++)
        {
            if(!(this.#_rCenter_X == arrEntities[i].#_rCenter_X && this.#_rCenter_Y == arrEntities[i].#_rCenter_Y))
            {
                if(!this.#InRow(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_X + this.#_iBodyHeight/2 + iDelta)  > (arrEntities[i].Center_X - arrEntities[i].#_iBodyHeight/2) && (this.Center_X + this.#_iBodyHeight/2 + iDelta)  < (arrEntities[i].Center_X + arrEntities[i].#_iBodyHeight/2))
                    {
                        bIsFree = false;
                    }
                    else
                    {
                        bIsFree = true;
                    }
                }
            }
        }

        return bIsFree;
        
    }

    //Check if there is any entity at the left of this instance.
    //Arguments:
    //  -   arrEntities - List of entities for check
    //  -   iDelta      - The distance to move the Entity from the current position
    //Return:
    //  -   true/false  - Direction is free/not
    #IsLeftDirectionFree(arrEntities,iDelta)
    {
        var bIsFree = true;

        for(let i=0;i<arrEntities.length && bIsFree;i++)
        {
            if(!(this.#_rCenter_X == arrEntities[i].#_rCenter_X && this.#_rCenter_Y == arrEntities[i].#_rCenter_Y))
            {
                if(!this.#InRow(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_X - this.#_iBodyHeight/2 - iDelta)  < (arrEntities[i].Center_X + arrEntities[i].#_iBodyHeight/2) && (this.Center_X - this.#_iBodyHeight/2 - iDelta)  > (arrEntities[i].Center_X - arrEntities[i].#_iBodyHeight/2))
                    {
                        bIsFree = false;
                    }
                    else
                    {
                        bIsFree = true;
                    }
                }
            }
        }

        return bIsFree;
        
    }

    //Clear the Entity from current position
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    _clearEntity()
    {
        this._oContext.clearRect(this.Center_X - this.#_iBodyWidth/2, this.Center_Y - this.#_iBodyHeight/2, this.#_iBodyWidth , this.#_iBodyHeight);
    }

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

    //#endregion //Private Methods
}

//Class represents directional flags(For using as Enum)
class Direction
{
    static Up = 0;
    static Down = 1;
    static Right = 2;
    static Left = 3;
}

//The class represents data about all possible cell content types
class CellsContent
{
    //#region Fields--------------------------------------------------------

    static arrTypes         = [];   //An array that stores all possible cell content types
    static arrRemainTypes   = [];	//The array stores the number of remaining elements for each type that can be thrown onto the board.The array stores the number of remaining elements for each type that can be thrown onto the board.
    static NoLeftElements = -1;

    //#endregion //Fields

    //#region Constructors--------------------------------------------------
    
    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Filling an Array with Possible Types
    static SetConfig(oCellTypeConfig)
    {
        for(let i=0;i<oCellTypeConfig.Ids.length;i++)
        {
            CellsContent.arrTypes[i] = new Type(oCellTypeConfig.Ids[i], oCellTypeConfig.Scores[i], oCellTypeConfig.ImgPathes[i], oCellTypeConfig.iTypeImgSize);
            CellsContent.arrRemainTypes[i] = oCellTypeConfig.iCellsAmount*oCellTypeConfig.Ratios[i];
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
            return CellsContent.arrTypes[iTypeId].Clone();
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
    #_iImgSize;     //Image size in pixels

    iID;     //Type ID
    iScore;  //Type points amount

    //#endregion //Fields

    //#region Constructors--------------------------------------------------
       
    //Main constructor
    //Arguments:
    //  -   iID         - Entity ID
    //  -   iScore      - Number of points
    //  -   sImagePath  - Path to image
    //  -   iImgSize    - Size of image
    //Return:
    //  -   None
    constructor(iID, iScore, sImagePath, iImgSize)
    {
        this.iID = iID;
        this.iScore = iScore;
        this.#_sImagePath = sImagePath;
        this.#_iImgSize = iImgSize;
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