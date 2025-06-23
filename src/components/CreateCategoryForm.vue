<script setup lang="ts">
import { reactive } from 'vue';

const emit = defineEmits(["add-category"])

function handleAddCategory() {
    emit('add-category', {
        id: window.crypto.randomUUID(),
        name: formData.name,
        weight: formData.weight,
        subcategories: []
    });
}

const formData = reactive({
    name: '',
    weight: 0
});

</script>

<template>
    <section class="create-category-form">
        <h3 class="text-xl text-highlighted font-semibold mb-4">Category</h3>
        
        <UForm :state="formData" class="gap-4 flex flex-col w-full" @submit="handleAddCategory">
            <UFormField label="Name" required>
                <UInput v-model="formData.name" placeholder="Written Works..." class="block" />
            </UFormField>

            <UFormField label="Weight (%)" name="weight" required>
                <UInput v-model="formData.weight" placeholder="30%" type="number" class="block" />
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