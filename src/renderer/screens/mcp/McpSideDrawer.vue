<script setup lang="ts">
import { useMcpStore } from '@/renderer/store/mcp'
const mcpStore = useMcpStore()
</script>

<template>
  <v-list v-model:selected="mcpStore.selected" nav mandatory>
    <v-list-item
      v-for="(item, key) in mcpStore.getServers"
      :key="key"
      two-line
      :value="key"
      link
      :ripple="false"
      :title="key"
    >
      <v-chip-group
        v-model="mcpStore.selectedChips[key]"
        :direction="mcpStore.selected[0] === key ? 'vertical' : undefined"
        selected-class="text-primary"
        mandatory
      >
        <v-chip
          v-for="(_primitive, name) in item"
          :key="`${key}-${name}`"
          class="mr-1 my-1"
          label
          color="primary"
          size="small"
          @click="console.log(key, name)"
        >
          {{ name }}
        </v-chip>
      </v-chip-group>
    </v-list-item>
  </v-list>
</template>

<style></style>
