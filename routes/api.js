// Node dependencies
const router = require("express").Router();

// Local dependencies
const db = require("../models");

// GET - Find all workouts
router.get("/api/workouts", (req, res) => {
	db.Workout.find({})
		.sort({ date: -1 })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// PUT - Update an existing workout with a new exercise
router.put("/api/workouts/:id", (req, res) => {
	db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// POST - Insert a new workout
router.post("/api/workouts", (req, res) => {
	const date = new Date();
	const workout = new db.Workout({ day: date });
	workout.setWeekday();
	db.Workout.create(workout)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// GET - Find all workouts in last seven days
router.get("/api/workouts/range", (req, res) => {
	db.Workout.find({ day: { $gte: req.query.start, $lt: req.query.end } })
		.sort({ day: 1 })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
