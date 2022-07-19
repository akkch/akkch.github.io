//The class that represents game configuration - for manual inputs
class Config
{
    //#region Fields--------------------------------------------------------

    static rGAME_ENTITY_SIZE        = 64;                       //Size of entity images
    static rBOARD_SPEED             = 10;                       //Board speed
    static rBOARD_ROWS              = 10;                       //Board rows number
    static rBOARD_COLS              = 10;                       //Board columns number
    static sBOARD_CANVAS_NAME       = "BoardCanvas";            //Board canvas name

    static sPAC_MAN_CANVAS_NAME     = "PacManCanvas";            //Pac man canvas name
    static rPAC_MAN_EYE_RADIUS      = 5;                        //Pac man eye radius
    static sPAC_MAN_BODY_COLOR      = "mediumslateblue";        //Pac man body color
    static sPAC_MAN_BODY_BLINKCOLOR = "red";                    //Pac man body color(when blinked)
    static sPAC_MAN_EYE_COLOR       = "black";                  //Pac man eye color
    static rPAC_MAN_ANGLE_DELTA     = 0.03;                     //Delta change in the angle of opening/closing of the mouth
    static sPAC_MAN_SND_PATH        = "Resources/pacman-waka-waka.mp3";     //Path to Pac man sound when moving
    static sPAC_MAN_DIED_SND_PATH    = "Resources/Pacman-death-sound.mp3";  //Path to Pac man sound when died
    
    static sMONSTERS_CANVAS_NAME    = "MonstersCanvas";         //Monsters canvas name
    
    static iMONSTERS_SCORE          = -5;	                    //Constant - points per intersection between Pac Man and Monster
    static rMONSTERS_SPEED_RATIO    = 0.1;                      //The ratio of the speed of monsters relative to the speed of the board
    static sMONSTERS_SND_PATH       = "Resources/pacman-siren.mp3";         //Constant - path to mines sound
    static sMONSTER_0_IMG_PATH      = "Resources/monster0.png"; //Monster image path
    static sMONSTER_1_IMG_PATH      = "Resources/monster1.png"; //Monster image path
    static sMONSTER_2_IMG_PATH      = "Resources/monster2.png"; //Monster image path
    static sMONSTER_3_IMG_PATH      = "Resources/monster3.png"; //Monster image path

    static iEMPTY_ID            = 0;	                                //Constant - ID of empty cells type
    static iEMPTY_PERCENT       = 0;	                                //Constant - percentage of empty cells thrown on the board
    static sEMPTY_IMG_PATH      = "Resources/Empty.png";                //Constant - path to empty image
    static sEMPTY_SND_PATH      = "Resources/pacman-waka-waka.mp3";     //Constant - path to empty sound
    static iEMPTY_SCORE         = 0;	                                //Constant - points per empty

    static iBALLS_ID            = 1;	                                //Constant - ID of ball type
    static iBALLS_PERCENT       = 70;	                                //Constant - percentage of balls to be dropped on the board
    static sBALLS_IMG_PATH      = "Resources/Ball.png";                 //Constant - path to balls image
    static sBALLS_SND_PATH      = "Resources/pacman-waka-waka.mp3";     //Constant - path to balls sound
    static iBALLS_SCORE         = 1;	                                //Constant - points per ball

    static iCANDIES_ID          = 2;	                                //Constant - ID of candy type
    static iCANDIES_PERCENT     = 20;	                                //Constant - percentage of candies thrown on the board
    static sCANDIES_IMG_PATH    = "Resources/Candy.png";                //Constant - path to candies image
    static sCANDIES_SND_PATH    = "Resources/pacman-eating-candy.mp3";  //Constant - path to candies sound
    static iCANDIES_SCORE       = 3;	                                //Constant - points per candy

    static iMINES_ID            = 3;	                                //Constant - ID of mines type
    static iMINES_PERCENT       = 10;	                                //Constant - percentage of mines thrown on the board
    static sMINES_IMG_PATH      = "Resources/Bomb.png";	                //Constant - path to mines image
    static sMINES_SND_PATH      = "Resources/pacman-siren.mp3";         //Constant - path to mines sound
    static iMINES_SCORE         = -2;	                                //Constant - points per mine

