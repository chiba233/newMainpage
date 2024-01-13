<template>
  <div>
    <n-modal v-model:show="showMaiModal">
      <n-card
          class="maiCard"
          :title="maiBoxTitle"
          size="huge">
        <template #header-extra>
          <n-button tertiary circle @click="showMaiModal = false">
            <template #icon>
              <n-icon size="20">
                <Cancel></Cancel>
              </n-icon>
            </template>
          </n-button>
        </template>
        <n-collapse class="maiCollapse" default-expanded-names="1" accordion>
          <n-collapse-item :title="maiMainI18" name="1">
            <div class="maiCardDiv">
              <a>{{ dxName }}</a> <a class="connecter">:</a> <a>{{ useMaiData.userName  ?? maiError }}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ dxRatingName }}</a> <a class="connecter">:</a> <a>{{ useMaiData.playerRating  ?? maiError}}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ dxLastPlay }}</a> <a class="connecter">:</a> <a>{{ useMaiData.lastPlayDate ?? maiError }}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ dxPlayCount }}</a> <a class="connecter">:</a> <a>{{ useMaiData.playCount  ?? maiError}}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ dxVersion }}</a> <a class="connecter">:</a> <a>{{ useMaiData.lastDataVersion ?? maiError }}</a>
            </div>
          </n-collapse-item>
          <n-collapse-item :title="maiOtherI18" name="2">
            <div class="maiCardDiv">
              <div class="maiCardDiv">
                <a>{{ basicDeluxscore }}</a> <a class="connecter">:</a> <a>{{ useMaiData.totalBasicDeluxscore ?? maiError }}</a>
              </div>
            </div>
            <div class="maiCardDiv">
              <a>{{ advancedDeluxscore }}</a> <a class="connecter">:</a> <a>{{ useMaiData.totalAdvancedDeluxscore  ?? maiError}}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ expertDeluxscore }}</a><a class="connecter">:</a> <a>{{ useMaiData.totalExpertDeluxscore ?? maiError }}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ masterDeluxscore }}</a> <a class="connecter">:</a> <a>{{ useMaiData.totalMasterDeluxscore ?? maiError }}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ reMasterDeluxscore }}</a><a class="connecter">:</a> <a>{{ useMaiData.totalReMasterDeluxscore  ?? maiError}}</a>
            </div>
            <div class="maiCardDiv">
              <a>{{ totelDeluxScore }}</a> <a class="connecter">:</a> <a>{{ useMaiData.totalDeluxscore  ?? maiError}}</a>
            </div>
          </n-collapse-item>
          <n-collapse-item :title="maiHistoryI18" name="3">
            <div class="maiCardDiv">
              <a>{{ highestRating  }}</a> <a class="connecter">:</a> <a>{{ useMaiData.highestRating  ?? maiError}}</a>
            </div>
          </n-collapse-item>
        </n-collapse>
      </n-card>
    </n-modal>
  </div>
  <div class="contacts">
    <n-button round :color="themeColor" class="cButton" @click="twitter">
      <template #icon>
        <n-icon size="23">
          <TwitterIcon/>
        </n-icon>
      </template>
      <a>Twitter</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="telegram">
      <template #icon>
        <n-icon size="23">
          <TelegramIcon></TelegramIcon>
        </n-icon>
      </template>
      <a>Telegram</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="tron">
      <template #icon>
        <n-icon size="23">
          <Tron></Tron>
        </n-icon>
      </template>
      <a>Tron</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="eth">
      <template #icon>
        <n-icon size="23">
          <Eth></Eth>
        </n-icon>
      </template>
      <a>Ethereum</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="email">
      <template #icon>
        <n-icon size="23">
          <Email></Email>
        </n-icon>
      </template>
      <a>E-Mail</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="github">
      <template #icon>
        <n-icon size="23">
          <Github></Github>
        </n-icon>
      </template>
      <a>GitHub</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="clickMai">
      <template #icon>
        <n-icon size="23">
          <MaiTrans></MaiTrans>
        </n-icon>
      </template>
      <a> DX {{ useMaiData.playerRating ??maiError}}</a>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import TwitterIcon from "@/icons/twitter.svg"
import TelegramIcon from "@/icons/telegram.svg"
import {NIcon, NButton, NCard, NModal, NCollapse, NCollapseItem} from "naive-ui";
import MaiTrans from "@/icons/maitrans.svg"
import Tron from "@/icons/tron.svg"
import Eth from "@/icons/eth.svg"
import Email from "@/icons/Email.svg"
import Github from "@/icons/LogoGithub.svg"
import {lang, themeColor} from "@/components/ts/useStoage";
import {useMaiData} from "@/components/ts/maimaiScore";
import Cancel from "@/icons/cancel.svg";
import {ref} from "vue";
import maiI18nData from "@/message/maiI18n.json"

