//A class representing a cell of board
class Cell
{
    //#region Fields--------------------------------------------------------

    static iCellSize;       //Cell size in pixels
    #_oContext;	            //Link to board canvas context
    #_iRow;                 //Cell row in the board
    #_iCol;                 //Cell column in the board
    #_oContentType;         //Cell content type(Refer to CellContentTypes class)
    #_rCenter_X;            //Cell center X-axis coordinate
    #_rCenter_Y;            //Cell center Y-axis coordinate
    #_bEaten;               //Inication flag - allows to check if the type/content of the cell have been eaten by Pac Man
    bRightBoard = false;    //Inication flag - allows you to check if a cell has a right border
    bLeftBoard = false;     //Inication flag - allows you to check if a cell has a left border
    bUpBoard = false;       //Inication flag - allows you to check if a cell has a top border
    bDownBoard = false;     //Inication flag - allows you to check if a cell has a down border

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Cell row getter
    get iRow()
    {
        return this.#_iRow;
    }

    //Cell column getter
    get iColumn()
    {
        return this.#_iCol;
    }

    //Cell center X coordinate getter
    get rCenter_X()
    {
        return this.#_rCenter_X;
    }

    //Cell center Y coordinate getter
    get rCenter_Y() 
    {
        return this.#_rCenter_Y;
    }

    //Inication flag - allows to check if the type/content of the cell have been eaten by Pac Man getter
    get bEaten()
    {
        return this.#_bEaten;
    }

    get iScore()
    {
        return this.#_oContentType.iScore;
    }

    //Inication flag - allows to check if the type/content of the cell have been eaten by Pac Man setter
    set bEaten(value)
    {
        this.#_bEaten = value;

        if(this.#_bEaten == true)
        {
            this.#_oContentType.oSound.play();
            this.#clearType();
        }
    }

    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    //Main constructor
    //Arguments:
    //  -   oBoard         - Link to board
    //  -   iRow           - Row index of the current cell on the board
    //  -   iCol           - Column index of the current cell on the board
    //  -   oContext       - Link to board canvas context
    //Return:
    //  -   None
    constructor(iRow, iCol, oContext)
    {
        this.#_oContentType = CellsContent.GetRandomType();
        this.#_oContext = oContext;

        if(this.#_oContentType != CellsContent.NoLeftElements)
        {
            this.#_iRow = iRow;
            this.#_iCol = iCol;
            this.#_bEaten = false;
            this.#setCoordinates();
        }
        else
        {
            console.log("Error: no elements left to throw on the board");
        }
    }
    
    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Draws the type on the canvas according to the requested coordinates
    //Arguments:
    //  -   iRowsNum - Number of rows in the board
    //  -   iColsNum - Number of columns in the board
    //Return:
    //  -   None
    Draw(iRowsNum, iColsNum)
    {
        //Draw point on corner of cell
        if(this.#_iRow!=0 && this.#_iCol!=0 && this.#_iRow!=iColsNum-1 && this.#_iCol!=iRowsNum-1)
        {
            let iDelta = Cell.iCellSize/2;
            let pointSize = 1;

            this.#_oContext.strokeRect(this.rCenter_X - iDelta, this.rCenter_Y - iDelta, pointSize, pointSize); //left/top
            this.#_oContext.strokeRect(this.rCenter_X + iDelta, this.rCenter_Y - iDelta, pointSize, pointSize); //right/top
            this.#_oContext.strokeRect(this.rCenter_X - iDelta, this.rCenter_Y + iDelta, pointSize, pointSize); //left/bottom
            this.#_oContext.strokeRect(this.rCenter_X + iDelta, this.rCenter_Y + iDelta, pointSize, pointSize); //right/bottom
            
            var iBoardDir = Math.floor(Math.random() * 4);

            switch(iBoardDir)
            {
                case Direction.Up:
                    this.#_oContext.strokeRect(this.rCenter_X - iDelta, this.rCenter_Y - iDelta, Cell.iCellSize, pointSize);
                    this.bUpBoard = true;
                break;
                case Direction.Down:
                //   this.#_oContext.strokeRect(oCell.rCenter_X - iDelta, oCell.rCenter_Y + iDelta, Cell.iCellSize, pointSize);
                //    oCell.bDownBoard = true;
                break;
                case Direction.Left:
                    // if(j!=0 && j!=this.#_iColsNum-1 && this.arrBoardCells[i][j].bUpBoard != true && this.arrBoardCells[i][j].bDownBoard != true && this.arrBoardCells[i][j].bRightBoard != true
                    //     && this.arrBoardCells[i][j-1].bUpBoard != true && this.arrBoardCells[i][j-1].bDownBoard != true && this.arrBoardCells[i][j-1].bRightBoard != true && this.arrBoardCells[i][j-1].bLeftBoard != true)
                    // {
                    //     this.#_oContext.strokeRect(this.arrBoardCells[i][j].rCenter_X - iDelta, this.arrBoardCells[i][j].rCenter_Y - iDelta, Cell.iCellSize, pointSize);
                    //     this.#_oContext.strokeRect(this.arrBoardCells[i][j].rCenter_X - iDelta, this.arrBoardCells[i][j].rCenter_Y - iDelta, pointSize, Cell.iCellSize);
                    //     this.arrBoardCells[i][j].bLeftBoard = true;
                    //     this.arrBoardCells[i][j-1].bRightBoard = true;
                    // }
                break;
                case Direction.Right:
                //   this.#_oContext.strokeRect(oCell.rCenter_X - iDelta, oCell.rCenter_Y + iDelta, pointSize, Cell.iCellSize);
                //   oCell.bRightBoard = true;
                break;
            }
        }

        this.#_oContentType.Draw(this.#_oContext,this.#_rCenter_X,this.#_rCenter_Y);
    }
    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Definition of the coordinates of the cell center
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #setCoordinates()
    {
        this.#_rCenter_X = this.#_iCol == 0 ? Cell.iCellSize/2 : (this.#_iCol)*Cell.iCellSize + Cell.iCellSize/2;
        this.#_rCenter_Y = this.#_iRow == 0 ? Cell.iCellSize/2 : (this.#_iRow)*Cell.iCellSize + Cell.iCellSize/2;
    }

    //Clear the content of the Cell
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #clearType()
    {
        this.#_oContext.clearRect(this.rCenter_X - this.#_oContentType.iImageSize/2, this.rCenter_Y - this.#_oContentType.iImageSize/2, this.#_oContentType.iImageSize , this.#_oContentType.iImageSize);
    }

    //#endregion //Private Methods

}