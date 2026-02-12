<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  faultTimes,
  loadAllPosts,
  loadError,
  posts,
  serverError,
  yamlLoading,
  yamlLoadingFault,
  yamlRetrying,
} from "@/components/ts/getBlogYaml";
import { formatTime, lang } from "@/components/ts/useStoage";
import Cancel from "@/icons/cancel.svg";
import { NAlert, NButton, NCard, NIcon, NImage, NModal } from "naive-ui";
import { parseRichText, stripRichText } from "@/components/ts/blogFormat.ts";
import RichTextRenderer from "@/components/RichTextRenderer.vue";
import { useCardGlow } from "@/components/ts/animationCalculate.ts";

const serverFaultI18N: Record<string, string> = {
  zh: "GitHub服务器连接失败。",
  ja: "github サーバー接続に失敗しました。！",
  en: "github Server connection failed.",
  other: "github Server connection failed.",
};
const loadErrorI18N: Record<string, string> = {
  zh: "无法连接，已超过重试次数。",
  ja: "接続はできません。再試行回数を超過しました。",
  en: "Unable to connect; the number of retries has been exceeded.",
  other: "Unable to connect; the number of retries has been exceeded.",
};
const yamlRetryingI18N: Record<string, string> = {
  zh: "连接失败，重试中。请尝试切换互联网或检查代理软件。",
  ja: "接続に失敗しました。再試行しています。\nネットワーク接続の切り替えやプロキシソフトウェアの確認をお試しください。",
  en: "Connection failed, retrying.\nPlease try switching your internet connection or check if your proxy software is working properly.",
  other: "Connection failed, retrying.\nPlease try switching your internet connection or check if your proxy software is working properly.",
};

const retryI18N: Record<string, string> = {
  zh: "剩余重试次数为",
  ja: "残りの再試行回数は",
  en: "The remaining number of retries is",
  other: "The remaining number of retries is",
};
const loadingI18N: Record<string, string> = {
  zh: "加载中。",
  ja: "読み込み。",
  en: "Loading...",
  other: "Loading...",
};

onMounted(async () => {
  await loadAllPosts();
});

const formatDate = (t: string) => {
  return `${t.slice(0, 4)} - ${t.slice(4, 6)} - ${t.slice(6, 8)}`;
};


const selectedPost = ref();
const showModal = ref(false);

const cardClick = (posts: Record<string, unknown>) => {
  selectedPost.value = posts;
  showModal.value = showModal.value === false;
};

const closePortal = () => {
  showModal.value = false;
};

const { onMove, onLeave } = useCardGlow();

</script>

<template>
  <div v-if="!yamlLoading" class="post-container">
    <article
      v-for="(post,a) in posts"
      :key="a"
      class="post-card"
      @mouseleave="onLeave" @mousemove="onMove"
      @click="() => cardClick(post)"
    >
      <div class="content">
      <div class="post-header">
        <h2 class="post-title">
          {{ post.title }}
        </h2>
        <div class="post-meta">
          <time :datetime="post.time">{{ formatDate(post.time) }}</time>
          <span class="time-divider">|</span>
          <span>{{ formatTime(post.time) }}</span>
        </div>
      </div>

      <div class="post-body">
        <div v-if="post.blocks?.some((b: any) => b.type === 'image')" class="post-image">
          <img
            :src="post.blocks.find((b: any) => b.type === 'image')?.content?.[0].src"
            :alt="post.title"
            loading="lazy"
          />
        </div>
        <div class="post-description">
          <p>
            {{
              (post.blocks || [])
                .filter((b: any) => b.type === "text" || b.type === "center")
                .map((b: any) => stripRichText(b.content))
                .join(" ")
            }}
          </p>
        </div>
      </div>
      </div>
    </article>
  </div>
  <div v-else class="loading-state">
    <div class="loader">
      <n-alert v-if="serverError" title="Error" type="error">
        {{ serverFaultI18N[lang] }}
      </n-alert>
      <n-alert v-else-if="loadError" title="Error" type="error">
        {{ loadErrorI18N[lang] }}
      </n-alert>
      <n-alert v-else-if="yamlLoadingFault" title="Error" type="error">
        {{ serverFaultI18N[lang] }}
      </n-alert>
      <n-alert v-else-if="yamlRetrying " title="Warning" type="warning">
        {{ yamlRetryingI18N[lang] }} {{ retryI18N[lang] }} {{ faultTimes }}
      </n-alert>
      <p v-else>
        {{ loadingI18N[lang] }}
      </p>
  </div>
  </div>

  <n-modal v-show="showModal" v-model:show="showModal">
    <n-card class="postModel" :title="selectedPost!.title" size="huge">
      <template #header-extra>
        <n-button tertiary circle @click="closePortal">
          <template #icon>
            <n-icon size="20">
              <Cancel></Cancel>
            </n-icon>
          </template>
        </n-button>
      </template>
      <div class="postCardMain">
        <div class="postCardMeta">
          <time :datetime="selectedPost.time">{{ formatDate(selectedPost.time) }}</time>
          <span class="time-divider">|</span>
          <span>{{ formatTime(selectedPost.time) }}</span>
        </div>
        <div v-for="(block,a) in selectedPost.blocks" :key="a" class="postCardBody">
          <div v-if="block.type === 'image'" class="postCardImage">
            <div v-for="img in block.content" :key="img.src" class="postCardNImage">
              <n-image
                v-if="img.src"
                width="120"
                :src="img.src"
                class="postCardImg"
              />
              <div v-if="img.desc" class="postCardImageDesc">
                <span>{{ img.desc }}</span>
              </div>
            </div>
          </div>

          <div v-if="block.type === 'text'" class="postCardText" @click="console.log(parseRichText(block.content))">
            <RichTextRenderer :tokens="parseRichText(block.content)" />
          </div>

          <div v-else-if="block.type === 'center'" class="center-text">
            <RichTextRenderer :tokens="parseRichText(block.content)" />
          </div>
          <div
            v-else-if="block.type === 'effect'"
            class="post-effect"
          >
            {{ block.content }}
          </div>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<style lang="scss">
