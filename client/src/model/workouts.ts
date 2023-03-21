import { ref } from 'vue';
import { useSession } from './session';
import userWorkout from '../data/workouts.json';
import usersData from '../data/users.json';

export interface Workout {
  userPhoto?: string;
  user: string;
  date: Date;
  workoutType: string;
  distance: number;
  duration: number;
  pace: number;
  calories: number;
}

const workouts = ref<Workout[]>([]);
const session = useSession();


function updateUserStats(workout: Workout) {
  const user = session.user;
  if (!user) {
    return;
  }
  user.dDist = (user.dDist || 0) + workout.distance;
  user.dDur = (user.dDur || 0) + workout.duration;
  user.dPace = ((user.dPace || 0) * (workouts.value.length - 1) + workout.pace) / workouts.value.length;
  user.dCal = (user.dCal || 0) + workout.calories;

  user.wDist = (user.wDist || 0) + workout.distance;
  user.wDur = (user.wDur || 0) + workout.duration;
  user.wPace = ((user.wPace || 0) * (workouts.value.length - 1) + workout.pace) / workouts.value.length;
  user.wCal = (user.wCal || 0) + workout.calories;

  user.aDist = (user.aDist || 0) + workout.distance;
  user.aDur = (user.aDur || 0) + workout.duration;
  user.aPace = ((user.aPace || 0) * (workouts.value.length - 1) + workout.pace) / workouts.value.length;
  user.aCal = (user.aCal || 0) + workout.calories;
}

for (const user of usersData.users) {
  user.dDist = 0;
  user.dDur = 0;
  user.dPace = 0;
  user.dCal = 0;
}



for (const workout of userWorkout.workouts) {
  workouts.value.push({
    user: workout.user,
    userPhoto: workout.userPhoto,
    date: new Date(workout.date),
    workoutType: workout.workoutType,
    distance: parseFloat(workout.distance),
    duration: parseFloat(workout.duration),
    pace: parseFloat(workout.pace),
    calories: parseInt(workout.calories),
  });
}

export function addWorkout(workout: Workout) {
  workouts.value.push({
    ...workout,
    user: session.user?.name || "Unknown user",
    userPhoto: session.user?.photo || "",
    date: new Date(),
  });
  updateUserStats(workout);
}

export function getWorkouts() {
  return workouts;
}
