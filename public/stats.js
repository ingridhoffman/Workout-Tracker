// CURRENT STATS FOR THIS WEEK

// Get date range for this week
function datesThisWeek() {
	let now = new Date();
	let today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
	console.log("today: " + today.toISOString());
	let weekday = today.getUTCDay();
	console.log("weekday: " + weekday);
	let start = new Date(today);
	start.setUTCDate(start.getUTCDate() - weekday);
	console.log("start: " + start.toISOString());
	let end = new Date(start);
	end.setUTCDate(end.getUTCDate() + 7);
	console.log("end: " + end.toISOString());
	let range = { start, end };
	return range;
}

// Set range for dates this week
let range = datesThisWeek();

// Get workouts in date range
API.getWorkoutsInRange(range).then((data) => {
	let rangeArray = [[], [], [], [], [], [], []];
	data.forEach((workout) => {
		let index = workout.weekday;
		rangeArray[index].push(workout);
	});
	populateChart(rangeArray);
});

function populateChart(data) {
	let durations = duration(data);
	let pounds = calculateTotalWeight(data);
	let workouts = workoutNames(data);
	const colors = generatePalette();

	let line = document.querySelector("#canvas").getContext("2d");
	let bar = document.querySelector("#canvas2").getContext("2d");
	let pie = document.querySelector("#canvas3").getContext("2d");
	let pie2 = document.querySelector("#canvas4").getContext("2d");

	let lineChart = new Chart(line, {
		type: "line",
		data: {
			labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			datasets: [
				{
					label: "Duration In Minutes",
					backgroundColor: "red",
					borderColor: "red",
					data: durations,
					fill: false,
				},
			],
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Total Exercise Time",
			},
			scales: {
				xAxes: [
					{
						display: true,
						scaleLabel: {
							display: true,
						},
					},
				],
				yAxes: [
					{
						display: true,
						scaleLabel: {
							display: true,
						},
					},
				],
			},
		},
	});

	let barChart = new Chart(bar, {
		type: "bar",
		data: {
			labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			datasets: [
				{
					label: "Pounds x Reps x Sets",
					data: pounds,
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			title: {
				display: true,
				text: "Total Pounds Lifted",
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
		},
	});

	let pieChart = new Chart(pie, {
		type: "pie",
		data: {
			labels: workouts,
			datasets: [
				{
					label: "Excercises Performed",
					backgroundColor: colors,
					data: durations,
				},
			],
		},
		options: {
			title: {
				display: true,
				text: "Excercises by Duration",
			},
		},
	});

	let donutChart = new Chart(pie2, {
		type: "doughnut",
		data: {
			labels: workouts,
			datasets: [
				{
					label: "Excercises Performed",
					backgroundColor: colors,
					data: pounds,
				},
			],
		},
		options: {
			title: {
				display: true,
				text: "Excercises by Weight",
			},
		},
	});
}

// CHART HELPER FUNCTIONS

// Create color palette for charts
function generatePalette() {
	const arr = [
		"#003f5c",
		"#2f4b7c",
		"#665191",
		"#a05195",
		"#d45087",
		"#f95d6a",
		"#ff7c43",
		"ffa600",
		"#003f5c",
		"#2f4b7c",
		"#665191",
		"#a05195",
		"#d45087",
		"#f95d6a",
		"#ff7c43",
		"ffa600",
	];

	return arr;
}

// Create array of duration per day
function duration(data) {
	let durations = [];
	data.forEach((day) => {
		let dayDuration = 0;
		day.forEach((workout) => {
			workout.exercises.forEach((exercise) => {
				dayDuration += exercise.duration;
			});
		});
		durations.push(dayDuration);
	});
	console.log("durations: " + durations);
	return durations;
}

// Create array of weight per day
function calculateTotalWeight(data) {
	let total = [];
	data.forEach((day) => {
		let dayTotal = 0;
		day.forEach((workout) => {
			workout.exercises.forEach((exercise) => {
				if (exercise.weight) {
					let exerciseTotal = exercise.weight * exercise.reps * exercise.sets;
					dayTotal += exerciseTotal;
				}
			});
		});
		total.push(dayTotal);
	});
	console.log("weight: " + total);
	return total;
}

// Create array of all exercises performed
function workoutNames(data) {
	let workouts = [];
	data.forEach((day) => {
		day.forEach((workout) => {
			workout.exercises.forEach((exercise) => {
				workouts.push(exercise.name);
			});
		});
	});
	return workouts;
}
