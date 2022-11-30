<template>
    <div class="container">
        <h1>Admin</h1>
        <div class="link-list">
            <a
                data-testid="new-user"
                @click="router.push({ name: 'AdminUserNew' })"
            >
                Create New User
            </a>
            <a
                data-testid="view-all-users"
                @click="router.push({ name: 'AdminUserViewAll' })"
            >
                View Users
            </a>
        </div>
        <div class="navigation">
            <button
                data-testid="back-button"
                class="back"
                @click="router.push({ name: 'DashboardHome' })"
            >
                Back to dashboard
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped></style>
