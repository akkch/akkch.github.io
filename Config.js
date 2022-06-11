//The class that represents game configuration - for manual inputs
class Config
{
    //#region Fields--------------------------------------------------------

    static rGAME_ENTITY_SIZE        = 64;                       //Size of entity images
    static rBOARD_SPEED             = 10;                       //Board speed
    static sBOARD_CANVAS_NAME       = "BoardCanvas";            //Board canvas name

    static sPAC_MAN_CANVAS_NAME     = "BoardCanvas";            //Pac man canvas name
    static rPAC_MAN_EYE_RADIUS      = 5;                        //Pac man eye radius
    static sPAC_MAN_BODY_COLOR      = "mediumslateblue";        //Pac man body color
    static sPAC_MAN_EYE_COLOR       = "black";                  //Pac man eye color
    static rPAC_MAN_ANGLE_DELTA     = 0.03;                     //Delta change in the angle of opening/closing of the mouth
    
    static sMONSTERS_CANVAS_NAME    = "MonstersCanvas";         //Monsters canvas name
    static sMONSTERS_SPEED_RATIO    = 0.3;                      //The ratio of the speed of monsters relative to the speed of the board
    static sMONSTER_0_IMG_PATH      = "Resources/monster0.png"; //Monster image path
    static sMONSTER_1_IMG_PATH      = "Resources/monster1.png"; //Monster image path
    static sMONSTER_2_IMG_PATH      = "Resources/monster2.png"; //Monster image path
    static sMONSTER_3_IMG_PATH      = "Resources/monster3.png"; //Monster image path

    static iEMPTY_ID            = 0;	                    //Constant - ID of empty cells type
    static iEMPTY_PERCENT       = 0;	                    //Constant - percentage of empty cells thrown on the board
    static sEMPTY_IMG_PATH      = "Resources/Empty.png";    //Constant - path to empty image
    static iEMPTY_SCORE         = 0;	                    //Constant - points per empty

    static iBALLS_ID            = 1;	                    //Constant - ID of ball type
    static iBALLS_PERCENT       = 70;	                    //Constant - percentage of balls to be dropped on the board
    static sBALLS_IMG_PATH      = "Resources/Ball.png";     //Constant - path to balls image
    static iBALLS_SCORE         = 1;	                    //Constant - points per ball

    static iCANDIES_ID          = 2;	                    //Constant - ID of candy type
    static iCANDIES_PERCENT     = 20;	                    //Constant - percentage of candies thrown on the board
    static sCANDIES_IMG_PATH    = "Resources/Candy.png";    //Constant - path to candies image
    static iCANDIES_SCORE       = 3;	                    //Constant - points per candy

    static iMINES_ID            = 3;	                    //Constant - ID of mines type
    static iMINES_PERCENT       = 10;	                    //Constant - percentage of mines thrown on the board
    static sMINES_IMG_PATH      = "Resources/Bomb.png";	    //Constant - path to mines image
    static iMINES_SCORE         = -2;	                    //Constant - points per mine

    static iITEMS_IMG_SIZE      = 48;                       //Size of items images(Balls, Candies etc.)

    //#endregion //Fields

}

//The class that represents game board configuration
class BoardConfig
{
    //#region Properties----------------------------------------------------

    //Board speed
    get Speed()
    {
        return Config.rBOARD_SPEED;
    }

    //Board canvas name
    get CanvasName()
    {
        return Config.sBOARD_CANVAS_NAME;
    }

    //Entity Size
    get EntlitySize()
    {
        return Config.rGAME_ENTITY_SIZE;
    }

    //#endregion //Properties

}

//The class that represents game pac man configuration
class PacManConfig
{
    #_rPAC_MAN_BODY_RADIUS = 32;                       //Calculated in constructor constant - Pac man body radius

    //#region Properties----------------------------------------------------

    //Pac Man canvas name
    get CanvasName()
    {
        return Config.sPAC_MAN_CANVAS_NAME;
    }

    //Pac man body radius
    get BodyRadius()
    {
        return this.#_rPAC_MAN_BODY_RADIUS;
    }

    //Pac man eye radius
    get EyeRadius()
    {
        return Config.rPAC_MAN_EYE_RADIUS;
    }

    //Pac man body color
    get BodyColor()
    {
        return Config.sPAC_MAN_BODY_COLOR;
    }

    //Pac man eye color
    get EyeColor()
    {
        return Config.sPAC_MAN_EYE_COLOR;
    }

    //Delta change in the angle of opening/closing of the mouth
    get AngleDelta()
    {
        return Config.rPAC_MAN_ANGLE_DELTA;
    }

    //#endregion //Properties

    constructor()
    {
        this.#_rPAC_MAN_BODY_RADIUS = Config.rGAME_ENTITY_SIZE/2;
    }
}

//The class that represents game monsters configuration
class MonstersConfig
{
    //#region Fields--------------------------------------------------------

    #_rMONSTER_IMG_SIZE;    //Calculated in constructor constant - Size of monsters images
    #_rArrImagePath    = [];//Monsters images patches list
    #_sCanvasName;          //Monsters canvas name
    #_iImageSize;           //Monster image size

