import {useStorage} from "@vueuse/core";
import moment from "moment/moment";
import 'moment/dist/locale/en-au.js';
import 'moment/dist/locale/zh-cn.js';
import 'moment/locale/ja.js'
import type {Ref} from "vue";

const rawLang = navigator.language.substring(0, 2);
// 如果 rawLang 是 zh/en/jp，就用它；否则统一降级为 en
export const browserLang = ["zh", "en", "ja"].includes(rawLang) ? rawLang : "en";
export const lang: Ref<string> = useStorage("useLang", browserLang)
export const themeColor: Ref<string> = useStorage("setColor", "")

export type LangKey = 'zh' | 'en' | 'ja' | 'other';

// 必须确保这些语言包被载入
import 'moment/dist/locale/zh-cn';
import 'moment/dist/locale/en-au';
import 'moment/locale/ja';

const localeMap: Record<string, string> = {
    zh: 'zh-cn',
    en: 'en-au',
    ja: 'ja'
};



// 导出一个专门格式化时间的工具
export const formatTime = (date: any) => {
    // 关键：在这里直接读取 lang.value，建立响应式依赖
    const currentLocale = localeMap[lang.value] || 'en';
    return moment(date).locale(currentLocale).fromNow();
};


//import i18nZH from "../../message/i18nZh.json"
//import i18nEN from "../../message/i18nEn.json"

//type LocalizationMessages = {
//    [key: string]: string;
//};

//type Lang = 'en' | 'zh'


//export function t(key: keyof LocalizationMessages, variables?: { [index: string]: string }) {
//    if (variables) {
//        return msgs[lang][key].replace(/\${(.*?)}/g, (_: string, v: string | number) => variables[v])
//    }
//    return msgs[lang][key]
//}