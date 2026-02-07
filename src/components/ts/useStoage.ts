import {useStorage} from "@vueuse/core";
import moment from "moment/moment";
import 'moment/dist/locale/en-au.js';
import 'moment/dist/locale/zh-cn.js';
import type {Ref} from "vue";

let browserLang: string = navigator.language.substring(0, 2)
if (browserLang != "zh" && "en" && "jp") {
    browserLang = "en"
}

export type LangKey = 'zh' | 'en' | 'jp' | 'other';

moment.locale(browserLang)

export const lang: Ref<string> = useStorage("useLang", browserLang)
export const themeColor: Ref<string> = useStorage("setColor", "")

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