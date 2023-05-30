<template>
  <n-button strong secondary circle>
    <n-icon>
      <LangIcon/>
    </n-icon>
  </n-button>
</template>

<script setup lang="ts">
import LangIcon from '../icons/langIcon.svg'
import {NButton, NIcon, NPopselect} from "naive-ui"
import {useStorage} from '@vueuse/core'
import {ref} from "vue";

const lang = useStorage("useLang", "zh")
console.log(lang.value)
</script>

<style lang="scss">
.langIcon {
}
</style>