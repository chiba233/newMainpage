import yaml from "js-yaml";
import { ref } from "vue";

interface Post {
  title: string;
  time: string;
  content?: string;
  [key: string]: any;
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
export const serverError = ref(false);
export const faultTimes = ref(0);
export const loadError = ref<boolean>(false);
export const yamlLoadingFault = ref(false);
export const yamlLoading = ref(false);
export const yamlRetrying = ref(false);

async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retry = 5,
  delay = 800,
): Promise<Response> {
  try {
    yamlRetrying.value = false;
    const res = await fetch(url, options);
    if (!res.ok) {
      // 服务器响应但失败（404 / 500 等）
      yamlRetrying.value = false;
      serverError.value = true;
    }

    return res;
  } catch (err) {
    if (retry <= 0) {
      yamlRetrying.value = false; // retry 结束
      loadError.value = true;
      throw err;
    }
    yamlRetrying.value = true;
    faultTimes.value = retry;
    await sleep(delay);

    return fetchWithRetry(url, options, retry - 1, delay * 2);
  }
}

export const posts = ref<Post[]>([]);
const LIST_URL = "https://raw.githubusercontent.com/chiba233/newMainpage/refs/heads/master/public/blog/list.json";


export const loadAllPosts = async () => {
  yamlLoading.value = true;        // ⬅ 开始加载
  yamlLoadingFault.value = false;
  faultTimes.value = 0;

  const listRes = await fetchWithRetry(LIST_URL, undefined, 3, 800);
  const postData: string[] = await listRes.json();

  const promises = postData.map(async (name: string) => {
    const url = `https://raw.githubusercontent.com/chiba233/newMainpage/refs/heads/master/public/blog/${name}`;

    try {
      const response = await fetchWithRetry(url, undefined, 3, 800);
      const yamlText = await response.text();
      return yaml.load(yamlText) as Post;
    } catch {
      yamlLoadingFault.value = true;
      return null;
    }
  });

  const results = await Promise.all(promises);

  const validPosts = results.filter((p): p is Post => p !== null);

  posts.value = validPosts.sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeB - timeA;
  });

  if (posts.value.length === 0) {
  } else {
    yamlLoading.value = false;  // ✅ 有数据 = 正常结束

  }
};
