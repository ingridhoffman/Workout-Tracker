# Workout-Tracker

This web based application provides a tracking platform for users to track both cardio and resistance workouts. The UI has been provided by the client. Functionality was developed untilizing Node.js, MongoDB with Mongoose, and Express.

## User Story

```
AS someone interested in being fit and healthy,
I WANT to be able to create and track daily workouts
SO THAT I will reach my fitness goals quicker

I want to be able to log multiple exercises in a workout on a given day. I should also be able to track the name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise, I should be able to track my distance traveled.
```

## Acceptance Criteria

```
GIVEN that
WHEN I open the application home page (Dashboard)
THEN I am given the option to Create a Workout or Continue my Workout


The user should be able to:

- Add exercises to a previous workout plan.

- Add new exercises to a new workout plan.

- View multiple the combined weight of multiple exercises on the `stats` page.
```

# Application Usage

## Node.js

Download application package and open folder in Node.js

Install node dependencies:

```
npm install
```

Install MongoDB (if you do not have it already) and start the Mongo shell - for assistance visit: https://docs.mongodb.com/manual/installation/

Start the server:

```
npm run start
```

Open a web browser and navigate to localhost:3000 to demo the application

## Web Browser

To run a demo of this application, visit:

# Contributions

### Known Issues

- Graphs display incorrect days becasue graph data arrays are constructed with each exercise populating individually into the array and no correlation of actual current day and past days

### Suggested Improvements

- Let user select date of workout - currently posts with Date.now()
- For stats, date range is set to current week - should be able to view past weeks, and have month and year views as well

# Credits

All files in the Public folder were provided by:
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved

# License

MIT © Ingrid Hoffman
