import yaml from "js-yaml";
import { ref } from "vue";
// 1. 引入配置文件 (或者直接在这里定义 const yamlUrl = { ... })
import yamlUrl from "@/data/components/yamlUrl.json";

interface BaseContent {
  time?: string;

  [key: string]: any;
}

export interface Post {
  time?: string;
  title?: string;
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
      yamlRetrying.value = false;
      serverError.value = true;
    }
    return res;
  } catch (err) {
    if (retry <= 0) {
      yamlRetrying.value = false;
      loadError.value = true;
      throw err;
    }
    yamlRetrying.value = true;
    faultTimes.value = retry;
    await sleep(delay);
    return fetchWithRetry(url, options, retry - 1, delay * 2);
  }
}

export const loadAllPosts = async <T extends BaseContent>(type: keyof typeof yamlUrl) => {
  yamlLoading.value = true;
  yamlLoadingFault.value = false;
  faultTimes.value = 0;
  const { listUrl, url: baseUrl } = yamlUrl[type];
  const listRes = await fetchWithRetry(listUrl, undefined, 3, 800);
  console.log(listUrl, baseUrl);
  const postData = (await listRes.json()) as string[];
  const promises = postData.map(async (name: string) => {
    const url = `${baseUrl}${name}`;

    try {
      const response = await fetchWithRetry(url, undefined, 3, 800);
      const yamlText = await response.text();
      return yaml.load(yamlText) as T;
    } catch {
      yamlLoadingFault.value = true;
      return null;
    }
  });

  const results = await Promise.all(promises);
  const validData = results.filter((p): p is NonNullable<typeof p> => p !== null);
  validData.sort((a, b) => {
    const timeA = (a as BaseContent).time;
    const timeB = (b as BaseContent).time;

    if (timeA && timeB) {
      return new Date(timeB).getTime() - new Date(timeA).getTime();
    }
    return 0;
  });

    yamlLoading.value = false;
  return validData;
};