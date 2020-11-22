const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const celebritySchema = new Schema(
  {
    name: { type: String },
    occupation: {
      type: String,
      enum: ["actor", "singer", "comedian", "unknown", "football player", "programmer"],
    },
    catchPhrase: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Celeb", celebritySchema);
