<template>
  <n-modal v-model:show="showCatModel">
    <!-- catCard -->
    <n-card class="catCard" :title="catMemoryTitle.catMemory" size="huge">
      <template #header-extra>
        <n-button tertiary circle @click="showCatModel = false">
          <template #icon>
            <n-icon size="20">
              <Cancel></Cancel>
            </n-icon>
          </template>
        </n-button>
      </template>
      <div>
        <n-carousel class="catImgCard" show-arrow mousewheel>
          <img v-for="{ catImg, imgName } in catImage" :key="imgName" :src="catImg" :alt="imgName" />
        </n-carousel>
      </div>
    </n-card>
  </n-modal>
  <!-- maiCard -->
  <n-modal v-model:show="showMaiModal">
    <n-card class="maiCard" :title="maiDisplay.title" size="huge">
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
        <n-collapse-item :title="maiDisplay.mainInfo" name="1">
          <div class="maiCardDiv">
            <a>{{ maiDisplay.dxName }}</a> <a class="connecter">:</a>
            <a>{{ data.userName ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.dxRatingName }}</a> <a class="connecter">:</a>
            <a>{{ data.playerRating ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.dxLastPlay }}</a> <a class="connecter">:</a>
            <a>{{ data.lastPlayDate ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.playCount }}</a> <a class="connecter">:</a>
            <a>{{ data.playCount ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.dxVersion }}</a> <a class="connecter">:</a>
            <a>{{ data.lastDataVersion ?? maiError }}</a>
          </div>
        </n-collapse-item>
        <n-collapse-item :title="maiDisplay.otherInfo" name="2">
          <div class="maiCardDiv">
            <div class="maiCardDiv">
              <a>{{ maiDisplay.basicScore }}</a> <a class="connecter">:</a>
              <a>{{ data.totalBasicDeluxscore ?? maiError }}</a>
            </div>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.advancedScore }}</a> <a class="connecter">:</a>
            <a>{{ data.totalAdvancedDeluxscore ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.expertScore }}</a
            ><a class="connecter">:</a> <a>{{ data.totalExpertDeluxscore ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.masterScore }}</a> <a class="connecter">:</a>
            <a>{{ data.totalMasterDeluxscore ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.reMasterScore }}</a
            ><a class="connecter">:</a>
            <a>{{ data.totalReMasterDeluxscore ?? maiError }}</a>
          </div>
          <div class="maiCardDiv">
            <a>{{ maiDisplay.totalScore }}</a> <a class="connecter">:</a>
            <a>{{ data.totalDeluxscore ?? maiError }}</a>
          </div>
        </n-collapse-item>
        <n-collapse-item :title="maiDisplay.historyInfo" name="3">
          <div class="maiCardDiv">
            <a>{{ maiDisplay.highestRating }}</a> <a class="connecter">:</a>
            <a>{{ data.highestRating ?? maiError }}</a>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </n-modal>
  <!-- 以下是WeCat -->
  <n-image-preview v-model:show="showWechatModel" width="1" src="/wechat.webp"></n-image-preview>
  <n-image-preview v-model:show="showLineModel" width="1" src="/line.webp"></n-image-preview>

  <!-- 以下是联系人 -->
  <div class="contacts">
    <n-button round :color="themeColor" class="cButton" @click="openLink('telegram')">
      <template #icon>
        <n-icon size="23">
          <TelegramIcon></TelegramIcon>
        </n-icon>
      </template>
      <a>Telegram</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="clickWechat">
      <template #icon>
        <n-icon size="23">
          <wechat></wechat>
        </n-icon>
      </template>
      <a>WeChat</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="clickLine">
      <template #icon>
        <n-icon size="23">
          <Line></Line>
        </n-icon>
      </template>
      <a>LINE</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('email')">
      <template #icon>
        <n-icon size="23">
          <Email></Email>
        </n-icon>
      </template>
      <a>E-Mail</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('twitter')">
      <template #icon>
        <n-icon size="23">
          <TwitterIcon />
        </n-icon>
      </template>
      <a>Twitter</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('github')">
      <template #icon>
        <n-icon size="23">
          <Github></Github>
        </n-icon>
      </template>
      <a>GitHub</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('tron')">
      <template #icon>
        <n-icon size="23">
          <Tron></Tron>
        </n-icon>
      </template>
      <a>Tron</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('eth')">
      <template #icon>
        <n-icon size="23">
          <Eth></Eth>
        </n-icon>
      </template>
      <a>Ethereum</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('areth')">
      <template #icon>
        <n-icon size="23">
          <Arbitrum></Arbitrum>
        </n-icon>
      </template>
      <a>Arbitrum</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('bsc')">
      <template #icon>
        <n-icon size="23">
          <Bsc></Bsc>
        </n-icon>
      </template>
      <a>BSC-BNB</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('polygon')">
      <template #icon>
        <n-icon size="23">
          <Polygon></Polygon>
        </n-icon>
      </template>
      <a>Polygon</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="openLink('solana')">
      <template #icon>
        <n-icon size="23">
          <Solana></Solana>
        </n-icon>
      </template>
      <a>Solana</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="clickMai">
      <template #icon>
        <n-icon size="23">
          <MaiTrans></MaiTrans>
        </n-icon>
      </template>
      <a> DX {{ data.playerRating ?? maiError }}</a>
    </n-button>
    <n-button round :color="themeColor" class="cButton" @click="clickCatMemory">
      <template #icon>
        <n-icon size="23">
          <Cat></Cat>
        </n-icon>
      </template>
      <a>{{ catMemoryTitle.cat }}</a>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import Solana from "@/icons/solanaLogoMark.svg";
