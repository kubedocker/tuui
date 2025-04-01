<script setup lang="tsx">
import { defineProps } from 'vue'

defineProps<{
  src: string
}>()
</script>

<template>
  <v-dialog>
    <template #activator="{ props: activatorProps }">
      <div>
        <v-img
          class="history-images mb-3"
          contain
          position="left"
          min-width="80px"
          min-height="80px"
          width="100%"
          height="100%"
          max-width="30vw"
          max-height="30vh"
          v-bind="activatorProps"
          :src="src"
        ></v-img>
      </div>
    </template>
    <template #default="{ isActive }">
      <v-img
        :src="src"
        contain
        width="80vw"
        height="80vh"
        max-width="100%"
        max-height="100%"
        @click="isActive.value = false"
      ></v-img>
    </template>
  </v-dialog>
</template>

<style scoped>
.history-images {
  &:hover {
    cursor: zoom-in;
  }
}
</style>
