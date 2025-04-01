<script setup lang="tsx">
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/renderer/store/locale'
import { onMounted, ref } from 'vue'
import 'iconify-icon'

const { locale, availableLocales } = useI18n()
const localeStore = useLocaleStore()

const languages = ref(['en'])

onMounted((): void => {
  console.log(locale)
  languages.value = availableLocales
})

const handleChangeLanguage = (val): void => {
  locale.value = val
}
</script>
<template>
  <v-badge location="top left" :offset-y="7" :offset-x="4" class="click-through-badge">
    <template #badge>
      <iconify-icon :icon="localeStore.getIcon2()"></iconify-icon>
    </template>
    <v-menu transition="fade-transition">
      <template #activator="{ props }">
        <v-btn v-tooltip:end="$t('locale.title')" icon="mdi-translate" v-bind="props" size="small">
        </v-btn>
      </template>
      <v-list class="mb-2">
        <v-list-item
          v-for="n in localeStore.list"
          :key="n.value"
          density="compact"
          @click="handleChangeLanguage(n.value)"
        >
          <template #prepend>
            <iconify-icon class="mr-3" :icon="localeStore.getIcon(n.name)"></iconify-icon>
          </template>
          <v-list-item-title>{{ n.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-badge>
</template>

<style>
.click-through-badge .v-badge__badge {
  background: transparent !important;
  pointer-events: none;
}
</style>
