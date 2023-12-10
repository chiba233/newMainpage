<template>
  <div class="i18">
    <I18n></I18n>
  </div>
  <div class="fromTime">
    <from-now-time></from-now-time>
  </div>

  <div class="content">
    <Title></Title>
    <div class="detailsDIV">
      <Details></Details>
    </div>
    <div class="contactsDIV">
      <Contacts></Contacts>
    </div>
    <MyFriends></MyFriends>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/title.vue";
import Details from "@/components/detail.vue";
import I18n from "@/components/i18n.vue";
import Contacts from "@/components/contacts.vue";
import MyFriends from "@/components/myFriends.vue";
import FromNowTime from "@/components/fromNowTime.vue";
import colorData from "@/message/colorData.json"
import {themeColor} from "@/components/ts/useStoage";


let randomTheme: number = Math.floor(Math.random() * 4);
if (randomTheme === 0) {
  document.body.style.backgroundImage = "url(background.jpg)"
  document.body.style.backgroundColor = colorData.background0
  themeColor.value = colorData.background0
}
if (randomTheme === 1) {
  document.body.style.backgroundImage = "url(background1.jpg)"
  themeColor.value = colorData.background1
  document.body.style.backgroundColor = colorData.background1
}
if (randomTheme === 2) {
  document.body.style.backgroundImage = "url(background2.jpg)"
  document.body.style.backgroundColor = colorData.background2
  themeColor.value = colorData.background2
}
if (randomTheme === 3) {
  document.body.style.backgroundImage = "url(background3.jpg)"
  themeColor.value = colorData.background3
  document.body.style.backgroundColor = colorData.background3
}

</script>

<style lang="scss">
.content {
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;


  .detailsDIV {
    width: 100%;
    display: flex;
    justify-content: center;
    @media (min-width: 730px){
      margin-top: 1em;
    }
  }
}

.fromTime {
  display: flex;
  justify-content: start;
  position: absolute;
}

.i18 {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
}

.contactsDIV {
  @media (min-width: 730px) {
    margin: 0.95em;
  }
}
</style>
