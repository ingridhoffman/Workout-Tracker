let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
	useNewUrlParser: true,
	useFindAndModify: false,
});

let date1 = new Date();
date1.setUTCDate(date1.getUTCDate() - 1);
let weekday1 = date1.getDay();
let date2 = new Date();
date2.setUTCDate(date1.getUTCDate() - 1);
let weekday2 = date2.getDay();
let date4 = new Date();
date4.setUTCDate(date1.getUTCDate() - 3);
let weekday4 = date4.getDay();
let date5 = new Date();
date5.setUTCDate(date1.getUTCDate() - 4);
let weekday5 = date5.getDay();

let workoutSeed = [
	{
		day: new Date(date1),
		exercises: [
			{
				type: "resistance",
				name: "Lateral Pull",
				duration: 20,
				weight: 300,
				reps: 10,
				sets: 4,
			},
			{
				type: "resistance",
				name: "Bench Press",
				duration: 25,
				weight: 185,
				reps: 8,
				sets: 4,
			},
		],
		weekday: weekday1,
	},
	{
		day: new Date(date2),
		exercises: [
			{
				type: "cardio",
				name: "Running",
				duration: 25,
				distance: 4,
			},
		],
		weekday: weekday2,
	},
	{
		day: new Date(date4),
		exercises: [
			{
				type: "resistance",
				name: "Quad Press",
				duration: 30,
				weight: 300,
				reps: 10,
				sets: 4,
			},
			{
				type: "resistance",
				name: "Military Press",
				duration: 20,
				weight: 300,
				reps: 10,
				sets: 4,
			},
		],
		weekday: weekday4,
	},
	{
		day: new Date(date5),
		exercises: [
			{
				type: "cardio",
				name: "Walking",
				duration: 40,
				distance: 4,
			},
		],
		weekday: weekday5,
	},
];

db.Workout.deleteMany({})
	.then(() => db.Workout.collection.insertMany(workoutSeed))
	.then((data) => {
		console.log(data.result.n + " records inserted!");
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
