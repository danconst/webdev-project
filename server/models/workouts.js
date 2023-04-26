const data = require('../data/workouts.json');

function getWorkouts() {
  return data.workouts;
}

function getWorkoutById(id) {
    return data.workouts.find(workout => workout.id === id);
  }
  

function addWorkout(workout) {
    workout.id = String(data.workouts.length + 1);
    data.workouts.push(workout);
}
  
function updateWorkout(workout) {
    const index = data.workouts.findIndex(w => w.id === workout.id);
    data.workouts[index] = workout;
 }

 function deleteWorkout(id) {
    const index = data.workouts.findIndex(w => w.id === id);
    data.workouts.splice(index, 1);
}

function searchWorkouts(id) {
    return data.workouts.filter(workout => {
      return workout.id === id;
    });
  }

module.exports = {
    getWorkouts,
    getWorkoutById,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    searchWorkouts
};