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
      <a v-if="lang==='other'">
        {{ dTextOther[0] }}<br>
        {{ dTextOther[1] }}
      </a>
    </a>
  </div>
</template>

<script setup lang="ts">
import introduction from '../message/introduction.json'
import {lang} from "@/components/ts/useStoage";

let dTextZH: string[] = introduction.introductionMessageZH
let dTextEN: string[] = introduction.introductionMessageEN
let dTextOther: string[] = introduction.introductionMessageOther
</script>

<style lang="scss">
.textBox {
  display: flex;
  background-color: rgba(255, 255, 255, 0.17);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 3s;
  padding: 0.9em;
  @media (min-width: 420px) {
    width: 50em;
    border-radius: 15px;
    margin: 1em;
  }
  @media (max-width: 420px) {
    border-radius: 10px;
    margin: 0.3em;
  }

  .detailText {
    color: white;
    text-align: center;
    display: block;
    word-break: break-word;
    white-space: pre-wrap;
    @media (min-width: 420px) {
      font-size: 1.1em;
    }
    @media (max-width: 420px) {
      font-size: 1em;

    }
  }
}
</style>