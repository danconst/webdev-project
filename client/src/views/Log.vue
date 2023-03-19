  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import WorkoutForm from '../components/WorkoutForm.vue';
  
  interface Workout {
    workoutType: string;
    distance: number;
    duration: number;
    pace: number;
    calories: number;
  }
  
  export default defineComponent({
    components: {
      WorkoutForm,
    },
    data() {
      return {
        workouts: [] as Workout[],
      };
    },
    methods: {
      addWorkout(workout: Workout) {
        this.workouts.push({
          ...workout,
        });
      },
    },
  });
  </script>
  


<template>
    <div>
      <WorkoutForm @submit="addWorkout" />
      <div v-if="workouts.length > 0">
        <h2 class="title is-2 has-text-centered">Workout Log</h2>
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
            
            <tr v-for="(workout, index) in workouts" :key="index">
              <td>{{ new Date()}}</td>
              <td>{{ workout.workoutType }}</td>
              <td>{{ workout.distance }}</td>
              <td>{{ workout.duration }}</td>
              <td>{{ workout.pace }}</td>
              <td>{{ workout.calories }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No workouts logged yet.</p>
      </div>
    </div>
  </template>
  <style scoped>
  table {
    margin-top: 15px;
  }
  </style>