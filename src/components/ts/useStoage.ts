import { useStorage } from "@vueuse/core";
import moment from "moment/moment";
import "moment/dist/locale/en-au.js";
import "moment/dist/locale/zh-cn.js";
import "moment/locale/ja.js";
import type { Ref } from "vue";

const rawLang = navigator.language.substring(0, 2);
export const browserLang = ["zh", "en", "ja"].includes(rawLang) ? rawLang : "zh";
export const lang: Ref<string> = useStorage("useLang", browserLang);
export const themeColor: Ref<string> = useStorage("setColor", "");

export type LangKey = "zh" | "en" | "ja" | "other";

// 必须确保这些语言包被载入
import "moment/dist/locale/zh-cn";
import "moment/dist/locale/en-au";
import "moment/locale/ja";

const localeMap: Record<string, string> = {
  zh: "zh-cn",
  en: "en-au",
  ja: "ja",
};

export const langMap: Record<string, string> = {
  zh: "zh",
  en: "en",
  ja: "ja",
  other: "other",
};

// 导出一个专门格式化时间的工具
export const formatTime = (date: any) => {
  // 关键：在这里直接读取 lang.value，建立响应式依赖
  const currentLocale = localeMap[lang.value] || "en";
  return moment(date).locale(currentLocale).fromNow();
};