import catImage from "@/message/catImage.json";
import commonI18n from "@/message/commonI18n.json";
import Cat from "@/icons/cat.svg";
import TwitterIcon from "@/icons/twitter.svg";
import TelegramIcon from "@/icons/telegram.svg";
import {
  NIcon,
  NButton,
  NCard,
  NModal,
  NCollapse,
  NCollapseItem,
  NCarousel,
  NImagePreview,
} from "naive-ui";
import MaiTrans from "@/icons/maitrans.svg";
import Tron from "@/icons/tron.svg";
import Eth from "@/icons/eth.svg";
import Bsc from "@/icons/binance-coin-bnb-seeklogo.svg";
import Email from "@/icons/Email.svg";
import Github from "@/icons/LogoGithub.svg";
import Polygon from "@/icons/polygon-matic-logo.svg";
import Arbitrum from "@/icons/arb.svg";
import wechat from "@/icons/wechat.svg";
import Line from "@/icons/line.svg";
import { lang, themeColor } from "@/components/ts/useStoage";
import { maiUrl, UserDataType } from "./ts/maimaiScore";
import Cancel from "@/icons/cancel.svg";
import { computed, ref } from "vue";
import maiI18nData from "@/message/maiI18n.json";
import axios from "axios";
import { useAsyncState } from "@vueuse/core";

const showCatModel = ref<boolean>(false);
const showMaiModal = ref<boolean>(false);
const showWechatModel = ref(false);
const showLineModel = ref(false);
const maiError = ref("获取失败");

const { state: data } = useAsyncState<Partial<UserDataType>>(
  () => axios.get(maiUrl).then((res) => res.data),
  {},
);

const socialLinks = {
  twitter: "https://x.com/HoshinoYumeka2",
  tron: "https://tronscan.org/#/address/TVB16jV3Jx2HTn9U1KjyBSN1u9MQ29FArs",
  areth: "https://arbiscan.io/address/0x3eb232c80307961795C1310374368834c25A41e6",
  eth: "https://etherscan.io/address/0x3eb232c80307961795C1310374368834c25A41e6",
  polygon: "https://polygonscan.com/address/0x3eb232c80307961795C1310374368834c25A41e6",
  bsc: "https://bscscan.com/address/0x3eb232c80307961795C1310374368834c25A41e6",
  solana: "https://solscan.io/account/CwmEwePc5TxyQG57e3f4WBufTvGFv264KAGfVRoSZd7V",
  telegram: "https://t.me/chiba2333",
  email: "mailto:qwq@qwwq@org",
  github: "https://github.com/chiba233",
} as const;
type SocialType = keyof typeof socialLinks;

function openLink(type: SocialType) {
  const url = socialLinks[type];
  if (url) {
    window.open(url);
  } else {
    console.error("未定义的跳转类型:", type);
  }
}

const catMemoryTitle = computed(() => {
  const suffix =
    lang.value === "zh" ? "ZH" : lang.value === "en" ? "EN" : lang.value === "ja" ? "JP" : "JP";
  const getField = (prefix: string) => (commonI18n as Record<string, string>)[`${prefix}${suffix}`];
  return {
    catMemory: getField("catMemoryTitle"),
    cat: getField("cat"),
  };
});

const maiDisplay = computed(() => {
  const suffix =
    lang.value === "zh" ? "ZH" : lang.value === "en" ? "EN" : lang.value === "ja" ? "JP" : "JP";
  const getField = (prefix: string) =>
    (maiI18nData as Record<string, string>)[`${prefix}${suffix}`];

  return {
    title: getField("titleName"),
    mainInfo: getField("mainInfo"),
    otherInfo: getField("otherInfo"),
    historyInfo: getField("historyInfo"),
    dxRatingName: getField("dxRatingName"),
    dxName: getField("dxName"),
    dxLastPlay: getField("dxLastPlay"),
    dxVersion: getField("dxVersion"),
    basicScore: getField("BasicDeluxscore"),
    advancedScore: getField("AdvancedDeluxscore"),
    expertScore: getField("ExpertDeluxscore"),
    masterScore: getField("MasterDeluxscore"),
    reMasterScore: getField("ReMasterDeluxscore"),
    totalScore: getField("totalDeluxscore"),
    highestRating: getField("highestRating"),
    playCount: getField("dxPlayCount"),
  };
});

const clickMai = () => {
  showMaiModal.value = true;
};

const clickCatMemory = () => {
  showCatModel.value = true;
};
const clickWechat = () => {
  showWechatModel.value = true;
};
const clickLine = () => {
  showLineModel.value = true;
};
</script>

<style lang="scss">
.catCard {
  width: 40em;

  .catImgCard {
    @media (min-width: 440px) {
      height: 275px;
    }
    @media (max-width: 440px) {
      height: 220px;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}

.maiCard {
  display: flex;
  width: 42em;

  .connecter {
    padding-right: 0.6em;
    padding-left: 0.2em;
  }

  a {
    padding-bottom: 1em;
  }

  .maiCardDiv {
    display: flex;
    justify-content: center;
    height: auto;
    object-fit: scale-down;
  }
}

.contacts {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  .n-button {
    height: 2.2em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);

    a {
      color: #343131;
      margin-left: 4px;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    }

    @media (min-width: 420px) {
      width: 8.6em;
      margin: 0.55em;
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
