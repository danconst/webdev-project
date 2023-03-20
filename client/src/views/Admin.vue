<template>
    <div class="container">
      <h1 class="title">All Users</h1>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td> <!--These all exist in usersData... why does it say it doesnt? I tried using get functions but now am confused.-->
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { usersData } from "@/model/session";
  
  export default defineComponent({
    name: "AllUsers",
    setup() {
      const users = usersData; 
      return {
        users,
      };
    },
  });
  </script>
  
  <style>

  </style>
  