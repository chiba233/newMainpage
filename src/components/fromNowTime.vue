<template>
  <div>
    <n-button @click="clickMemory" round :color="themeColor" class="buttonClock">
      <template #icon>
        <n-icon size="20">
          <Clock></Clock>
        </n-icon>
      </template>
      <a>{{ getName("button") }}</a>
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
          <div class="timeCard" v-for="{time} in fromNow">
            <div class="thatDay">
              <a>{{ time.substring(0, 4) }} - {{ time.substring(4, 6) }} - {{ time.substring(6, 8) }}</a>
            </div>
            <a>{{ getName("title") }}</a>
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
import {LangKey} from "@/components/ts/useStoage";


const getName = (type: number) => {
  // 1. 确定当前语言
  const currentLang = (lang.value as LangKey) || 'other';

  // 2. 获取该语言对应的文案对象 (包含 title 和 button)
  const content = fromNowI18[currentLang];

  const map: Record<string | number, string> = {
    "title": content.title,
    "button": content.button
  };

  return map[type] || "未知内容";// 兜底返回空字符串
};


const boxTitle = ref()
const clickMemory = () => {
  showModal.value = true
  if (lang.value === "zh") {
    moment.locale("zh")
    boxTitle.value = fromNowI18.zh.title
  } else if (lang.value === "en") {
    moment.locale("en")
    boxTitle.value = fromNowI18.en.title
  } else if (lang.value === "other") {
    boxTitle.value = fromNowI18.other.title
    moment.locale("en")
  }
}


const showModal = ref(false)


</script>


<style lang="scss">
.buttonClock {
  margin-left: 1em;
  height: 2.2em;
  @media (max-width: 390px) {
    .n-icon {
      margin-left: 6px;
    }
  }

  a {
    color: #343131;
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