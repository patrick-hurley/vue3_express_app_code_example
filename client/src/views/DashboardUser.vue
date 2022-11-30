<template>
    <div class="container">
        <div v-if="user">
            <h1 data-testid="user-name">Hi, {{ user.name }}</h1>
            <div class="link-list">
                <a @click="router.push({ name: 'Question' })">
                    Start new questionnaire
                </a>
                <a @click="router.push({ name: 'AnswerList' })">
                    View previous answers
                </a>
            </div>
        </div>

        <button
            data-testid="back-button"
            class="back"
            @click="router.push({ name: 'SelectUser' })"
        >
            Back
        </button>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const user = userStore.getActiveUser
onMounted(() => {
    if (!userStore.getActiveUser?.id) {
        router.push({
            name: 'SelectUser',
        })
    }
})
</script>

<style scoped></style>
