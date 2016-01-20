var quiz = (function (win) {
    var CONST_MIN_NUM_OF_QUESTION = 5, CONST_INTERFACE_DOM = "div#quiz div.interface";
    var correct = 0;
    var wrong = 0;
    var numberOfQuestion = 0;
    var running = false;
    var contolsSet = false;
    var AllowedLettersForQuizz = [], AllowedLatinLettersForQuizz = [], CountLatinLettersForQuizz = {};
    var lastLetter;
    function checkQuizzLetter(actual, guess) {
        if (actual == AllowedLettersForQuizz[guess.toLowerCase()]) {
            $(CONST_INTERFACE_DOM + " input.wrong").removeClass("red");
            $(CONST_INTERFACE_DOM + " input.correct").addClass("green");
            correct = $(CONST_INTERFACE_DOM + " input.correct").val();
            correct++;
            $(CONST_INTERFACE_DOM + " input.correct").val(correct);
        } else {
            $(CONST_INTERFACE_DOM + " input.correct").removeClass("green");
            $(CONST_INTERFACE_DOM + " input.wrong").addClass("red");
            wrong = $(CONST_INTERFACE_DOM + " input.wrong").val();
            wrong++;
            $(CONST_INTERFACE_DOM + " input.wrong").val(wrong);
        }
    }
    function setStartValues() {
        $(CONST_INTERFACE_DOM + " input.current.question").val(1);
        $(CONST_INTERFACE_DOM + " input.all.question").val(numberOfQuestion);
        $(CONST_INTERFACE_DOM + " input.wrong").val(0);
        $(CONST_INTERFACE_DOM + " input.correct").val(0);
        $(CONST_INTERFACE_DOM + " input.actual.guess").val("");
        $(CONST_INTERFACE_DOM + " input.actual.guess").focus();
        $(CONST_INTERFACE_DOM + " input.correct").removeClass("green");
        $(CONST_INTERFACE_DOM + " input.wrong").removeClass("red");
    }
    function setButtonOpportunities(letter) {
        var choices = new Array(4), random, tempLetter;
        var foundKeys = Object.keys(AllowedLettersForQuizz).filter(function (key) {
            return AllowedLettersForQuizz[key] == letter;
        });
        choices[Math.floor(Math.random() * choices.length)] = foundKeys.toString();
        for (var i = 0; i < choices.length; ++i) {
            if (typeof choices[i] === "undefined") {
                do {
                    random = Math.floor(Math.random() * AllowedLatinLettersForQuizz.length);
                    tempLetter = AllowedLatinLettersForQuizz[random];
                } while (choices.indexOf(tempLetter) >= 0);
                choices[i] = tempLetter;
            }
        }
        $(CONST_INTERFACE_DOM + " div.button input.buttona").val(choices[0]);
        $(CONST_INTERFACE_DOM + " div.button input.buttonb").val(choices[1]);
        $(CONST_INTERFACE_DOM + " div.button input.buttonc").val(choices[2]);
        $(CONST_INTERFACE_DOM + " div.button input.buttond").val(choices[3]);
    }
    function setUpArea() {
        $("div#quiz div.box").hide();
        $(CONST_INTERFACE_DOM + "").show();
        if ($("div#quiz input.showbuttonchoice").is(":checked")) {
            $(CONST_INTERFACE_DOM + " p.nobutton").hide();
            $(CONST_INTERFACE_DOM + " div.button").show();
        } else {
            $(CONST_INTERFACE_DOM + " p.nobutton").show();
            $(CONST_INTERFACE_DOM + " div.button").hide();
        }
        var letter = AllowedLatinLettersForQuizz[Math.floor(Math.random() * AllowedLatinLettersForQuizz.length)];
        CountLatinLettersForQuizz[letter]++;
        lastLetter = letter;
        $(CONST_INTERFACE_DOM + " p.actual.letter").text(AllowedLettersForQuizz[letter]);
        setButtonOpportunities(AllowedLettersForQuizz[letter]);
        setStartValues();
    }
    function setLetters(qrHi) {
        var row, letter;
        for (var no in qrHi) {
            row = $("div.main-container div.content.alphabet table.hiragana tr:nth-child(" + (parseInt(qrHi[no]) + 1) + ")");
            row.find("td").each(function (index) {
                if (index > 0) {
                    letter = $(this).find("span:first-child").text();
                    AllowedLettersForQuizz[letter] = $(this).find("span:last-child").text();
                    AllowedLatinLettersForQuizz.push(letter);
                    CountLatinLettersForQuizz[letter] = 0;
                }
            });
        }
    }
    function startQuiz() {
        numberOfQuestion = $("div#quiz div.box input.countofquestions").val();
        if (isNaN(numberOfQuestion) || numberOfQuestion < CONST_MIN_NUM_OF_QUESTION) {
            alert("'Count of Questions' must be greate than 5");
        } else {
            var QuizzrowsHira = new Array();
            $("div.main-container div.content.alphabet input.checkbox.hiragana").each(function (index) {
                if ($(this).is(":checked")) {
                    var tempClass = $(this).attr("class");
                    tempClass = tempClass.replace('checkbox', '').replace('hiragana', '').replace('row', '').replace(' ', '');
                    QuizzrowsHira.push(tempClass)
                }
            });
            if (QuizzrowsHira.length <= 0) {
                alert("No Letters selected!");
            } else {
                AllowedLettersForQuizz = [];
                AllowedLatinLettersForQuizz = [];
                CountLatinLettersForQuizz = {};
                setLetters(QuizzrowsHira);
                setUpArea();
            }
        }
    }
    function endQuiz() {
        running = false;
        var percent = Math.ceil(parseInt($(CONST_INTERFACE_DOM + " input.correct").val()) / numberOfQuestion * 100);
        var pic = "wynolearned.png";
        if (percent > 20)
            pic = "mygrandma.png";
        if (percent > 50)
            pic = "somewhere.png";
        if (percent == 69)
            pic = "ifyouknow.png";
        if (percent > 69)
            pic = "notbad.png";
        if (percent > 90)
            pic = "likeaboss.png";
        $(CONST_INTERFACE_DOM + " p.actual.letter").html('<img src="img/' + pic + '"><br>' + percent.toString() + "%");
        $(CONST_INTERFACE_DOM + " p.nobutton").hide();
        $(CONST_INTERFACE_DOM + " div.button").hide();
    }
    function getNewLetterForQuizz() {
        var questionNo = $(CONST_INTERFACE_DOM + " input.current.question").val();
        var letter, counter = 0, copyAllowedLetters = JSON.parse(JSON.stringify(AllowedLatinLettersForQuizz));
        console.log(copyAllowedLetters);
        do {
            counter++;
            var randomNo = Math.floor(Math.random() * AllowedLatinLettersForQuizz.length);
            letter = AllowedLatinLettersForQuizz[randomNo];
            while (CountLatinLettersForQuizz[letter] > parseInt(questionNo) / numberOfQuestion * AllowedLatinLettersForQuizz.length) {
                if (randomNo >= AllowedLatinLettersForQuizz.length - 1) {
                    randomNo = 0;
                } else {
                    randomNo++;
                }
                letter = AllowedLatinLettersForQuizz[randomNo];
            }
        } while (letter == lastLetter);
        CountLatinLettersForQuizz[letter]++;
        lastLetter = letter;
        return  AllowedLettersForQuizz[letter];
    }
    function progressQuiz(actualLetter, guesLetter) {
        checkQuizzLetter(actualLetter, guesLetter);
        var questionNo = $(CONST_INTERFACE_DOM + " input.current.question").val(), letter;
        if (parseInt(questionNo) == parseInt(numberOfQuestion)) {
            endQuiz();
        } else {
            questionNo++;
            $(CONST_INTERFACE_DOM + " input.current.question").val(questionNo);
            $(CONST_INTERFACE_DOM + " input.actual.guess").val("");
            letter = getNewLetterForQuizz();
            $(CONST_INTERFACE_DOM + "  p.actual.letter").text(letter);
            setButtonOpportunities(letter);
        }
    }
    function buttonControls() {
        $("div#quiz div.box input.startquiz").click(function () {
            running = true;
            startQuiz();
        });
        $('div#quiz div.interface input.actual.guess').keyup(function (event) {
            if (event.which == 13 && running == true) {
                var actualLetter = $(CONST_INTERFACE_DOM + " p.actual.letter").text();
                var guesLetter = $(CONST_INTERFACE_DOM + " input.actual.guess").val().toLowerCase();
                progressQuiz(actualLetter, guesLetter);
            }
        });
        $(CONST_INTERFACE_DOM + " input.restart.game").click(function () {
            for (var i = 0; i < AllowedLatinLettersForQuizz.length; i++) {
                CountLatinLettersForQuizz[AllowedLatinLettersForQuizz[i]] = 0;
            }
            running = true;
            setUpArea();
        });
        $(CONST_INTERFACE_DOM + " input.cancel.game").click(function () {
            running = false;
            $("div#quiz div.interface").hide();
            $("div#quiz div.box").show();
        });
        $(CONST_INTERFACE_DOM + " div.button input.quizzbuttonchoice").click(function () {
            var actualLetter = $(CONST_INTERFACE_DOM + " p.actual.letter").text();
            var guesLetter = $(this).val();
            progressQuiz(actualLetter, guesLetter);
            //getNewLetterForQuizz();
            //makeButtonOpportunities($(CONST_INTERFACE_DOM + " p.actual.letter").text());
        });
    }
    function startUp() {
        $(CONST_INTERFACE_DOM + "").hide();
        $("div#quiz div.box").show();
        if (!contolsSet) {
            buttonControls();
            contolsSet = true;
        }
    }
    return {
        init: function () {
            if (running) {
                $(CONST_INTERFACE_DOM).show();
            } else {
                startUp();
            }
        }
    }

}(window));