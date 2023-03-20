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
          <tr v-for="name in names"> <!--WHY IS THIS AN ERROR!!!-->
            <td>{{ name }}</td> 
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { userNames } from "@/model/session";
  const names = userNames();
  </script>
  
  <style>

  </style>
  