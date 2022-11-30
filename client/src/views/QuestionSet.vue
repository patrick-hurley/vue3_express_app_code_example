<template>
    <div class="container">
        <div v-if="fetchComplete">
            <div v-if="showError" data-testid="show-error">
                <p>Something went wrong</p>
            </div>
            <div v-else>
                <div v-if="questionnaire && questionnaire.length > 0">
                    <div
                        v-if="questionComplete"
                        data-testid="questionnaire-complete"
                    >
                        <h1>questionnaire complete.</h1>

                        <div
                            v-for="(question, index) in questionnaire"
                            :key="index"
                        >
                            <div v-if="question.answer" class="answer">
                                <p>
                                    <strong>{{ question.label }}</strong>
                                </p>

                                <p>Answer: {{ question.answer }}</p>
                            </div>
                        </div>
                        <div class="navigation">
                            <button @click="startQuestions()">
                                Submit another
                            </button>
                            <button
                                @click="router.push({ name: 'DashboardUser' })"
                                class="back"
                            >
                                Back
                            </button>
                        </div>
                    </div>

                    <QuestionItem
                        v-else
                        v-for="(question, index) in questionnaire"
                        :key="index"
                        :question="question"
                        :number="index + 1"
                        @answered="processAnswer"
                        @goToQuestion="goToQuestion"
                    />
                </div>
                <div v-else data-testid="no-results">
                    <p>No questions found</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import QuestionItem from '../components/QuestionItem.vue'
import QuestionService from '@/services/QuestionService'
import AnswerService from '@/services/AnswerService'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

let questionsInit: []
let questionnaire = ref<Array<Question>>()
let questionComplete = ref(false)
let fetchComplete = ref(false)
let showError = ref(false)

onMounted(async () => {
    if (!userStore.activeUser) {
        router.push({
            name: 'SelectUser',
        })
        return
    }
    try {
        const questionResponse = await QuestionService.getAllQuestions()
        questionsInit = questionResponse.data
        if (questionsInit.length > 0) {
            startQuestions()
        }
    } catch {
        showError.value = true
    }
    fetchComplete.value = true
})

function startQuestions() {
    questionnaire.value = JSON.parse(JSON.stringify(questionsInit))

    if (questionnaire.value) {
        questionnaire.value[0].current = true
    }
    questionComplete.value = false
}

interface Question {
    id: string
    label: string
    type: string
    current: boolean
    answer: string | boolean | Date
}

interface Response {
    answer: string | boolean | Date
    index: number
}

function processAnswer(response: Response): void {
    if (questionnaire.value) {
        questionnaire.value[response.index].answer = response.answer
        questionnaire.value[response.index].current = false
        if (response.index === 1 && response.answer === 'No') {
            submitAnswers()
        } else if (response.index + 1 < questionnaire.value.length) {
            questionnaire.value[response.index + 1].current = true
        } else {
            submitAnswers()
        }
    }
}

function goToQuestion(number: number) {
    if (number > 0 && questionnaire.value) {
        questionnaire.value[number - 1].current = true
        questionnaire.value[number].current = false
    } else {
        router.push({
            name: 'DashboardUser',
        })
    }
}

async function submitAnswers() {
    questionComplete.value = true
    const answers = questionnaire.value
        ?.map((x) => {
            return {
                questionId: x.id,
                answer: x.answer,
            }
        })
        .filter((x) => x.answer)
    const payload = {
        userId: userStore.activeUser?.id,
        answers,
    }

    try {
        await AnswerService.createAnswerSet(payload)
    } catch {
        showError.value = true
    }
}
</script>
