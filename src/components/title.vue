<template>
  <div class="dashboardTitle">
    <n-avatar round class="titleIcon" bordered :src="icon"></n-avatar>
    <a class="titleText">
      {{ displayTitle }}
    </a>
    <div class="a"></div>
  </div>
</template>

<script setup lang="ts">
import {NAvatar} from "naive-ui";
import icon from "../icons/icon.webp";
import titleMessage from "../message/titleMessage.json"
import {lang} from "@/components/ts/useStoage";
import {computed} from "vue";

const displayTitle = computed(() => {
  const map: Record<string, string> = {
    zh: titleMessage.titleZH,
    en: titleMessage.titleEN,
    ja: titleMessage.titleJP,
    other: titleMessage.titleOther
  };
  // 也可以加一个 fallback，防止 lang 匹配不到时报错
  return map[lang.value] || titleMessage.titleOther;
});

</script>

<style lang="scss">
.dashboardTitle {
  display: flex;
  margin-bottom: 1em;
  margin-top: 4.8em;
  @media (min-width: 840px) {
    flex-direction: row;
    justify-content: center;
  }
  @media (max-width: 840px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 430px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .titleText {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    color: white;
    text-shadow: #383838 1px 0 0, #383838 0 1px 0, #383838 -1px 0 0, #383838 0 -1px 0;
    font-weight: lighter;
    @media (min-width: 730px) {
      font-size: 1.9em;
      margin-left: 1.5em;
    }
    @media (max-width: 730px) {
      padding-top: 0.5em;
      font-size: 1.7em;
    }
  }

  .titleIcon {
    @media (min-width: 380px) {
      display: flex;
      width: 6em;
      height: 6em;
    }
    @media (max-width: 380px) {
      display: flex;
      width: 4em;
      height: 4em;
    }

  }

  .a {
    display: none;
    @media (min-width: 730px) {
      width: 6em;
      height: 6em;
    }

  }
}
</style>
