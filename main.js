/* global $ */
$(document).ready(function() {
    var url = "https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json";
    
    $.get(url).done(function(data) {
        console.log(data);
    });
});