import { ref } from 'vue';
import { useSession } from './session';
export interface Workout {
  user: string;
  date: Date;
  workoutType: string;
  distance: number;
  duration: number;
  pace: number;
  calories: number;
}

const workouts = ref<Workout[]>([]);
const session =  useSession();

export function addWorkout(workout: Workout) {
  workouts.value.push({
    ...workout,
    user: session.user?.name || "Unknown user",
    date: new Date(),
  });
}

export function getWorkouts() {
  return workouts;
}