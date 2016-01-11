var App = (function (win) {
    config = {};
    function startUpScreen(){
        $("div." + config.pagesCls).hide();
        $("div." + config.startPageCls).show();
    }
    function menuButton(){
        var buttons, i, name;
        buttons = $("a." + config.menuButtonCls)
        for(i =0; i < buttons.length; i++){
            $(buttons[i]).click(function() {
                $("div." + config.pagesCls).hide();
                name = $(this).attr("href").replace('#','');
		$("div#"+  name).show();
                if(typeof config.menuFunctions[name] !== "undefined"){
                    config.menuFunctions[name]();
                }
            });	
        }
    }
    return {
        init: function(conf){
            config = conf;
            startUpScreen();
            menuButton();
        }
    }
    
}(window));