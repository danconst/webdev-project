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

const averageDistance = ref(0);
const averageCalories = ref(0);
const averageDuration = ref(0);
const averagePace = ref(0);


function isUserLoggedIn() {
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
      let userWorkouts: Workout[] = [];
      userWorkouts = workouts.value.filter((workout) => workout.user === session.user?.name);
      console.log(userWorkouts);

      

    
      //TOTALS
     
      const distances = userWorkouts.map((workout) => Number(workout.distance));
      totalDistance.value = distances.reduce((total, distance) => total + distance, 0);
      averageDistance.value = totalDistance.value / userWorkouts.length;

      const durations = userWorkouts.map((workout) => Number(workout.duration));
      totalDuration.value = durations.reduce((total, duration) => total + duration, 0)
      averageDuration.value = totalDuration.value / userWorkouts.length;

      const caloriesArr = userWorkouts.map((workout) => Number(workout.calories));
      totalCalories.value = caloriesArr.reduce((total, calories) => total + calories, 0)
      averageCalories.value = totalCalories.value / userWorkouts.length;

      avgPace.value = totalDistance.value / totalDuration.value
      averagePace.value = totalDistance.value

      //DAILY
      const currentDate = new Date().toLocaleDateString();
      const dailyWorkouts = userWorkouts.filter(workout => workout.date === currentDate);
      const ddistances = dailyWorkouts.map((workout) => Number(workout.distance));
      dailyDistance.value = ddistances.reduce((total, distance) => total + distance, 0); 

      const ddurations = dailyWorkouts.map((workout) => Number(workout.duration));
      dailyDuration.value = ddurations.reduce((total, duration) => total + duration, 0)

      const dcaloriesArr = dailyWorkouts.map((workout) => Number(workout.calories));
      dailyCalories.value = dcaloriesArr.reduce((total, calories) => total + calories, 0)

      dailyAvgPace.value = dailyDistance.value / dailyDuration.value

      //WEEKLY
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); 
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() + (6 - weekEnd.getDay())); 
      const weeklyWorkouts = userWorkouts.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= weekStart && workoutDate <= weekEnd;
    });
      const wdistances = weeklyWorkouts.map(workout => Number(workout.distance));
      weeklyDistance.value = wdistances.reduce((total, distance) => total + distance, 0);

      const wdurations = weeklyWorkouts.map(workout => Number(workout.duration));
      weeklyDuration.value = wdurations.reduce((total, duration) => total + duration, 0);

      const wcaloriesArr = weeklyWorkouts.map(workout => Number(workout.calories));
      weeklyCalories.value = wcaloriesArr.reduce((total, calories) => total + calories, 0);

      weeklyAvgPace.value = weeklyDistance.value / weeklyDuration.value;
    });

    

  }
});
</script>

<template>
  <body>
    <main>
      <h1 class="title is-1 has-text-centered">Welcome to FitnessPal!</h1>
      <div id="loginDiv" v-if="!isLoggedIn">
        <h2 class="subtitle has-text-centered">Please Log In to View Your Stats</h2>
      </div>
      <div class="columns mt-5" v-if="isLoggedIn">
        <div class="column">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title subtitle is-4 has-text-centered">
                Today's Stats
              </h2>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                  <p class="subtitle is-5">Distance: {{ dailyDistance }} km
                    <span v-if="dailyDistance < averageDistance" style="color:red;">&#8595;</span>
                    <span v-else style="color:green;">&#8593;</span>
                  </p>
                  <p class="subtitle is-5">Duration: {{ dailyDuration }} minutes
                    <span v-if="dailyDuration < averageDuration" style="color:red;">&#8595;</span>
                    <span v-else style="color:green;">&#8593;</span>
                  </p>
                <p class="subtitle is-5">AVG Pace: {{ dailyAvgPace }} km/min</p>
                <p class="subtitle is-5">Calories Burnt: {{ dailyCalories }}
                  <span v-if="dailyCalories < averageCalories" style="color:red;">&#8595;</span>
                  <span v-else style="color:green;">&#8593;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card ">
            <header class="card-header">
              <h2 class="card-header-title subtitle is-4 has-text-centered">
                Weekly Stats
              </h2>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <p class="subtitle is-5">Distance: {{ weeklyDistance }} km</p>
                <p class="subtitle is-5">Duration: {{ weeklyDuration }} minutes</p>
                <p class="subtitle is-5">AVG Pace: {{ weeklyAvgPace }} km/min</p>
                <p class="subtitle is-5">Calories Burnt: {{ weeklyCalories }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card ">
            <header class="card-header">
              <h2 class="card-header-title subtitle is-4 has-text-centered">
                All Time Stats
              </h2>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <p class="subtitle is-5">Distance: {{ totalDistance }} km</p>
                <p class="subtitle is-5">Duration: {{ totalDuration }} minutes</p>
                <p class="subtitle is-5">AVG Pace: {{ avgPace }} km/min</p>
                <p class="subtitle is-5">Calories Burnt: {{ totalCalories }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns mt-5" v-if="isLoggedIn">
        <div class="column">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title subtitle is-4 has-text-centered">
                Average Stats
              </h2>
            </header>
            <div class="card-content">
              <div class="content has-text-centered">
                <p class="subtitle is-5">Average Distance: {{ averageDistance }} km</p>
                <p class="subtitle is-5">Average Duration: {{ averageDuration }} minutes</p>
                <p class="subtitle is-5">Average Calories Burnt: {{ averageCalories }}</p>
                <p class="subtitle is-5">Average Pace: {{ averagePace }} km/min</p>
              </div>
            </div>
          </div>  
        </div>
      </div>  
    </main>
  </body>
</template>

<style>
  .column {
    padding: 10px;
  }
</style>
<style>
  .column {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>