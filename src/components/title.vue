<template>
  <div class="dashboardTitle">
    <n-avatar round class="titleIcon" bordered :src="icon"></n-avatar>
    <n-gradient-text
        class="titleText"
        :gradient="{
        deg: 180,
        from: 'rgb(144,144,144)',
        to: 'rgb(49,49,49)',
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
  margin-top: 2em;
  margin-bottom: 1em;
  @media (max-width: 420px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 420px) {
    flex-direction: row;
  }


  .titleText {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    @media (min-width: 420px) {
      font-size: 2em;
    }
    @media (max-width: 420px){
      padding-top: 1em;
      font-size: 1.5em;

    }
  }

  .titleIcon {
    display: flex;
    width: 80px;
    height: 80px;
    @media (min-width: 420px) {
      margin-right: 2em;
    }
  }
}
</style>
