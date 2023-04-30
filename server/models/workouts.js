const data = require('../data/workouts.json');
const { connect, ObjectId } = require('./mongo');

const COLLECTION_NAME = 'Workout';


async function collection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

function getWorkouts() {
  return data.workouts;
}

async function getWorkoutMongo() {
  console.log('hello!')
  const col = await collection();
  const items = await col.find().toArray();
  return items;
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
    getWorkoutMongo,
    getWorkouts,
    getWorkoutById,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    searchWorkouts
};