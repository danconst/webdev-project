<template>
  <div>
    <WorkoutForm :workouts="workouts"/>
    <div v-if="userWorkouts.length > 0">
      <h2 class="title is-2 has-text-centered">Workout Log</h2>
      <div class = "columns is-centered">
      <table class="table is-striped is-centered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Distance (km)</th>
            <th>Duration (min)</th>
            <th>Pace (min/km)</th>
            <th>Calories Burnt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(workout, index) in userWorkouts" :key="index">
            <td>{{ workout.date }}</td>
            <td>{{ workout.workoutType }}</td>
            <td>{{ workout.distance }}</td>
            <td>{{ workout.duration }}</td>
            <td>{{ workout.pace }}</td>
            <td>{{ workout.calories }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    <div v-else>
      <div class = "columns is-centered">
        <span></span>
      <p class = "mt-3">No workouts logged yet.</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue';
import WorkoutForm from '../components/WorkoutForm.vue';
import type { Workout } from '@/model/workouts';
import { addWorkout, getWorkouts } from '@/model/workouts';
import { useSession } from '@/model/session';

const workouts = ref<Workout[]>([]);
const session = useSession();

getWorkouts().then((data) => {
  workouts.value = data.data;
});

const userWorkouts = computed(() => {
  return workouts.value.filter((workout) => workout.user === session.user?.name);
});

async function addNewWorkout(newWorkout: Workout) {
  await addWorkout(newWorkout);
  workouts.value.push(newWorkout);
}
</script>
