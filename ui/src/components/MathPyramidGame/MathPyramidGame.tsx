import React, { useEffect, useState } from "react";
import { MathPyramidFieldHandler } from "../MathPyramidField/MathPyramidField";
import { Button } from "@mui/material";
import { MathPyramidModelData, Model } from "../../model/Model";
import { GameSolvedDialog } from "../GameSolvedDialog/GameSolvedDialog";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MathPyramid from "../MathPyramidLayout/MathPyramidLayout";
import { useUserNameContext } from "../../context/UserNameContextProvider";
import { useWebSocketContext } from "../../context/WebSocketContextProvider";


const MathPyramidGame: React.FC<{}> = () => {
  const { userName } = useUserNameContext();
  const [model, setModel] = useState<Model | null>();
  const [solvedBy, setSolvedBy] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { sendJsonMessage, lastJsonMessage, sendRestart } = useWebSocketContext(setShowErrorMessage);

  useEffect(() => {
    // Execute when a new WebSocket message is received
    if (lastJsonMessage) {
      setShowErrorMessage(false);
      const message = JSON.stringify(lastJsonMessage);
      console.log(`Received message: ${message}`);
      if (message.includes('"action":"message"')) {
        setSolvedBy(JSON.parse(message).sender);
      } else {
        const newModel = new Model(JSON.parse(message) as MathPyramidModelData);
        setModel(newModel);
        setSolvedBy("");
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
          sender: userName,
          payload: `Pyramid solved by: ${userName}`,
        });
      }
    }
  };

  const restart = () => {
    sendRestart();
  };

  const closePopup = () => {
    setSolvedBy("");
    setModel(null);
  };

  return showErrorMessage ?
    (<ErrorMessage userName={userName} restart={restart} />)
    :
    (<>
      <div>
        Player name: <b>{userName}</b>
      </div>
      <MathPyramid model={model} inputHandler={inputHandler} />
      <GameSolvedDialog
        onClose={closePopup}
        solvedBy={solvedBy}
        userName={userName}
      />
      <Button color="primary" variant="contained" onClick={restart}>
        {model == null ? "Start" : "Restart"}
      </Button>
    </>
    );
};

export default MathPyramidGame;
