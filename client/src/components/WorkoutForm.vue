<template>
  <div class = "has-text-centered">
    <div class = "add-workout-container">
    <a class="button is-info" @click="showForm = true">Add Workout</a>
    </div>
    <div v-if="showForm" class="modal is-active">
      <div class="modal-background" @click="showForm = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Log Your Workout</p>
          <button class="delete" @click="showForm = false"></button>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="submitForm">
            <div class="field">
              <label class="label">Distance (in km)</label>
              <div class="control">
                <input class="input" type="number" v-model.number="workout.distance" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Workout Type</label>
              <div class="control">
                <input class="input" type="text" v-model="workout.workoutType" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Duration (in minutes)</label>
              <div class="control">
                <input class="input" type="number" v-model.number="workout.duration" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Pace (in min/km)</label>
              <div class="control">
                <input class="input" type="number" v-model.number="workout.pace" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Calories Burnt</label>
              <div class="control">
                <input class="input" type="number" v-model.number="workout.calories" required>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
              <div class="control">
                <button class="button" @click="showForm = false">Cancel</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  interface Workout {
    distance: number;
    duration: number;
    pace: number;
    calories: number;
    workoutType: string;
  }

  export default defineComponent({
    data() {
      return {
        showForm: false,
        workout: {
          distance: 0,
          duration: 0,
          pace: 0,
          calories: 0,
          workoutType: "",
        } as Workout,
      };
    },
    methods: {
      submitForm() {
        this.$emit("submit", this.workout);
        this.showForm = false;
      },
    },
  });
</script>

<style>
  .add-workout-container {
    margin-top: 10px;
  }
</style>