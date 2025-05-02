<script setup lang="ts">
import { useAgentStore } from '@/renderer/store/agent'
const agentStore = useAgentStore()

function handleDelete(index, event) {
  event.stopPropagation()
  agentStore.agents.splice(index, 1)
}
</script>

<template>
  <v-list v-model:selected="agentStore.revised" nav mandatory>
    <v-list-item
      v-for="(item, index) in agentStore.agents"
      :key="index"
      slim
      :value="index"
      link
      :ripple="false"
      @click="console.log(agentStore.getRevised?.selectedNode)"
    >
      <template #prepend>
        <v-badge
          class="mr-n3"
          color="primary"
          :content="item.selectedNode.length"
          inline
          :max="99"
        ></v-badge>
      </template>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
      <template #append>
        <v-list-item-action>
          <v-icon-btn
            icon="mdi-delete"
            rounded="lg"
            size="small"
            @click="handleDelete(index, $event)"
          >
          </v-icon-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<style></style>
