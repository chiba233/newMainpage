<template>
  <div>
    <n-button @click="clickMemory" round :color="themeColor" class="buttonClock">
      <template #icon>
        <n-icon>
          <Clock></Clock>
        </n-icon>
      </template>
      <a v-if="lang==='en'">{{ fromNowI18.en.button }}</a>
      <a v-if="lang==='zh'">{{ fromNowI18.zh.button }}</a>
      <a v-if="lang==='other'">{{ fromNowI18.other.button }}</a>
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
          <div class="timeCard" v-for="{nameZH,nameEN,time,nameOther} in fromNow">
            <div class="thatDay">
              <a>{{ time.substring(0, 4) }} - {{ time.substring(4, 6) }} - {{ time.substring(6, 8) }}</a>
            </div>
            <a v-if="lang==='zh'">{{ nameZH }}</a>
            <a v-if="lang==='en'">{{ nameEN }}</a>
            <a v-if="lang==='other'">{{ nameOther }}</a>
            <div>
            <a>{{ moment(time).fromNow() }}</a>
            </div>
          </div>
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
import {lang} from "@/components/ts/useStoage";
import fromNowI18 from "../message/fromNowI18n.json"
import fromNow from "../message/fromNow.json"
import moment from "moment";
import {themeColor} from "@/components/ts/useStoage";


const boxTitle = ref()
const clickMemory = () => {
  showModal.value = true
  if (lang.value === "zh") {
    boxTitle.value = fromNowI18.zh.title
  } else if (lang.value === "en") {
    boxTitle.value = fromNowI18.en.title
  } else if (lang.value === "other") {
    boxTitle.value = fromNowI18.other.title
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

  .allTimeCard {
    display: flex;
    flex-direction: column;
  }

  .timeCard {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    text-align: center;
    background-color: rgba(89, 89, 89, 0.1);
    padding: 0.3em;
    margin-bottom: 0.6em;
  }
}
</style>