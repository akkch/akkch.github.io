//A class representing a cell of board
export class Cell
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
            this.#clearType();
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
    //  -   None
    //Return:
    //  -   None
    Draw()
    {
        this.#_oContentType.Draw(this.#_oContext,this.#_rCenter_X,this.#_rCenter_Y);
    }

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

    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------
    //#endregion //Private Methods

}