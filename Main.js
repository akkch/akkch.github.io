window.onload = function()
{
    Menu.oOptions = document.getElementById("OptionsWrapper");    //Set link to Settings popup/div

    //Define all event listeners
    document.getElementById("MainMenu").addEventListener("click",Menu.MenuClicked);
    document.getElementById("Option1").addEventListener("click",function(){Menu.NewGame(game);});
    document.getElementById("Option2").addEventListener("click",Menu.OptionsOpen);

    Game.Run();
}