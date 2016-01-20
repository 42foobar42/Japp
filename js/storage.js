var storage = (function (win) {

    return {
        init: function(){
            if(typeof(Storage) !== "undefined") {
                return true;
            } else {
                return false;
            }
        },
        add: function(key, value){
            var store = localStorage.getItem(key);
            if(store === null){
                store = [];
            } else {
                store = JSON.parse(store);
            }
            store.push(value);
            localStorage.setItem(key, JSON.stringify(store));
        },
        getObj: function(key){
            var store = localStorage.getItem(key);
            return JSON.parse(store);
        },
        remove: function(key, val){
            var store = this.getObj(key);
            var newStore = [], i = 0;
            for(i = 0; i < store.length; i++){
                if(store[i] !== val){
                    newStore.push(store[i]);
                }
            }
            localStorage.setItem(key, JSON.stringify(newStore));
        }
    }
    
}(window));