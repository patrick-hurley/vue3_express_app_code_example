<template>
    <div class="container">
        <div v-if="showError" data-testid="error-message">
            <p>Something went wrong</p>
        </div>
        <div v-else-if="fetchComplete">
            <div v-if="answerSet">
                <h1 data-testid="answer-title">
                    {{ new Date(answerSet.date).toLocaleString() }}
                </h1>
                <div
                    v-for="(answer, index) in answerSet.answers"
                    data-testid="answer-item"
                    :key="index"
                    class="answer"
                >
                    <p>
                        <strong>{{ answer.question.label }}</strong>
                    </p>
                    <p>{{ answer.answer }}</p>
                </div>
            </div>
            <div v-else>
                <p>Answer set could not be found</p>
            </div>
        </div>

        <button
            data-testid="back-button"
            class="back"
            @click="router.push({ name: 'AnswerList' })"
        >
            Back
        </button>
    </div>
</template>

<script setup lang="ts">
import AnswerService from '@/services/AnswerService'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

let fetchComplete = ref(false)
let showError = ref(false)
let answerSet = ref()
onMounted(async () => {
    if (userStore.activeUser?.id) {
        if (route.params.answerSet) {
            try {
                const foundAnswers = await AnswerService.getUserSingleAnswer(
                    userStore.activeUser.id,
                    route.params.answerSet as string
                )
                answerSet.value = foundAnswers.data
            } catch {
                showError.value = true
            }

            fetchComplete.value = true
        } else {
            showError.value = true
        }
    } else {
        router.push({
            name: 'SelectUser',
        })
    }
})
</script>

<style scoped></style>
