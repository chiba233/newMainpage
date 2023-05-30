<template>
  <div class="textBox">
    <n-gradient-text :size="15" :gradient="{
      from: 'rgb(7,7,7)',
      to: 'rgb(93,92,92)'
    }" class="detailText">
      {{dText[0]}} <br>
      {{dText[1]}}
    </n-gradient-text>
  </div>
</template>

<script setup lang="ts">
import {NGradientText} from "naive-ui"
import introduction from '../message/introduction.json'
let dText:string[] = introduction.introductionMessage
console.log(dText)
</script>

<style lang="scss">
.textBox {
  display: flex;
  height: 10em;
  width: 50em;
  background-color: rgba(225, 225, 225, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  margin: 1em;
  transition: all 3s;

  .detailText {
    padding: 0.8em;
    display: block;
    word-wrap: break-word;
    white-space: pre-wrap;

  }
}
</style>