<template>
  <n-popselect v-model:value="lang" :options="i18nLang" trigger="click">
    <n-button round :color="themeColor" class="buttonI18">
      <template #icon>
        <n-icon size="20">
          <LangIcon/>
        </n-icon>
      </template>
      <a> {{ i18nLang.find((it :LangItem ) => it.value === lang)?.label }}</a>
    </n-button>
  </n-popselect>
</template>

<script setup lang="ts">
import LangIcon from '../icons/langIcon.svg'
import {NButton, NIcon, NPopselect} from "naive-ui"
import i18nLang from "../message/i18nLang.json"
import {lang} from "@/components/ts/useStoage";
import {themeColor} from "@/components/ts/useStoage";
import {watch} from "vue";
import webTitle from "../message/webTitle.json"

const newWebTitle: Record<string, string> = webTitle;

type LangItem = {
  label: string
  value: string
}

watch(lang, (val: string) => {
  document.documentElement.lang = val;
  document.title = newWebTitle[val] || 'Strawberry Pages';
}, { immediate: true });

</script>

<style lang="scss">
.buttonI18 {
  margin-right: 1em;
  height: 2.2em;
  @media (max-width: 390px) {
    .n-icon {
      margin-left: 6px;
    }
  }

  a {
    color: #343131;
    @media (max-width: 390px) {
      display: none;
    }
  }

}
</style>