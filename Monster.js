//The class that represents the list of Monster objects
class Monsters
{
    //#region Fields--------------------------------------------------------

    static #_oMonstConf;                //Monsters configuration object
    static #_iFirstMonsterInitialPos_X; //Starting position on the X-axis of the first monster added to the board
    static #_iFirstMonsterInitialPos_Y; //Starting position on the Y-axis of the first monster added to the board

    //#endregion //Fields

    //#region Public Methods------------------------------------------------

    //Runs all the monsters
    //Arguments:
    //  -   oBoard    - Link to the game board
    //  -   oMonstConf- Monsters configuration object
    //Return:
    //  -   None
    static Run(oBoard, oMonstConf)
    {
        Monsters.#init(oBoard, oMonstConf)

        var MosterCanvas = document.getElementById(Monsters.#_oMonstConf.CanvasName);
        var y;

        for(let i=0;i<Monsters.#_oMonstConf.ArrImagePath.length;i++)
        {
            y = Monsters.#setInitPosition(i,oBoard, Monsters.#_iFirstMonsterInitialPos_Y);
            new Monster(oBoard,MosterCanvas,Monsters.#_iFirstMonsterInitialPos_X,  y,Monsters.#_oMonstConf.ArrImagePath[i],Monsters.#_oMonstConf.ImageSize);
        }
    }
    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Instance initialization
    //Arguments:
    //  -   oBoard    - Link to the game board
    //  -   oMonstConf- Monsters configuration object
    //Return:
    //  -   None
    static #init(oBoard, oMonstConf)
    {
        Monsters.#_oMonstConf = oMonstConf;
        Monsters.#_iFirstMonsterInitialPos_X = oBoard.LeftEntityLimit;
        Monsters.#_iFirstMonsterInitialPos_Y = oBoard.TopEntityLimit;
    }

    //Set initial position of current moster
    //Arguments:
    //  -   iMonsterNum             - Number of current monster
    //  -   oBoard                  - Link to the game board
    //  -   iFirstMonsteInitCoord   - Initial position of first monster coordinate
    //Return:
    //  -   Initial position of current moster
    static #setInitPosition(iMonsterNum, oBoard, iFirstMonsteInitCoord)
    {
        return iFirstMonsteInitCoord + (iMonsterNum * oBoard.BoardCellSize);
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

    //#region Constructors--------------------------------------------------

    //Main Constructor
    //Arguments:
    //  -   oBoard      - Link to instance of game board
    //  -   oCanvas     - Link to instance of canvas object
    //  -   rCenter_X   - The x-coordinate of the center of the Pac Man
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
            case Direction.Up:
                this.#_bMoved = this.MoveUp(Monster.#_oBoard,Monster.#_arrMonsters);
            break;
    
            case Direction.Down:
                this.#_bMoved = this.MoveDown(Monster.#_oBoard,Monster.#_arrMonsters);
            break;
    
            case Direction.Right:
                this.#_bMoved = this.MoveRight(Monster.#_oBoard,Monster.#_arrMonsters);
            break;
    
            case Direction.Left:
                this.#_bMoved = this.MoveLeft(Monster.#_oBoard,Monster.#_arrMonsters);
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
            super._moveUp(oBoard.BoardSpeed);
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
            super._moveDown(oBoard.BoardSpeed);
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
            super._moveRight(oBoard.BoardSpeed);
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
            super._moveLeft(oBoard.BoardSpeed);
            bIsMoved = true;
        }

        return bIsMoved
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
        this.#drawImage(this._oContext, this.#_oImg, this.#getImgCoord(this.Center_X), this.#getImgCoord(this.Center_Y));
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
    #getImgCoord(rCenterCoord)
    {
        return rCenterCoord - this.#_iImgSize/2;
    }

     //Check if an entity instance is on the same row as this instance
    //Arguments:
    //  -   oEntity - Requested entity instance
    //  -   iDelta  - The distance to move the Entity from the current position
    //Return:
    //  -   true/false - Located on the same row/not
    #InRow(oEntity,iDelta)
    {
        return (this.Center_Y-this._iBodyHeight/2 - iDelta) < (oEntity.Center_Y + oEntity._iBodyHeight/2) && (this.Center_Y+this._iBodyHeight/2 + iDelta) > (oEntity.Center_Y - oEntity._iBodyHeight/2);
    }

    //Check if an entity instance is on the same column as this instance
    //Arguments:
    //  -   oEntity - Requested entity instance
    //  -   iDelta  - The distance to move the Entity from the current position
    //Return:
    //  -   true/false - Located on the same column/not
    #inCol(oEntity,iDelta)
    {
        return ((this.Center_X-this._iBodyHeight/2 - iDelta) < (oEntity.Center_X + oEntity._iBodyHeight/2) && (this.Center_X+this._iBodyHeight/2 + iDelta) > (oEntity.Center_X - oEntity._iBodyHeight/2));
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
            if(!(this.Center_X == arrEntities[i].Center_X && this.Center_Y == arrEntities[i].Center_Y))
            {
                if(!this.#inCol(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_Y - this._iBodyHeight/2 - iDelta)  < (arrEntities[i].Center_Y + arrEntities[i]._iBodyHeight/2) && (this.Center_Y - this._iBodyHeight/2 - iDelta)  > (arrEntities[i].Center_Y - arrEntities[i]._iBodyHeight/2))
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
            if(!(this.Center_X == arrEntities[i].Center_X && this.Center_Y == arrEntities[i].Center_Y))
            {
                if(!this.#inCol(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_Y + this._iBodyHeight/2 + iDelta)  > (arrEntities[i].Center_Y - arrEntities[i]._iBodyHeight/2) && (this.Center_Y + this._iBodyHeight/2 + iDelta)  < (arrEntities[i].Center_Y + arrEntities[i]._iBodyHeight/2))
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
            if(!(this.Center_X == arrEntities[i].Center_X && this.Center_Y == arrEntities[i].Center_Y))
            {
                if(!this.#InRow(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_X + this._iBodyHeight/2 + iDelta)  > (arrEntities[i].Center_X - arrEntities[i]._iBodyHeight/2) && (this.Center_X + this._iBodyHeight/2 + iDelta)  < (arrEntities[i].Center_X + arrEntities[i]._iBodyHeight/2))
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
            if(!(this.Center_X == arrEntities[i].Center_X && this.Center_Y == arrEntities[i].Center_Y))
            {
                if(!this.#InRow(arrEntities[i],iDelta))
                {
                    bIsFree = true;
                }
                else
                {
                    if((this.Center_X - this._iBodyHeight/2 - iDelta)  < (arrEntities[i].Center_X + arrEntities[i]._iBodyHeight/2) && (this.Center_X - this._iBodyHeight/2 - iDelta)  > (arrEntities[i].Center_X - arrEntities[i]._iBodyHeight/2))
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

    //#endregion //Private Methods
}