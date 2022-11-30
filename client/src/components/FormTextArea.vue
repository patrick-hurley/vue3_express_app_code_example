<template>
    <textarea :value="modelValue" @input="updateValue"></textarea>
</template>

<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
function updateValue(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
