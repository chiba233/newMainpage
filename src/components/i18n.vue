<template>
  <n-popselect v-model:value="lang" :options="i18nLang" trigger="click" >
    <n-button round color="#d3a579" class="button">
      <template #icon>
        <n-icon>
          <LangIcon/>
        </n-icon>
      </template>
      {{ i18nLang.find(it => it.value === lang)?.label }}
    </n-button>
  </n-popselect>
</template>

<script setup lang="ts">
import LangIcon from '../icons/langIcon.svg'
import {NButton, NIcon, NPopselect} from "naive-ui"
import i18nLang from "../message/i18nLang.json"
import lang from "@/components/ts/useStoage";

function click() {
  location.reload();
}

</script>

<style lang="scss">
.button {
  margin: 1em;
}
</style>