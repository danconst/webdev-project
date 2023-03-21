<script setup lang="ts">
import { ref } from 'vue';
import { useSession, login } from '@/model/session';
const session = useSession();
</script>

<template>
  <div class="navbar-item" v-if="session.user">
    <div class="user-info">
      <img :src= "session.user.photo" class="user-photo" alt="User photo">
      <span class="user-name">{{ session.user.name }}</span>
    </div>
    (<a @click="session.user = null">logout</a>)
  </div>
  <div class="navbar-item" v-else>
    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <a class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
          <span class="icon">
            <i class="fas fa-user"></i>
          </span>
          <strong>Login</strong>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a class="dropdown-item" @click="login(1)">
            Dan Constance
          </a>
          <a class="dropdown-item" @click="login(2)">
            Fish
          </a>
          <a class="dropdown-item" @click="login(3)">
            Apple
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
}

.user-photo {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.user-name {
  font-weight: bold;
}
</style>