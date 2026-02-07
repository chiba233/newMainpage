<template>
  <top-bar class="topBar"></top-bar>
    <div class="viewport">
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
      <a class="copyrightText">- 2026 ニャーニャ！ザコザコ！ -</a>
    </div>
</template>

<script setup lang="ts">
import Title from "@/components/title.vue";
import Details from "@/components/detail.vue";
import Contacts from "@/components/contacts.vue";
import MyFriends from "@/components/myFriends.vue";
import colorData from "@/message/colorData.json"
import {themeColor} from "@/components/ts/useStoage";
import TopBar from "@/components/topBar.vue";



const randomTheme = Math.floor(Math.random() * 7);
const selectedColor = (colorData as any)[`background${randomTheme}`];


document.body.style.cssText = `
  background-image: url(background${randomTheme}.webp);
  background-color: ${selectedColor};
`;
themeColor.value = selectedColor;


</script>

<style lang="scss">

.viewport{
  display: flex;
  flex-direction: column;
  overflow-y: auto;      // ✅ 唯一滚动区
  position: relative;
  -webkit-overflow-scrolling: touch; /* 优化移动端滚动 */
  .main{
    height: 96dvh;
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
  left: 0.6em;
  right: 0.6em;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1.5em;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: YToolIn 0.5s linear 0s 1;
  height: 4dvh;
  position: absolute;
  bottom: calc(0.6em + env(safe-area-inset-bottom));
  .copyrightText{
    font-size: 1.1em;
    color: #343131;

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