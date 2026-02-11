<template>
  <n-popselect v-model:value="lang" :options="i18nLang" trigger="click">
    <n-button round :color="themeColor" class="buttonI18">
      <template #icon>
        <n-icon size="20">
          <LangIcon />
        </n-icon>
      </template>
      <a> {{ i18nLang.find((it: LangItem) => it.value === lang)?.label }}</a>
    </n-button>
  </n-popselect>
</template>

<script setup lang="ts">
import LangIcon from "../icons/langIcon.svg";
import { NButton, NIcon, NPopselect } from "naive-ui";
import i18nLang from "../message/i18nLang.json";
import { lang, themeColor } from "@/components/ts/useStoage";
import { watchEffect } from "vue";
import webTitle from "../message/webTitle.json";

const newWebTitle: Record<string, string> = webTitle;

type LangItem = {
  label: string;
  value: string;
};

watchEffect(() => {
  document.documentElement.lang = lang.value;
  // 2. 修改网页标题（同样使用 fallback 逻辑）
  document.title = newWebTitle[lang.value] || "Strawberry Pages";
});
</script>

<style lang="scss">
.buttonI18 {
  margin-right: 1em;
  height: 2.2em;
  border: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: auto;
  @media (max-width: 390px) {
    .n-icon {
      margin-left: 6px;
    }
  }

  a {
    color: #191919;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    @media (max-width: 390px) {
      display: none;
    }
  }
}
</style>
