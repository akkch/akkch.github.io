//A class representing a board of the game
class Board
{
    //#region Fields--------------------------------------------------------

    #_oCanvas;	    //Link to board canvas
    #_oContext;	    //Link to board canvas context
    #_iWidth;	    //Board width
    #_iHeight;	    //Board height
    #_iRowsNum;	    //Number of rows in the board
    #_iColsNum;	    //Number of columns in the board

    #_iLeftEntityLimit; //Left border of the board
    #_iRightEntityLimit;//Right border of the board
    #_iTopEntityLimit;  //Top border of the board
    #_iDownEntityLimit; //Down border of the board

    #_oBoardConfig;     //Board configuration object
    #_iBoardCellSize;   //Board cell size

    arrBoardCells;      //Array with all cells in the board

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Board canvas context link getter
    get oBoardContext()
    {
        return this.#_oContext;
    }

    //Board width getter
    get BoardWidth()
    {
        return this.#_iWidth;
    }

    //Board speed getter
    get BoardSpeed()
    {
        return this.#_oBoardConfig.rSpeed;
    }

    //Board cell size getter
    get BoardCellSize()
    {
        return this.#_iBoardCellSize;
    }

    //Mumber of rows in the board getter
    get iRowsNum()
    {
        return this.#_iRowsNum;
    }

    //Mumber of columns in the board getter
    get iColsNum()
    {
        return this.#_iColsNum;
    }

    //Left limit on the board for entity
    get LeftEntityLimit()
    {
        return this.#_iLeftEntityLimit;
    }

    //Right limit on the board for entity
    get RightEntityLimit()
    {
        return this.#_iRightEntityLimit;
    }

    //Top limit on the board for entity
    get TopEntityLimit()
    {
        return this.#_iTopEntityLimit;
    }

    //Down limit on the board for entity
    get DownEntityLimit()
    {
        return this.#_iDownEntityLimit;
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
    constructor(oBoardConfig)
    {
        this.#_oCanvas  = document.getElementById(oBoardConfig.sCanvasName);
        this.#_oContext  = this.#_oCanvas.getContext('2d');
        this.#_oBoardConfig = oBoardConfig;
        this.#_iWidth   = this.#_oCanvas.width;
		this.#_iHeight  = this.#_oCanvas.height;
        this.#_iRowsNum = this.#_oBoardConfig.iRowsNum;
        this.#_iColsNum = this.#_oBoardConfig.iColsNum;
        this.#_iBoardCellSize = this.#_iWidth/this.#_iColsNum;
        Cell.iCellSize = this.#_iBoardCellSize;
        this.#setLimits();
        this.arrBoardCells = Array.from(Array(this.#_iRowsNum), () => new Array(this.#_iColsNum));
    }
        
    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //Draw the board
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    Draw()
    {
       for(let i=0;i<this.#_iRowsNum;i++)
       {
           for(let j=0;j<this.#_iRowsNum;j++)
           {
                this.arrBoardCells[i][j] = new Cell(i,j,this.#_oContext);
                this.arrBoardCells[i][j].Draw(this.#_iRowsNum, this.#_iColsNum);
                this.#updateBorders(i,j);
           }
        }

    }

    //Draw the board canvas
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    Clear()
    {
        this.#_oContext.clearRect(0, 0, this.#_iWidth, this.#_iHeight);
        this.arrBoardCells.length = 0;
    }

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Set board limits for entities
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    #setLimits()
    {
        var delta = this.#_iBoardCellSize/2;
        this.#_iLeftEntityLimit = delta;
        this.#_iRightEntityLimit = this.#_iWidth - delta;
        this.#_iTopEntityLimit = delta;
        this.#_iDownEntityLimit = this.#_iHeight - delta;
    }

    //Check if the border for the requested cell was defined and update flags for neighbor cells
    //Arguments:
    //  -   i - Cell row index
    //Return:
    //  -   j - Cell column index
    #updateBorders(i,j)
    {
        if(this.arrBoardCells[i][j].bUpBoard)
            this.arrBoardCells[i-1][j].bDownBoard = true;
        
        if(this.arrBoardCells[i][j].bDownBoard)
            this.arrBoardCells[i+1][j].bUpBoard = true;
        
        if(this.arrBoardCells[i][j].bRightBoard)
            this.arrBoardCells[i-1][j].bLeftBoard = true;

        if(this.arrBoardCells[i][j].bLeftBoard)
            this.arrBoardCells[i+1][j].bRightBoard = true;
    }
    
    //#endregion //Private Methods

}