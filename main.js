/* global $ */
$(document).ready(function() {
    
})



var deck = [];

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
    Calls the Ajax for a random card from either the class list or from the neutral.
    For implementing, might be good to compile the appropriate lists via the GenerateDeck function (so as to minimize calls to AJAX)
        and pass to GenerateCard.  This would also make knowing the size of the list easier.
*/
function GenerateCard(HSclass)
{
    // AJAX call
    
    
    
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



