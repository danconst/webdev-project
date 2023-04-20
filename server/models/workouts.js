const data = require('../data/workouts.json');

function getWorkouts(){
    return data.workouts;
}

function getWorkoutById(id){
    return data.workouts.find(workout => workout.id === id);
}

function addWorkout(workout) {
    const index = data.workouts.findIndex(w => w.id === workout.id);
    data.workouts[index] = workout;
}

function updateWorkout(workout) {
    const index = data.workouts.findIndex(w => w.id === workout.id);
    data.workouts[index] = workout;
}
function deleteWorkout(id) {
    const index = data.workouts.findIndex(w => w.id === id);
    data.workouts.splice(index, 1);
}

function searchWorkouts(searchTerm){
    return data.workouts.filter(workout => {
        return  workout.user.toLowerCase().includes(searchTerm.toLowerCase())  ||
            workout.workoutType.toLowerCase().includes(searchTerm.toLowerCase())  
    })
}

module.exports = {
    getWorkouts,
    getWorkoutById,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    searchWorkouts,
}