export default class Utils {
  static getCurrentLocale(): string {
    return navigator?.language?.split('-')[0] || 'en'
  }

  static async getApiToken(cli: string): Promise<any> {
    return window.mainApi.invoke('msgGetApiToken', cli)
  }

  static async listenStdioProgress(progress: any): Promise<any> {
    return window.mainApi.on('renderListenStdioProgress', progress)
  }

  static async removeListenStdioProgress(progress: any): Promise<any> {
    return window.mainApi.removeListener('renderListenStdioProgress', progress)
  }

  static async openExternal(url: string): Promise<void> {
    await window.mainApi.send('msgOpenExternalLink', url)
  }

  static async openFile(type: string): Promise<any> {
    return window.mainApi.invoke('msgOpenFile', type)
  }
}

export const {
  getCurrentLocale,
  openExternal,
  openFile,
  getApiToken,
  listenStdioProgress,
  removeListenStdioProgress
} = Utils
