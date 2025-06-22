<script setup lang="ts">
import { ref, computed } from "vue";

import { Assessment, Subcategory, Category, SubjectData } from './types';

import CreateCategoryForm from "./components/CreateCategoryForm.vue";
import CreateSubcategoryForm from "./components/CreateSubcategoryForm.vue";
import CreateAssessmentForm from "./components/CreateAssessmentForm.vue";
import GradesDisplay from "./components/GradesDisplay.vue";
import StorageOptions from "./components/StorageOptions.vue";

import { calculateSubjectGrade } from "./utils/gradesCalculator";

const calculatedSubjectGrade = computed(() => {
  return calculateSubjectGrade(subjectData.value.categories);
});

// the root structure of the data of a single subject

const subjectData = ref<SubjectData>({
  name: 'General Chemistry II',
  teacher: 'Ms. Nova',
  categories: []
});

function handleAddCategory(newCategory: Category) {
  subjectData.value.categories.push(newCategory);
}

function handleAddSubcategory(newSubcategory: Subcategory, parentCategoryId: string) {
  const targetCategory = subjectData.value.categories.find(category => category.id === parentCategoryId);

  if (targetCategory) {
    targetCategory.subcategories.push(newSubcategory);
  } else {
    console.log(parentCategoryId);
    alert("Parent category not found!");
  }
}

function handleAddAssessment(newAssessment: Assessment, parentCategoryId: string, parentSubcategoryId: string) {
  const targetCategory = subjectData.value.categories.find(category => category.id === parentCategoryId);

  if (targetCategory) {
    const targetSubcategory = targetCategory.subcategories.find(subcategory => subcategory.id === parentSubcategoryId);

    if (targetSubcategory) {
      targetSubcategory.assessments.push(newAssessment);
    } else {
      console.error("Parent subcategory not found!");
    }
  } else {
    console.error("Parent category not found!");
  }
}

function saveData() {
  localStorage.setItem("subjectData", JSON.stringify(subjectData.value));
}

function loadData() {
  const loadedData = localStorage.getItem("subjectData");

  if (loadedData) { subjectData.value = JSON.parse(loadedData) };
}

function resetData() {
  subjectData.value.categories = [];

  localStorage.clear();
}

</script>

<template>
  <UApp>
    <div id="subject-overview"
      class="max-w-4xl mx-auto p-4 md:p-8 min-h-screen bg-default text-white font-sans antialiased">

      <UCard class="mb-8" variant="subtle">
        <template #header>
          <h1 class="text-3xl font-bold text-center text-highlighted mb-2">{{ subjectData.name }}</h1>
          <p v-if="subjectData.teacher" class="text-sm text-muted text-center">Teacher: {{ subjectData.teacher }}</p>
          <p v-else class="text-sm text-gray-400 text-center">Teacher: N/A</p>
        </template>

        <div class="average-section text-center p-4 rounded-md border border-default">
          <h3 class="text-xl text-highlighted font-semibold mb-2">Subject General Average:</h3>
          <p class="average-value text-5xl font-extrabold" :class="{
            'text-green-400': calculatedSubjectGrade >= 0.85, /* Adjust threshold as needed */
            'text-red-400': calculatedSubjectGrade < 0.85
          }">
            {{ (calculatedSubjectGrade * 100).toFixed(4) }}
          </p>
        </div>
      </UCard>

      <UCard class="mb-8" variant="subtle">
        <template #header>
          <h2 class="text-2xl text-highlighted font-semibold">Data Inputs</h2>
        </template>
        <div class="grading-input-forms grid grid-cols-1 md:grid-cols-3 gap-6">
          <CreateCategoryForm @add-category="handleAddCategory" />
          <CreateSubcategoryForm :categories="subjectData.categories" @add-subcategory="handleAddSubcategory" />
          <CreateAssessmentForm :categories="subjectData.categories" @add-assessment="handleAddAssessment" />
        </div>
      </UCard>


      <UCard class="mb-8" variant="subtle">
        <template #header>
          <h2 class="text-2xl text-highlighted font-semibold">Grades Display</h2>
        </template>
        <GradesDisplay :subject-data="subjectData" />
      </UCard>


      <UCard variant="subtle">
        <template #header>
          <h2 class="text-2xl text-highlighted font-semibold">Data Management</h2>
        </template>
        <StorageOptions @save-data="saveData" @load-data="loadData" @reset-data="resetData" />
      </UCard>

    </div>
  </UApp>
</template>

<style scoped>
</style>