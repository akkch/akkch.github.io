window.onload = function()
{
    Menu.Init();
    Game.Init();
    //Define menu event listeners
    document.getElementById("MainMenu").addEventListener("click",Menu.MenuClicked);
    document.getElementById("Player1_Name").addEventListener("focus",Options.PlayerNameClick);
    document.getElementById("Player1_Name").addEventListener("blur",Options.PlayerNameBlur);
    document.getElementById("Option1").addEventListener("click",Menu.NewGame);
    document.getElementById("Option2").addEventListener("click",Menu.OptionsOpen);
}