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


</script>

<template>
  <div class="post-container" v-if="posts.length > 0">
    <article v-for="post in posts" :key="post.time" class="post-card">
      <div class="post-header">
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-meta">
          <time :datetime="post.time">{{ formatDate(post.time) }}</time>
          <span class="time-divider">|</span>
          <span>{{ formatTime(post.time) }}</span>
        </div>
      </div>

      <div class="post-body">
        <div class="post-image" v-if="post.introductionPic">
          <img :src="post.introductionPic" :alt="post.title" loading="lazy" />
        </div>
        <div class="post-description">
          <p>{{ post.introduction }}</p>
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
  padding: 1rem;
}

.post-card {
  width: 15em;
  max-width: 800px;
  background: $card-bg;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: $border-radius;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 15em;
  transition: transform $transition-speed ease, box-shadow $transition-speed ease;

  @media (max-width: 600px) {
    width: 95vw;
    height: 20em;
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
    }

    .post-meta {
      font-size: 0.9rem;
      color: lighten($text-color, 50%);
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
    gap: 1.5rem;
    align-items: flex-start;

    // 移动端自动转为垂直布局
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }

    .post-image {
      flex-shrink: 0;

      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    }

    .post-description {
      flex: 1;

      p {
        margin: 0;
        color: $text-color;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        line-height: 1.6;
        font-size: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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