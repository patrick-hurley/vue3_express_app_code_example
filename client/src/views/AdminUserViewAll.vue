<template>
    <div class="container">
        <h1>Users</h1>
        <div v-if="showError" data-testid="error-message">
            <p>Something went wrong.</p>
        </div>
        <div v-if="fetchComplete">
            <ul v-if="users && users.length > 0">
                <li
                    v-for="(user, index) in users"
                    data-testid="user-item"
                    :key="index"
                >
                    {{ user.name }}
                </li>
            </ul>
            <div v-else data-testid="no-results">
                <p>No users found</p>
            </div>
        </div>

        <button class="back" @click="$router.push({ name: 'DashboardAdmin' })">
            Back
        </button>
    </div>
</template>

<script setup lang="ts">
import UserService from '@/services/UserService'
import { ref, onMounted } from 'vue'
const users = ref<Array<User>>()
let showError = ref(false)
let fetchComplete = ref(false)

interface User {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

async function getUsers(): Promise<void> {
    try {
        const foundUsers = await UserService.getAllUsers()
        users.value = foundUsers.data
    } catch (err) {
        showError.value = true
    }
    fetchComplete.value = true
}
onMounted(async () => {
    await getUsers()
})
</script>
