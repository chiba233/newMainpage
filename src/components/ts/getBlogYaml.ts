import yaml from "js-yaml";
import { ref } from "vue";

interface Post {
  title: string;
  time: string;
  content?: string;
  [key: string]: any;
}

export const posts = ref<Post[]>([]);
const LIST_URL = "https://raw.githubusercontent.com/chiba233/newMainpage/refs/heads/master/public/blog/list.json";

export const loadAllPosts = async () => {
  const listRes = await fetch(LIST_URL);
  if (!listRes.ok) console.log("error request list");

  const postData: string[] = await listRes.json();
  const promises = postData.map(async (name: string) => {
    const url = `https://raw.githubusercontent.com/chiba233/newMainpage/refs/heads/master/public/blog/${name}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log(` 请求失败 [${response.status}]: ${url}`);
        return null;
      }

      const yamlText = await response.text();

      return yaml.load(yamlText) as any as Post;
    } catch (err) {
      console.log(`处理 ${name} 出错:`, err);
      return null;
    }
  });
  const results = await Promise.all(promises);
  posts.value = (results.filter((p) => p !== null)).sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeB - timeA;
  });
};
