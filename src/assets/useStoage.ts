import {useStorage} from "@vueuse/core";

const lang = useStorage("useLang", "zh")
export default lang