<template>
  <div>
    <WorkoutForm @submit="addWorkout" />
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
import { computed } from 'vue';
import WorkoutForm from '../components/WorkoutForm.vue';
import { addWorkout, getWorkouts } from '@/model/workouts';
import { useSession } from '@/model/session';

const workouts = getWorkouts();
const session = useSession();
const userWorkouts = computed(() => {
      return workouts.value.filter((workout) => workout.user === session.user?.name);
  });
</script>

<style scoped>
table {
  margin-top: 15px;
}
</style>

