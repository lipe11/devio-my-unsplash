<script setup>
import { ref, computed } from 'vue'
import { useImages } from './firebase'
import StickyNav from './components/StickyNav.vue'
import AddImageForm from './components/AddImageForm.vue'
import Image from './components/Image.vue'

const search = ref('')
const adding = ref(false)
const { images, addImage, deleteImage } = useImages()

const filteredImages = computed(() => {
  return [
    ...images.value.filter((e) =>
      e.label.toLowerCase().includes(search.value.toLowerCase())
    ),
  ]
})

function add(data) {
  addImage(data.label, data.url)
  closeForm()
}

function closeForm() {
  adding.value = false
}
</script>

<template>
  <StickyNav v-model="search" @add="adding = true" />
  <main>
    <masonry-wall :items="filteredImages" gap="28" :column-width="250">
      <template #default="{ item }">
        <Image :id="item.id" :url="item.url" :label="item.label" @delete="deleteImage" />
      </template>
    </masonry-wall>
  </main>
  <AddImageForm :open="adding" @close="adding = false" @submit="add" />
</template>

<style scoped>
main {
  margin-top: 1.5em;
}
</style>
