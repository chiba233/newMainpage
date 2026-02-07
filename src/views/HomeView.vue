<template>
  <div style="overflow: hidden">
  <div class="viewport">
    <div class="overlay">
      <div class="i18">
        <I18n></I18n>
      </div>
      <div class="fromTime">
        <from-now-time></from-now-time>
      </div>
    </div>
    <div class="main">
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
  </div>
  <div class="copyright">
    <a class="copyrightText">2026 ニャーニャ！ザコザコ！</a>
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


const randomTheme = Math.floor(Math.random() * 7);
const colorKey = `background${randomTheme}` as keyof typeof colorData;
const selectedColor = colorData[colorKey];

// 动态设置样式
document.body.style.backgroundImage = `url(background${randomTheme === 0 ? '' : randomTheme}.webp)`;
document.body.style.backgroundColor = selectedColor;
themeColor.value = selectedColor;



</script>

<style lang="scss">

.viewport{
  display: flex;
  flex-direction: column;
  overflow-y: auto;      // ✅ 唯一滚动区
  position: relative;
  -webkit-overflow-scrolling: touch; /* 优化移动端滚动 */
  .overlay{
    animation: YToolIn 0.5s linear 0s 1;
    .fromTime {
      display: flex;
      justify-content: start;
      position: absolute;
      pointer-events: auto;

    }
    .i18 {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      position: absolute;
      pointer-events: auto;
    }
  }
  .main{
    height: 96vh;
    justify-content: center;
    align-content: center;
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      animation: YMainIn 0.5s linear 0s 1;

      .contactsDIV {
        @media (min-width: 730px) {
          margin: 0.95em;
        }
      }
      .detailsDIV {
        width: 100%;
        display: flex;
        justify-content: center;
        @media (min-width: 730px) {
          margin-top: 1em;
        }
      }
    }
  }
}

.copyright{
  justify-content: center;
  text-align: center;
  align-content: center;
  width: 100%;
  animation: YToolIn 0.5s linear 0s 1;
  height: 3.5vh;
  position: fixed;
  .copyrightText{
    font-weight: lighter;
    font-size: 1.1em;
    color: aliceblue;
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
