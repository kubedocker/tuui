<script setup lang="tsx">
// import { computed } from 'vue'
import { ChatbotConfig } from '@/renderer/types'
import { useI18n } from 'vue-i18n'
import { useLayoutStore } from '@/renderer/store/layout'
import { v4 as uuidv4 } from 'uuid'

const layoutStore = useLayoutStore()
const { t } = useI18n()

interface Props {
  config: ChatbotConfig
}

interface Emits {
  (_e: 'update:config', _value: Partial<ChatbotConfig>): void
}

// const props =
defineProps<Props>()
const emit = defineEmits<Emits>()

const handleUpdate = <K extends keyof ChatbotConfig>(key: K, value: ChatbotConfig[K]) => {
  emit('update:config', { [key]: value } as Partial<ChatbotConfig>)
}

// defineExpose({
//   updateConfig: handleUpdate
// })

const validateNumberRange = (min: number, max: number) => {
  return (value: string | number | null): boolean | string => {
    if (!value && value !== 0) return true

    const num = Number(value)
    if (isNaN(num)) return t('validation.invalid-number')

    if (num < min || num > max) {
      return t('validation.number-range', { min, max })
    }

    return true
  }
}
</script>

<template>
  <v-card class="mx-auto" :title="$t('setting.title-api')">
    <v-divider></v-divider>
    <v-card-text class="pt-6">
      <v-text-field
        density="compact"
        variant="outlined"
        :model-value="config.name"
        class="px-2"
        :label="$t('setting.name')"
        @update:model-value="(v) => handleUpdate('name', v)"
        @blur="!config.name && handleUpdate('name', `Chatbot ${uuidv4()}`)"
      ></v-text-field>

      <!-- API Key -->
      <v-text-field
        density="compact"
        variant="outlined"
        :append-inner-icon="layoutStore.apiKeyShow ? 'mdi-eye-off' : 'mdi-eye'"
        :type="layoutStore.apiKeyShow ? 'text' : 'password'"
        :model-value="config.apiKey"
        class="px-2 mb-6"
        :label="$t('setting.apikey')"
        prepend-inner-icon="mdi-key"
        clearable
        hide-details
        @update:model-value="(v) => handleUpdate('apiKey', v)"
        @click:append-inner="layoutStore.apiKeyShow = !layoutStore.apiKeyShow"
      ></v-text-field>

      <v-row class="px-2 mr-2">
        <v-col>
          <v-combobox
            density="compact"
            :label="$t('setting.authPrefix')"
            :items="config.authPrefixList"
            :model-value="config.authPrefix"
            variant="outlined"
          >
          </v-combobox>
        </v-col>
        <v-checkbox :model-value="config.mcp" :label="$t('setting.mcp')" color="primary">
        </v-checkbox>
        <v-checkbox :model-value="config.stream" :label="$t('setting.stream')" color="primary">
        </v-checkbox>
      </v-row>

      <!-- URL -->
      <v-combobox
        density="compact"
        class="px-2"
        :label="$t('setting.url')"
        :items="config.urlList"
        :model-value="config.url"
        variant="outlined"
        @update:model-value="(v) => handleUpdate('url', v)"
      ></v-combobox>

      <!-- Path -->
      <v-combobox
        density="compact"
        class="px-2"
        :label="$t('setting.path')"
        :items="config.pathList"
        :model-value="config.path"
        variant="outlined"
        @update:model-value="(v) => handleUpdate('path', v)"
      ></v-combobox>

      <!-- Model -->
      <v-combobox
        density="compact"
        class="px-2"
        :label="$t('setting.model')"
        :items="config.modelList"
        :model-value="config.model"
        variant="outlined"
        @update:model-value="(v) => handleUpdate('model', v)"
      ></v-combobox>
    </v-card-text>
  </v-card>

  <v-card class="mx-auto mt-4" :title="$t('setting.title-model')">
    <v-divider></v-divider>
    <v-card-text class="pt-6">
      <v-row class="px-3 my-0">
        <v-combobox
          class="px-2"
          density="compact"
          :label="$t('setting.maxTokensPrefix')"
          :items="config.maxTokensTypeList"
          :model-value="config.maxTokensType"
          variant="outlined"
          @update:model-value="(v) => handleUpdate('maxTokensPrefix', v)"
        >
        </v-combobox>
        <v-combobox
          class="px-2"
          density="compact"
          label="MaxTokenValue"
          :model-value="config.maxTokensValue"
          type="number"
          single-line
          variant="outlined"
          @update:model-value="(v) => handleUpdate('maxTokensValue', v)"
        >
        </v-combobox>
      </v-row>
      <v-row class="px-3 my-0">
        <v-combobox
          class="px-2"
          density="compact"
          :label="$t('setting.temperature')"
          type="number"
          :model-value="config.temperature"
          variant="outlined"
          :rules="[validateNumberRange(0, 2)]"
          @update:model-value="(v) => handleUpdate('temperature', v)"
        >
        </v-combobox>
        <v-combobox
          class="px-2"
          density="compact"
          :label="$t('setting.topP')"
          :model-value="config.topP"
          type="number"
          variant="outlined"
          :rules="[validateNumberRange(0, 1)]"
          @update:model-value="(v) => handleUpdate('topP', v)"
        >
        </v-combobox>
      </v-row>
    </v-card-text>
  </v-card>
</template>
