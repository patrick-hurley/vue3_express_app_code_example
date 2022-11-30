<template>
    <div class="container">
        <h1>Priority manager</h1>
        <div class="navigation">
            <button
                data-testid="select-user"
                @click="router.push({ name: 'SelectUser' })"
            >
                App
            </button>
            <button
                data-testid="dashboard-admin"
                @click="router.push({ name: 'DashboardAdmin' })"
            >
                Admin
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
