<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Assessment, Subcategory, Category, SubjectData } from '../types';

const props = defineProps({
    categories: {
        type: Array,
        required: true
    }
});

const state = reactive({
    name: '',
    score: 0,
    total: 0,
    categoryId: '',
    subcategoryId: '',
});

// A variable that lists the available subcategories to choose from in the form depending on the chosen category
const filteredSubcategories = computed(() => {
    const selectedCategoryId = state.categoryId;

    if (!selectedCategoryId) return [];

    // Find the selected category
    const targetCategory = <Category>props.categories.find(category => category.id === selectedCategoryId);

    // Map it into the desired data structure for the InputMenu
    const subcategories = targetCategory.subcategories.map((subcategory) => ({ label: subcategory.name, id: subcategory.id }));

    return subcategories;
})

const emit = defineEmits(["add-assessment"]);

function handleAddAssessment() {
    emit('add-assessment', {
        id: window.crypto.randomUUID(),
        name: state.name,
        score: state.score,
        total: state.total,
    }, state.categoryId, state.subcategoryId);
}

function clearSubcategory() {
    state.subcategoryId = '';
}
</script>

<template>
    <section class="create-assessment-form">
        <h3 class="text-xl text-highlighted font-semibold mb-4">Assessment</h3>

        <UForm :state="state" class="gap-4 flex flex-col w-full" @submit="handleAddAssessment">
            <UFormField label="Parent Category" required>
                <UInputMenu v-model="state.categoryId" placeholder="Written Works..." :items="props.categories.map((category) => ({ label: category.name, id: category.id }))" value-key="id" @update:modelValue="clearSubcategory"/>
            </UFormField>
            <UFormField label="Parent Subcategory" required>
                <UInputMenu v-model="state.subcategoryId" placeholder="Quizzes..."
                    :items="filteredSubcategories" value-key="id" />
            </UFormField>
            <UFormField label="Name" required>
                <UInput v-model="state.name" placeholder="Quiz #1: Ionic Bonds..." class="block" />
            </UFormField>

            <div class="flex flex-row gap-4 justify-between">
                <UFormField label="Score" required>
                    <UInput v-model="state.score" placeholder="14" type="number" />
                </UFormField>
                <UFormField label="Total" required>
                    <UInput v-model="state.total" placeholder="15" type="number" />
                </UFormField>
            </div>


            <div>
                <UButton type="submit">
                    Create
                </UButton>
            </div>
        </UForm>
    </section>
</template>

<style scoped>
</style>