<template>
  <a class="friendTitle">{{
      friendsMessage[
        `title${lang === "zh" ? "ZH" : lang === "en" ? "EN" : lang === "ja" ? "JP" : "Other"}`
        ]
    }}</a>
  <div class="allFriends">
    <div v-for="{ icon, name, url, aliasEN } in friends"  :key="aliasEN" class="friendBox" @click="openURL(url)">
      <n-avatar :src="icon" :size="100" round bordered></n-avatar>
      <a v-if="lang === 'zh'" class="friendName">
        {{ name }}
      </a>
      <a v-if="lang != 'zh'" class="friendName">
        {{ aliasEN }}
      </a>
    </div>
  </div>
</template>
)

<script setup lang="ts">
import { NAvatar } from "naive-ui";
import friends from "@/message/friends.json";
import friendsMessage from "@/message/friendsMessage.json";
import { lang } from "@/components/ts/useStoage";

function openURL(url: string) {
  window.open(url);
}
</script>

<style lang="scss">
$transition-speed: 0.3s;
.friendTitle {
  left: 0;
  right: 0;
  color: white;
  font-weight: lighter;
  text-align: center;
  text-shadow: #383838 1px 0 0,
  #383838 0 1px 0,
  #383838 -1px 0 0,
  #383838 0 -1px 0;
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
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform $transition-speed ease,
  box-shadow $transition-speed ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
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
    color: #191919;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    white-space: nowrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    box-orient: vertical; //test values
    line-clamp: 1;
  }
}
</style>
