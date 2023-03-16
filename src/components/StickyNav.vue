<script setup>
const emit = defineEmits(['update:modelValue', 'add'])
defineProps({ modelValue: String })

function update(event) {
  emit('update:modelValue', event.target.value)
}

function add() {
  emit('add')
}
</script>

<template>
  <nav>
    <ul>
      <li>
        <img class="logo" src="../assets/my_unsplash_logo.svg" alt="logo" />
      </li>
      <li>
        <input
          type="search"
          placeholder="Search by name"
          :value="modelValue"
          @input="update"
        />
      </li>
    </ul>
    <ul>
      <li>
        <button role="button" class="contrast" @click="add">Add a Photo</button>
      </li>
    </ul>
  </nav>
</template>

<style>
nav {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
}
.logo {
  height: 2em;
}
</style>
