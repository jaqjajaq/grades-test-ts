<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
    categories: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(["add-subcategory"]);

function handleAddSubcategory() {
    emit('add-subcategory', {
        id: window.crypto.randomUUID(),
        name: state.name,
        weight: state.weight,
        assessments: []
    }, state.categoryId);
}

const state = reactive({
    name: '',
    weight: 0,
    categoryId: '',
});
</script>

<template>
    <section class="create-subcategory-form">
        <h3 class="text-xl text-highlighted font-semibold mb-4">Subcategory</h3>
        
        <UForm :state="state" class="gap-4 flex flex-col w-full" @submit="handleAddSubcategory">
            <UFormField label="Parent Category" required>
                <UInputMenu v-model="state.categoryId" placeholder="Written Works..." :items="props.categories.map((category) => ({ label: category.name, id: category.id }))" value-key="id" />
            </UFormField>
            <UFormField label="Name" required>
                <UInput v-model="state.name" placeholder="Quizzes..." class="block" />
            </UFormField>
            
            <UFormField label="Weight" name="weight" required>
                <UInput v-model="state.weight" placeholder="50%" type="number" class="block" />
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