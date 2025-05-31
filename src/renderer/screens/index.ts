import ErrorScreen from '@/renderer/screens/ErrorScreen.vue'
// import MainScreen from '@/renderer/screens/MainScreen.vue'

import McpCentralStage from '@/renderer/screens/mcp/McpCentralStage.vue'
import McpSideDrawer from '@/renderer/screens/mcp/McpSideDrawer.vue'
import McpSideDock from '@/renderer/screens/mcp/McpSideDock.vue'

import ChatMainScreen from '@/renderer/screens/chat/ChatScreen.vue'
import ChatHistoryScreen from '@/renderer/screens/chat/ChatHistoryScreen.vue'
import ChatInputScreen from '@/renderer/screens/chat/ChatInputScreen.vue'
import ChatEndScreen from '@/renderer/screens/chat/ChatEndScreen.vue'

import AgentCentralStage from '@/renderer/screens/agent/AgentCentralStage.vue'
import AgentSideDock from '@/renderer/screens/agent/AgentSideDock.vue'
import AgentSideDrawer from '@/renderer/screens/agent/AgentSideDrawer.vue'

import SettingMainScreen from '@/renderer/screens/setting/SettingScreen.vue'
import SettingDrawerScreen from '@/renderer/screens/setting/SettingMenuScreen.vue'
import SettingConfigScreen from '@/renderer/screens/setting/SettingEndScreen.vue'

export type ComponentName = 'centralStage' | 'sideDrawer' | 'sideDock' | 'bottomConsole'

type ScreenType = {
  [key in ComponentName as `${key}`]?: any
}

export { ErrorScreen }

export const McpScreen: ScreenType = {
  centralStage: McpCentralStage,
  sideDrawer: McpSideDrawer,
  sideDock: McpSideDock
}

export const ChatScreen: ScreenType = {
  centralStage: ChatMainScreen,
  sideDrawer: ChatHistoryScreen,
  sideDock: ChatEndScreen,
  bottomConsole: ChatInputScreen
}

export const AgentScreen: ScreenType = {
  centralStage: AgentCentralStage,
  sideDrawer: AgentSideDrawer,
  sideDock: AgentSideDock
}

export const SettingScreen: ScreenType = {
  centralStage: SettingMainScreen,
  sideDrawer: SettingDrawerScreen,
  sideDock: SettingConfigScreen
}
