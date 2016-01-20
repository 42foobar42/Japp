var dictionary = (function (win) {
    var DIC_STORES_NAME = "dictionaries";
    var created = false;
    function fillSelection(){
        var dicts = storage.getObj(DIC_STORES_NAME), i = 0;
        $("#dictSelect").empty();
        for(i = 0; i < dicts.length; i++){
            $("#dictSelect").append($('<option></option>').val(dicts[i]).html(dicts[i]));
        }
    }
    function createDictionary(){
        var answer = prompt("Name of dictionary:");
            if (answer !== "") {
                if(answer !== null){
                    storage.add(DIC_STORES_NAME, answer);
                    fillSelection();
                }
            } else {
                alert("Please enter a name");
            }
    }
    function deleteDictionary(){
        storage.remove(DIC_STORES_NAME, $("#dictSelect").val());
        fillSelection();
    }
    function makeButtonControls() {
        $("#createDictButton").click(function () {
            createDictionary();
        });
        $("#deleteDictButton").click(function (){
            deleteDictionary();
        });
    }
    return {
        init: function () {
            if (storage.init() == false) {
                //TODO
                alert("Your browser doen't suppot local storage! So you can use the dictionary!");
                return;
            }
            if (created === false) {
                makeButtonControls();
                fillSelection();
                created = true;
            }
        }
    }

}(window));