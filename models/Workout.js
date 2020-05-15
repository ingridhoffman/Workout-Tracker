const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
	day: Date,
	exercises: [],
	weekday: Number,
});

WorkoutSchema.methods.setWeekday = function () {
	let today = new Date(Date.UTC(this.day.getFullYear(), this.day.getMonth(), this.day.getDate()));
	console.log(today);
	let weekday = today.getUTCDay();
	console.log(weekday);
	this.weekday = weekday;
	console.log("weekday: " + this.weekday);
	return this.weekday;
};

new Date().getDay();
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
