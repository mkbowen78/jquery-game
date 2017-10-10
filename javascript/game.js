$(document).ready(function() {
	var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies, rounds;	//Set Global Variables
	var wins = 0;
	var loses = 0;

	function varSet() {		//Sets all of the variable values
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Rick",
			pic: 'assets/images/rick.png',
			hitPoints: 200,
			attackPower: 15
		}, {
			id: 1,
			name: "Michonne",
			pic: 'assets/images/michonne.png',
			hitPoints: 180,
			attackPower: 20
		}, {
			id: 2,
			name: "Daryl",
			pic: 'assets/images/daryl.png',
			hitPoints: 190,
			attackPower: 25
		}, {
			id: 3,
			name: "Carol",
			pic: 'assets/images/carol.png',
			hitPoints: 175,
			attackPower: 15
		} ];

		haveCharacter = false;
		haveAttacker = false;
		numEnemies = 3;
		rounds = 7;

		for(var i = 0; i < enemyArray.length; i++) {
			choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
			"><img class='fighters' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> HP: " + enemyArray[i].hitPoints +
			"<br> AP: " + enemyArray[i].attackPower + " </div>";
		}

		$("#picking").html(choices);
		$("#todo").html("Pick your fighter...");

		$('.hero').remove();
		$('.fighting').remove();
		$('#whathappens').html("");

		attachCharacterOnClick();
	}

	function printCharacters() {
		var hero = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
			"><img class='fighters' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> HP: " + enemyArray[myChar].hitPoints +
			"<br> AP: " + enemyArray[myChar].attackPower + " </div>";
		var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
			"><img class='fighters' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> HP: " + enemyArray[opponentChar].hitPoints +
			"<br> AP: " + enemyArray[opponentChar].attackPower + " </div>";
		$('#myFighter').html(hero);
		$('#enemy').html(badguy);
	}

	function whatHappens() {
		var description = "You've attacked " + enemyArray[opponentChar].name + " and caused " + enemyArray[myChar].attackPower + " damage!<br>" +
			enemyArray[opponentChar].name + " fought back and caused " + enemyArray[opponentChar].attackPower + " damage!<br>" +
			"Your attack strength has increased by " + rounds + "!";
		$('#whathappens').html(description);
	}

	function attachCharacterOnClick() {
		$('.character').on("click", function(){
			if(!haveCharacter) {	//Picking your character
				myChar = $(this).attr('id');
				$("#myFighter").append(this);
				$(this).addClass("hero");

				haveCharacter = true;
				$('#whathappens').html("");
				$("#todo").html("Choose an enemy!");
			}
			//You have a character and you're picking your opponent
			else if(!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {
				opponentChar = $(this).attr('id');
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
				$('#whathappens').html("");
				$("#todo").html("Choose any weapon to attack!");
			}
		});
	}
// -- KNIKE ATTACK
	$(".btn-danger").on("click", function() {
		if(!haveCharacter) {
			$('#whathappens').html("Yo, pick a fighter first!");
		}
		else if(!haveAttacker) {
			$('#whathappens').html("Pick an enemy to fight!");
		}
		else if(haveCharacter && haveAttacker) {
			rounds++;
			enemyArray[opponentChar].hitPoints  = enemyArray[opponentChar].hitPoints - enemyArray[myChar].attackPower;	//Hit Them
			enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints - enemyArray[opponentChar].attackPower;	//Get Hit

			if(enemyArray[opponentChar].hitPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					$('#whathappens').html("");
					$("#todo").html("Who will you fight next?");
					haveAttacker = false;
				}
				else {
					whatHappens();
					alert("YOU WIN! Play again!");
					wins++;
					$('#winsloses').html("Overall Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
					varSet();
				}

			}
			else if(enemyArray[myChar].hitPoints < 0) {
				whatHappens();
				alert("Shit! Your fighter has been killed! Try again!");
				loses++;
				$('#winsloses').html("Overall Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
				varSet();
			}
			else {
				whatHappens();
				printCharacters();
			}

			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + rounds;	//Get Stronger
		}
	});

	$('#restart').on("click", function(){
		varSet();
	});

	attachCharacterOnClick();
	varSet();

});
