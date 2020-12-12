const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: { type: String },
    genre: {
      type: [String],
      enum: [
        "Horror",
        "Comedy",
        "Drama",
        "Sci-fi",
        "Action",
        "Documentary",
        "Romance",
        "Thriller",
        "Fantasy"
      ],
    },
    plot: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Movie", movieSchema);
