<template>
  <div class="i18">
    <I18n></I18n>
  </div>
  <div class="fromTime">
    <from-now-time></from-now-time>
  </div>

  <div class="content">
    <Title></Title>
    <div class="detailsDIV">
      <Details></Details>
    </div>
    <Contacts></Contacts>
    <MyFriends></MyFriends>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/title.vue";
import Details from "@/components/detail.vue";
import I18n from "@/components/i18n.vue";
import Contacts from "@/components/contacts.vue";
import MyFriends from "@/components/myFriends.vue";
import FromNowTime from "@/components/fromNowTime.vue";

</script>

<style lang="scss">
.content {
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;

  .detailsDIV {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.fromTime {
  display: flex;
  justify-content: start;
  position: absolute;
}

.i18 {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
}
</style>
