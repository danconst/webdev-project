<script setup lang="ts">
</script>
<template>
    <form>
  <div class="field">
    <label class="label">Workout Type</label>
    <div class="control">
      <div class="select">
        <select>
          <option>Select workout type</option>
          <option>Running</option>
          <option>Cycling</option>
          <option>Swimming</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Distance (km)</label>
    <div class="control">
      <input class="input" type="number" placeholder="Enter distance">
    </div>
  </div>

  <div class="field">
    <label class="label">Duration (minutes)</label>
    <div class="control">
      <input class="input" type="number" placeholder="Enter duration">
    </div>
  </div>

  <div class="field">
    <label class="label">Calories Burned</label>
    <div class="control">
      <input class="input" type="number" placeholder="Enter calories burned">
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button class="button is-link is-light">Cancel</button>
    </div>
  </div>
</form>

</template>