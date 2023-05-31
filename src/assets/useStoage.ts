import {useStorage} from "@vueuse/core";

const lang:any = useStorage("useLang", "zh")
export default lang