    //#endregion //Fields
    
    //#region Properties----------------------------------------------------

    //Size of monsters images
    get Size()
    {
        return this.#_rMONSTER_IMG_SIZE;
    }

    //Monsters images patches list
    get ArrImagePath()
    {
        return this.#_rArrImagePath;
    }

    //Monsters canvas name
    get CanvasName()
    {
        return this.#_sCanvasName;
    }

    //Monster image size
    get ImageSize()
    {
        return this.#_iImageSize;
    }
    //The ratio of the speed of monsters relative to the speed of the board
    get SpeedRatio()
    {
        return Config.sMONSTERS_SPEED_RATIO;
    }
    
    //#endregion //Properties

    //#region Constructors--------------------------------------------------
 
    //Main constructor
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    constructor()
    {
        this.#_rMONSTER_IMG_SIZE = Config.rGAME_ENTITY_SIZE;
        this.#_sCanvasName = Config.sMONSTERS_CANVAS_NAME;
        this.#_iImageSize = Config.rGAME_ENTITY_SIZE;
        this.#_rArrImagePath[0] = Config.sMONSTER_0_IMG_PATH;
        this.#_rArrImagePath[1] = Config.sMONSTER_1_IMG_PATH;
        this.#_rArrImagePath[2] = Config.sMONSTER_2_IMG_PATH;
        this.#_rArrImagePath[3] = Config.sMONSTER_3_IMG_PATH;
    }
   
    //#endregion //Constructor

}

//The class that represents board cells configuration
class CellTypeConfig
{

    //#region Fields--------------------------------------------------------

    #_rCANDIES_RATIO;    //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rMINES_RATIO;      //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rBALLS_RATIO;      //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rEMPTY_RATIO;      //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_iTypeImgSize;      //Size of images
    #_Ids          = []; //Id's of a given type
    #_Scores       = []; //Points per ball of a given type
    #_Ratios       = []; //The number of elements of a given type that should be thrown onto the board as a ratio
    #_ImgPathes    = []; //Patches to images a given type

    //#endregion //Fields

    //#region Properties----------------------------------------------------


    //Size of images
    get TypeImgSize()
    {
        return this.#_iTypeImgSize;
    }

    //Id's of a given type
    get Ids()
    {
        return this.#_Ids;
    }

    //Points per ball of a given type
    get Scores()
    {
        return this.#_Scores;
    }

    //The number of elements of a given type that should be thrown onto the board as a ratio
    get Ratios()
    {
        return this.#_Ratios;
    }

    //Patches to images a given type
    get ImgPathes()
    {
        return this.#_ImgPathes;
    }

    //#endregion //Properties

    //#region Constructors--------------------------------------------------
 
    //Main constructor
    //Arguments:
    //  -   iRowsNum     - Number of rows in the board
    //  -   iColsNum     - Number of columns in the board
    //Return:
    //  -   None
    constructor()
    {
        this.#_rCANDIES_RATIO = Config.iCANDIES_PERCENT/100;    //Calculated constant - Ratio of balls to be dropped on the board
        this.#_rMINES_RATIO   = Config.iMINES_PERCENT/100;      //Calculated constant - Ratio of balls to be dropped on the board
        this.#_rBALLS_RATIO   = Config.iBALLS_PERCENT/100;	    //Calculated constant - Ratio of balls to be dropped on the board
        this.#_rEMPTY_RATIO   = Config.iEMPTY_PERCENT/100;	    //Calculated constant - Ratio of balls to be dropped on the board
        
        
        this.#_iTypeImgSize = Config.iITEMS_IMG_SIZE;
        this.#typeDefinition(Config.iEMPTY_ID, Config.iEMPTY_SCORE, this.#_rEMPTY_RATIO, Config.sEMPTY_IMG_PATH);
        this.#typeDefinition(Config.iBALLS_ID, Config.iBALLS_SCORE, this.#_rBALLS_RATIO, Config.sBALLS_IMG_PATH);
        this.#typeDefinition(Config.iCANDIES_ID, Config.iCANDIES_SCORE, this.#_rCANDIES_RATIO, Config.sCANDIES_IMG_PATH);
        this.#typeDefinition(Config.iMINES_ID, Config.iMINES_SCORE, this.#_rMINES_RATIO, Config.sMINES_IMG_PATH);
    }
   
    //#endregion //Constructor

    //#region Public Methods------------------------------------------------

    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Definitions of type
    //Arguments:
    //  -   iID       - Type ID
    //  -   iScore    - Number of points
    //  -   rRatio    - Ratio to the total number of items
    //  -   sImgPath  - Path to image
    //Return:
    //  -   None
    #typeDefinition(iId, iScore, rRatio, sImgPath)
    {
        this.#_Ids[iId]         = iId;
        this.#_Scores[iId]      = iScore;
        this.#_Ratios[iId]      = rRatio;
        this.#_ImgPathes[iId]   = sImgPath;
    }

    //#endregion //Private Methods

}