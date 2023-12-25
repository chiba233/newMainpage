<template>
  <div class="toolAnimation">
    <div class="i18">
      <I18n></I18n>
    </div>
    <div class="fromTime">
      <from-now-time></from-now-time>
    </div>
  </div>
  <div class="mainAnimation">
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


let randomTheme: number = Math.floor(Math.random() * 5);
if (randomTheme === 0) {
  document.body.style.backgroundImage = "url(background.webp)"
  document.body.style.backgroundColor = colorData.background0
  themeColor.value = colorData.background0
}
if (randomTheme === 1) {
  document.body.style.backgroundImage = "url(background1.webp)"
  themeColor.value = colorData.background1
  document.body.style.backgroundColor = colorData.background1
}
if (randomTheme === 2) {
  document.body.style.backgroundImage = "url(background2.webp)"
  document.body.style.backgroundColor = colorData.background2
  themeColor.value = colorData.background2
}
if (randomTheme === 3) {
  document.body.style.backgroundImage = "url(background3.webp)"
  themeColor.value = colorData.background3
  document.body.style.backgroundColor = colorData.background3
}
if (randomTheme === 4) {
  document.body.style.backgroundImage = "url(background4.webp)"
  themeColor.value = colorData.background4
  document.body.style.backgroundColor = colorData.background4
}

</script>

<style lang="scss">
.toolAnimation {
  animation: YToolIn 0.5s linear 0s 1;
}

.mainAnimation {
  animation: YMainIn 0.5s linear 0s 1;
}

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
    @media (min-width: 730px) {
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

@keyframes YToolIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes YMainIn {
  from {
    transform: translateY(3em);
  }

  to {
    transform: none;
  }

}

</style>
