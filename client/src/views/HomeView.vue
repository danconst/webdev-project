<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useSession } from '@/model/session';
const session = useSession();
const isLoggedIn = ref(false);

function isUserLoggedIn() {
  const session = useSession();
  isLoggedIn.value = !!session.user;
}

onMounted(() => {
  const x = document.getElementById("loginDiv");
  if (x) {
    isUserLoggedIn();
    if (isLoggedIn.value) {
      x.style.display = "none";
    }
  }
});

watch(session, (newValue, oldValue) => {
  isLoggedIn.value = !!newValue.user;
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
          <h2 class = "mt-2"><center>Distance: {{session.user?.dayDist}} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{session.user?.dayDur}} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{session.user?.dayPace}} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{session.user?.dayCal}}</center></h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>Weekly Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{session.user?.weekDist}} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{ session.user?.weekDur }} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{session.user?.weekPace}} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{ session.user?.weekCal }}</center></h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>All Time Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{ session.user?.allDist }} feet</center></h2>
          <h2 class = "mt-2"><center>Duration: {{ session.user?.allDur }} minutes</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{session.user?.allPace}} ft/min</center></h2>
          <h2 class = "mt-2"><center>Calories: {{ session.user?.allCal }}</center></h2>
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