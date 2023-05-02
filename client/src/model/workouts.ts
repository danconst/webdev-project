import { ref } from 'vue';
import { useSession } from './session';
import { api } from "./session";
import usersData from '../data/users.json';
import type { DataEnvelope, DataListEnvelope } from "./myFetch";

export interface Workout {
  id: string;
  userPhoto?: string;
  user: string;
  date: string;
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

export async function addWorkout(workout: Workout): Promise<DataEnvelope<Workout>> {
  const result = await api('workouts', workout);
  return result
}


export function getWorkouts(): Promise<DataListEnvelope<Workout>> {  
  return api('workouts');
}

export function getWorkout(id: number): Promise<DataEnvelope<Workout>> {

  return api(`workouts/${id}`)

}