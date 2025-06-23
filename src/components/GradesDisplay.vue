<script setup lang="ts">
import { PropType } from 'vue';
import { SubjectData } from '../types';

const props = defineProps({
    subjectData: {
        type: Object as PropType<SubjectData>,
        required: true
    }
});
</script>

<template>
    <section class="grades-display text-default">
        <p>A list/table displaying your defined grading structure and assessments will go here.</p>

        <pre>{{ JSON.stringify(props.subjectData, null, 2) }}</pre>
    </section>
</template>

<style scoped></style>