// let env = require("dotenv").config();
// let keys = require("keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
require("dotenv").config();
// If you read this, please answer in comments: Why wouldn't work when I tried just 'keys'?
let myKeys = require('./keys');
var request = require('request');
var fs = require('fs')

var spotify = new Spotify(myKeys.spotify);
var client = new Twitter(myKeys.twitter);
let [node, path, ...arg] = process.argv


/*
 * For arg my-tweets
 * @param none 
 * @return Last twenty tweets and when they were created in your terminal
 
 */
function liriWrap(arg) {
if (arg[0] === "my-tweets") {
    var params = {
        screen_name: 'm_malach'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log("Created: " + tweets[i].created_at)
                console.log("Text: " + tweets[i].text)
            }
        }
    });
}

/*
    @param spotify-this-song <songname>
    @return Artist(s), Song name, Preview link of the song from Spotify, Album
    @arg2 === null then default "the sign" by ace of base
    Use node-spotify-api to retrieve information from the API
    Like twitter API, spotify API requires you to sign up as a developer to generate the necessary credentials.

*/

if (arg[0] === "spotify-this-song") {
    if (!arg[1]) {
        songQuery = "the sign by ace of base"
    } else {
        songQuery = arg[1]
    }
    spotify.search({
        type: 'track',
        query: songQuery
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data);
        console.log("As performed by " + data.tracks.items[0].album.artists[0].name)
        console.log("Song: " + data.tracks.items[0].name)
        console.log("Preview it: " + data.tracks.items[0].preview_url)
        console.log("Released on " + data.tracks.items[0].album.name)
    });
}

/*
    @param movie-this <movie>
    @return Title, year, imdb rating, rotten tomatoes, country of prod., lang, plot, actors
    param defaults to "Mr.Nobody"
    Use trilogy
*/

if (arg[0] === "movie-this") {
    // Ackshually the sandlot is better than Mr. Nobody
    if (!arg[1]) {
        movieName = "the+sandlot"
    } else {
        movieName = arg[1]
    }
    request('http://www.omdbapi.com/?apikey=669a036e&t=' + movieName, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        if (error) {
            throw error
            return
        }
        if (!error) {
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
            console.log("Title: " + JSON.parse(body)["Title"])
            console.log("Year: " + JSON.parse(body)["Year"])
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
            // if (JSON.parse(body)["Ratings"][1]["Source: 'Rotten Tomatoes'"]) {
            //     console.log("Rotten Tomatoes " + JSON.parse(body)["Ratings"][1]["Source: 'Rotten Tomatoes'"])
            // }
            console.log("Country: " + JSON.parse(body)["Country"])
            console.log("Language: " + JSON.parse(body)["Language"])
            console.log("Plot: " + JSON.parse(body)["Plot"])
            console.log("Actors: " + JSON.parse(body)["Actors"])
        }

    });
}

/*
    @param do-what-it-says
    use fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        Run spotify-this-song for "I want it that way" as follows in random.txt
        
*/

if (arg[0] === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            throw error
            return
        }
        let arg = data.split(",")
        liriWrap(arg)
    })
}
}

liriWrap(arg)