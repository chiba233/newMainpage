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
.topBar {
  animation: upToDown 0.5s linear 0s 1;
}

.viewport {
  display: flex;
  flex-direction: column;
  overflow-y: auto; // ✅ 唯一滚动区
  position: relative;
  -webkit-overflow-scrolling: touch; /* 优化移动端滚动 */
  .main {
    height: 96dvh;
    animation: slide-fwd-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

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

.copyright {
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
  height: 4dvh;
  position: absolute;
  animation: downToUp 0.5s linear 0s 1;
  bottom: calc(0.6em + env(safe-area-inset-bottom));

  .copyrightText {
    font-size: 1.1em;
    color: #343131;

  }
}


@keyframes downToUp {
  from {
    transform: translateY(3em);
  }


  to {
    transform: none;
  }
}

@keyframes upToDown {
  from {
    transform: translateY(-3em);
  }
  to {
    transform: none;
  }
}


@keyframes slide-fwd-center {
  0% {
    transform: scale(0.9) translateY(20px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}


</style>