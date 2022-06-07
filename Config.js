//The class represents cell configuration data
class CellTypeConfig
{
    //#region Fields--------------------------------------------------------

    //#region Configuration Fields

    #_iEMPTY_ID             = 0;	                    //Constant - ID of empty cells type
    #_iEMPTY_PERCENT        = 0;	                    //Constant - percentage of empty cells thrown on the board
    #_sEMPTY_IMG_PATH       = "Resources/Empty.png";    //Constant - path to empty image
    #_iEMPTY_SCORE          = 0;	                    //Constant - points per empty

    #_iBALLS_ID             = 1;	                    //Constant - ID of ball type
    #_iBALLS_PERCENT        = 70;	                    //Constant - percentage of balls to be dropped on the board
    #_sBALLS_IMG_PATH       = "Resources/Ball.png";	    //Constant - path to balls image
    #_iBALLS_SCORE          = 1;	                    //Constant - points per ball

    #_iCANDIES_ID           = 2;	                    //Constant - ID of candy type
    #_iCANDIES_PERCENT      = 20;	                    //Constant - percentage of candies thrown on the board
    #_sCANDIES_IMG_PATH     = "Resources/Candy.png";    //Constant - path to candies image
    #_iCANDIES_SCORE        = 3;	                    //Constant - points per candy

    #_iMINES_ID             = 3;	                    //Constant - ID of mines type
    #_iMINES_PERCENT        = 10;	                    //Constant - percentage of mines thrown on the board
    #_sMINES_IMG_PATH       = "Resources/Bomb.png";	    //Constant - path to mines image
    #_iMINES_SCORE          = -2;	                    //Constant - points per mine

    #_iIMG_SIZE             = 48;                       //Size of images

    //#endregion //Configuration Fields

    #_rCANDIES_RATIO;    //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rMINES_RATIO;      //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rBALLS_RATIO;      //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rEMPTY_RATIO;      //Calculated in constructor constant - Ratio of balls to be dropped on the board

    iCellsAmount;        //Number of cells in the board
    iTypeImgSize;        //Size of images
    Ids          = [];   //Id's of a given type
    Scores       = [];   //Points per ball of a given type
    Ratios       = [];   //The number of elements of a given type that should be thrown onto the board as a ratio
    ImgPathes    = [];   //Patches to images a given type

    //#endregion //Fields

    //#region Constructors--------------------------------------------------
    
    //#endregion //Constructor

    constructor(iRowsNum, iColsNum)
    {
        this.#_rCANDIES_RATIO = this.#_iCANDIES_PERCENT/100;	//Calculated constant - Ratio of balls to be dropped on the board
        this.#_rMINES_RATIO   = this.#_iMINES_PERCENT/100;       //Calculated constant - Ratio of balls to be dropped on the board
        this.#_rBALLS_RATIO   = this.#_iBALLS_PERCENT/100;	    //Calculated constant - Ratio of balls to be dropped on the board
        this.#_rEMPTY_RATIO   = this.#_iEMPTY_PERCENT/100;	    //Calculated constant - Ratio of balls to be dropped on the board
        
        this.iCellsAmount = iColsNum*iRowsNum;
        this.iTypeImgSize = this.#_iIMG_SIZE;
        this.#typeDefinition(this.#_iEMPTY_ID, this.#_iEMPTY_SCORE, this.#_rEMPTY_RATIO, this.#_sEMPTY_IMG_PATH);
        this.#typeDefinition(this.#_iBALLS_ID, this.#_iBALLS_SCORE, this.#_rBALLS_RATIO, this.#_sBALLS_IMG_PATH);
        this.#typeDefinition(this.#_iCANDIES_ID, this.#_iCANDIES_SCORE, this.#_rCANDIES_RATIO, this.#_sCANDIES_IMG_PATH);
        this.#typeDefinition(this.#_iMINES_ID, this.#_iMINES_SCORE, this.#_rMINES_RATIO, this.#_sMINES_IMG_PATH);
    }

    //#region Public Methods------------------------------------------------

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    #typeDefinition(iId, iScore, rRatio, sImgPath)
    {
        this.Ids[iId]         = iId;
        this.Scores[iId]      = iScore;
        this.Ratios[iId]      = rRatio;
        this.ImgPathes[iId]   = sImgPath;
    }

    //#endregion //Private Methods
}