<template>
  <div class="textBox">
    <a class="detailText">
      <a v-if="lang==='zh'">
        {{ dTextZH[0] }} <br>
        {{ dTextZH[1] }}
      </a>
      <a v-if="lang==='en'">
        {{ dTextEN[0] }}<br>
        {{ dTextEN[1] }}
      </a>
    </a>
  </div>
</template>

<script setup lang="ts">
import introduction from '../message/introduction.json'
import lang from "@/components/ts/useStoage";

let dTextZH: string[] = introduction.introductionMessageZH
let dTextEN: string[] = introduction.introductionMessageEN
</script>

<style lang="scss">
.textBox {
  display: flex;
  background-color: rgba(225, 225, 225, 0.2);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  transition: all 3s;
  @media (min-width: 420px) {
    width: 50em;
    border-radius: 15px;
    margin: 1em;
  }
  @media (max-width: 420px) {
    width: 95%;
    border-radius: 8px;
    margin: 0.3em;
  }

  .detailText {
    color: white;
    padding: 0.8em;
    display: block;
    word-break: break-word;
    white-space: pre-wrap;
    @media (max-width: 420px) {

    }
    @media (min-width: 420px) {

    }
  }
}
</style>