    static iITEMS_IMG_SIZE      = 48;                                   //Size of items images(Balls, Candies etc.)

    //#endregion //Fields

}

//The class that represents game board configuration
class BoardConfig
{
    //#region Properties----------------------------------------------------

    //Board rows number
    get iRowsNum()
    {
        return Config.rBOARD_ROWS;
    }

    //Board columns number
    get iColsNum()
    {
        return Config.rBOARD_COLS;
    }

    //Board speed
    get rSpeed()
    {
        return Config.rBOARD_SPEED;
    }

    //Board canvas name
    get sCanvasName()
    {
        return Config.sBOARD_CANVAS_NAME;
    }

    //Entity Size
    get rEntlitySize()
    {
        return Config.rGAME_ENTITY_SIZE;
    }

    //#endregion //Properties

}

//The class that represents game pac man configuration
class PacManConfig
{
    //#region Fields--------------------------------------------------------

    #_rPAC_MAN_BODY_RADIUS;                       //Calculated in constructor constant - Pac man body radius

    //#endregion //Fields
    
    //#region Properties----------------------------------------------------

    //Pac Man canvas name
    get sCanvasName()
    {
        return Config.sPAC_MAN_CANVAS_NAME;
    }

    //Pac man body radius
    get rBodyRadius()
    {
        return this.#_rPAC_MAN_BODY_RADIUS;
    }

    //Pac man eye radius
    get rEyeRadius()
    {
        return Config.rPAC_MAN_EYE_RADIUS;
    }

    //Pac man body color
    get sBodyColor()
    {
        return Config.sPAC_MAN_BODY_COLOR;
    }

    //Pac man body color
    get sBodyBlinkColor()
    {
        return Config.sPAC_MAN_BODY_BLINKCOLOR;
    }

    //Pac man eye color
    get sEyeColor()
    {
        return Config.sPAC_MAN_EYE_COLOR;
    }

    //Delta change in the angle of opening/closing of the mouth
    get rAngleDelta()
    {
        return Config.rPAC_MAN_ANGLE_DELTA;
    }

    //Path to Pac man sound when moving
    get sSoundPath()
    {
        return Config.sPAC_MAN_SND_PATH;
    }

    //Path to Pac man sound when died
    get sDeadSoundPath()
    {
        return Config.sPAC_MAN_DIED_SND_PATH;
    }

    //Path to Pac man sound when died
    get sMonsterSoundPath()
    {
        return Config.sMONSTERS_SND_PATH;
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
        this.#_rPAC_MAN_BODY_RADIUS = Config.rGAME_ENTITY_SIZE/2;
    }

    //#endregion //Constructor
}

//The class that represents game monsters configuration
class MonstersConfig
{
    //#region Fields--------------------------------------------------------

    #_rMONSTER_IMG_SIZE;    //Calculated in constructor constant - Size of monsters images
    #_rArrImagePath    = [];//Monsters images patches list
    #_sCanvasName;          //Monsters canvas name

    //#endregion //Fields
    
    //#region Properties----------------------------------------------------

    //Constant - points per intersection between Pac Man and Monster
    get iScore()
    {
        return Config.iMONSTERS_SCORE
    }

    //Monsters images patches list
    get ArrImagePath()
    {
        return this.#_rArrImagePath;
    }

    //Monsters canvas name
    get sCanvasName()
    {
        return this.#_sCanvasName;
    }

    //Monster image size
    get iImageSize()
    {
        return this.#_rMONSTER_IMG_SIZE;
    }
    //The ratio of the speed of monsters relative to the speed of the board
    get rSpeedRatio()
    {
        return Config.rMONSTERS_SPEED_RATIO;
    }

    //Path to monsters sound
    get sSoundPath()
    {
        return Config.sMONSTERS_SND_PATH;
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
        this.#_rArrImagePath[0] = Config.sMONSTER_0_IMG_PATH;
        this.#_rArrImagePath[1] = Config.sMONSTER_1_IMG_PATH;
        this.#_rArrImagePath[2] = Config.sMONSTER_2_IMG_PATH;
        this.#_rArrImagePath[3] = Config.sMONSTER_3_IMG_PATH;
    }
   
