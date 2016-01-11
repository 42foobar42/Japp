var config = {
    pagesCls: "content",
    startPageCls: "alphabet",
    menuButtonCls: "mainmenubutton",
    menuFunctions: {
        quiz: function () {
            quiz.init()
        }
    }
};

$(document).ready(function () {
    $("#quiz").load("views/quiz.html");
    $("#alphabet").load("views/alphabet.html");
    $("#dictionary").load("views/dictionary.html");
    App.init(config);
});
