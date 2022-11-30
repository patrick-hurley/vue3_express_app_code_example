<template>
    <div>
        <input type="text" :value="modelValue" @input="updateValue" />
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
defineProps(['modelValue'])
function updateValue(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
