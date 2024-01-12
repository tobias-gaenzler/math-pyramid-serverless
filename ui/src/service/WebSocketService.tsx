import { SendJsonMessage } from "react-use-websocket/dist/lib/types"
import { ConfigService } from "./ConfigService"

const PYRAMID_SIZE: string = ConfigService.getConfig("PYRAMID_SIZE")
const MAX_VALUE: string = ConfigService.getConfig("MAX_VALUE")

class WebSocketService {
    sendJsonMessage: SendJsonMessage
    userName: string

    constructor(
        sendJsonMessage: SendJsonMessage,
        userName: string
    ) {
        this.sendJsonMessage = sendJsonMessage
        this.userName = userName
    }

    sendRestart(): void {
        this.sendJsonMessage({
            action: "start",
            sender: this.userName,
            data: { size: PYRAMID_SIZE, maxValue: MAX_VALUE },
        })
    }
}

export { WebSocketService }
