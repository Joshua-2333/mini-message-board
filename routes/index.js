// routes/index.js
const express = require("express");
const router = express.Router();

// Shared messages array
const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() },
];

// Index route - show all messages
router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages,
  });
});

// New message form
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// Handle new message submission
router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;

  messages.push({
    user: messageUser,
    text: messageText,
    added: new Date(),
  });

  res.redirect("/");
});
// Individual message view
router.get("/message/:id", (req, res) => {
  const id = req.params.id;
  const message = messages[id];

  if (!message) return res.status(404).send("Message not found");

  res.render("message", { message, id });
});

module.exports = router;
