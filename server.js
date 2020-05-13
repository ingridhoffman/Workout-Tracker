// Node dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Set port and Express
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Open connection to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
	useNewUrlParser: true,
	useFindAndModify: false,
});

// API routes
app.use(require("./routes/api"));

// HTML routes
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/exercise", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.get("/stats", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// Set to listen on port
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
