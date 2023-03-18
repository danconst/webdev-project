<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
        <div class = "column is-primary">
          <h2 class = "subtitle"><center>Today's Stats</center></h2>
          <h2 class = "mt-2">Distance: 0 feet</h2>
          <h2 class = "mt-2">Duration: 0.0</h2>
          <h2 class = "mt-2">AVG Pace: NaN mph</h2>
          <h2 class = "mt-2">Calories: 0</h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>Weekly Stats</center></h2>
          <h2 class = "mt-2">Distance: 0 feet</h2>
          <h2 class = "mt-2">Duration: 0.0</h2>
          <h2 class = "mt-2">AVG Pace: NaN mph</h2>
          <h2 class = "mt-2">Calories: 0</h2>
        </div>
        <div class = "column">
          <h2 class = "subtitle"><center>All Time Stats</center></h2>
          <h2 class = "mt-2">Distance: 0 feet</h2>
          <h2 class = "mt-2">Duration: 0.0</h2>
          <h2 class = "mt-2">AVG Pace: NaN mph</h2>
          <h2 class = "mt-2">Calories: 0</h2>
        </div>
    </div>
</template>
