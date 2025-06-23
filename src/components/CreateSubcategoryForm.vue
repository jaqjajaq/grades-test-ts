<script setup lang="ts">
import { reactive, PropType } from 'vue';
import { Category } from '../types';

const props = defineProps({
    categories: {
        type: Array as PropType<Category[]>,
        required: true,
    }
});

const emit = defineEmits(["add-subcategory"]);

function handleAddSubcategory() {
    emit('add-subcategory', {
        id: window.crypto.randomUUID(),
        name: formData.name,
        weight: formData.weight,
        assessments: []
    }, formData.categoryId);
}

const formData = reactive({
    name: '',
    weight: 0,
    categoryId: '',
});
</script>

<template>
    <section class="create-subcategory-form">
        <h3 class="text-xl text-highlighted font-semibold mb-4">Subcategory</h3>
        
        <UForm :state="formData" class="gap-4 flex flex-col w-full" @submit="handleAddSubcategory">
            <UFormField label="Parent Category" required>
                <UInputMenu v-model="formData.categoryId" placeholder="Written Works..." :items="props.categories.map((category: Category) => ({ label: category.name, id: category.id }))" value-key="id" />
            </UFormField>
            <UFormField label="Name" required>
                <UInput v-model="formData.name" placeholder="Quizzes..." class="block" />
            </UFormField>
            
            <UFormField label="Weight" name="weight" required>
                <UInput v-model="formData.weight" placeholder="50%" type="number" class="block" />
            </UFormField>

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