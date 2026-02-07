<template>
  <a class="friendTitle">
    <a>{{ friendsMessage[`title${lang === 'zh' ? 'ZH' : lang === 'en' ? 'EN' :lang === 'jp' ? 'JP' : 'Other'}`] }}</a>
  </a>
  <div class="allFriends">
    <div class="friendBox" v-for="{icon,name,url,aliasEN} in friends" @click="openURL(url)">
      <n-avatar :src="icon" :size="100" round bordered></n-avatar>
      <a class="friendName" v-if="lang==='zh'">
        {{ name }}
      </a>
      <a class="friendName" v-if="lang !='zh'">
        {{ aliasEN }}
      </a>
    </div>
  </div>
</template>)

<script setup lang="ts">
import {NAvatar} from "naive-ui";
import friends from "@/message/friends.json"
import friendsMessage from "@/message/friendsMessage.json"
import {lang} from "@/components/ts/useStoage";

function openURL(url: string) {
  window.open(url)
}


</script>

<style lang="scss">
.friendTitle {
  color: white;
  font-weight: lighter;
  display: flex;
  text-shadow: #383838 1px 0 0, #383838 0 1px 0, #383838 -1px 0 0, #383838 0 -1px 0;
  justify-content: center;
  @media (min-width: 730px) {
    font-size: 1.9em;
    padding-bottom: 1em;
  }
  @media (max-width: 730px) {
    font-size: 1.7em;
    padding-bottom: 0.4em;
  }
  @media (max-width: 420px) {
    font-size: 1.55em;
    padding-bottom: 0.4em;
  }
}

.allFriends {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.2em;
}

.friendBox {
  display: flex;
  background-color: rgba(255, 255, 255, 0.17);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 3s;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media (min-width: 420px) {
    width: 7.5em;
    height: 11em;
    padding: 2em 1.7em 2em 1.7em;
    margin-left: 0.65em;
    margin-right: 0.65em;
    margin-bottom: 1.3em;
    border-radius: 15px;
  }
  @media (max-width: 420px) {
    width: 9em;
    height: 11em;
    padding: 1.2em 1em 1.2em 1em;
    margin-left: 0.75em;
    margin-right: 0.75em;
    margin-bottom: 1.5em;
    border-radius: 8px;
  }

  .n-avatar {
    width: 7em;
    height: 7em;
    margin-bottom: 1.3em;
    margin-top: 0.08em;
  }

  .friendName {
    color: #343131;
    white-space: nowrap;

  }

}

</style>