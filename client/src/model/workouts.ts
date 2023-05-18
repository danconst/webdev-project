import { api } from "./session";
import type { DataEnvelope, DataListEnvelope } from "./myFetch";

export interface Workout {
  _id: string;
  workedOutWith: string;
  userPhoto?: string;
  user: string;
  date: string;
  workoutType: string;
  distance: number;
  duration: number;
  pace: number;
  calories: number;
}


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