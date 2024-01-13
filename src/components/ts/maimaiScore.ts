import axios from 'axios'
import maiData from '../../message/maimai.json'
import {useMaiData} from "@/components/ts/useStoage";

const maiUrl: string = 'https://' + maiData.baseUrl + '/api/game/maimai2/profile?aimeId=' + maiData.aimeID


export async function getMaiMaiData() {
    try {
        const response: Record<string, any> = await axios.get(maiUrl);
        return response.data

    } catch (error) {
        return useMaiData.value
    }
}