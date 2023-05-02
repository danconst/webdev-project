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
          <td>
            <img :src="photos[index]" class="user-photo is-rounded" alt="User photo" style="max-width: 50px; max-height: 50px;">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getUsersInfo } from "@/model/session";

const isLoading = ref(true);
const names = ref<string[]>([]);
const emails = ref<string[]>([]);
const photos = ref<string[]>([]);

getUsersInfo().then(data => {
  names.value = data.names;
  emails.value = data.emails;
  photos.value = data.photos;
}).catch(error => {
  console.error(error);
}).finally(() => {
  isLoading.value = false;
});
</script>



<style>
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