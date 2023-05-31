<template>
  <div class="i18">
    <I18n></I18n>
  </div>
  <div class="background">
    <div class="content">
      <Title></Title>
      <div class="detailsDIV">
      <Details></Details>
      </div>
      <Contacts></Contacts>
      <MyFriends></MyFriends>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/title.vue";
import Details from "@/components/detail.vue";
import I18n from "@/components/i18n.vue";
import Contacts from "@/components/contacts.vue";
import MyFriends from "@/components/myFriends.vue";
</script>

<style lang="scss">
.background {
  display: flex;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  position: absolute;
  background-image: url("../img/background.jpg");
  @media (max-width: 420px) {
    height: 135%;
  }
}

.content {
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  .detailsDIV{
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.i18 {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  position: absolute;
}
</style>
