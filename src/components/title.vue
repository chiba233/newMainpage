<template>
  <div class="dashboardTitle">
    <n-avatar round class="titleIcon" bordered :src="icon"></n-avatar>
    <n-gradient-text
        class="titleText"
        :gradient="{
        deg: 180,
        from: 'rgb(185,183,183)',
        to: 'rgb(77,77,77)',
      }"
    ><a v-if="zh">{{ titleMessage.titleZH }}</a>
      <a v-if="en">{{ titleMessage.titleEN }}</a>
    </n-gradient-text>
    <div class="a"></div>
  </div>
</template>

<script setup lang="ts">
import {NAvatar, NGradientText} from "naive-ui";
import icon from "../icons/icon.jpg";
import titleMessage from "../message/titleMessage.json"
import {zh, en} from "@/assets/decideLang"


</script>

<style lang="scss">
.dashboardTitle {
  display: flex;
  margin-bottom: 1em;
  @media (min-width: 420px) {
    margin-top: 2em;
    flex-direction: row;
    justify-content: center;
  }
  @media (max-width: 420px) {
    margin-top: 1.5em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .titleText {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    @media (min-width: 420px) {
      font-size: 2em;
      margin-left: 1.5em;
    }
    @media (max-width: 420px) {
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
    @media (min-width: 420px) {
      width: 6em;
      height: 6em;
    }

  }
}
</style>
