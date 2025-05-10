import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useMcpStore, FunctionType } from '@/renderer/store/mcp'

export interface AgentConfig {
  selectedNode: any[]
  name: string
  prompt: string
}

export const AGENTS_DEFAULTS = {
  selectedNode: [],
  name: 'Agent Default',
  prompt: ''
}

export interface AgentStoreState {
  agents: AgentConfig[]
  selected: number | null
  revised: number[]
}

export const useAgentStore = defineStore('agentStore', {
  state: (): AgentStoreState => ({
    agents: [{ ...AGENTS_DEFAULTS }],
    revised: [0],
    selected: null
  }),
  persist: {
    exclude: ['revised']
  },
  getters: {
    getRevised(state) {
      const agent = state.revised[0]
      if (Number.isInteger(agent)) {
        const revised: AgentConfig = state.agents[agent]
        return revised
      } else {
        return null
      }
    },
    getUnrevised(state) {
      const selectedIndex = Number.isInteger(state.revised[0]) ? state.revised[0] : -1
      return state.agents.filter((_agent, index) => index !== selectedIndex)
    }
  },
  actions: {
    resetState() {
      this.$reset()
    },
    addAgent() {
      this.agents.push({ ...AGENTS_DEFAULTS, name: `Agent ${uuidv4()}` })
    },
    genId(server: string, name: string) {
      return JSON.stringify({
        server,
        name
      })
    },
    getId(id: string) {
      return JSON.parse(id)
    },
    getColor(id: string) {
      const str = JSON.parse(id).server
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }

      const r = hash & 0xff
      const g = (hash >> 8) & 0xff
      const b = (hash >> 16) & 0xff

      const color = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`
      console.log(color)
      return color
    },
    getAbbr(input: string) {
      const words = input.split(/(?=[A-Z])|[\s-_]+/)
      const abbreviation = words.map((word) => word.charAt(0).toUpperCase()).join('')
      return abbreviation.slice(0, 2)
    },
    getPrompt: function () {
      if (Number.isInteger(this.selected)) {
        return this.agents[this.selected as number].prompt
      } else {
        return ''
      }
    },
    getTools: async function () {
      const mcpStore = useMcpStore()
      if (Number.isInteger(this.selected)) {
        const selectedTools = this.agents[this.selected as number].selectedNode
        if (selectedTools.length === 0) {
          return []
        } else {
          const parsedToolServers: string[] = []

          const parsedToolNames = selectedTools.map((serverName) => {
            try {
              const parsed = JSON.parse(serverName)
              if (parsed.server !== undefined) {
                if (!parsedToolServers.includes(parsed.server)) {
                  parsedToolServers.push(parsed.server)
                }
              }
              // const result = parsed?.();
              // return result?.catch(() => null) ?? null;
              return parsed.name
            } catch (_error) {
              return null
            }
          })

          const listedTools = await mcpStore.listServerTools(parsedToolServers)

          const filteredTools = listedTools.filter((tool: FunctionType) =>
            parsedToolNames.includes(tool.function.name)
          )

          return filteredTools
        }
      } else {
        return mcpStore.listTools()
      }
    }
  }
})
