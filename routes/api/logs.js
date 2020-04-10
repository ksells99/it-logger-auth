const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Log = require("../../models/Log");
const User = require("../../models/User");

// @route GET api/logs
// @desc GET all of user's logs
// @access PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id });

    // // Throw error if no logs for the user
    // if (logs.length === 0) {
    //   return res.status(400).json({ msg: "There are no logs for this user" });
    // }

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/logs
// @desc Add new log
// @access PRIVATE
router.post(
  "/",
  [
    auth,
    [
      check("message", "message is required.").not().isEmpty(),
      check("tech", "tech is required.").not().isEmpty(),
      check("attention", "attention is required.").not().isEmpty(),
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
      const { message, tech, attention } = req.body;

      const user = req.user.id;

      const log = new Log({
        message,
        tech,
        attention,
        user,
      });

      await log.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// @route PUT api/logs/:id
// @desc Update log
// @access PRIVATE

router.put("/:id", auth, async (req, res) => {
  const { message, tech, attention, date } = req.body;
  const user = req.user.id;

  //Build log object
  const logFields = {};
  if (message) logFields.message = message;
  logFields.tech = tech;
  logFields.attention = attention;
  logFields.date = date;
  logFields.user = user;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "log not found." });

    // Check user owns log they are updating - if not...
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    ); //if new is set to true it returns the updated document, and if is set to false (default) it returns the old one.

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route DELETE api/logs/:id
// @desc Delete log
// @access PRIVATE

router.delete("/:id", auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found." });

    // Check the user owns the log they are trying to delete - if it doesn't...
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    await log.remove();
    res.json({ msg: "Log removed" });
  } catch (err) {
    console.error(err.message);
    // If log ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Log not found" });
    }
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
