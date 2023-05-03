import { ref } from 'vue';
import { useSession } from './session';
import { api } from "./session";
import type { DataEnvelope, DataListEnvelope } from "./myFetch";

export interface Workout {
  _id: string;
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


export async function addWorkout(workout: Workout): Promise<DataEnvelope<Workout>> {
  const result = await api('workouts', workout);
  return result
}


export function getWorkouts(): Promise<DataListEnvelope<Workout>> {  
  return api('workouts');
}


export function deleteWorkout(_id: string){
  return api(`workouts/${_id}`, undefined, 'DELETE');
}