@use "sass:color";

.postCardImageDesc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: pre-line;
  text-align: center;

}

.n-modal-container .postModel {
  border-radius: 1.5em;
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  max-height: 84.4dvh;
}

.n-card__content {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.postCardImg img {
  margin: 1em;
}

$card-bg: rgba(255, 255, 255, 0.3);
$text-color: #191919;
$border-radius: 16px;
$transition-speed: 0.3s;

.postCardImage {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;

  .postCardNImage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    justify-content: center;
    align-content: center;

    .postCardImg img {
      margin: 0 !important;
      border-radius: 8px;
    }
  }

  .postCardImageDesc {
    margin-top: 0.5rem;

    span {
      font-size: 0.9rem;
      color: #666;
      text-align: center;
      display: block;
      word-break: break-all;
    }
  }
}

.postModel {
  margin-bottom: 4em;
  margin-top: 4em;
  max-width: 85%;
  @media (max-width: 900px) {
    max-width: 98%;
  }

  .postCardMain {
    flex-direction: column;
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 1.05rem;

    .postCardMeta {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.92rem;
      color: color.adjust($text-color, $lightness: 90%);
      margin-bottom: 0.5rem;
    }
  }
}



.center-text {
  font-size: 1.1rem;
}

.post-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.5rem 4rem 0.5rem;
}

.content {
  position: relative;
  z-index: 10; // 必须高于伪元素
  width: 100%;
}

.post-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: $card-bg;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: $border-radius;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 0.8rem;

  // 核心变量
  --mx: -100px;
  --my: -100px;
  --opacity: 0; // 默认光是隐藏的
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, background-color 0.3s;

  @media (max-width: 900px) {
    height: 16.45rem;
  }
  @media (min-width: 900px) {
    width: 25rem;
    height: 12.9rem;
  }
  // 1. 面光 (Surface Glow) - 柔和的大范围光晕
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: radial-gradient(
        800px circle at var(--mx) var(--my),
        rgba(255, 255, 255, 0.15),
        transparent 40%
    );
    opacity: var(--opacity);
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  // 2. 边框光 (Border Glow)
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px; // 边框粗细

    // 1. 定义遮罩源（IDE 现在能理解 mask-image 接受渐变了）
    // noinspection CssInvalidPropertyValue
    -webkit-mask-image: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0);
    mask-image: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0);

    // 2. 分别指定裁剪区域
    // 第一层对应 content-box，第二层对应 border-box
    // noinspection CssInvalidPropertyValue
    -webkit-mask-clip: content-box, border-box;
    mask-clip: content-box, border-box;

    // 3. 核心：排除操作
    // Webkit 使用 xor，标准使用 exclude
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    // 4. 背景光斑逻辑（保持不变）
    background: radial-gradient(
        150px circle at var(--mx) var(--my),
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0.3) 30%,
        transparent 70%
    );

    z-index: 2;
    opacity: var(--opacity);
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
  .post-header {
    text-align: center;
    margin-bottom: 0.5rem;

    .post-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: $text-color;
      margin: 0 0 0.5rem 0;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .post-meta {
      font-size: 0.9rem;
      color: color.adjust($text-color, $lightness: 90%);
      display: flex;
      justify-content: center;
      gap: 0.3rem;

      .time-divider {
        opacity: 0.5;
      }
    }
  }

  .post-body {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    overflow: hidden;
    flex: 1;

    // 移动端自动转为垂直布局
    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
    }

    .post-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 120px;

      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }

    .post-description {
      display: flex;
      flex: 1;
      min-width: 0;

      p {
        max-height: 100%;
        margin: 0;
        color: $text-color;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        line-height: 1.4;
        font-size: 0.8rem;
        word-break: break-all;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        box-orient: vertical; //test values
        @media (max-width: 900px) {
          -webkit-line-clamp: 4;
          line-clamp: 4;
      }
        @media (min-width: 900px) {
          -webkit-line-clamp: 8;
          line-clamp: 8;
        }
      }
    }
  }
}

.postCardText {
  span, strong, span, u, del {
    font-size: 1.2rem;
    white-space: pre-line;
  }
}

.loading-state {
  text-align: center;
  padding: 4rem;
  color: $text-color;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
  font-size: 2em;
}
</style>
