// routes/new.js
const express = require("express");
const router = express.Router();

const messages = require("../messages"); // shared message array

// Show new message form
router.get("/", (req, res) => {
  res.render("form");
});

// Handle form submission
router.post("/", (req, res) => {
  const { messageUser, messageText } = req.body;

  messages.push({
    user: messageUser,
    text: messageText,
    added: new Date()
  });

  res.redirect("/");
});

module.exports = router;
