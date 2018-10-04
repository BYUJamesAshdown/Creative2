/* global $ */
var cards = {};
var classLibrary = []
var deck = [];

$(document).ready(function() {
	let url = "https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json";
	
	$.get(url).done(function(data) {
		for (let i = 0; i < data.length; i++) {
			let card = data[i];
			cards[card.cardClass] = cards[card.cardClass] || [];
			cards[card.cardClass].push(card);
		}
		sortCards(cards["DRUID"]);
		console.log(cards["DRUID"]);
	});
});

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
			return a - b;
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
	Generates a deck given a HS class:
		Generates 30 random cards.
		Assigns each of the cards to their respective display element. (prob a better way to do this with lists)
		Loads the list of cards into the deck variable.
*/
function GenerateDeck(HSclass)  
{
	deck = [];
	for (var i = 0; i < 30; i++)
	{
		var currentCard = GenerateCard(HSclass);
		deck.push(currentCard);
	}
};



/*
	Outputs the name of each card (& maybe mana cost?) into the DeckList
*/
function DisplayDeck()
{
	
}


/*
	Sorts the Deck by Mana Cost
*/
function SortDeckByManaCost()
{
	
}

/*
	Adds each card to the large display below the DeckList
*/
function DisplayEachCard()
{
	for (var i = 0; i < 30; i++)
	{
		var cardI = "deck " + i;
		$(cardI).html(deck[i]);
	}
}





function GenerateWarriorDeck()
{
	GenerateDeck("Warrior");
}
function GenerateShamanDeck()
{
	GenerateDeck("Shaman");
}
function GenerateRogueDeck()
{
	GenerateDeck("Rogue");
}
function GeneratePaladinDeck()
{
	GenerateDeck("Paladin");
}
function GenerateHunterDeck()
{
	GenerateDeck("Hunter");
}
function GenerateDruidDeck()
{
	GenerateDeck("Druid");
}
function GenerateMageDeck()
{
	GenerateDeck("Mage");
}
function GeneratePriestDeck()
{
	GenerateDeck("Priest");
}
function GenerateWarlockDeck()
{
	GenerateDeck("Warlock");
}