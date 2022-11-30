<template>
    <div class="radio">
        <div
            v-for="(radioValue, index) in radioValues"
            :key="index"
            data-testid="radio-item"
        >
            <label for="radio">{{ radioValue.label }}</label>
            <input
                type="radio"
                name="radio"
                :value="radioValue.value"
                @change="updateValue"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

interface RadioItem {
    label: string
    value: string
}

defineProps({
    modelValue: {
        type: String,
    },
    radioValues: {
        type: Array as PropType<Array<RadioItem>>,
        required: true,
    },
})
const emit = defineEmits(['update:modelValue'])
function updateValue(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
