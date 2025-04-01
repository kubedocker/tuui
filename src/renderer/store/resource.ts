import { defineStore } from 'pinia'
import { useMcpStore } from '@/renderer/store/mcp'

export const useResourceStore = defineStore('resourceStore', {
  state: () => ({
    resourceDialog: false,
    tab: null,

    resourceList: [],
    resourceTemplatesList: [],

    loadingTemplates: false,
    loadingResources: false
  }),
  actions: {
    loadTemplates: function () {
      this.loadingTemplates = true
      const mcpStore = useMcpStore()
      const resourceFunction = mcpStore.getServerFunction('resources', 'templates/list')
      try {
        resourceFunction().then((result) => {
          console.log(result)
          this.resourceTemplatesList = result.resourceTemplates
        })
      } catch (error) {
        console.error('Failed to load resource templates:', error)
      } finally {
        this.loadingTemplates = false
      }
    },
    loadResources: function () {
      this.loadingResources = true
      const mcpStore = useMcpStore()
      const resourceFunction = mcpStore.getServerFunction('resources', 'list')
      try {
        resourceFunction().then((result) => {
          console.log(result)
          this.resourceList = result.resources
        })
      } catch (error) {
        console.error('Failed to load resources:', error)
      } finally {
        this.loadingResources = false
      }
    }
  }
})
