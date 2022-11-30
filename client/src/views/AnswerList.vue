<template>
    <div class="container">
        <h1>Previous answers</h1>
        <div v-if="fetchComplete">
            <div v-if="hasError" data-testid="error-message">
                <p>Something went wrong</p>
            </div>
            <div v-else-if="answers?.length > 0">
                <div
                    v-for="(answerSet, index) in answers"
                    data-testid="answer-item"
                    :key="index"
                    class="answer"
                >
                    <router-link
                        :to="{
                            name: 'AnswerSingle',
                            params: {
                                answerSet: answerSet.id,
                            },
                        }"
                    >
                        {{
                            new Date(answerSet.date).toLocaleString()
                        }}</router-link
                    >
                </div>
            </div>
            <div v-else data-testid="no-results">
                <p>No questionnaires have been answered yet.</p>
            </div>
        </div>
        <div class="navigation">
            <button
                class="back"
                @click="router.push({ name: 'DashboardUser' })"
            >
                Back
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import AnswerService from '@/services/AnswerService'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()

let fetchComplete = ref(false)
let hasError = ref(false)
let answers = ref()

onMounted(async () => {
    if (userStore.activeUser?.id) {
        try {
            const foundAnswers = await AnswerService.getUserAnswers(
                userStore.activeUser.id
            )
            answers.value = foundAnswers.data
        } catch {
            hasError.value = true
        }
        fetchComplete.value = true
    } else {
        router.push({ name: 'SelectUser' })
    }
})
</script>

<style scoped></style>
