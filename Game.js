class Game
{
    static #_oBoard;
    static #_oPacMan;
    static #_oMonsters;

    static Run()
    {
        Game.#boardInit();
        Game.#pacManInit();
        Game.#monstersInit();

        new Timer(Game,Entity._oBoard.BoardSpeed,-1);

    }

    
    //On tick event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static OnTick()
    {
        if(Monster.IsThereIntersection(Game.#_oPacMan.Center_X, Game.#_oPacMan.Center_Y))
            Game.#_oPacMan.BlinkFlag = true;
    }
    

    static #boardInit()
    {
        Game.#_oBoard = new Board(new BoardConfig());
        Game.#_oBoard.Draw(10, 10, new CellTypeConfig());
    }

    static #pacManInit()
    {
        Game.#_oPacMan = new PacMan(Game.#_oBoard ,new PacManConfig());
    }

    static #monstersInit()
    {
        var oMonstersConfig = new MonstersConfig();
        for(let i=0;i<oMonstersConfig.ArrImagePath.length;i++)
        {
            new Monster(Game.#_oBoard,oMonstersConfig);

        }
    }

}