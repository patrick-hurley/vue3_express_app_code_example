<template>
    <div class="container">
        <h1>Create User</h1>

        <div v-if="showError" data-testid="error-message">
            <p>Something went wrong</p>
        </div>
        <div v-else-if="createComplete" data-testid="created-confirmation">
            <h2>User created.</h2>
            <Teleport to="#navigation" v-if="isMounted">
                <button @click="resetForm()" data-testid="reset-form">
                    Add another?
                </button>
            </Teleport>
        </div>
        <div v-else data-testid="user-form">
            <label>Name</label>
            <form-text-vue v-model="name" />
            <p v-if="validationMessage" data-testid="validation-message">
                {{ validationMessage }}
            </p>

            <Teleport to="#navigation" v-if="isMounted">
                <button @click="createUser()" data-testid="submit-user">
                    Create
                </button>
            </Teleport>
        </div>
        <div id="navigation" class="navigation">
            <button
                class="back"
                @click="$router.push({ name: 'DashboardAdmin' })"
            >
                Back
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserService from '@/services/UserService'
import FormTextVue from '@/components/FormText.vue'

let name = ref('')
let createComplete = ref(false)
let isMounted = ref(false)
let showError = ref(false)
let validationMessage = ref<string | null>(null)

async function createUser() {
    if (name.value) {
        validationMessage.value = null
        try {
            await UserService.createUser({
                name: name.value,
            })
            createComplete.value = true
        } catch {
            showError.value = true
        }
    } else {
        validationMessage.value = 'Please enter a name'
    }
}

function resetForm() {
    name.value = ''
    createComplete.value = false
}

onMounted(() => {
    isMounted.value = true
})
</script>
