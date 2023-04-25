import { ref } from 'vue';
import { useSession } from './session';
import usersData from '../data/users.json';
import { api } from './session';

export interface Workout {
  id: string;
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


function generateRandomId(): string {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return String(randomNumber);
}

function updateUserStats(workout: Workout) {
  const user = session.user;
  if (!user) {
    return;
  }
  user.dayDist = (user.dayDist || 0) + workout.distance;
  user.dayDur = (user.dayDur || 0) + workout.duration;
  user.dayPace = ((user.dayPace || 0) * (workouts.value.length - 1) + workout.pace) / workouts.value.length;
  user.dayCal = (user.dayCal || 0) + workout.calories;

  user.weekDist = (user.weekDist || 0) + workout.distance;
  user.weekDur = (user.weekDur || 0) + workout.duration;
  user.weekPace = ((user.weekPace || 0) * (workouts.value.length - 1) + workout.pace) / workouts.value.length;
  user.weekCal = (user.weekCal || 0) + workout.calories;

  user.allDist = (user.allDist || 0) + workout.distance;
  user.allDur = (user.allDur || 0) + workout.duration;
  user.allPace = ((user.allPace || 0) * (workouts.value.length - 1) + workout.pace) / workouts.value.length;
  user.allCal = (user.allCal || 0) + workout.calories;
}

for (const user of usersData.users) {
  user.dayDist = 0;
  user.dayDur = 0;
  user.dayPace = 0;
  user.dayCal = 0;
}



api('workouts').then((response: Workout[]) => {
  workouts.value = response.map(workout => {
    return {
      id: workout.id,
      user: workout.user,
      userPhoto: workout.userPhoto,
      date: new Date(workout.date),
      workoutType: workout.workoutType,
      distance: typeof workout.distance === 'number' ? workout.distance : parseFloat(workout.distance),
      duration: typeof workout.duration === 'number' ? workout.duration : parseFloat(workout.duration),
      pace: typeof workout.pace === 'number' ? workout.pace : parseFloat(workout.pace),
      calories: typeof workout.calories === 'number' ? workout.calories : parseInt(workout.calories),
    };
  });
});


export function addWorkout(workout: Workout) {
  let randomId = generateRandomId();
  while (workouts.value.some(workout => workout.id === randomId)) {
    randomId = generateRandomId();
  }

  workouts.value.push({
    ...workout,
    id: randomId,
    user: session.user?.name || "Unknown user",
    userPhoto: session.user?.photo || "",
    date: new Date(),
  });
  updateUserStats(workout);
}

export function getWorkouts(): Promise<Workout[]> {
  return api('workouts')
}
