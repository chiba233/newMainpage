import postData from "@/message/list.json";
import yaml from "js-yaml";
import { ref } from "vue";

interface Post {
  title: string;
  time: string;
  content?: string;
  [key: string]: any;
}

export const posts = ref<Post[]>([]);

export const loadAllPosts = async () => {
  const promises = postData.map(async (name: string) => {
    const url = `/blog/${name}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error(` 请求失败 [${response.status}]: ${url}`);
        return null;
      }

      const yamlText = await response.text();

      return yaml.load(yamlText) as any as Post;
    } catch (err) {
      console.error(`处理 ${name} 出错:`, err);
      return null;
    }
  });
  const results = await Promise.all(promises);
  posts.value = (results.filter((p) => p !== null) as Post[]).sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeB - timeA;
  });
  console.log("最终 posts 结果:", posts.value);
};
