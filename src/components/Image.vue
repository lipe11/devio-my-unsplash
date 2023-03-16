<script setup>
import { ref } from 'vue'
const props = defineProps({
  id: String,
  label: String,
  url: String,
})
const emit = defineEmits(['delete'])
const hovering = ref(false)

function deleteImage() {
  if (confirm('Are you sure?')) {
    emit('delete', props.id)
  }
}
</script>

<template>
  <div>
    <img :src="url" :alt="label" />
    <div
      class="gradient"
      @mouseover="hovering = true"
      @mouseleave="hovering = false"
      :class="{ hidden: !hovering }"
    >
      <a href="#" role="button" class="secondary" @click.prevent="deleteImage">
        delete
      </a>
      <h3>{{ label }}</h3>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  border-radius: 16px;
}
div {
  position: relative;
}
a {
  position: absolute;
  top: 1em;
  right: 1em;
}
h3 {
  position: absolute;
  bottom: 0;
  left: 1em;
  right: 1em;
  color: #fff;
}
.gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  border-radius: 16px;
}
.hidden {
  opacity: 0;
}
</style>
