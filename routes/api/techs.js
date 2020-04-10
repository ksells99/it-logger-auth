const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Tech = require("../../models/Tech");

// @route GET api/techs
// @desc GET user's techs
// @access PRIVATE

router.get("/", auth, async (req, res) => {
  try {
    const techs = await Tech.find({ user: req.user.id });

    // // Throw error if no techs for the user
    // if (techs.length === 0) {
    //   return res.status(400).json({ msg: "There are no techs for this user" });
    // }

    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/techs
// @desc Add new tech
// @access PRIVATE

router.post(
  "/",
  [
    auth,
    [
      check("firstName", "First Name is required.").not().isEmpty(),
      check("lastName", "Last Name is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors - return them if so
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Pull out fields from body
      const { firstName, lastName } = req.body;

      // Get user ID (based on JWT)
      const user = req.user.id;

      // Build new tech
      const tech = new Tech({
        firstName,
        lastName,
        user,
      });

      await tech.save();

      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// @route PUT api/techs/:id
// @desc Update log
// @access PRIVATE

router.put("/:id", auth, async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = req.user.id;

  //Build techobject
  const techFields = {};
  if (firstName) techFields.firstName = firstName;
  if (lastName) techFields.lastName = lastName;
  techFields.user = user;

  try {
    // Find tech based on URL
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: "tech not found." });

    // Check user owns tech they are updating - if not...
    if (tech.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    tech = await Tech.findByIdAndUpdate(
      req.params.id,
      { $set: techFields },
      { new: true }
    ); //if new is set to true it returns the updated document, and if is set to false (default) it returns the old one.

    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route DELETE api/techs/:id
// @desc Delete tech
// @access PRIVATE

router.delete("/:id", auth, async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: "tech not found." });

    // Check the user owns the log they are trying to delete - if it doesn't...
    if (tech.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    await tech.remove();

    res.json({ msg: "tech Removed." });
  } catch (err) {
    console.error(err.message);
    // If tech ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Tech not found" });
    }
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
