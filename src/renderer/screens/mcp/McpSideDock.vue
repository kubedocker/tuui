<script setup lang="ts">
// import { getCurrentInstance  } from 'vue'
import { initAllMcpServers } from '@/renderer/utils'
import { useMcpStore } from '@/renderer/store/mcp'

const mcpStore = useMcpStore()

async function activeAllMcpServers() {
  const configs = mcpStore.getServers
  await initAllMcpServers(configs)
  await mcpStore.updateServers()
  location.reload()
}
</script>

<template>
  <v-container>
    <v-btn block @click="activeAllMcpServers()">
      {{ $t('mcp.init') }}
    </v-btn>
  </v-container>
</template>

<style scoped></style>
