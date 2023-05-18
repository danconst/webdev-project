<template>
  <div class="has-text-centered">
    <div class="add-workout-container">
      <a class="button is-info" @click="init">Add Workout</a>
    </div>
    <div v-if="workout" class="modal is-active">
      <div class="modal-background" @click="workout = null"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Log Your Workout</p>
          <button class="delete" @click="workout = null"></button>
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
              <label class="label">Pace (in km/min)</label>
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
            <div class="field">
              <label class="label">Worked Out With</label>
                <div class="control">
                <input class="input" type="text" v-model="workout.workedOutWith" autocomplete="off" @input="handleUserAutocomplete" />
                <ul v-if="showAutocomplete" class="autocomplete-list">
                  <li v-for="user in autocompleteUsers" @click="selectUser(user)">{{ user }}</li>
                </ul>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
              <div class="control">
                <button class="button" @click="workout = null">Cancel</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { Workout } from "@/model/workouts";
  import { ref, reactive } from "vue";
  import { useRoute } from "vue-router";
  import { addWorkout } from "@/model/workouts";
  import { useSession, getUserNames } from "@/model/session";


  const session = useSession();
  const route = useRoute();

  const workout = ref<Workout | null>();
  const showAutocomplete = ref(false);
  const autocompleteUsers = ref<string[]>([]);
  const selectedUser = ref<string | null>(null);


  const emit = defineEmits<{
    (e: 'added', value: Workout ): void
  }>()

  function init(){
    workout.value = {
        date: new Date().toLocaleDateString(),
        user: session.user?.name ?? '',
        userPhoto: session.user?.photo ?? ''
      } as Workout;
  }
  const submitForm = () => {

    addWorkout(workout.value!).then(result => {
      
      workout.value = null;

      emit("added", result.data);

    });
  };


  async function handleUserAutocomplete() {
    const searchTerm = workout.value?.workedOutWith ?? "";

    if (searchTerm.length >= 2) {
      try {
        const names = await getUserNames();
        autocompleteUsers.value = names.filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        showAutocomplete.value = true;
      } catch (error) {
        console.error(error);
      }
    } else {
      autocompleteUsers.value = [];
      showAutocomplete.value = false;
    }
  }

  function selectUser(user: string) {
    workout.value!.workedOutWith = user;
    showAutocomplete.value = false;
  }
  
</script>

<style>
  .autocomplete-list {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 1;
  }

  .autocomplete-list li {
    padding: 8px 12px;
    cursor: pointer;
  }

  .autocomplete-list li:hover {
    background-color: #f2f2f2;
  }
</style>