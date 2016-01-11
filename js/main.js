var AllowedLettersForQuizz = new Array();
var AllowedLatinLettersForQuizz = [];
var CountLatinLettersForQuizz = [];
var ButtonChoice = "";
var lastLetter = "";
var NumberOfQuestion;
var QuizzIsOn;

function makeQuizArea(){
// AllowedLettersForQuizz[AllowedLatinLettersForQuizz[1 + AllowedLatinLettersForQuizz.Length * (Math.random())]];
	$("div.main-container div.main div.content.alphabet table.hiragana").hide();
	$("div.main-container div.main div.content.alphabet div.quiz.box").hide();
	/*gamearea = '<div class="quiz interface"><div class="area">';
	gamearea += '<p class="actual letter">' + AllowedLettersForQuizz[AllowedLatinLettersForQuizz[Math.floor(Math.random()*AllowedLatinLettersForQuizz.length)]];
	gamearea +='</p><p><input type="text" class="actual guess"/></p>';
	gamearea += '</div>';
	gamearea += '<div class="menu"><p><input type="button" value="Cancel" class="cancel game"></p>';
	gamearea += '<p>Question <input type="text" readonly="readonly" class="current question" value="1"/> of <input type="text" class="all question" readonly="readonly" value="' + NumberOfQuestion + '" /></p>';
	gamearea += '<p>Correct: <input readonly="readonly" type="text" class="correct" value="0"/>';
	gamearea += 'Wrong:<input readonly="readonly" type="text" class="wrong" value="0" /></p>';
	gamearea += '</div></div>';*/
	$("div.main-container div.main div.content.alphabet div.quiz.interface").removeClass('hide');
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.all.question").val(NumberOfQuestion);
	letter = AllowedLatinLettersForQuizz[Math.floor(Math.random()*AllowedLatinLettersForQuizz.length)];
	CountLatinLettersForQuizz[letter]++;
	lastLetter = letter;
	if(ButtonChoice == 1){
		$("div.main-container div.main div.content.alphabet div.quiz.interface p.nobutton").hide();
		$("div.main-container div.main div.content.alphabet div.quiz.interface div.button").show();
		makeButtonOpportunities(AllowedLettersForQuizz[letter]);
	} else {
		$("div.main-container div.main div.content.alphabet div.quiz.interface p.nobutton").show();
		$("div.main-container div.main div.content.alphabet div.quiz.interface div.button").hide();
	}
	$("div.main-container div.main div.content.alphabet div.quiz.interface p.actual.letter").text(AllowedLettersForQuizz[letter]);
	//$("div.main-container div.main div.content.alphabet").append(gamearea);
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.current.question").val(1);
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.wrong").val(0);
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.correct").val(0);
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.actual.guess").val("");
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.actual.guess").focus();
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.correct").removeClass("green");
	$("div.main-container div.main div.content.alphabet div.quiz.interface input.wrong").removeClass("red");
	QuizzIsOn = true;
}

function makeButtonOpportunities(letter){
	var choices = new Array(4);
	foundKeys = Object.keys(AllowedLettersForQuizz).filter(function(key) {
		return AllowedLettersForQuizz[key] == letter;
	});
	choices[Math.floor(Math.random()*choices.length)] = foundKeys.toString();
	//alert("ength: " + choices.length);
	for (var i = 0; i < choices.length; ++i){
		//alert("i: " + choices[i]);
		if (typeof choices[i] === "undefined"){
			//random = Math.floor(Math.random()*AllowedLatinLettersForQuizz.length);
			//alert("ran: " + random);
			do {				
				random = Math.floor(Math.random()*AllowedLatinLettersForQuizz.length);
				tempLetter = AllowedLatinLettersForQuizz[random];
				//alert("index: " + choices.indexOf(AllowedLatinLettersForQuizz[random]) + "| letter: " + AllowedLatinLettersForQuizz[random]);
				//alert(choices.indexOf(tempLetter));
			} while(choices.indexOf(tempLetter) >= 0 );
			choices[i] = tempLetter;
		}
	}
	$("div.main-container div.main div.content.alphabet div.quiz.interface div.button input.buttona").val(choices[0]);
	$("div.main-container div.main div.content.alphabet div.quiz.interface div.button input.buttonb").val(choices[1]);
	$("div.main-container div.main div.content.alphabet div.quiz.interface div.button input.buttonc").val(choices[2]);
	$("div.main-container div.main div.content.alphabet div.quiz.interface div.button input.buttond").val(choices[3]);
}

