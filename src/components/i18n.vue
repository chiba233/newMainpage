<template>
  <n-popselect v-model:value="lang" :options="i18nLang" trigger="click">
    <n-button round color="#d3a579">
      <template #icon>
        <n-icon>
          <LangIcon />
        </n-icon>
      </template>
      {{i18nLang.find(it=>it.value===lang).label}}
    </n-button>
  </n-popselect>
</template>

<script setup lang="ts">
import LangIcon from '../icons/langIcon.svg'
import {NButton, NIcon, NPopselect} from "naive-ui"
import {useStorage} from '@vueuse/core'
import i18nLang from "../message/i18nLang.json"
import {ref} from "vue";

const lang = useStorage("useLang", "zh")
console.log(lang.value)
console.log(i18nLang[0])
</script>

<style lang="scss">
.langIcon {
}
</style>