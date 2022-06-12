import {Cell} from './Cell.js';

export class Board
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

    #_oBoardConfig;     //Board configuration object
    #_iBoardCellSize;   //Board cell size

    arrBoardCells;   //Array with all cells in the board

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
        this.#_oContext  = this.#_oCanvas.getContext('2d');;
        this.#_oBoardConfig = oBoardConfig;
        this.#_iWidth   = this.#_oCanvas.width;
		this.#_iHeight  = this.#_oCanvas.height;

    }
    
    Draw(iRowsNum, iColsNum, oCellTypeConfig)
    {
        this.#_iRowsNum = iRowsNum;
        this.#_iColsNum = iColsNum;
        this.#_iBoardCellSize = this.#_iWidth/this.#_iColsNum;
        this.#setLimits();
        CellsContent.SetConfig(oCellTypeConfig, this.#_iRowsNum*this.#_iColsNum);
        Cell.iCellSize = this.#_iBoardCellSize;
        this.arrBoardCells = Array.from(Array(this.#_iRowsNum), () => new Array(this.#_iColsNum));

       var oTmpCell;

       for(let i=0;i<this.#_iRowsNum;i++)
       {
           for(let j=0;j<this.#_iRowsNum;j++)
           {
            this.arrBoardCells[i][j] = new Cell(i,j,this.#_oContext);
            this.arrBoardCells[i][j].Draw();

                this.#drawCell(i,j)
           }
        }

    }

    #setLimits()
    {
        var delta = this.#_iBoardCellSize/2;
        this.#_iLeftEntityLimit = delta;
        this.#_iRightEntityLimit = this.#_iWidth - delta;
        this.#_iTopEntityLimit = delta;
        this.#_iDownEntityLimit = this.#_iHeight - delta;
    }

    #drawCell(i,j)
    {
        var iDelta = Cell.iCellSize/2;
        var pointSize = 1;

        if(i!=0 && j!=0 && i!=this.#_iColsNum-1 && j!=this.#_iRowsNum-1)
        {
            this.#_oContext.strokeRect(this.arrBoardCells[i][j].rCenter_X - iDelta, this.arrBoardCells[i][j].rCenter_Y - iDelta, pointSize, pointSize); //left/top
            this.#_oContext.strokeRect(this.arrBoardCells[i][j].rCenter_X + iDelta, this.arrBoardCells[i][j].rCenter_Y - iDelta, pointSize, pointSize); //right/top
            this.#_oContext.strokeRect(this.arrBoardCells[i][j].rCenter_X - iDelta, this.arrBoardCells[i][j].rCenter_Y + iDelta, pointSize, pointSize); //left/bottom
            this.#_oContext.strokeRect(this.arrBoardCells[i][j].rCenter_X + iDelta, this.arrBoardCells[i][j].rCenter_Y + iDelta, pointSize, pointSize); //right/bottom
        }

        var iBoardDir = Math.floor(Math.random() * 4);

        switch(iBoardDir)
        {
            case Direction.Up:
                if(i!=0 && j!=0)
                {
                    this.#_oContext.strokeRect(this.arrBoardCells[i][j].rCenter_X - iDelta, this.arrBoardCells[i][j].rCenter_Y - iDelta, Cell.iCellSize, pointSize);
                    this.arrBoardCells[i][j].bUpBoard = true;
                    this.arrBoardCells[i-1][j].bDownBoard = true;
                }
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
}