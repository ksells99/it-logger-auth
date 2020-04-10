const mongoose = require("mongoose");

const TechSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    tech: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "techs",
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "techs" }
);

module.exports = mongoose.model("tech", TechSchema);