function gameControl(){
	$('div.main-container div.main div.content.alphabet div.quiz.interface input.actual.guess').keyup(function(event) {		
		if (event.which == 13 && QuizzIsOn == true) {
			actualLetter = $("div.main-container div.main div.content.alphabet div.quiz.interface p.actual.letter").text();
			guesLetter = $("div.main-container div.main div.content.alphabet div.quiz.interface input.actual.guess").val().toLowerCase();
			checkQuizzLetter(actualLetter, guesLetter);
		}
	});
}

function checkQuizzLetter(actualLetter, guesLetter){
	if(actualLetter == AllowedLettersForQuizz[guesLetter.toLowerCase()]) {
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.wrong").removeClass("red");
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.correct").addClass("green");
		correct = $("div.main-container div.main div.content.alphabet div.quiz.interface input.correct").val();
		correct++;
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.correct").val(correct);
	} else {
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.correct").removeClass("green");
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.wrong").addClass("red");
		wrong = $("div.main-container div.main div.content.alphabet div.quiz.interface input.wrong").val();
		wrong++;
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.wrong").val(wrong);
	}
			/*questionNo = $("div.main-container div.main div.content.alphabet div.quiz.interface input.current.question").val();*/
	questionNo = $("div.main-container div.main div.content.alphabet div.quiz.interface input.current.question").val();
	if (parseInt(questionNo) == parseInt(NumberOfQuestion)) {
		QuizzIsOn = false;
		percent = Math.ceil(parseInt($("div.main-container div.main div.content.alphabet div.quiz.interface input.correct").val())/NumberOfQuestion * 100);
		//<img src="img/wynolearned.png">
		pic = "wynolearned.png";
		if (percent > 20) pic = "mygrandma.png";
		if (percent > 50) pic = "somewhere.png";
		if (percent == 69) pic = "ifyouknow.png";
		if (percent > 69) pic = "notbad.png";
		if (percent > 90) pic = "likeaboss.png";
		$("div.main-container div.main div.content.alphabet div.quiz.interface p.actual.letter").html('<img src="img/' + pic + '"><br>' + percent.toString() + "%");
		$("div.main-container div.main div.content.alphabet div.quiz.interface p.nobutton").hide();
		$("div.main-container div.main div.content.alphabet div.quiz.interface div.button").hide();
	} else{	
		questionNo++;
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.current.question").val(questionNo);
		$("div.main-container div.main div.content.alphabet div.quiz.interface input.actual.guess").val("");
		$("div.main-container div.main div.content.alphabet div.quiz.interface p.actual.letter").text(getNewLetterForQuizz());
	}
}

function getNewLetterForQuizz(){
	//letter = AllowedLettersForQuizz[AllowedLatinLettersForQuizz[Math.floor(Math.random()*AllowedLatinLettersForQuizz.length)]];
	questionNo = $("div.main-container div.main div.content.alphabet div.quiz.interface input.current.question").val();
	do {
		randomNo = Math.floor(Math.random()*AllowedLatinLettersForQuizz.length);
		letter = AllowedLatinLettersForQuizz[randomNo];
		
		//while(CountLatinLettersForQuizz[letter] > parseInt(questionNo)){
		while(CountLatinLettersForQuizz[letter] > parseInt(questionNo)/NumberOfQuestion*AllowedLatinLettersForQuizz.length){
			if (randomNo >= AllowedLatinLettersForQuizz.length - 1) {
				randomNo = 0;
			} else {
				randomNo++;
			}
			letter = AllowedLatinLettersForQuizz[randomNo];
		}
	} while(letter == lastLetter);
	CountLatinLettersForQuizz[letter]++;
	//alert(letter + " = " + CountLatinLettersForQuizz[lastLetter] + " > " + parseInt(questionNo)/NumberOfQuestion + " | Last: " + lastLetter);
	lastLetter = letter;
	return  AllowedLettersForQuizz[letter];
}


