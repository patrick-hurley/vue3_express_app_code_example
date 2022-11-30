<template>
    <div class="question" v-if="question.current">
        <p data-testid="question-header" class="sub-label">
            Question {{ number }}
        </p>
        <label data-testid="question-label">{{ question.label }}</label>
        <FormText
            v-if="question.type === 'text'"
            v-model="answer"
            data-testid="form-text"
        />
        <FormRadio
            v-if="question.type === 'radio'"
            v-model="answer"
            :radio-values="[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
            ]"
            data-testid="form-radio"
        />
        <FormTextArea
            v-if="question.type === 'textarea'"
            v-model="answer"
            data-testid="form-text-area"
        />
        <p
            v-if="showValidation"
            class="validation"
            id="validation"
            data-testid="validation-message"
        >
            Please answer the question
        </p>
        <div class="navigation">
            <button
                data-testid="back-button"
                class="back"
                @click="goToQuestion(number - 1)"
            >
                {{ number > 1 ? 'Back' : 'Cancel' }}
            </button>
            <button data-testid="submit-button" @click="submitAnswer(answer)">
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import FormRadio from './FormRadio.vue'
import FormText from './FormText.vue'
import FormTextArea from './FormTextArea.vue'

import { ref } from 'vue'

const props = defineProps(['question', 'number'])
const emit = defineEmits(['answered', 'goToQuestion'])
const showValidation = ref(false)

const answer = ''

function submitAnswer(answer: string | number) {
    if (answer === '') {
        showValidation.value = true
    } else {
        showValidation.value = false
        emit('answered', { index: props.number - 1, answer })
    }
}

function goToQuestion(number: number) {
    emit('goToQuestion', number)
}
</script>
