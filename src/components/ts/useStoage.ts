import {useStorage} from "@vueuse/core";

let browserLang: string = navigator.language.substring(0, 2)
if (navigator.language.substring(0, 2) != "zh" && "en") {
    browserLang = "en"
}

console.log(browserLang)
const lang: any = useStorage("useLang", browserLang)
export default lang