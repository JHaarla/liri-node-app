# LIRI Bot (node app)
The LIRI Bot is an exercise in learning node.js. In this project, I explore how to write functional javaScript in node that returns usable information back to the command line. Since this is a CLI app, all the commands to run the app and everything returned is displayed on the command line. In this project, I'm using several NPM packages and API calls to achieve the functionality of the app. More information is under the technical description below. 

The LIRI Bot app starts off by requiring all the needed dependencies - axios, moment, spotify, etc. Then, once it is ran, it collects some information from the user that is passed into the appropriate API calls so the requested information can be returned and displayed on the command line. The user can request information about movies (by title), concerts (by artist) or songs (by track name).  

**Instructions**  

To use LIRI Bot, you'll need to run the liri.js file in node. Since LIRI Bot collects input from the command line, you'll need to also provide the search parameters. The three main functions of LIRI Bot are *spotify-this-song*, *movie-this* and *concert-this*. Following the function, the search parameter needs to entered. For example, the movie name, song title or artist/band name for concerts. Here are some examples:  

`node liri spotify-this-song rocky raccoon`  
This will return information about The Beatles song Rocky Raccoon.  
`node liri movie-this spaceballs`  
Returns information about the greatest "Star Wars" movie.  
`node liri concert-this beck`  
Displays information about Beck's next concert.  

There is also a *do-what-it-says* function which pulls information from a text file (random.txt) a runs a search based on the contained information. Feel free to change this to something else. All three of LIRI's functions work through the text file as well.  
If no input is entered, LIRI will return a pre-determined movie or song.   
[Here is a video of LIRI doing its thing.](https://drive.google.com/file/d/1AWL589ny_oZP6M2Jg_dVaVyMCifU26He/view)  

