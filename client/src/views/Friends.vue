<template>
  <div class="row" v-for="(workout, index) in workouts" :key="index">
    <div class="columns is-mobile is-centered">
      <div class="card">
        <div class="card-content">
          <p class="title">
            <p>{{ workout.user }}</p>
          </p>
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="workout.userPhoto" alt="User Photo">
              </figure>
            </div>
            <div class="media-content">
              <p><strong>Date:</strong> {{ workout.date }}</p>
              <p><strong>Workout Type:</strong> {{ workout.workoutType }}</p>
              <p><strong>Distance:</strong> {{ workout.distance }} ft</p>
              <p><strong>Duration:</strong> {{ workout.duration }} minutes</p>
              <p><strong>Pace:</strong> {{ workout.pace }} ft/min</p>
              <p><strong>Calories:</strong> {{ workout.calories }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { getWorkouts, type Workout } from '../model/workouts';
  import { ref } from 'vue'; 

  const workouts = ref<Workout[]>([]);
      getWorkouts().then((data) => {
      workouts.value = data;
  });

</script>

<style scoped>
.media-left{
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.card{
margin-top: 2.5rem;
max-width: 500px;
}


</style>