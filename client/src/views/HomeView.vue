<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
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
          <h2 class = "mt-2"><center>Distance: {{session.user?.dDist}}</center></h2>
          <h2 class = "mt-2"><center>Duration: {{session.user?.dDur}}</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{session.user?.dPace}}</center></h2>
          <h2 class = "mt-2"><center>Calories: {{session.user?.dCal}}</center></h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>Weekly Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{session.user?.wDist}}</center></h2>
          <h2 class = "mt-2"><center>Duration: {{ session.user?.wDur }}</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{session.user?.wPace}}</center></h2>
          <h2 class = "mt-2"><center>Calories: {{ session.user?.wCal }}</center></h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>All Time Stats</center></h2>
          <h2 class = "mt-2"><center>Distance: {{ session.user?.aDist }}</center></h2>
          <h2 class = "mt-2"><center>Duration: {{ session.user?.aDur }}</center></h2>
          <h2 class = "mt-2"><center>AVG Pace: {{session.user?.aPace}}</center></h2>
          <h2 class = "mt-2"><center>Calories: {{ session.user?.aCal }}</center></h2>
        </div>
    </div>
</template>
<style>
  .column {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>