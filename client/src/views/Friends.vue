<template>
  <div class="columns is-multiline">
    <div class="column is-4" v-for="workout in workouts" :key="workout.user + workout.date">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="workout.userPhoto" alt="User Photo">
              </figure>
            </div>
            <div class="media-content">
              <p><strong>User:</strong> {{ workout.user }}</p>
              <p><strong>Date:</strong> {{ workout.date.toLocaleDateString() }}</p>
              <p><strong>Workout Type:</strong> {{ workout.workoutType }}</p>
              <p><strong>Distance:</strong> {{ workout.distance }} km</p>
              <p><strong>Duration:</strong> {{ workout.duration }} minutes</p>
              <p><strong>Pace:</strong> {{ workout.pace }} min/km</p>
              <p><strong>Calories:</strong> {{ workout.calories }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
    import { getWorkouts } from '../model/workouts';
    const workouts = getWorkouts();
  </script>

<style>
.media-left{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
}
</style>