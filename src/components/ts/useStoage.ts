import {useStorage} from "@vueuse/core";
import moment from "moment/moment";
import 'moment/dist/locale/en-au.js';
import 'moment/dist/locale/zh-cn.js';


    let browserLang: string = navigator.language.substring(0, 2)
if (navigator.language.substring(0, 2) != "zh" && "en") {
    browserLang = "en"
}



moment.locale(browserLang)

console.log(moment.locales())
const lang: any = useStorage("useLang", browserLang)
export default lang