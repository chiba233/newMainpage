<template>
  <div class="contacts">
    <n-button round :color="themeColor" class="cButton" @click="twitter">
      <template #icon>
        <n-icon size="23">
          <TwitterIcon/>
        </n-icon>
      </template>
      <a>Twitter</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="telegram">
      <template #icon>
        <n-icon size="23">
          <TelegramIcon></TelegramIcon>
        </n-icon>
      </template>
      <a>Telegram</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="tron">
      <template #icon>
        <n-icon size="23">
          <Tron></Tron>
        </n-icon>
      </template>
      <a>Tron</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="eth">
      <template #icon>
        <n-icon size="23">
          <Eth></Eth>
        </n-icon>
      </template>
      <a>Ethereum</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="email">
      <template #icon>
        <n-icon size="23">
          <Email></Email>
        </n-icon>
      </template>
      <a>E-Mail</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="github">
      <template #icon>
        <n-icon size="23">
          <Github></Github>
        </n-icon>
      </template>
      <a>GitHub</a>
    </n-button>

  </div>

</template>

<script setup lang="ts">
import TwitterIcon from "@/icons/twitter.svg"
import TelegramIcon from "@/icons/telegram.svg"
import {NIcon, NButton} from "naive-ui";
import Tron from "@/icons/tron.svg"
import Eth from "@/icons/eth.svg"
import Email from "@/icons/Email.svg"
import Github from "@/icons/LogoGithub.svg"
import {themeColor} from "@/components/ts/useStoage";

function twitter() {
  window.open("https://x.com/strawberry960")
}

function tron() {
  window.open("https://tronscan.org/#/address/TVB16jV3Jx2HTn9U1KjyBSN1u9MQ29FArs")
}

function eth() {
  window.open("https://etherscan.io/address/0x3eb232c80307961795C1310374368834c25A41e6")
}

function telegram() {
  window.open("https://t.me/chiba2333")
}

function email() {
  window.open("mailto:qwq@qwwq@org")
}
function github() {
  window.open("https://github.com/chiba233")
}
</script>

<style lang="scss">
.contacts {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  .n-button {
    @media (min-width: 420px) {
      width: 9em;
      margin: 0.85em;
    }
    @media (max-width: 420px) {
      margin: 0.68em;
      .n-icon {
        margin-left: 6px;
      }
      width: 4em;
      display: flex;
      justify-content: center;
      align-content: center;
    }

    a {
      @media (max-width: 420px) {
        display: none;
      }
    }
  }
}
</style>