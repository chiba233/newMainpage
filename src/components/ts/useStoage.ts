import {useStorage} from "@vueuse/core";
import moment from "moment/moment";
import 'moment/dist/locale/en-au.js';
import 'moment/dist/locale/zh-cn.js';


let browserLang: string = navigator.language.substring(0, 2)
if (browserLang != "zh" && "en") {
    browserLang = "en"
}

moment.locale(browserLang)

const lang: any = useStorage("useLang", browserLang)
export default lang