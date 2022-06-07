//A class representing a cell of board
class Cell
{
    //#region Fields--------------------------------------------------------

    static iCellSize = 80;      //Cell size in pixels
    #_iRow;                     //Cell row in the board
    #_iCol;                     //Cell column in the board
    #_oContentType;             //Cell content type(Refer to CellContentTypes class)
    #_rCenter_X;                //Cell center X-axis coordinate
    #_rCenter_Y;                //Cell center Y-axis coordinate
    #_bEaten;                   //Inication flag - allows to check if the contents of the cell have been eaten by Pac Man
    #_bBoard = -1;              //Board type

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
    get rX()
    {
        return this.#_rCenter_X;
    }

    //Cell center Y coordinate getter
    get rY() 
    {
        return this.#_rCenter_Y;
    }

    //Cell content type getter
    get bEaten()
    {
        return this.#_bEaten;
    }

    //Cell content type getter
    set bEaten(value)
    {
        this.#_bEaten = value;
    }

    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    //Main constructor
    //Arguments:
    //  -   iRow           - row index of the current cell on the board
    //  -   iCol           - column index of the current cell on the board
    //Return:
    //  -   None
    constructor(iRow, iCol)
    {
        this.#_oContentType = CellsContent.GetRandomType();

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
    //  -   oContext    - Canvas context
    //Return:
    //  -   None
    Draw(oContext)
    {
        this.#_oContentType.Draw(oContext,this.#_rCenter_X,this.#_rCenter_Y);
    }

    //Definition of the coordinates of the cell center
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #setCoordinates()
    {
        this.#_rCenter_X = this.#_iCol == 0 ? Cell.iCellSize/2 : (this.#_iCol-1)*Cell.iCellSize + Cell.iCellSize/2;
        this.#_rCenter_Y = this.#_iRow == 0 ? Cell.iCellSize/2 : (this.#_iRow-1)*Cell.iCellSize + Cell.iCellSize/2;
    }
    
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------
    //#endregion //Private Methods

}