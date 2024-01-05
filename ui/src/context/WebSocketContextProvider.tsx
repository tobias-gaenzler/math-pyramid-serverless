import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { useUserNameContext } from "./UserNameContextProvider";
import useWebSocket from "react-use-websocket";
import { ConfigService } from "../service/ConfigService";


const WS_URL: string = ConfigService.getConfig("WS_URL");
const PYRAMID_SIZE: string = ConfigService.getConfig("PYRAMID_SIZE");
const MAX_VALUE: string = ConfigService.getConfig("MAX_VALUE");

export interface WebSocketContextState {
    sendSolvedMessage: () => void;
    lastJsonMessage: string;
    sendRestart: () => void;
    showErrorMessage: boolean;
    setShowErrorMessage: Dispatch<SetStateAction<boolean>>;
}

export const WebSocketContext = createContext<WebSocketContextState>(
    {} as WebSocketContextState
);

export const useWebSocketContext = () => useContext(WebSocketContext)

const WebSocketContextProvider = (props: { children?: ReactNode }) => {
    const { userName } = useUserNameContext();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
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

    const sendRestartMessage = () =>
        sendJsonMessage({
            action: "start",
            sender: userName,
            data: { size: PYRAMID_SIZE, maxValue: MAX_VALUE },
        });
    const sendSolvedMessage = () => sendJsonMessage({
        action: "message",
        sender: userName,
        payload: `Pyramid solved by: ${userName}`,
    });

    return (
        <WebSocketContext.Provider value={{
            sendSolvedMessage: sendSolvedMessage,
            lastJsonMessage: lastJsonMessage,
            sendRestart: sendRestartMessage,
            showErrorMessage: showErrorMessage,
            setShowErrorMessage: setShowErrorMessage
        }}>
            {props.children}
        </WebSocketContext.Provider>
    );

};

export default WebSocketContextProvider;

