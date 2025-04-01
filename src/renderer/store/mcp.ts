import { defineStore } from 'pinia'

export const useMcpStore = defineStore('mcpStore', {
  // TODO: fix any to type
  state: (): any => ({
    serverTools: [],
    loading: true,
    selected: [''],
    selectedChips: {} // { key : 0 | 1 | 2}
  }),

  getters: {
    getSelected(state) {
      const mcpServers = this.getServers
      const server = state.selected[0]
      if (server) {
        const selectedIndex = state.selectedChips[server] || 0
        const selectedPrimitive = {
          server,
          primitive: Object.keys(mcpServers[server])[selectedIndex],
          methods: Object.values(mcpServers[server])[selectedIndex]
        }
        console.log(selectedPrimitive)
        return selectedPrimitive
      } else {
        return { server: undefined, primitive: undefined, methods: undefined }
      }
    },
    getServers: () => {
      // console.log('MCP:', window.mcpServers)
      return window.mcpServers
    }
  },

  actions: {
    getServerFunction: function (primitiveName: string, methodName: string) {
      const selected = this.getSelected
      if (selected && selected.primitive === primitiveName) {
        const fun = selected.methods[methodName]
        return fun
      }
      return null
    },

    loadServerTools: function () {
      this.loading = true
      try {
        this.listServerTools().then((tools) => {
          this.serverTools = tools.map((tool) => {
            return {
              name: tool.function.name,
              description: tool.function.description
            }
          })
        })
      } catch (error) {
        console.error('Failed to load tools:', error)
      } finally {
        this.loading = false
      }
    },

    listServerTools: async function () {
      const mcpTools: any = []
      const fun = this.getServerFunction('tools', 'list')
      if (typeof fun === 'function') {
        const tools = await fun()
        if (tools && Array.isArray(tools.tools)) {
          for (const tool of tools.tools) {
            const unit = {
              type: 'function',
              function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.inputSchema
                // strict: true
              }
            }
            console.log(unit)
            mcpTools.push(unit)
          }
        }
      }
      return mcpTools
    },

    listTools: async function () {
      const mcpServers = this.getServers
      if (!mcpServers) {
        return null
      }
      const mcpKeys = Object.keys(mcpServers)
      // TODO: fix any to type
      const mcpTools: any = []
      for (const key of mcpKeys) {
        const toolsListFunction = mcpServers[key]?.tools?.list
        if (typeof toolsListFunction === 'function') {
          const tools = await toolsListFunction()
          // console.log(await mcpServers[key]?.prompts?.list())
          // console.log(await mcpServers[key]?.resources['templates/list']())
          // console.log(await mcpServers[key]?.resources?.list())
          if (tools && Array.isArray(tools.tools)) {
            for (const tool of tools.tools) {
              mcpTools.push({
                type: 'function',
                function: {
                  name: tool.name,
                  description: tool.description,
                  parameters: tool.inputSchema
                  // strict: true
                }
              })
            }
          }
        }
      }
      return mcpTools
    },
    getTool: async function (toolName) {
      const mcpServers = this.getServers
      const mcpKeys = Object.keys(mcpServers)
      const result = await Promise.any(
        mcpKeys.map(async (key) => {
          const toolsListFunction = mcpServers[key]?.tools?.list
          if (typeof toolsListFunction === 'function') {
            const tools = await toolsListFunction()
            if (tools && Array.isArray(tools.tools)) {
              const foundTool = tools.tools.find((tool) => tool.name === toolName)
              if (foundTool) {
                return {
                  server: key,
                  tool: foundTool
                }
              }
            }
          }
          throw new Error(`Tool ${toolName} not found on server ${key}`)
        })
      )

      return result
    },
    callTool: async function (toolName, toolArgs) {
      const tool = await this.getTool(toolName)
      if (!tool) {
        return this.packReturn(`Tool name '${toolName}' not found`)
      }

      let toolArguments

      try {
        toolArguments = JSON.parse(toolArgs)
      } catch (e) {
        return this.packReturn(`Arguments JSON parse error: '${e}'`)
      }

      const params = {
        name: toolName,
        arguments: toolArguments
      }

      const result = await this.getServers[tool.server].tools.call(params)
      return result
    },
    convertItem: function (item) {
      if (item.type === 'text') {
        return item
      } else if (item.type === 'image') {
        const imageUrl = `data:${item.mimeType};base64,${item.data}`
        return {
          type: 'image_url',
          image_url: { url: imageUrl }
        }
      }
    },
    packReturn: (string) => {
      return {
        content: [
          {
            type: 'text',
            text: string
          }
        ]
      }
    }
  }
})