function startLetterQuizz(qrHi,qrKa){
	AllowedLettersForQuizz = new Array()
	AllowedLatinLettersForQuizz = new Array();
	CountLatinLettersForQuizz = new Array();
	for( var no in qrHi ) {
		rowno = parseInt(qrHi[no]) + 1;
		row = $("div.main-container div.content.alphabet table.hiragana tr:nth-child(" + rowno + ")");
		row.find("td").each(function( index ) {
			if(index > 0){
				letter = $(this).find("span:first-child").text();
				AllowedLettersForQuizz[letter] = $(this).find("span:last-child").text();
				AllowedLatinLettersForQuizz.push(letter);
				CountLatinLettersForQuizz[letter] = 0;
				if ($("div.main-container div.content.alphabet input.showbuttonchoice").is(":checked")) {
					ButtonChoice = 1;
				} else {
					ButtonChoice = 0;
				}
			}
		});
	}
	makeQuizArea()
}


function initButtons(){
	$("div.header-container a.mainmenubutton").click(function() {
		$("div.main-container div.main div.content").hide();
		$("div.main-container div.main div.content." + ($(this).attr("href").replace('#',''))).show();
	});	
	$("div.main-container div.content.alphabet div.quiz input.startquiz").click(function() {
		numberOfQuestion = $("div.main-container div.content.alphabet input.countofquestions").val();
		if (isNaN(numberOfQuestion)) {
			alert("No valid number in 'Count of Questions'");
		} else {
			var QuizzrowsHira = new Array();
			$("div.main-container div.content.alphabet input.checkbox.hiragana").each(function( index ) {
				if($(this).is(":checked")){
					tempClass=$(this).attr("class");
					tempClass = tempClass.replace('checkbox', '').replace('hiragana', '').replace('row', '').replace(' ', '');
					QuizzrowsHira.push(tempClass)
				}
			});
			if(QuizzrowsHira.length <= 0){
				alert("No Letters selected!");
			} else {
				NumberOfQuestion = numberOfQuestion;
				startLetterQuizz(QuizzrowsHira, "");
			}
		}
	});
	$("div.main-container div.content.alphabet div.quiz.interface input.cancel.game").click(function() {
		//$("div.main-container div.main div.content.alphabet div.quiz.interface").remove();
		$("div.main-container div.main div.content.alphabet div.quiz.interface").addClass('hide');
		$("div.main-container div.main div.content.alphabet table.hiragana").show();
		$("div.main-container div.main div.content.alphabet div.quiz.box").show();
	});
	$("div.main-container div.content.alphabet div.quiz.interface input.restart.game").click(function() {
		//for var i = 0  AllowedLatinLettersForQuizz = [];
		for (var i=0; i<AllowedLatinLettersForQuizz.length; i++) {
			CountLatinLettersForQuizz[AllowedLatinLettersForQuizz[i]] = 0;
		}
		makeQuizArea();
	});
	$("div.main-container div.main div.content.alphabet div.quiz.interface div.button input.quizzbuttonchoice").click(function() {
		actualLetter = $("div.main-container div.main div.content.alphabet div.quiz.interface p.actual.letter").text();
		guesLetter = $(this).val();
		checkQuizzLetter(actualLetter, guesLetter);
		makeButtonOpportunities($("div.main-container div.main div.content.alphabet div.quiz.interface p.actual.letter").text());
	});
	$("div.main-container div.content.alphabet input.toggle").click(function() {
		table = $(this).attr("class")
		table = table.replace('toggle', '');
		table = $.trim(table);
		$("div.main-container div.content.alphabet input.checkbox." + table).each(function( index ) {
			if($(this).is(":checked")){
				$(this).attr('checked', false);
			} else {		
				$(this).attr('checked', true);
			}
		});
	});
}			

function updateSite(event) {
	alert("update Cache");
    window.applicationCache.swapCache();
}

returnval = window.applicationCache.addEventListener('updateready',updateSite, false);			
alert("Cache: " + returnval);
$(document).ready(function() {
	initButtons();
	gameControl();
});