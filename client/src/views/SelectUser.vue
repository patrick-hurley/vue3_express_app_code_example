<template>
    <div class="container">
        <h1>Select a user to get started</h1>
        <div v-if="fetchComplete">
            <div v-if="fetchError" data-testid="error-message">
                <p>Something went wrong.</p>
            </div>
            <div v-else>
                <div
                    v-if="users && users.length > 0"
                    data-testid="show-dropdown"
                >
                    <label>User</label>
                    <select data-testid="user-dropdown" v-model="selectedUser">
                        <option
                            v-for="(user, index) in users"
                            :key="index"
                            :value="user"
                        >
                            {{ user.name }}
                        </option>
                    </select>
                    <p
                        v-if="showValidation"
                        class="validation"
                        data-testid="validation-message"
                    >
                        Please select a user
                    </p>
                </div>
                <div v-else data-testid="show-no-results">
                    <p>No users exist.</p>
                </div>
            </div>
        </div>

        <div class="navigation">
            <button
                class="back"
                @click="$router.push({ name: 'DashboardHome' })"
            >
                Back
            </button>
            <button
                data-testid="submit-button"
                v-if="users && users.length > 0"
                @click="selectUser()"
            >
                Continue
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import UserService from '@/services/UserService'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

let showValidation = ref(false)
let fetchComplete = ref(false)
let fetchError = ref(false)
let users = ref<Array<User>>()
let selectedUser = ref<User>()
const router = useRouter()

interface User {
    id: string
    name: string
}

async function getUsers(): Promise<void> {
    try {
        const foundUsers = await UserService.getAllUsers()
        users.value = foundUsers.data
    } catch {
        fetchError.value = true
    }
}

function selectUser() {
    if (selectedUser.value) {
        userStore.setActiveUser(selectedUser.value)
        router.push({
            name: 'DashboardUser',
        })
    } else {
        showValidation.value = true
    }
}
onMounted(async () => {
    await getUsers()
    fetchComplete.value = true
})
</script>