    //#endregion //Constructor

}

//The class that represents game gameconfiguration
class GameConfig
{
    //#region Fields--------------------------------------------------------

    static #_iItemsAmount;         //Number of candies and balls in the board

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Number of candies and balls in the board
    static get iItemsAmount()
    {
        return GameConfig.#_iItemsAmount;
    }

    //#endregion //Properties

    //#region Constructors--------------------------------------------------

    static
    {
        GameConfig.#_iItemsAmount = Config.rBOARD_ROWS * Config.rBOARD_COLS * Config.iBALLS_PERCENT/100 + Config.rBOARD_ROWS * Config.rBOARD_COLS * Config.iCANDIES_PERCENT/100;
    }

    //#endregion //Constructor
}

//The class that represents board cells configuration
class CellTypeConfig
{

    //#region Fields--------------------------------------------------------

    #_rCANDIES_RATIO;       //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rMINES_RATIO;         //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rBALLS_RATIO;         //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_rEMPTY_RATIO;         //Calculated in constructor constant - Ratio of balls to be dropped on the board
    #_iTypeImgSize;         //Size of images
    #_iCellsAmount;         //Number of cells in the board
    #_arrIds          = []; //Id's of a given type
    #_arrScores       = []; //Points per ball of a given type
    #_arrRatios       = []; //The number of elements of a given type that should be thrown onto the board as a ratio
    #_arrImgPathes    = []; //Patches to images a given type
    #_arrSndPathes    = []; //Patches to sounds a given type

    //#endregion //Fields

    //#region Properties----------------------------------------------------

    //Amount of the cells in the board
    get iCellsAmount()
    {
        return this.#_iCellsAmount;
    }

    //Size of images
    get iTypeImgSize()
    {
        return this.#_iTypeImgSize;
    }

    //Id's of a given type
    get arrIds()
    {
        return this.#_arrIds;
    }

    //Points per ball of a given type
    get arrScores()
    {
        return this.#_arrScores;
    }

    //The number of elements of a given type that should be thrown onto the board as a ratio
    get arrRatios()
    {
        return this.#_arrRatios;
    }

    //Patches to images a given type
    get arrImgPathes()
    {
        return this.#_arrImgPathes;
    }

    //Patches to sounds a given type
    get arrSndPathes()
    {
        return this.#_arrSndPathes;
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
        
        this.#_iCellsAmount = Config.rBOARD_ROWS * Config.rBOARD_COLS;
        this.#_iTypeImgSize = Config.iITEMS_IMG_SIZE;
        this.#typeDefinition(Config.iEMPTY_ID, Config.iEMPTY_SCORE, this.#_rEMPTY_RATIO, Config.sEMPTY_IMG_PATH, Config.sEMPTY_SND_PATH);
        this.#typeDefinition(Config.iBALLS_ID, Config.iBALLS_SCORE, this.#_rBALLS_RATIO, Config.sBALLS_IMG_PATH, Config.sBALLS_SND_PATH);
        this.#typeDefinition(Config.iCANDIES_ID, Config.iCANDIES_SCORE, this.#_rCANDIES_RATIO, Config.sCANDIES_IMG_PATH, Config.sCANDIES_SND_PATH);
        this.#typeDefinition(Config.iMINES_ID, Config.iMINES_SCORE, this.#_rMINES_RATIO, Config.sMINES_IMG_PATH, Config.sMINES_SND_PATH);
    }
   
    //#endregion //Constructor

    //#region Private Methods-----------------------------------------------

    //Definitions of type
    //Arguments:
    //  -   iID       - Type ID
    //  -   iScore    - Number of points
    //  -   rRatio    - Ratio to the total number of items
    //  -   sImgPath  - Path to image
    //  -   sSndPath  - Path to sound
    //Return:
    //  -   None
    #typeDefinition(iId, iScore, rRatio, sImgPath, sSndPath)
    {
        this.#_arrIds[iId]       = iId;
        this.#_arrScores[iId]    = iScore;
        this.#_arrRatios[iId]    = rRatio;
        this.#_arrImgPathes[iId] = sImgPath;
        this.#_arrSndPathes[iId] = sSndPath;
    }

    //#endregion //Private Methods

}