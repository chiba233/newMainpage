<template>
  <a
      class="friendTitle"
  ><a v-if="lang==='zh'">{{ friendsMessage.titleZH }}</a>
    <a v-if="lang==='en'">{{ friendsMessage.titleEN }}</a>
    <a v-if="lang==='other'">{{friendsMessage.titleOther}}</a>
  </a>
  <div class="allFriends">
    <div class="friendBox" v-for="{icon,name,url} in friends" @click="openURL(url)">
      <n-avatar :src="icon" :size="100" round bordered></n-avatar>
      <a class="friendName">
        {{ name }}
      </a>
    </div>
  </div>
</template>)

<script setup lang="ts">
import {NAvatar, NGradientText} from "naive-ui";
import friends from "@/message/friends.json"
import friendsMessage from "@/message/friendsMessage.json"
import lang from "@/components/ts/useStoage";

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
  background-color: rgba(199, 176, 192, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
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
  .friendName{
    color: white;
  }

}

</style>