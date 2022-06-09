class Board
{
    #_oCanvas;	    //Link to board canvas
    #_oContext;	    //Link to board canvas context
    #_iWidth;	    //Board width
    #_iHeight;	    //Board height
    #_iRowsNum;	    //Number of rows in the board
    #_iColsNum;	    //Number of columns in the board

    #_iLeftEntityLimit; //Left border of the board
    #_iRightEntityLimit;      //Right border of the board
    #_iTopEntityLimit;  //Top border of the board
    #_iDownEntityLimit; //Down border of the board

    #_iBoardSpeed;  //Down border of the board

    get BoardWidth()
    {
        return this.#_iWidth;
    }

    get BoardSpeed()
    {
        return this.#_iBoardSpeed;
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

    Draw(oBoardConfig, iRowsNum, iColsNum)
    {
        this.#_oCanvas  = document.getElementById(oBoardConfig.CanvasName);
        this.#_iWidth   = this.#_oCanvas.width;
		this.#_iHeight  = this.#_oCanvas.height;
        this.#_iRowsNum = iRowsNum;
        this.#_iColsNum = iColsNum;
        this.#_iBoardSpeed = oBoardConfig.Speed;
        var oCellTypeConfig = new CellTypeConfig(this, this.#_iRowsNum, this.#_iColsNum);

        this.#setLimits(oBoardConfig,oCellTypeConfig)

    //    for(let i=1;i<=this.#_iRowsNum;i++)
    //    {
    //        for(let j=1;j<=this.#_iRowsNum;j++)
    //        {
    //             oTmpCell = new Cell(i,j);
    //             oTmpCell.Draw(oContext);
    //        }
    //     }

    }


    #setLimits(oBoardConfig,oCellTypeConfig)
    {
        var delta = oCellTypeConfig.CellSize/2;
        this.#_iLeftEntityLimit = delta;
        this.#_iRightEntityLimit = this.#_iWidth - delta;
        this.#_iTopEntityLimit = delta;
        this.#_iDownEntityLimit = this.#_iHeight - delta;
    }
}