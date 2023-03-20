
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
        <tr v-for="name in names">
          <td>{{ name }}</td> <!--This *SHOULD* display names... but it wont? I dont know why it seems like this should be right!-->
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usersData, userNames} from "@/model/session";

export default defineComponent({
  name: "AllUsers",
  setup() {
    const names = userNames(); 
    return {
      names,
    };
  },
});

</script>

<style>

</style>


