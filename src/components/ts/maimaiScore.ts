import axios from 'axios'
import maiData from '../../message/maimai.json'
import {type Ref, ref} from "vue";
import {useStorage} from "@vueuse/core";

const firstData: Ref = ref("")

const maiUrl: string = 'https://' + maiData.baseUrl + '/api/game/maimai2/profile?aimeId=' + maiData.aimeID

interface UserData {
    value: any;
    userName: Ref<string>; // "好DDX"
    iconId: Ref<number>; // 10
    plateId: Ref<number>; // 50702
    titleId: Ref<number>; // 6159
    partnerId: Ref<number>; // 28
    frameId: Ref<number>; // 300501
    selectMapId: Ref<number>; // 300005
    totalAwake: Ref<number>; // 155
    gradeRating: Ref<number>; // 0
    musicRating: Ref<number>; // 14561
    playerRating: Ref<number>; // 14561
    highestRating: Ref<number>; // 14561
    gradeRank: Ref<number>; // 0
    classRank: Ref<number>; // 0
    courseRank: Ref<number>; // 0
    charaSlot: Ref<number[]>; // [350103, 306101, 350101, 400101, 300101]
    charaLockSlot: Ref<number[]>; // [350103, 306101, 350101, 400101, 300101]
    playCount: Ref<number>; // 849
    eventWatchedDate: Ref<string>; // "2024-01-11 23:53:37.0"
    lastRomVersion: Ref<string>; // "1.40.05"
    lastDataVersion: Ref<string>;// "1.40.05"
    lastPlayDate: Ref<string>; // "2024-01-12 00:10:11.0"
    playVsCount: Ref<number>;// 0
    playSyncCount: Ref<number>; // 0
    winCount: Ref<number>; // 0
    helpCount: Ref<number>; // 0
    comboCount: Ref<number>;// 0
    totalDeluxscore: Ref<number>; // 1282460
    totalBasicDeluxscore: Ref<number>; // 1827
    totalAdvancedDeluxscore: Ref<number>; // 59364
    totalExpertDeluxscore: Ref<number>; // 534798
    totalMasterDeluxscore: Ref<number>; // 630609
    totalReMasterDeluxscore: Ref<number>; // 55862
    totalSync: Ref<number>;// 80
    totalBasicSync: Ref<number>; // 10
    totalAdvancedSync: Ref<number>; // 5
    totalExpertSync: Ref<number>; // 65
    totalMasterSync: Ref<number>; // 0
    totalReMasterSync: Ref<number>; // 0
    totalAchievement: Ref<number>; // 833198365
    totalBasicAchievement: Ref<number>; // 5340043
    totalAdvancedAchievement: Ref<number>;// 72782251
    totalExpertAchievement: Ref<number>; // 392005089
    totalMasterAchievement: Ref<number>; // 334866298
    totalReMasterAchievement: Ref<number>; // 28204684
}

export async function getMaiMaiData() {
    try {
        const response: Record<string, any> = await axios.get(maiUrl);
        return response.data

    } catch (error) {
        return useMaiData.value
    }
}

export const useMaiData:Ref<UserData> = useStorage("setMaiScore", firstData)
getMaiMaiData().then(data => {
    useMaiData.value = data
    firstData.value = data
    console.log(useMaiData)
});