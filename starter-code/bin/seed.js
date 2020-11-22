// bin/seeds.js

const mongoose = require("mongoose");
const Celeb = require("../models/Celebrity");
const Movie = require("../models/Movie");

const DB_NAME = "lab-mongoose-movies";

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [
  {
    name: "Tiago",
    occupation: "programmer",
    catchPhrase: "alright, alright, alright!",
  },
  {
    name: "Tom Cruise",
    occupation: "actor",
    catchPhrase: "no idea",
  },
  {
    name: "Cristiano Ronaldo",
    occupation: "football player",
    catchPhrase: "siiimmmmmm",
  },
];

Celeb.create(celebrities)
  .then((celebsFromDB) => {
    console.log(`Created ${celebsFromDB.length} celebs`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating celebs from the DB: ${err}`)
  );

const movies = [
  {
    title: "Gladiator",
    genre: "Action/History",
    plot: "things happen in the arena",
  },
  {
    title: "The Godfather",
    genre: "Action/Crime",
    plot: "Mafia things...",
  },
];

Movie.create(movies)
  .then((moviesFromDB) => {
    console.log(`Created ${moviesFromDB.length} movies`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating celebs from the DB: ${err}`)
  );