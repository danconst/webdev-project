<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import LoginBadge from './LoginBadge.vue';

    const isMenuActive = ref(false);
    function toggleMenu() {
        isMenuActive.value = !isMenuActive.value;
        console.log({ isMenuActive });
    }

</script>

<template>
    <nav class="navbar is-info">
        <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <RouterLink to = "/"><img alt="RunningMan" class="logo" src="@/assets/run-man-png.webp" width="22" height="22" /></RouterLink>
          </a>
          <div class="navbar-burger" :class="{ 'is-active': isMenuActive }" @click="toggleMenu" >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      
        <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
          <div class="navbar-start">

            <RouterLink to="/" class="navbar-item">Home</RouterLink>
            <RouterLink to="/statistics" class="navbar-item">Statistics</RouterLink>
            <RouterLink to="/log" class="navbar-item">Log</RouterLink>
            <RouterLink to = "/friends" class ="navbar-item">Friend Activity</RouterLink>
            <RouterLink to = "/admin" class="navbar-item">Admin</RouterLink>
          </div>
      
          <div class="navbar-end">

            <LoginBadge />
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                    <span class="icon">
                      <i class="fab fa-twitter"></i>
                    </span>
                    <span>
                      Tweet
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
      </nav>
</template>


<style scoped>
</style>