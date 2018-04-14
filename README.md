# Liri Node App

This project was an exercise in using node.js and it's modules to create a responsive application with a few features based on API calls to other apps. It responds to command line calls to access data from Spotify, Twitter, and OMDB, and returns information to the user.

## Getting Started

Simply copy these files to a directory, then create your own dotenb file with API information from Spotify, Twitter, and OMDB. Use `npm install` to get the modules needed from node.js.

Your dotenb file will be used by the keys.js file to access your private keys and reference them within the app. You can use this template in your dotenb file to ensure the app can access your keys appropriately.

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```

## Commands

```
node liri.js my-twitter //=> returns data from the twitter key you put in the dotenb file

node liri.js spotify-this-song <arg>

//=> Reaches out to the spotify API to return some information regarding the song, including album, artist, and release year.

node liri.js movie-this <arg>

//=> Returns information from your argument pulled from OMDB

movie liri.js do-what-it-says 

//=> Will read the command in "random.txt" and operate based on those args. Default provided is a "spotify-this-song" arg
