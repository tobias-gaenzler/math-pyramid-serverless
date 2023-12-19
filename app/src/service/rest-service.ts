import axios from "axios"
import { MathPyramidModelData } from "../common/Model"


const API_BASE: string | undefined = process.env.REACT_APP_API_BASE


export class RestService {
    async getMathPyramidModel(size: number, maxValue: number): Promise<MathPyramidModelData> {
        return axios
            .post<MathPyramidModelData>(`${API_BASE}?size=${size}&maxValue=${maxValue}`)
            .then((response) => {
                if (response !== null && response.data !== null && response.data.size !== null && response.data.solution !== null && response.data.startValues !== null) {
                    return response.data
                } else {
                    throw new Error(`Invalid response from math pyramid api endpoint: ${JSON.stringify(response)}.`)
                }
            })
            .catch((error) => {
                throw new Error(`Could not get math pyramid data from API: ${error}`)
            })
    }
}