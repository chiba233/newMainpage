<script setup lang="ts">
import FromNowTime from "@/components/fromNowTime.vue";
import I18n from "@/components/i18n.vue";
</script>

<template>
  <div class="overlay">
    <div class="i18">
      <I18n></I18n>
    </div>
    <div class="fromTime">
      <from-now-time></from-now-time>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay{
  justify-content: center;
  text-align: center;
  z-index: 9999;
  left: 0.6em;
  right: 0.6em;
  top: 0.6em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  height: 2.2em;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius:1.5em;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  .fromTime {
    display: flex;
    justify-content: start;
    position: absolute;
    pointer-events: auto;
    animation: YToolIn 0.5s linear 0s 1;

  }
  .i18 {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    pointer-events: auto;
    animation: YToolIn 0.5s linear 0s 1;
  }
}
</style>