<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'submit'])
defineProps({
  open: Boolean,
})

const label = ref('')
const url = ref('')
const validating = ref(false)

async function validateAndSubmit() {
  if (validating.value) return
  if (label.value.length && url.value.length) {
    validating.value = true
    if (await isImgUrl(url.value)) {
      emit('submit', { label: label.value, url: url.value })
      clearForm()
    } else {
      alert('Image url is invalid')
    }
    validating.value = false
  } else {
    alert('Must provide label and url')
  }
}

function cancelAdd() {
  if (!validating.value) {
    emit('close')
  }
}

async function isImgUrl(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onerror = () => resolve(false)
    img.onload = () => resolve(true)
  })
}

function clearForm() {
  label.value = ''
  url.value = ''
}
</script>

<template>
  <dialog :open="open">
    <article>
      <h2>Add new photo</h2>
      <label for="label">
        Label
        <input
          type="text"
          id="label"
          name="label"
          v-model="label"
          placeholder="add a label"
        />
      </label>
      <label for="url">
        Photo URL
        <input type="text" id="url" name="url" v-model="url" placeholder="https://" />
      </label>
      <footer>
        <a href="#" role="button" class="outline secondary" @click.prevent="cancelAdd">
          Cancel
        </a>
        <a
          href="#"
          role="button"
          class="contrast"
          :aria-busy="validating"
          @click.prevent="validateAndSubmit"
        >
          {{ validating ? '' : 'Submit' }}
        </a>
      </footer>
    </article>
  </dialog>
</template>

<style scoped>
article {
  min-width: min(35em, 90%);
}
</style>
