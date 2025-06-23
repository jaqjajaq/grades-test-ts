<script setup lang="ts">
const emit = defineEmits(["save-data", "load-data", "reset-data"]);
</script>

<template>
    <section class="storage-options">
        <UButtonGroup>
            <UButton color="neutral" variant="subtle" label="Save Data" @click="emit('save-data');" />
            <UButton color="neutral" variant="subtle" label="Load Data" @click="emit('load-data');" />
            <UButton color="neutral" variant="subtle" label="Reset Data" @click="emit('reset-data');" />
        </UButtonGroup>
    </section>
</template>

<style scoped></style>