<template>
  <div class="background">
    <div class="content">
      <I18n></I18n>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/title.vue";
import Details from "@/components/detail.vue";
import I18n from "@/components/i18n.vue";
</script>

<style lang="scss">
.background {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  position: absolute;
  background-image: url("../img/background.jpg");
}

.content {
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
}
</style>
