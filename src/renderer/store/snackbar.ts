import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbarStore', {
  state: () => ({
    isShow: false,
    message: '',
    type: ''
  }),

  actions: {
    showMessage(message, type = '') {
      this.isShow = true
      this.message = message
      this.type = type
    },

    showErrorMessage(message) {
      this.showMessage(message, 'error')
    },
    showSuccessMessage(message) {
      this.showMessage(message, 'success')
    },
    showInfoMessage(message) {
      this.showMessage(message, 'info')
    },
    showWarningMessage(message) {
      this.showMessage(message, 'warning')
    },
    getIcon() {
      const icon = {
        info: 'mdi-information',
        success: 'mdi-check-circle',
        error: 'mdi-alert-circle',
        warning: 'mdi-alert'
      }

      return icon[this.type]
    }
  }
})
