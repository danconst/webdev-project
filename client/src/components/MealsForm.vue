<template>
    <div class="has-text-centered">
      <div class="add-meal-container">
        <a class="button is-info" @click="init">Add Meal</a>
      </div>
      <div v-if="meal" class="modal is-active">
        <div class="modal-background" @click="meal = null"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Log Your Meal</p>
            <button class="delete" @click="meal = null"></button>
          </header>
          <section class="modal-card-body">
            <form @submit.prevent="submitForm">
              <div class="field">
                <label class="label">Food</label>
                <div class="control">
                  <input class="input" type="text" v-model.number="meal.food" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Calories</label>
                <div class="control">
                  <input class="input" type="text" v-model="meal.calories" required>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                  <button class="button" @click="meal = null">Cancel</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
    import type { Meal } from "@/model/meals";
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    import { addMeal } from '@/model/meals';
    import { useSession } from '@/model/session';
  
    const session = useSession();
    const route = useRoute();
  
    const meal = ref<Meal | null>();
  
    const emit = defineEmits<{
      (e: 'addedMeal', value: Meal ): void
    }>()
  
    function init(){
      meal.value = {
          date: new Date().toLocaleDateString(),
          user: session.user?.name ?? '',
        } as Meal;
    }
    const submitForm = () => {
  
      addMeal(meal.value!).then(result => {
        
        meal.value = null;
  
        emit("addedMeal", result.data);
  
      });
    };
  </script>
  
  <style>
  .add-meal-container {
    margin-top: 10px;
  }
  </style>
  