import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useRef } from "react";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useUserNameContext } from "./UserNameContextProvider";
import useWebSocket from "react-use-websocket";
import { ConfigService } from "../service/ConfigService";


const WS_URL: string = ConfigService.getConfig("WS_URL");
const PYRAMID_SIZE: string = ConfigService.getConfig("PYRAMID_SIZE");
const MAX_VALUE: string = ConfigService.getConfig("MAX_VALUE");
var setShowErrorMessage: Dispatch<SetStateAction<boolean>>;

export interface WebSocketContextState {
    sendJsonMessage: SendJsonMessage;
    lastJsonMessage: string;
    sendRestart: () => void;
}

export const WebSocketContext = createContext<WebSocketContextState>(
    {} as WebSocketContextState
);

export const useWebSocketContext = (setShowErrorMessageParameter: Dispatch<SetStateAction<boolean>>) => {
    setShowErrorMessage = setShowErrorMessageParameter;
    return useContext(WebSocketContext);
}

const WebSocketContextProvider = (props: { children?: ReactNode }) => {
    const { userName } = useUserNameContext();
    const { sendJsonMessage, lastJsonMessage } = useWebSocket<string>(WS_URL, {
        onOpen: () => {
            console.log("WebSocket connection established");
            sendJsonMessage({
                action: "username",
                sender: userName,
            });
        },
        onError: (event: WebSocketEventMap["error"]): void => {
            console.error(`Error in websocket connection: ${JSON.stringify(event)}`);
            setShowErrorMessage(true);
        },
        share: false,
        shouldReconnect: () => true,
    });

    const sendRestartFunction = () => {
        sendJsonMessage({
            action: "start",
            sender: userName,
            data: { size: PYRAMID_SIZE, maxValue: MAX_VALUE },
        })
    };

    return (
        <WebSocketContext.Provider value={{
            sendJsonMessage: sendJsonMessage,
            lastJsonMessage: lastJsonMessage,
            sendRestart: sendRestartFunction
        }}>
            {props.children}
        </WebSocketContext.Provider>
    );

};

export default WebSocketContextProvider;

