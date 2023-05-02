<template>
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
</template>

<script setup lang="ts">
import { getUsersInfo } from "@/model/session";

const { names, emails, photos } = await getUsersInfo();
console.log(names);
console.log(emails);
console.log(photos);
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

  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .table th,
  .table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table th {
    background-color: #f2f2f2;
    color: #333;
  }

  .table td {
    font-size: 16px;
    color: #666;
  }
</style>