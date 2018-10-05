/* global $ */
var cards = {};
var deck = [];

/* Get cards from hearthstonejson.com, sort them into a map of classes */
$(document).ready(function() {
	let url = "https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json";
	
	$.get(url).done(function(data) {
		for (let i = 0; i < data.length; i++) {
			let card = data[i];
			
			if (card.type == "HERO" && !card.cost) {
				continue;
			}
			
			cards[card.cardClass] = cards[card.cardClass] || [];
			cards[card.cardClass].push(card);
		}
		console.log(cards);
	});
	
	$(".classButton").click(function() {
		let HSclass = this.id.toUpperCase();
		generateDeck(HSclass);
		displayDeck();
	});
});

/* 
	Generates a deck given a HS class:
		Generates 30 random cards.
		Assigns each of the cards to their respective display element. (prob a better way to do this with lists)
		Loads the list of cards into the deck variable.
*/
function generateDeck(HSclass) {
	deck = [];
	
	let classCards = cards[HSclass];
	let neutral = cards["NEUTRAL"];
	let library = classCards.concat(neutral);
	
	for (let i = 0; i < 30; i++) {
		//let currentCard = GenerateCard(HSclass);
		let currentCard = library[getRandomIndex(library)];
		deck.push(currentCard);
	}
	
	sortCards(deck);
	console.log(deck);
};

function getRandomIndex(array) {
	return Math.floor(Math.random() * array.length);
}

/* 
	Calls the Ajax for a random card from either the class list or from the neutral.
	For implementing, might be good to compile the appropriate lists via the GenerateDeck function (so as to minimize calls to AJAX)
		and pass to GenerateCard.  This would also make knowing the size of the list easier.
*/
function GenerateCard(HSclass) {
	let validCard = false;
	
	while (!validCard) {
		let cardIndex = getRandomIndex(cards);
		let card = cards[cardIndex];
		let count = 0;
		
		for (let i = 0; i < deck.length; i++) {
			if (deck[i].name == card.name) {
				count++;
			}
		}
		
		if (count < 2) {
			deck.push(card);
			validCard = true;
		}
	}
}

function sortCards(cards) {
	cards.sort(function(a, b) {
		if (a.cost != b.cost) {
			return a.cost - b.cost;
		}
		
		if (a.name < b.name) {
			return -1;
		} else if (a.name > b.name) {
			return 1;
		} else {
			return 0;
		}
		
	});
	
}

/*
	Outputs the name of each card (& maybe mana cost?) into the DeckList
*/
function displayDeck() {
	/*
	let deckHTML = "<ul>";
	for (let i = 0; i < deck.length; i++) {
		let card = deck[i];
		deckHTML += "<li>" + card.name;
	}
	deckHTML += "</ul>";
	*/
	let deckHTML = "";
	for (let i = 0; i < deck.length; i++) {
		let card = deck[i];
		let url = "https://art.hearthstonejson.com/v1/tiles/" + card.id + ".webp";
		deckHTML += "<div";
		//deckHTML += " onmouseover=\"displayCardArt(" + card + ")\"";
		deckHTML += ">";
		deckHTML += "<img class=\"cardTile\"";
		deckHTML += "src=\"" + url + "\"";
		deckHTML += "\">";
		deckHTML += card.name;
		deckHTML += "</div>";
	}
	$("#deck").html(deckHTML);
}

/*function displayCardArt(card)
{
	let fullPictureurl = "https://art.hearthstonejson.com/v1/render/latest/enUS/256x/" + card.id + ".png";
	console.log(fullPictureurl);
	$.get(fullPictureurl).done(function(data) {
		let deckHTML = "";
		deckHTML += "<div>";
		deckHTML += "<img ";
		deckHTML += "src=\"" + fullPictureurl + "\"";
		deckHTML += "\">";
		deckHTML += "</div>";
		$("#largeCard").html(data);
		console.log(data);
	});
}*/