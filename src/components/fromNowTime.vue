<template>
  <div>
    <n-button @click="clickMemory" round color="#C7B0C0" class="buttonClock">
      <template #icon>
        <n-icon>
          <Clock></Clock>
        </n-icon>
      </template>
      <a v-if="lang==='en'">{{ fromNowI18.en.button }}</a>
      <a v-if="lang==='zh'">{{ fromNowI18.zh.button }}</a>
    </n-button>
    <n-modal v-model:show="showModal">
      <n-card
          class="fromTimeCard"
          :title="boxTitle"
          size="huge">
        <template #header-extra>
          <n-button tertiary circle @click="showModal = false">
            <template #icon>
              <n-icon size="20">
                <Cancel></Cancel>
              </n-icon>
            </template>
          </n-button>
        </template>
        <div class="allTimeCard">
          <div class="timeCard" v-for="{nameZH,nameEN,time} in fromNow">
            <n-icon size="25">

            </n-icon>
            <a v-if="lang==='zh'">{{ nameZH }}</a>
            <a v-if="lang==='en'">{{ nameEN }}</a>
            <a>{{ moment(time).fromNow() }}</a>
          </div>
          <a>先更新一下，还没更新完，你先别急</a>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {NModal, NButton, NIcon, NCard} from "naive-ui";
import Clock from "../icons/clock.svg";
import {ref} from "vue";
import Cancel from "../icons/cancel.svg"
import lang from "@/components/ts/useStoage";
import fromNowI18 from "../message/fromNowI18n.json"
import fromNow from "../message/fromNow.json"
import moment from "moment";


const boxTitle = ref()
const clickMemory = () => {
  showModal.value = true
  if (lang.value === "zh") {
    boxTitle.value = fromNowI18.zh.title
    console.log("Test")
  } else if (lang.value === "en") {
    boxTitle.value = fromNowI18.en.title
  }
}


const showModal = ref(false)


</script>


<style lang="scss">
.buttonClock {
  margin: 1em;
}

.fromTimeCard {
  display: flex;
  @media (min-width: 420px) {
    width: 50%;
  }
  @media (max-width: 420px) {
    width: 100%;
  }
  .allTimeCard{
    display: flex;
    flex-direction: column;
  }

  .timeCard {
    background-color: rgba(89, 89, 89, 0.5);
    padding: 0.3em;
    margin-bottom: 0.3em;
  }
}
</style>