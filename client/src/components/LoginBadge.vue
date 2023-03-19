<script setup lang="ts">
import { ref } from 'vue';
import { useSession, login } from '@/model/session';
const session = useSession();
</script>

<template>
            <div class="navbar-item" v-if="session.user">
                Welcome, {{ session.user.name }}
                (<a @click=" session.user = null">logout</a>)
            </div>
            <div class="navbar-item" v-else>
                <!--Just make this a dropdown and add two other users that can log in using ID (2 and 3).-->
                <a class="button is-white" @click="login(1)">
                    <span class="icon">
                        <i class="fas fa-user"></i>
                    </span>
                    <strong>Login</strong>
                </a>
            </div>



</template>

<style scoped>
</style>