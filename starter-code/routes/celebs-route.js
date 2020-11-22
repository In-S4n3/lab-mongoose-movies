const express = require("express");
const router = express.Router();
const Celebs = require("../models/Celebrity");
const Movie = require("../models/Movie");

// show celebs
router.get("/celebrities", (req, res, next) => {
  Promise.all([Celebs.find(), Movie.find()])
    .then((dataFromDB) => {
      //console.log(dataFromDB);
      const [celebs, movies] = dataFromDB;
      //console.log("Retrieved Celebs from DB:", celebs, "Retrieved Movies from DB:", movies);
      res.render("celebrities-list", {
        celebs: celebs,
        movies: movies,
      });
    })
    .catch((error) =>
      console.log("Error while getting the Celebs from the DB: ", error)
    );
});

// create a celebrity
router.get("/celebrities/add", (req, res, next) => {
  res.render("celebrities-create");
});

router.post("/celebrities/add", (req, res, next) => {
  let { name, occupation, catchPhrase } = req.body;
  Celebs.create({ name, occupation, catchPhrase })
    .then(() => {
      console.log("Creating a celebrity");
      res.redirect("/celebrities");
    })
    .catch((err) => console.log(err));
});

// get celebs details
router.get("/celebrities/:id", (req, res, next) => {
  let { id } = req.params;
  Celebs.findById(id)
    .then((celebFromDB) => {
      res.render("celebrities-details", { celebs: celebFromDB });
    })
    .catch();
});

// edite route
router.get("/celebrities/:id/edit", (req, res, next) => {
  let { id } = req.params;
  Celebs.findById(id)
    .then((celebs) => {
      console.log(`Editing the ${celebs._id}`);
      res.render("celebrities-edit", celebs);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  //console.log('====>', req.params.id);
  const { name, occupation, catchPhrase } = req.body;
  Celebs.findByIdAndUpdate(
    req.params.id,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((celebrityEdite) => {
      console.log(celebrityEdite);
      res.redirect(`/celebrities/${celebrityEdite._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/celebrities/:id/delete", (req, res) => {
  const { id } = req.params;
  Celebs.findByIdAndDelete(id)
    .then(() => res.redirect("/celebrities"))
    .catch((error) => console.log(`Error while deleting a celeb: ${error}`));
});

module.exports = router;
