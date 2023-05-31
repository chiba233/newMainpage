<template>
  <div class="contacts">
    <n-button round color="#d3a579" class="button" @click="twitter">
      <template #icon>
        <n-icon size="23">
          <TwitterIcon/>
        </n-icon>
      </template>
      Twitter
    </n-button>
    <n-button round color="#d3a579" class="button" @click="telegram">
      <template #icon>
        <n-icon size="23">
          <TelegramIcon></TelegramIcon>
        </n-icon>
      </template>
      Telegram
    </n-button>
    <n-button round color="#d3a579" class="button" @click="tron">
      <template #icon>
        <n-icon size="23">
          <Tron></Tron>
        </n-icon>
      </template>
      Tron
    </n-button>
    <n-button round color="#d3a579" class="button" @click="eth">
      <template #icon>
        <n-icon size="23">
          <Eth></Eth>
        </n-icon>
      </template>
      Ethereum
    </n-button>


  </div>

</template>

<script setup lang="ts">
import TwitterIcon from "@/icons/twitter.svg"
import TelegramIcon from "@/icons/telegram.svg"
import {NIcon, NButton} from "naive-ui";
import Tron from "@/icons/tron.svg"
import Eth from "@/icons/eth.svg"
function twitter(){
  window.open("https://twitter.com/strawberry960")
}
function tron(){
  window.open("https://tronscan.org/#/address/TVB16jV3Jx2HTn9U1KjyBSN1u9MQ29FArs")
}

function eth(){
  window.open("https://etherscan.io/address/0x3eb232c80307961795C1310374368834c25A41e6")
}
function telegram(){
  window.open("https://t.me/chiba2333")
}
</script>

<style lang="scss">
.contacts {
  display: flex;
  justify-content: center;
  flex-direction: row;

  .n-button {
    width: 9em;
  }
}
</style>