// app.js
const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const newMessageRouter = require("./routes/new");

const app = express();

// IMPORTANT: Render provides the PORT
const PORT = process.env.PORT || 3000;

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/new", newMessageRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
