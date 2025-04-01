<script setup lang="tsx">
import { useHistoryStore } from '@/renderer/store/history'
const historyStore = useHistoryStore()
</script>
<template>
  <v-container>
    <v-btn-group variant="outlined" divided>
      <v-btn icon="mdi-delete" @click="historyStore.resetState()"></v-btn>
      <v-btn icon="mdi-download" @click="historyStore.downloadHistory()"></v-btn>
    </v-btn-group>
  </v-container>
</template>
