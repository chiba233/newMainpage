<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadAllPosts, posts } from "@/components/ts/getBlogYaml";
import { formatTime } from "@/components/ts/useStoage";
import Cancel from "@/icons/cancel.svg";
import { NButton, NCard, NIcon, NImage, NModal } from "naive-ui";
import { parseRichText, stripRichText } from "@/components/ts/blogFormat.ts";
import RichTextRenderer from "@/components/RichTextRenderer.vue";

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
</script>

<template>
  <div v-if="posts.length > 0" class="post-container">
    <article
      v-for="(post,a) in posts"
      :key="a"
      class="post-card"
      @click="() => cardClick(post)"
    >
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
    </article>
  </div>
  <div v-else class="loading-state">
    <div class="loader" />
    <p>正在加载文章中...</p>
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
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  max-height: 90dvh;
}

.n-card__content {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.postCardImg img {
  margin: 1em;
}

$card-bg: rgba(255, 255, 255, 0.15);
$text-color: #343131;
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
  @media (max-width: 600px) {
    max-width: 100%;
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
      color: color.adjust($text-color, $lightness: 20%);
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
  gap: 1.5rem;
  padding: 1rem 1rem 4rem 1rem;
}

.post-card {
  display: flex;
  flex-direction: column;
  width: 20em;
  max-width: 800px;
  background: $card-bg;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: $border-radius;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 0.8rem;
  height: 15em;
  transition: transform $transition-speed ease,
  box-shadow $transition-speed ease;

  @media (max-width: 600px) {
    width: 95vw;
    height: 18.8em;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }

  .post-header {
    text-align: center;
    margin-bottom: 1rem;

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
      color: color.adjust($text-color, $lightness: 50%);
      display: flex;
      justify-content: center;
      gap: 0.5rem;

      .time-divider {
        opacity: 0.5;
      }
    }
  }

  .post-body {
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
    overflow: hidden;
    flex: 1;

    // 移动端自动转为垂直布局
    @media (max-width: 600px) {
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
        line-height: 1.6;
        font-size: 0.8rem;
        word-break: break-all;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 7;
        overflow: hidden;
        box-orient: vertical; //test values
        line-clamp: 7;
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
  color: #666;
}
</style>
