import lang from "@/assets/useStoage";

let zh: boolean = false
let en: boolean = false

if (lang.value == "zh") {
    zh = true
}
if (lang.value == "en") {
    en = true

}
export {zh, en}