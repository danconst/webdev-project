<template>
    <div class="columns">
      <div class="column is-8">
        <MealForm @addedMeal="addedMeal" />
        <div v-if="userMeals.length > 0">
          <h2 class="title is-2 has-text-centered">Meal Log</h2>
          <div class="columns is-centered">
            <table class="table is-striped is-centered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Food</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(meal, index) in userMeals" :key="index">
                  <td>{{ meal.date }}</td>
                  <td>{{ meal.food }}</td>
                  <td>{{ meal.calories }}</td>
                  <td>
                    <button
                      class="button is-danger"
                      @click="deleteItem(meal._id)"
                    >
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>
          <div class="columns is-centered">
            <span></span>
            <p class="mt-3">No meals logged yet.</p>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Total Calories</p>
          </header>
          <div class="card-content has-text-centered">
            <span class="title is-link">{{ totalCalories }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { computed, ref, watchEffect } from "vue";
    import MealForm from "../components/MealsForm.vue";
    import type { Meal } from "@/model/meals";
    import { getMeals, deleteMeal } from "@/model/meals";
    import { useSession } from "@/model/session";
  
    const meals = ref<Meal[]>([]);
    const session = useSession();
    const totalCalories = ref(0);
  
    const userMeals = computed(() => {
      return meals.value.filter((meal) => meal.user === session.user?.name);
    });
  
    watchEffect(() => {
      getMeals().then((data) => {
        meals.value = data.data;
    });
        totalCalories.value = userMeals.value.reduce((sum, meal) => {
            return Number(sum) + Number(meal.calories);
        } , 0);
    });
  
    function addedMeal(value: Meal) {
      meals.value.push(value);
    }
  
    function deleteItem(id: string) {
      deleteMeal(id)
        .then(() => {
          meals.value = meals.value.filter((item) => item._id !== id);
        })
        .catch((err) => console.log(err));
    }
  </script>
  
  <style scoped>
    .card {
      margin-top: 1rem;
    }
  </style>