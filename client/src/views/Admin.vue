<template>
  <body>
  <div class="container">
    <h1 class="title">All Users</h1>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(name, index) in names" :key="index">
          <td>{{ name }}</td>
          <td>{{ emails[index] }}</td>
          <td><img :src="photos[index]" class="user-photo" alt="User photo"></td>
        </tr>
      </tbody>
    </table>
  </div>
  </body>
</template>

<script setup lang="ts">
import { userEmails, userNames, userPhotos } from "@/model/session";
  const names = userNames();
  const emails = userEmails();
  const photos = userPhotos();
</script>

<style>
  .title {
    text-align: center;
    margin-top: 20px;
  }

  .user-photo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
  

  

</style>