class Board
{
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

    #_oBoardConfig;   //Board configuration
    #_iBoardCellSize; //Board cell size

    get BoardWidth()
    {
        return this.#_iWidth;
    }

    get BoardSpeed()
    {
        return this.#_oBoardConfig.Speed;
    }

    get BoardCellSize()
    {
        return this.#_iBoardCellSize;
    }

    get iRowsNum()
    {
        return this.#_iRowsNum;
    }

    get iColsNum()
    {
        return this.#_iColsNum;
    }

    get LeftEntityLimit()
    {
        return this.#_iLeftEntityLimit;
    }

    get RightEntityLimit()
    {
        return this.#_iRightEntityLimit;
    }

    get TopEntityLimit()
    {
        return this.#_iTopEntityLimit;
    }

    get DownEntityLimit()
    {
        return this.#_iDownEntityLimit;
    }

    constructor(oBoardConfig)
    {
        this.#_oCanvas  = document.getElementById(oBoardConfig.CanvasName);
        this.#_oBoardConfig = oBoardConfig;
        this.#_iWidth   = this.#_oCanvas.width;
		this.#_iHeight  = this.#_oCanvas.height;
    }
    
    Draw(iRowsNum, iColsNum)
    {
        this.#_iRowsNum = iRowsNum;
        this.#_iColsNum = iColsNum;
        this.#_iBoardCellSize = this.#_iWidth/this.#_iColsNum;
        this.#setLimits();

    //    for(let i=1;i<=this.#_iRowsNum;i++)
    //    {
    //        for(let j=1;j<=this.#_iRowsNum;j++)
    //        {
    //             oTmpCell = new Cell(i,j);
    //             oTmpCell.Draw(oContext);
    //        }
    //     }

    }


    #setLimits()
    {
        var delta = this.#_iBoardCellSize/2;
        this.#_iLeftEntityLimit = delta;
        this.#_iRightEntityLimit = this.#_iWidth - delta;
        this.#_iTopEntityLimit = delta;
        this.#_iDownEntityLimit = this.#_iHeight - delta;
    }
}