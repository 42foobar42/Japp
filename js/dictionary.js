var dictionary = (function (win) {
    var created= false;
    function makeButtonControls(){
        $("#createDictButton").click(function(){
            var answer = prompt("Name of dictionary:");
            console.log(answer);
        });
    }
    return {
        init: function(){
            if(created === false){
                makeButtonControls();
                created = true;
            }
        }
    }
    
}(window));