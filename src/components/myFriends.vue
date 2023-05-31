<template>
  <a
      class="friendTitle"
  ><a v-if="zh">{{ friendsMessage.titleZH }}</a>
    <a v-if="en">{{ friendsMessage.titleEN }}</a>
  </a>
  <div class="allFriends">
    <div class="friendBox" v-for="{index,icon,name,url} in friends" :key="index" @click="openURL(url)">
      <n-avatar :src="icon" :key="index" :size="100" round bordered></n-avatar>
      <n-gradient-text
          class="friendName"
          :gradient="{
      deg: 180,
      from: 'rgb(77,77,77)',
      to: 'rgb(170, 170, 170)'
    }" :key="index">
        {{ name }}
      </n-gradient-text>
    </div>
  </div>
</template>)

<script setup lang="ts">
import {NAvatar, NGradientText} from "naive-ui";
import friends from "@/message/friends.json"
import friendsMessage from "@/message/friendsMessage.json"
import {zh, en} from "@/assets/decideLang"

function openURL(url: string) {
  window.open(url)
}


</script>

<style lang="scss">
.friendTitle {
  color: white;
  display: flex;
  justify-content: center;
  @media (max-width: 420px) {
    font-size: 1.7em;
    padding: 0.4em;
  }
  @media (min-width: 420px) {
    font-size: 2em;
    padding: 0.5em;
  }
}

.allFriends {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.friendBox {
  display: flex;
  background-color: rgba(225, 225, 225, 0.2);
  backdrop-filter: blur(15px);
  transition: all 3s;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media (min-width: 420px) {
    width: 7em;
    height: 11em;
    padding: 2em;
    margin-right: 1em;
    margin-bottom: 1em;
  }
  @media (max-width: 420px) {
    margin-right: 1em;
    width: 8em;
    height: 10em;
    padding: 1em 0.5em 1em 0.5em;
    margin-bottom: 1em;
  }
  @media (max-height: 830px) {
    margin-bottom: 4em;
  }

  .friendName {
  }

  .n-avatar {
    width: 7em;
    height: 7em;
    @media (max-width: 420px) {
      margin-bottom: 0.5em;
    }
    @media (min-width: 420px) {
      margin-bottom: 2em;
    }
  }

  @media (max-width: 420px) {
  }
}

</style>