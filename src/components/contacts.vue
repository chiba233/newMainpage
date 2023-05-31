<template>
  <div class="contacts">
    <n-button round color="#d3a579" class="button" @click="twitter">
      <template #icon>
        <n-icon size="23">
          <TwitterIcon/>
        </n-icon>
      </template>
      <a>Twitter</a>
    </n-button>
    <n-button round color="#d3a579" class="button" @click="telegram">
      <template #icon>
        <n-icon size="23">
          <TelegramIcon></TelegramIcon>
        </n-icon>
      </template>
      <a>Telegram</a>
    </n-button>
    <n-button round color="#d3a579" class="button" @click="tron">
      <template #icon>
        <n-icon size="23">
          <Tron></Tron>
        </n-icon>
      </template>
      <a>Tron</a>
    </n-button>
    <n-button round color="#d3a579" class="button" @click="eth">
      <template #icon>
        <n-icon size="23">
          <Eth></Eth>
        </n-icon>
      </template>
      <a>Ethereum</a>
    </n-button>


  </div>

</template>

<script setup lang="ts">
import TwitterIcon from "@/icons/twitter.svg"
import TelegramIcon from "@/icons/telegram.svg"
import {NIcon, NButton} from "naive-ui";
import Tron from "@/icons/tron.svg"
import Eth from "@/icons/eth.svg"

function twitter() {
  window.open("https://twitter.com/strawberry960")
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
</script>

<style lang="scss">
.contacts {
  display: flex;
  justify-content: center;
  flex-direction: row;

  .n-button {
    @media (min-width: 420px) {
      width: 9em;
    }
    @media (max-width: 420px) {
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