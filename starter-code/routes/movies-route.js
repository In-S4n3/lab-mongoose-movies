const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");


// create a celebrity
router.get("/movies/add", (req, res, next) => {
  res.render("movies-create");
});

router.post("/movies/add", (req, res, next) => {
  let { title, genre, plot } = req.body;
  Movies.create({ title, genre, plot })
    .then(() => {
      console.log("Creating a movie");
      res.redirect('/celebrities')
    })
    .catch(err => console.log(err));
});

// get movies details
router.get("/movies/:id", (req, res, next) => {
  let { id } = req.params;
  Movie.findById(id)
    .then((celebFromDB) => {
      res.render("movies-details", { movies: celebFromDB });
    })
    .catch();
});

// edite route
router.get("/movies/:id/edit", (req, res, next) => {
  let { id } = req.params;
  Movie.findById(id)
    .then((movies) => {
      console.log(`Editing the ${movies._id}`);
      res.render("movies-edit", movies);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/movies/:id/edit", (req, res, next) => {
  //console.log('====>', req.params.id);
  const { name, occupation, catchPhrase } = req.body;
  Movie.findByIdAndUpdate(
    req.params.id,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((movieEdit) => {
      console.log(movieEdit);
      res.redirect(`/movies/${movieEdit._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/movies/:id/delete', (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch(error => console.log(`Error while deleting a movie: ${error}`));
});


module.exports = router;
