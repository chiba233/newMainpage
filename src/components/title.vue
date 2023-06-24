<template>
  <div class="dashboardTitle">
    <n-avatar round class="titleIcon" bordered :src="icon"></n-avatar>
    <a class="titleText">
      <a v-if="lang==='zh'">{{ titleMessage.titleZH }}</a>
      <a v-if="lang==='en'">{{ titleMessage.titleEN }}</a>
      <a v-if="lang==='other'">{{ titleMessage.titleOther }}</a>
    </a>
    <div class="a"></div>
  </div>
</template>

<script setup lang="ts">
import {NAvatar} from "naive-ui";
import icon from "../icons/icon.jpg";
import titleMessage from "../message/titleMessage.json"
import {lang} from "@/components/ts/useStoage";

</script>

<style lang="scss">
.dashboardTitle {
  display: flex;
  margin-bottom: 1em;
  @media (min-width: 730px) {
    margin-top: 2em;
    flex-direction: row;
    justify-content: center;
  }
  @media (max-width: 730px) {
    margin-top: 1.5em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .titleText {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    color: white;
    @media (min-width: 730px) {
      font-size: 2em;
      margin-left: 1.5em;
    }
    @media (max-width: 730px) {
      padding-top: 0.5em;
      font-size: 1.7em;
    }
  }

  .titleIcon {
    display: flex;
    width: 6em;
    height: 6em;
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
