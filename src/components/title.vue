<template>
  <div class="dashboardTitle">
    <n-avatar round class="titleIcon" bordered :src="icon"></n-avatar>
    <n-gradient-text
        class="titleText"
        :gradient="{
        deg: 180,
        from: 'rgb(104,104,104)',
        to: 'rgb(248,247,247)',
      }"
    ><a v-if="zh">{{ titleMessage.titleZH }}</a>
      <a v-if="en">{{ titleMessage.titleEN }}</a>
    </n-gradient-text>
  </div>
</template>

<script setup lang="ts">
import {NAvatar, NGradientText} from "naive-ui";
import icon from "../icons/icon.jpg";
import lang from "@/assets/useStoage";
import titleMessage from "../message/titleMessage.json"

let zh: boolean = false
let en: boolean = false
console.log(lang.value)
if (lang.value == "zh") {
  zh = true
}
if (lang.value == "en") {
  en = true

}

</script>

<style lang="scss">
.dashboardTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 1em;

  .titleText {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    font-size: 2em;
  }

  .titleIcon {
    width: 80px;
    height: 80px;
    margin-right: 2em;
  }
}
</style>
