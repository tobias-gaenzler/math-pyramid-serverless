import React, { useEffect, useState } from "react";
import { MathPyramidFieldHandler } from "../MathPyramidField/MathPyramidField";
import { Button } from "@mui/material";
import useWebSocket from "react-use-websocket";
import { MathPyramidModelData, Model } from "../../model/Model";
import { GameSolvedDialog } from "../GameSolvedDialog/GameSolvedDialog";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { UserNameProvider } from "../../service/UserNameProvider";
import MathPyramid from "../MathPyramidLayout/MathPyramidLayout";
import { ConfigService } from "../../service/ConfigService";
import { WebSocketService } from "../../service/WebSocketService";

const USER_NAME: string = new UserNameProvider().getUserName();
const WS_URL: string = ConfigService.getConfig("WS_URL");

const MathPyramidGame: React.FC<{}> = () => {
  const [model, setModel] = useState<Model | null>();
  const [solvedBy, setSolvedBy] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);


  const { sendJsonMessage, lastJsonMessage } = useWebSocket<string>(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established");
      sendJsonMessage({
        action: "username",
        sender: USER_NAME,
      });
    },
    onError: (event: WebSocketEventMap["error"]): void => {
      console.error(`Error in websocket connection: ${JSON.stringify(event)}`);
      setShowErrorMessage(true);
    },
    share: false,
    shouldReconnect: () => true,
  });
  const wsService = new WebSocketService(sendJsonMessage, USER_NAME);

  useEffect(() => {
    // Execute when a new WebSocket message is received
    if (lastJsonMessage) {
      const message = JSON.stringify(lastJsonMessage);
      console.log(`Received message: ${message}`);
      if (message.includes('"action":"message"')) {
        setSolvedBy(JSON.parse(message).sender);
        setShowErrorMessage(false);
      } else {
        const newModel = new Model(JSON.parse(message) as MathPyramidModelData);
        setModel(newModel);
        setSolvedBy("");
        setShowErrorMessage(false);
      }
    }
  }, [lastJsonMessage]);

  const inputHandler: MathPyramidFieldHandler = (
    index: number,
    inputValue: string
  ): void => {
    if (
      model &&
      model.solutionValues &&
      model.solutionValues[index].toString() === inputValue
    ) {
      model.userInput[index] = parseInt(inputValue);
      if (model.isSolved()) {
        sendJsonMessage({
          action: "message",
          sender: USER_NAME,
          payload: `Pyramid solved by: ${USER_NAME}`,
        });
      }
    }
  };

  const restart = () => {
    wsService.sendRestart();
  };

  const closePopup = () => {
    setSolvedBy("");
    setModel(null);
  };

  return showErrorMessage ?
    (<ErrorMessage userName={USER_NAME} restart={restart} />)
    :
    (<>
      <div>
        Player name: <b>{USER_NAME}</b>
      </div>
      <MathPyramid model={model} inputHandler={inputHandler} />
      <GameSolvedDialog
        onClose={closePopup}
        solvedBy={solvedBy}
        userName={USER_NAME}
      />
      <Button color="primary" variant="contained" onClick={restart}>
        {model == null ? "Start" : "Restart"}
      </Button>
    </>
    );
};

export default MathPyramidGame;
