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
  <div class="postCardContent" v-if="posts.length > 0">
    <div v-for="post in posts" :key="post.time" class="blockItemCardRoot">
      <div class="blockItemCard">
        <div class="postCardTitle">
          <a>{{ post.title }}</a>
        </div>
        <div class="postCardTime">
          <a>{{ formatDate(post.time) }}</a>
          <a>{{ formatTime(post.time) }}</a>
        </div>
        <div class="postCardIntroduction">
          <div class="img" v-if="post.introductionPic">
            <img :src="post.introductionPic" alt=""/>
          </div>
          <div class="introduction">
            <a>{{ post.introduction }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="posts.length < 0" class="loading">
    正在加载文章中...
  </div>
</template>

<style scoped lang="scss">
.postCardContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.blockItemCardRoot {
  display: flex;
  justify-content: center;
  align-items: center;

  .blockItemCard {
    a{
      color: #343131;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
    }
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.17);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: all 1s;
    width: 45em;
    max-width: 94vw;
    @media (min-width: 420px) {
      border-radius: 15px;
      margin: 0.5em;
      height: 13em;
    }
    @media (max-width: 420px) {
      border-radius: 10px;
      margin: 0.3em;
      height: 20em;
    }

    .postCardTime {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      a {
        text-align: center;
        width: 7em;
      }
    }

    .postCardTitle {
      justify-content: center;
      text-align: center;

      a {
        font-size: 2.2em;
        text-align: center;
        font-weight: bold;
      }
    }

    .CardDetail {
    }

    .postCardIntroduction {
      align-items: center;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      .img {
        padding: 1em;
        flex-shrink: 0;
        // 3. 关键：给图片容器一个基础宽度，并允许它在换行时撑满
        img {
          flex-shrink: 0;
          width: 6em;      // 保持你设定的宽度
          aspect-ratio: 1 / 1;
          height: 6em;
          display: block;
          object-fit: cover; // 核心：图片按比例填充，多余部分自动裁切，不会变形
          border-radius: 8px;
        }
      }
      .introduction{
        display: flex;
        justify-content: center;
        flex: 1;
        min-width: 20em;
        a{
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

    }
  }
}
</style>