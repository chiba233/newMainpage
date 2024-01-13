import {useStorage} from "@vueuse/core";
import moment from "moment/moment";
import 'moment/dist/locale/en-au.js';
import 'moment/dist/locale/zh-cn.js';
import type {Ref} from "vue";

let browserLang: string = navigator.language.substring(0, 2)
if (browserLang != "zh" && "en") {
    browserLang = "en"
}


moment.locale(browserLang)

export const lang: Ref<string> = useStorage("useLang", browserLang)
export const themeColor: Ref<string> = useStorage("setColor", "")

