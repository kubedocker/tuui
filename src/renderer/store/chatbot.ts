import { defineStore } from 'pinia'
import { ChatbotConfig, CHATBOT_DEFAULTS } from '@/renderer/types'

export interface ChatbotStoreState {
  chatbots: ChatbotConfig[]
  currentChatbotId: number // array index
}

export const useChatbotStore = defineStore('chatbotStore', {
  state: (): ChatbotStoreState => ({
    chatbots: [
      { ...CHATBOT_DEFAULTS, name: 'Default 1' },
      { ...CHATBOT_DEFAULTS, name: 'Default 2' }
    ],
    currentChatbotId: 0 // points to first chatbot by default
  }),

  persist: {
    exclude: ['currentChatbotId']
  },

  actions: {
    resetState() {
      this.$reset()
    },
    // addChatbot(config?: Partial<ChatbotConfig>) {
    //   if (!config?.name) {
    //     config = {
    //       ...config,
    //       name: `Chatbot ${this.chatbots.length + 1}`
    //     }
    //   }

    //   const newChatbot: ChatbotConfig = {
    //     ...CHATBOT_DEFAULTS,
    //     ...config
    //   }

    //   this.chatbots.push(newChatbot)
    //   this.currentChatbotId = this.chatbots.length - 1
    // },

    updateChatbotConfig(index: number, patch: Partial<ChatbotConfig>) {
      if (index < 0 || index >= this.chatbots.length) {
        console.log('No chatbot found at index', index)
        return
      }
      Object.assign(this.chatbots[index], patch)
    },

    removeChatbot(index: number) {
      this.chatbots.splice(index, 1)
      // Adjust current index if needed
      if (this.currentChatbotId >= index) {
        this.currentChatbotId = Math.max(0, this.currentChatbotId - 1)
      }
    },

    updateStoreFromJSON(json: ChatbotStoreState) {
      this.$reset()
      this.chatbots = []
      if (json.chatbots) {
        json.chatbots.forEach((newChatbot, index) => {
          this.chatbots.push({ ...CHATBOT_DEFAULTS, ...newChatbot })
        })
      }
      // this.$state = json
    },

    // Helper method to find chatbot by name
    findChatbotIndexByName(name: string): number {
      return this.chatbots.findIndex((chatbot) => chatbot.name === name)
    },

    // Action to set current chatbot by name
    setCurrentChatbotByName(name: string) {
      const index = this.findChatbotIndexByName(name)
      if (index !== -1) {
        this.currentChatbotId = index
      }
    }
  },

  getters: {
    currentConfig(state): ChatbotConfig | null {
      if (state.currentChatbotId < 0 || state.currentChatbotId >= state.chatbots.length) {
        return null
      }
      return state.chatbots[state.currentChatbotId]
    },

    getChatbotByName: (state) => {
      return (name: string) => state.chatbots.find((chatbot) => chatbot.name === name)
    },

    getChatbotByIndex: (state) => {
      return (index: number) => state.chatbots[index]
    },

    // Get all chatbot names
    chatbotNames(state): string[] {
      return state.chatbots.map((chatbot) => chatbot.name)
    }
  }
})
