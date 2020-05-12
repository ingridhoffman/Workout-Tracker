// Node dependencies
const express = require("express");
const mongoose = require("mongoose");

// Set port and Express
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Mongoose connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
	useNewUrlParser: true,
	useFindAndModify: false,
});

// Set to listen on port
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
