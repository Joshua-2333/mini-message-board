// routes/index.js
const express = require("express");
const router = express.Router();

// Shared messages array (in-memory)
const messages = [
  { user: "Amando", text: "Hi there!", added: new Date() },
  { user: "Charles", text: "Hello World!", added: new Date() },
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

  if (!messageUser || !messageText) {
    return res.redirect("/new");
  }

  messages.push({
    user: messageUser.trim(),
    text: messageText.trim(),
    added: new Date(),
  });

  res.redirect("/");
});

// Individual message view
router.get("/message/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || !messages[id]) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message: messages[id], id });
});

// Edit message form
router.get("/message/:id/edit", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || !messages[id]) {
    return res.status(404).send("Message not found");
  }

  res.render("edit", { message: messages[id], id });
});

// Handle edit submission
router.post("/message/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const { messageUser, messageText } = req.body;

  if (Number.isNaN(id) || !messages[id]) {
    return res.status(404).send("Message not found");
  }

  messages[id] = {
    user: messageUser.trim(),
    text: messageText.trim(),
    added: new Date(),
  };

  res.redirect(`/message/${id}`);
});

// Delete message
router.post("/message/:id/delete", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isNaN(id) && messages[id]) {
    messages.splice(id, 1);
  }

  res.redirect("/");
});

module.exports = router;
