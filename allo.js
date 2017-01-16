/**
 * Created by gregoire on 15/01/2017.
 */
var links = [];
var casper = require('casper').create({
    clientScripts: ['jquery-3.1.1.min.js'],
    pageSettings: {
        loadImages: false
    }
});
var fs = require('fs');

casper.start('http://www.allocine.fr/film/meilleurs/');

casper.then(function () {
    var e = this.evaluate(function() {
        var links = document.querySelectorAll('div#col_content a.no_underline');
        return Array.prototype.map.call(links, function(l) {
            return {name:l.textContent.trim()};
        });
    });
    links = links.concat(e);
    // var e = this.evaluate(function() {
    //     return $('div#col_content a.no_underline').text().trim();
    // });
    //links.push({name: e});
    this.echo(e);
    this.mouse.click('div.pager a.fr');
    this.echo("ok")
});

for (var i = 1; i <= 3; ++i) {
    casper.thenClick('div.pager a.fr', function () {
        var e = this.evaluate(function() {
            var links = document.querySelectorAll('div#col_content a.no_underline');
            return Array.prototype.map.call(links, function(l) {
                return {name:l.textContent.trim()};
            });
        });
        links = links.concat(e);
        this.echo(e);
        this.mouse.click('div.pager a.fr');
        this.echo("ok")
    });
}

casper.run(function () {
    this.echo(links.length);
    fs.write("film.txt", JSON.stringify(links), 'w');
    this.echo("finish").exit();
});