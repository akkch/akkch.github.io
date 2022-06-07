class Board
{
    static #_iRowsNum;	            //Number of rows in the board
    static #_iColsNum;	            //Number of columns in the board

    static Draw(iRowsNum, iColsNum, oContext)
    {
        Board.#_iRowsNum = iRowsNum;
        Board.#_iColsNum = iColsNum;
        
        var oCellTypeConfig = new CellTypeConfig(Board.#_iRowsNum, Board.#_iColsNum);
        var oTmpCell;

        CellsContent.SetConfig(oCellTypeConfig);

       for(let i=1;i<=Board.#_iRowsNum;i++)
       {
           for(let j=1;j<=Board.#_iRowsNum;j++)
           {
                oTmpCell = new Cell(i,j);
                oTmpCell.Draw(oContext);
           }
        }

    }
}