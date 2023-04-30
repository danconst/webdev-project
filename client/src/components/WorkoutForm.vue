<template>
  <div class="has-text-centered">
    <div class="add-workout-container">
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
              <label class="label">Pace (in ft/min)</label>
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

<script setup lang="ts">

import { getWorkouts, type Workout } from "@/model/workouts";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { addWorkout } from '@/model/workouts';
import { useSession } from '@/model/session';

const props = defineProps<{
        workouts?: any;
}>();

const session = useSession();
const workout = ref<Workout>({} as Workout);
const showForm = ref(false);

 async function submitForm(){
  workout.value.user = session.user?.name ?? ''
  workout.value.userPhoto = session.user?.photo ?? ''
  await addWorkout(workout.value).then((data) => console.log(data))
  showForm.value = false;
};
  watch(() => props.workouts, (newVal) => {
    if (newVal != undefined) {
        workout.value = newVal;
      }
  });

</script>

<style>
.add-workout-container {
  margin-top: 10px;
}
</style>
