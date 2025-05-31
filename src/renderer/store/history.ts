import { defineStore } from 'pinia'
import localForage from 'localforage'
import { v4 as uuidv4 } from 'uuid'
import { useMessageStore } from '@/renderer/store/message'

type MessageEntry = {
  role: string
  content: any
  reasoning_content?: string
  [key: string]: any
}

interface ConversationEntry {
  id: string
  messages: MessageEntry[]
}

export const useHistoryStore = defineStore('historyStore', {
  state: () => ({
    conversation: [] as ConversationEntry[]
  }),
  persist: {
    storage: localForage
  },
  getters: {
    getDate: () => {
      const date = new Date().toLocaleString('zh', { timeZoneName: 'short', hour12: false })
      return `${date} ${uuidv4()}`
    }
  },
  actions: {
    resetState() {
      this.$reset()
    },
    deleteById(index) {
      this.conversation.splice(index, 1)
    },
    init(conversation) {
      this.conversation.unshift({
        id: this.getDate,
        messages: conversation
      })
    },
    replace(id) {
      this.deleteById(id)
      const messageStore = useMessageStore()
      this.init(messageStore.conversation)
    },
    select(id) {
      const messageStore = useMessageStore()
      //   settingStore.configHistory = false
      messageStore.conversation = this.conversation[id].messages
      // this.replace(id)
    },
    getColor(id) {
      const targetElement = this.conversation[id]?.messages.find(
        (element) => element.role === 'assistant'
      )
      if (targetElement) {
        return 'primary'
      } else {
        return 'grey'
      }
    },
    downloadById(id) {
      const name = this.conversation[id].id.replace(/[/: ]/g, '-')
      this.download(this.conversation[id].messages, `history-${name}.json`)
    },
    downloadHistory() {
      this.download(this.conversation, 'history.json')
    },
    download(json, filename) {
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    }
  }
})
