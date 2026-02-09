<template>
  <div>
    <n-button @click="clickMemory" round :color="themeColor" class="buttonClock">
      <template #icon>
        <n-icon size="20">
          <Clock></Clock>
        </n-icon>
      </template>
      <a>{{ fromNowI18[lang as keyof typeof fromNowI18]?.button || fromNowI18.zh.button }}</a>
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
        <div class="timeCard" v-for="item in fromNow" :key="item.time">
          <div class="thatDay">
            <a>{{ formatDate(item.time) }}</a>
          </div>

          <a>{{ getName(item) }}</a>

          <div>
            <a>{{ formatTime(item.time) }}</a>
          </div>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {NModal, NButton, NIcon, NCard} from "naive-ui";
import Clock from "../icons/clock.svg";
import {computed, ref} from "vue";
import Cancel from "../icons/cancel.svg"
import {lang} from "@/components/ts/useStoage";
import fromNowI18 from "../message/fromNowI18n.json"
import fromNow from "../message/fromNow.json"
import {themeColor} from "@/components/ts/useStoage";
import {formatTime} from "@/components/ts/useStoage";

const langMap = {
  zh: 'nameZH',
  en: 'nameEN',
  ja: 'nameJP',
  other: 'nameOther'
} as const;

const formatDate = (t: string) => {
  return `${t.slice(0, 4)} - ${t.slice(4, 6)} - ${t.slice(6, 8)}`;
};

const getName = (item: any) => {
  const key = langMap[lang.value as keyof typeof langMap] || 'nameEN';
  return item[key];
};

//模块分割线
interface LanguageConfig {
  title: string;
  button: string;
}
const data: Record<string, LanguageConfig> = fromNowI18;
const boxTitle = computed(() => {
  return data[lang.value]?.title || data['en'].title;
});

//模块分割线
const showModal = ref(false)
const clickMemory = () => {
  showModal.value = showModal.value === false;
}

</script>


<style lang="scss">
.buttonClock {
  pointer-events: auto;
  margin-left: 1em;
  height: 2.2em;
  border: 1px solid rgba(255, 255, 255, 0.2);
  @media (max-width: 390px) {
    .n-icon {
      margin-left: 6px;
    }
  }

  a {
    color: #343131;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    @media (max-width: 390px) {
      display: none;
    }

  }
}

.fromTimeCard {
  display: flex;
  width: 35em;

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