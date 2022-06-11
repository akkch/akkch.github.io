//Menu icon animation handler(Change 3 bars to X)
function menuSymChanger(x) {
    x.classList.toggle("change");
  }
  
  //Class which represented menu behavior
  class Menu
  {
    static oOptions;
    static #_ignoreClickOnMeElement;
    static #_oGame;
  
    //Menu icon clicked event handler
    static MenuClicked() 
    {
      document.getElementById("myDropdown").classList.toggle("show");
    }
  
    //New game clicked event handler(As option of main menu)
    static NewGame(game)
    {
      Menu.#_oGame = game;
       game.SetPlayer(Options.Player1Name,Options.Player1Color);
       game.SetPlayer(Options.Player2Name,Options.Player2Color);
       game.StartNew(Options.BoardSize, Options.BoardSize,Options.Complexity);
       
       document.getElementById("Player1_Name_Present").innerHTML = Options.Player1Name;
       document.getElementById("Player2_Name_Present").innerHTML = Options.Player2Name;
  
       var player1 = document.getElementById("Player1Field");
       var player2 = document.getElementById("Player2Field");
  
      if(!player1.classList.contains("PlayerFieldStarted"))
        player1.classList.add("PlayerFieldStarted");
  
      if(!player2.classList.contains("PlayerFieldStarted"))
        player2.classList.add("PlayerFieldStarted");
  
    }
  
    //Options clicked event handler(As option of main menu)
    static OptionsOpen()
    {
      Game.ClearFields();
      var player1 = document.getElementById("Player1Field");
      var player2 = document.getElementById("Player2Field");
  
      if(player1.classList.contains("PlayerFieldStarted"))
        player1.classList.remove("PlayerFieldStarted");
  
      if(player2.classList.contains("PlayerFieldStarted"))
        player2.classList.remove("PlayerFieldStarted");
  
      Menu.oOptions.style.display = "block";
      Menu.#_ignoreClickOnMeElement = document.getElementById('Options');
      document.addEventListener('click', Menu.clickHandler);
    }
  
    //Option popup closing event handler
    //Occurs when a click has occurred outside OPtions popup
    static clickHandler(event)
    {
        var isClickInsideElement = Menu.#_ignoreClickOnMeElement.contains(event.target);
        if (!isClickInsideElement && event.target.toString() != "") {
          Menu.#_ptionsClose(event);
        }
    }
  
    //Helper for "clickHandler"
    //Close "Options" popup
    static #_ptionsClose(event)
    {
      event.target.removeEventListener('click', Menu.clickHandler);
      Menu.oOptions.style.display = "none";
    }
  
  
  }
  
  //A class that represents the "options" popup behavior and stores game definitions
  class Options
  {
    static BoardSize = 3;
    static Complexity = "Easy";
    static Player1Name = "Player1";
    static Player1Color = "#282828";
    static Player2Name = "Player2";
    static Player2Color = "#282828";
    static #_tmp;
  
    //Board size changed event handler
    static BoardSizeSelect(event)
    {
      if(!isNaN(event.target.value))
        Options.BoardSize = event.target.value;
  
      window.console.log("BoardSize  : " + BoardSize);
    }
  
    //Game complexity changed event handler
    static GameComplexitySelect(event)
    {
      switch(event.target.value) {
        case "Easy":
        case "Medium":
        case "Hard":
          Options.Complexity = event.target.value;
          break;
        default:
          window.console.log("Error: Wrong complexity mode was sent");
      }
  
    }
  
    //Player name field selected event handler
    //Saves the name that was in the text field and clears the field.
    static PlayerNameClick(event)
    {
      Options.#_tmp = event.target.value;
      event.target.value = "";
    }
  
    //Player name field loose focus event handler
    //Stores the name that was entered in the text field, or the previous name (saved when the field was selected) if the field was empty
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
      window.console.log("Player2Name" + Options.Player2Name);
    }
  
    //Player color field selected event handler
    static PlayerColorSelect(event)
    {
      if(event.target.id.toString().includes("Player1"))
          Options.Player1Color = event.target.value;
        else
          Options.Player2Color = event.target.value;
  
      window.console.log("SelectPlayer1Color : " + Options.Player1Color);
      window.console.log("SelectPlayer2Color : " + Options.Player2Color);
    }
  }
  