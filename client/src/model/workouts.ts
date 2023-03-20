import { ref } from 'vue';

export interface Workout {
  date: Date;
  workoutType: string;
  distance: number;
  duration: number;
  pace: number;
  calories: number;
}

const workouts = ref<Workout[]>([]);

export function addWorkout(workout: Workout) {
  workouts.value.push({
    ...workout,
    date: new Date(),
  });
}

export function getWorkouts() {
  return workouts;
}
