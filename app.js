// app.js
const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");   // Home page + message list
const newMessageRouter = require("./routes/new"); // Create new message route

const app = express();
const PORT = 3000;

// Set up EJS views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Static files (optional)
app.use(express.static(path.join(__dirname, "public")));

// ROUTES --------------------------------------------------
app.use("/", indexRouter);      // Homepage
app.use("/new", newMessageRouter); // Form + POST handling

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
