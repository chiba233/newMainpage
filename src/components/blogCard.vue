<script setup lang="ts">
import {onMounted} from "vue";
import {loadAllPosts, posts} from "@/components/ts/getBlogYaml"
import {formatTime} from "@/components/ts/useStoage";

onMounted(async () => {
  await loadAllPosts();
});

const formatDate = (t: string) => {
  return `${t.slice(0, 4)} - ${t.slice(4, 6)} - ${t.slice(6, 8)}`;
};
import { ref } from 'vue';

// 用来存储当前被点击的那篇文章的所有数据
const selectedPost = ref(null);

// 点击卡片时调用的函数
const handleCardClick = (posts:any) => {
  selectedPost.value = posts; // 将点击的当前 post 对象赋值给 selectedPost
  console.log(selectedPost.value);
};

// 关闭弹窗的函数
const closePortal = () => {
  selectedPost.value = null; // 清空数据，弹窗自然消失
};

</script>

<template>
  <div class="post-container" v-if="posts.length > 0">
    <article v-for="post in posts" :key="post.time" class="post-card" @click="handleCardClick(post)">
      <div class="post-header">
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-meta">
          <time :datetime="post.time">{{ formatDate(post.time) }}</time>
          <span class="time-divider">|</span>
          <span>{{ formatTime(post.time) }}</span>
        </div>
      </div>

      <div class="post-body">
        <div class="post-image" v-if="post.blocks?.some((b:any) => b.type === 'image')">
          <img
              :src="post.blocks.find((b:any) => b.type === 'image')?.content"
              :alt="post.title"
              loading="lazy"
          />
        </div>
        <div class="post-description">
          <p>
            {{
              (post.blocks || [])
                  .filter((b:any) => b.type === 'text')
                  .map((b:any)  => b.content)
                  .join(' ')
            }}
          </p>
        </div>
      </div>

    </article>
  </div>

  <div v-else class="loading-state">
    <div class="loader"></div>
    <p>正在加载文章中...</p>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";
// 定义变量，方便统一修改
$card-bg: rgba(255, 255, 255, 0.15);
$text-color: #343131;
$border-radius: 16px;
$transition-speed: 0.3s;

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
  width: 15em;
  max-width: 800px;
  background: $card-bg;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: $border-radius;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 0.8rem;
  height: 15em;
  transition: transform $transition-speed ease, box-shadow $transition-speed ease;

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
      font-size: 1.75rem;
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
        font-size: 1rem;
        word-break: break-all;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
      }
    }
  }
}

.loading-state {
  text-align: center;
  padding: 4rem;
  color: #666;
}
</style>