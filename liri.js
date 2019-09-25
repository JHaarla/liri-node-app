require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
let Spotify = require('node-spotify-api');
let fs = require("fs");

let inputString = process.argv;

let liriType = inputString[2];

let movieName = "";
let trackName = "";
let artist = "";
let artistFormatted = "";



switch (liriType) {
    case "movie-this":

    fetchMovie();
        
        break;

    case "concert-this":

    fetchConcert();

        break;

    case "spotify-this-song":

    fetchSpotify();

        break;

    case "do-what-it-says":

    doRandom();

        break;

}


function fetchSpotify() {

    for (let i = 3; i < inputString.length; i++) {
        if (i > 3 && i < inputString.length) {
            trackName = trackName + " " + inputString[i];
        } else {
            trackName += inputString[i];
        }
    }

    if (trackName !== "") {

        // console.log(trackName);

        let spotify = new Spotify(keys.spotify);

        spotify.search({ type: 'track', query: trackName, limit: 3 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //   console.log(data); 
            //   console.log(data.tracks); 
            //   console.log(data.tracks.items[0]); 
            //   console.log(data.tracks.items[0].album.name); 

            console.log("\n=================================");
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song preview: " + data.tracks.items[0].preview_url);
            console.log("=================================\n");


        });
    } else {
        let spotify = new Spotify(keys.spotify);

        spotify.search({ type: 'track', query: "Ace of base", limit: 3 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("\n=================================");
            console.log("You didn't put in a song to search for... Here's an old favorite of ours:")
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song preview: " + data.tracks.items[0].preview_url);
            console.log("=================================\n");

        });
    }

};

function fetchConcert() {
    // let artist = "";
    // let artistFormatted = "";

    for (let i = 3; i < inputString.length; i++) {
        if (i > 3 && i < inputString.length) {
            artist = artist + "+" + inputString[i];
        } else {
            artist += inputString[i];
        }
    }
    for (let i = 3; i < inputString.length; i++) {
        if (i > 3 && i < inputString.length) {
            artistFormatted = artistFormatted + " " + inputString[i];
        } else {
            artistFormatted += inputString[i];
        }
    }

    const titleCase = title => title
        .split(/ /g).map(word =>
            `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
        .join(" ");
    let artistCaps = titleCase(artistFormatted);

    let artistQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=1e4b7dcd038e8151a1fd002ec56540b2";
    console.log(artistQueryUrl);

    axios
        .get(artistQueryUrl)
        .then(function (response) {

            console.log("Here is " + artistCaps + "'s next concert:");
            console.log("=================================");
            console.log("Lineup: " + response.data[0].lineup);
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
            console.log("Date: " + moment(response.data[0].datetime).format(' MM DD YYYY'));
            console.log("=================================\n");
        })
        .catch(function (error) {
            if (error.response) {
            }
            console.log("=================================");
            console.log("I didn't find any concerts. Double check your spelling, maybe?");
            console.log("=================================");

        })
};

function fetchMovie() {
    

        for (let i = 3; i < inputString.length; i++) {
            if (i > 3 && i < inputString.length) {
                movieName = movieName + "+" + inputString[i];
            } else {
                movieName += inputString[i];
            }
        }

        let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=1d4cdfb1";
        console.log(queryUrl);

        if (movieName === "") {
            axios
                .get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=1d4cdfb1")
                .then(function (response) {
                    console.log("You didn't enter a movie but if you haven't checked out Mr. Nobody, you should...");
                    console.log("=================================");
                    console.log("Title: " + response.data.Title);
                    console.log("Release Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating:: " + response.data.Ratings[1].Value);
                    console.log("Produced in: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("=================================\n");
                })
        } else {

            axios
                .get(queryUrl)
                .then(function (response) {
                    console.log("\n=================================");
                    console.log("Title: " + response.data.Title);
                    console.log("Release Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating:: " + response.data.Ratings[1].Value);
                    console.log("Produced in: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("=================================\n");
                })
        }
};

function doRandom() {
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
    }

// console.log(data);
let randomText = data.split(", ");
// console.log(randomText);

let randoAction = randomText[0];
let randoItem = randomText[1];

// console.log(randoAction);
// console.log(randoItem);

switch (randoAction) {

    case "spotify-this-song":
        trackName = randoItem;
        fetchSpotify();
        break;

    case "movie-this":
        movieName = randoItem;
        fetchMovie();
        break;

    case "concert-this":
        artist = randoItem;
        artistFormatted = randoItem;
        fetchConcert();
        break;
}


})
}