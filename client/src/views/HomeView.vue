<script setup lang="ts">
import { ref, watch, computed, watchEffect } from 'vue';
import { useSession } from '@/model/session';
import type { Workout } from '@/model/workouts';
import { getWorkouts } from '@/model/workouts';

const session = useSession();
const isLoggedIn = ref(false);
const workouts = ref<Workout[]>([]);
let userWorkouts = [];

function isUserLoggedIn() {
  const session = useSession();
  isLoggedIn.value = !!session.user;
}

isUserLoggedIn();

watch(session, (newValue, oldValue) => {
  isLoggedIn.value = !!newValue.user;
  workouts.value = []; // Clear the workouts array when the user changes
});


watchEffect(() => {
  if (isLoggedIn.value) {
    getWorkouts().then((data) => {
      workouts.value = data.data;
      userWorkouts = workouts.value.filter((workout) => workout.user === session.user?.name);
      console.log(userWorkouts);
      const totalDistance = userWorkouts.reduce((acc, workout) => acc + workout.distance, 0);
      console.log(totalDistance);
    });
  }
});
</script>

<template>
  <body>
  <main>
    <h1><font size="100px"><center>Welcome to FitnessPal!</center></font></h1>
    <div id="loginDiv">
      <h2 class="subtitle" v-if="!isLoggedIn"><center>Please Log In to View Your Stats</center></h2>
    </div>
  </main>
    <h2 class = "subtitle" v-if = "isLoggedIn"><center>Hello, {{ session.user.name }}</center> </h2>
    <div class = "columns mt-5" v-if = "isLoggedIn">
        <div class = "column" >
          <h2 class = "subtitle"><center>Today's Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{}} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{}} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{}} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{}}</center></h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>Weekly Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{ }} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{  }} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{ }} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{  }}</center></h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>All Time Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{  }} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{  }} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{}} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{  }}</center></h2>
        </div>
    </div>
    </body>
</template>
<style>
  .column {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>