const maiBoxTitle = ref("")
const maiMainI18 = ref("")
const maiOtherI18 = ref("")
const maiHistoryI18 = ref("")
const showMaiModal = ref(false)
const dxRatingName = ref("")
const dxName = ref("")
const dxVersion = ref("")
const dxLastPlay = ref("")
const basicDeluxscore = ref("")
const advancedDeluxscore = ref("")
const expertDeluxscore = ref("")
const masterDeluxscore = ref("")
const reMasterDeluxscore = ref("")
const totelDeluxScore = ref("")
const highestRating = ref("")
const dxPlayCount =ref("")
const maiError =ref("获取失败")


function twitter() {
  window.open("https://twitter.com/strawberry960")
}

function tron() {
  window.open("https://tronscan.org/#/address/TVB16jV3Jx2HTn9U1KjyBSN1u9MQ29FArs")
}

function eth() {
  window.open("https://etherscan.io/address/0x3eb232c80307961795C1310374368834c25A41e6")
}

function telegram() {
  window.open("https://t.me/chiba2333")
}

function email() {
  window.open("mailto:qwq@qwwq@org")
}

function github() {
  window.open("https://github.com/chiba233")
}

const clickMai = () => {
  if (lang.value === "zh") {
    maiBoxTitle.value = maiI18nData.titleNameZH
    maiMainI18.value = maiI18nData.mainInfoZH
    maiOtherI18.value = maiI18nData.otherInfoZH
    maiHistoryI18.value = maiI18nData.historyInfoZH
    dxRatingName.value = maiI18nData.dxRatingNameZH
    dxName.value = maiI18nData.dxNameZH
    dxLastPlay.value = maiI18nData.dxLastPlayZH
    dxVersion.value = maiI18nData.dxVersionZH
    basicDeluxscore.value = maiI18nData.BasicDeluxscoreZH
    advancedDeluxscore.value = maiI18nData.AdvancedDeluxscoreZH
    expertDeluxscore.value = maiI18nData.ExpertDeluxscoreZH
    masterDeluxscore.value = maiI18nData.MasterDeluxscoreZH
    reMasterDeluxscore.value = maiI18nData.ReMasterDeluxscoreZH
    totelDeluxScore.value = maiI18nData.totalDeluxscoreZH
    highestRating.value = maiI18nData.highestRatingZH
    dxPlayCount.value=maiI18nData.dxPlayCountZH


  } else if (lang.value !== "zh") {
    maiBoxTitle.value = maiI18nData.titleNameEN
    maiMainI18.value = maiI18nData.mainInfoEN
    maiOtherI18.value = maiI18nData.otherInfoEN
    maiHistoryI18.value = maiI18nData.historyInfoEN
    dxRatingName.value = maiI18nData.dxRatingNameEN
    dxName.value = maiI18nData.dxNameEN
    dxLastPlay.value = maiI18nData.dxLastPlayEN
    dxVersion.value = maiI18nData.dxVersionEN
    basicDeluxscore.value = maiI18nData.BasicDeluxscoreEN
    advancedDeluxscore.value = maiI18nData.AdvancedDeluxscoreEN
    expertDeluxscore.value = maiI18nData.ExpertDeluxscoreEN
    masterDeluxscore.value = maiI18nData.MasterDeluxscoreEN
    reMasterDeluxscore.value = maiI18nData.ReMasterDeluxscoreEN
    totelDeluxScore.value = maiI18nData.totalDeluxscoreEN
    highestRating.value = maiI18nData.highestRatingEN
    dxPlayCount.value=maiI18nData.dxPlayCountZH
  }
  showMaiModal.value = true
}

</script>

<style lang="scss">
.maiCard {
  display: flex;
  @media (min-width: 420px) {
    width: 70%;
  }
  @media (max-width: 420px) {
    width: 100%;
  }

  .connecter {
    padding-right: 1em;
  }
  a{
    padding-bottom: 1em;
  }

  .maiCardDiv {
    display: flex;
    justify-content: center;
  }

  .maiCollapse {
  }
}

.contacts {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;


  .n-button {
    @media (min-width: 420px) {
      width: 9em;
      margin: 0.85em;
    }
    @media (max-width: 420px) {
      margin: 0.68em;
      .n-icon {
        margin-left: 6px;
      }
      width: 4em;
      display: flex;
      justify-content: center;
      align-content: center;
    }

    a {
      @media (max-width: 420px) {
        display: none;
      }
    }
  }
}
</style>