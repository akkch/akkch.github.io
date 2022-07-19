//Menu icon animation handler(Change 3 bars to X)
function menuSymChanger(x) {
    x.classList.toggle("change");
  }
  
  //Class which represented menu behavior
  class Menu
  {
    //#region Fields--------------------------------------------------------

    static oOptions;                  //Link to options instance
    static #_ignoreClickOnMeElement;  //Indication flag - indicate that click event was performed on options poup or not
    static #_oGame;                   //Link to the game object
    static #_oDomElPlayer1;           //Link to player 1 DOM elememnt
  
    //#endregion //Fields

    //#region Public Methods------------------------------------------------

    //Initialization
    static Init()
    {
      Menu.#_oGame = Game;
      Menu.#_oDomElPlayer1 = document.getElementById("Player1Field");
      Menu.oOptions = document.getElementById("OptionsWrapper");    //Set link to Settings popup/div
    }

    //Menu icon clicked event handler
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static MenuClicked() 
    {
      document.getElementById("myDropdown").classList.toggle("show");
    }
  
    //New game clicked event handler(As option of main menu)
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static NewGame()
    {
      document.getElementById("Player1_Name_Present").innerHTML = Options.Player1Name;

      if(!Menu.#_oDomElPlayer1.classList.contains("PlayerFieldStarted"))
      Menu.#_oDomElPlayer1.classList.add("PlayerFieldStarted");
      Menu.#_oGame.Run(Options.Player1Name);
  
    }
  
    //Options clicked event handler(As option of main menu)
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static OptionsOpen()
    {
      Menu.#_oGame.Clear();
  
      if(Menu.#_oDomElPlayer1.classList.contains("PlayerFieldStarted"))
        Menu.#_oDomElPlayer1.classList.remove("PlayerFieldStarted");
  
  
      Menu.oOptions.style.display = "block";
      Menu.#_ignoreClickOnMeElement = document.getElementById('Options');
      document.addEventListener('click', Menu.clickHandler);
    }
  
    //Option popup closing event handler
    //Occurs when a click has occurred outside OPtions popup
    //Arguments:
    //  -   event - event data
    //Return:
    //  -   None
    static clickHandler(event)
    {
        var isClickInsideElement = Menu.#_ignoreClickOnMeElement.contains(event.target);
        if (!isClickInsideElement && event.target.toString() != "") {
          Menu.#_optionsClose(event);
        }
    }
      
    //#endregion //Public Methods

    //#region Private Methods-----------------------------------------------

    //Helper for "clickHandler"
    //Close "Options" popup
    //Arguments:
    //  -   event - event data
    //Return:
    //  -   None
    static #_optionsClose(event)
    {
      event.target.removeEventListener('click', Menu.clickHandler);
      Menu.oOptions.style.display = "none";
    }
 
    //#endregion //Private Methods

  }
  
  //A class that represents the "options" popup behavior and stores game definitions
  class Options
  {
    //#region Fields--------------------------------------------------------

    static Player1Name = "Player1"; //Player 1 name
    static #_tmp;                   //For temporary using

    //#endregion //Fields

    //#region Public Methods------------------------------------------------

    //Player name field selected event handler
    //Saves the name that was in the text field and clears the field.
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static PlayerNameClick(event)
    {
      Options.#_tmp = event.target.value;
      event.target.value = "";
    }
  
    //Player name field loose focus event handler
    //Stores the name that was entered in the text field, or the previous name (saved when the field was selected) if the field was empty
    //Arguments:
    //  -   None
    //Return:
    //  -   None
    static PlayerNameBlur(event)
    {
      if(!event.target.value  || /^\s*$/.test(event.target.value) || event.target.value.length === 0)
      {
        event.target.value = Options.#_tmp;
        Options.#_tmp = "";
      }
      else
      {
        if(event.target.id.toString().includes("Player1"))
          Options.Player1Name = event.target.value;
        else
          Options.Player2Name = event.target.value;
      }
  
      window.console.log("Player1Name" + Options.Player1Name);
    }
      
    //#endregion //Public Methods

  }
  