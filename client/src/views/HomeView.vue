<script setup lang="ts">
import { ref, watch, computed, watchEffect } from 'vue';
import { useSession } from '@/model/session';
import type { Workout } from '@/model/workouts';
import { getWorkouts } from '@/model/workouts';

const session = useSession();
const isLoggedIn = ref(false);
const workouts = ref<Workout[]>([]);
let userWorkouts = [];

const totalDistance = ref(0); 
const totalDuration = ref(0);
const totalCalories = ref(0);
const avgPace = ref(0);

const dailyDistance = ref(0);
const dailyDuration = ref(0);
const dailyCalories = ref(0);
const dailyAvgPace = ref(0);

const weeklyDistance = ref(0);
const weeklyDuration = ref(0);
const weeklyCalories = ref(0);
const weeklyAvgPace = ref(0);


function isUserLoggedIn() {
  const session = useSession();
  isLoggedIn.value = !!session.user;
}

isUserLoggedIn();

watch(session, (newValue, oldValue) => {
  isLoggedIn.value = !!newValue.user;
  workouts.value = []; 
});

watchEffect(() => {
  if (isLoggedIn.value) {
    getWorkouts().then((data) => {


      workouts.value = data.data;
      userWorkouts = workouts.value.filter((workout) => workout.user === session.user?.name);
      console.log(userWorkouts);


      //TOTALS
     
      const distances = userWorkouts.map((workout) => Number(workout.distance));
      totalDistance.value = distances.reduce((total, distance) => total + distance, 0); 

      const durations = userWorkouts.map((workout) => Number(workout.duration));
      totalDuration.value = durations.reduce((total, duration) => total + duration, 0)

      const caloriesArr = userWorkouts.map((workout) => Number(workout.calories));
      totalCalories.value = caloriesArr.reduce((total, calories) => total + calories, 0)
      console.log(totalDistance.value)

      avgPace.value = totalDistance.value / totalDuration.value

      //DAILY
      const currentDate = new Date().toLocaleDateString();
      const dailyWorkouts = userWorkouts.filter(workout => workout.date === currentDate);
      const ddistances = userWorkouts.map((workout) => Number(workout.distance));
      dailyDistance.value = ddistances.reduce((total, distance) => total + distance, 0); 

      const ddurations = userWorkouts.map((workout) => Number(workout.duration));
      dailyDuration.value = ddurations.reduce((total, duration) => total + duration, 0)

      const dcaloriesArr = userWorkouts.map((workout) => Number(workout.calories));
      dailyCalories.value = dcaloriesArr.reduce((total, calories) => total + calories, 0)

      dailyAvgPace.value = dailyDistance.value / dailyDuration.value
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
    <h2 class = "subtitle" v-if = "isLoggedIn"><center>Hello, {{ session.user?.name }}</center> </h2>
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
          <h2 class = "mt-2"><center>Distance: {{ dailyDistance }} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{ dailyDuration }} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{ dailyAvgPace }} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{ dailyCalories }}</center></h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>All Time Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{ totalDistance }} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{ totalDuration }} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{ avgPace }} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{ totalCalories }}</center></h2>
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