<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import Button from 'primevue/button'
import TreeSelect from 'primevue/treeselect';
</script>

<template>
  <Button label="Submit"></Button>
  <TreeSelect v-model="selectedValue" :options="nodes" placeholder="Select Item" class="md:w-80 w-full" />
</template>
