import React, { useEffect, useState } from "react"
import "./MathPyramidPractice.css"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import MathPyramidField, {
  MathPyramidFieldHandler,
} from "../MathPyramidField/MathPyramidField"
import {
  Button,
} from "@mui/material"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { MathPyramidModelData, Model } from "../../common/Model"
import { SuccessDialog } from "../SuccessDialog/SuccessDialog"
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = { dictionaries: [names] };
const USER_NAME: string = uniqueNamesGenerator(config);
const ERROR_MESSAGE: string = 'Error while retrieving math pyramid data from API. Please try again later.';
const WS_URL: string = process.env.REACT_APP_WS_URL ?? '';
const PYRAMID_SIZE = 3;
const MAX_VALUE = 100;

const MathPyramidPractice: React.FC<{}> = ({ }) => {
  const [model, setModel] = useState<(Model | null)>();
  const [solvedBy, setSolvedBy] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<string>(
    WS_URL,
    {
      onOpen: () => {
        console.log('WebSocket connection established');
        sendJsonMessage({
          action: "username",
          sender: USER_NAME
        })
      },
      onError: (error) => {
        console.log(`Error in websocket connection: ${error}`);
        setShowErrorMessage(true);
      },
      share: false,
      shouldReconnect: () => true
    },
  )

  useEffect(() => {
    // Execute when a new WebSocket message is received
    if (lastJsonMessage) {
      const message = JSON.stringify(lastJsonMessage)
      console.log(`Received message: ${message}`)
      if (message.includes("\"action\":\"message\"")) {
        setSolvedBy(JSON.parse(message).sender);
      } else {
        const newModel = new Model(JSON.parse(message) as MathPyramidModelData);
        setModel(newModel)
        setSolvedBy("")
        setShowErrorMessage(false)
      }
    }
  }, [lastJsonMessage])

  const inputHandler: MathPyramidFieldHandler = (
    index: number,
    inputValue: string
  ): boolean => {
    if (!model || !model.solutionValues) {
      return false;
    }
    const inputCorrect = (model.solutionValues[index].toString() === inputValue)
    if (inputCorrect) {
      model.userInput[index] = parseInt(inputValue)
      const isSolved = model.isSolved()
      if (isSolved) {
        sendJsonMessage({
          action: "message",
          sender: USER_NAME,
          payload: `Pyramid solved by: ${USER_NAME}`
        })
      }
    }
    return inputCorrect
  }

  const restart = () => {
    sendJsonMessage({ action: "start", sender: USER_NAME, data: { size: PYRAMID_SIZE, maxValue: MAX_VALUE } });
    setShowErrorMessage(false)
  }

  const closePopup = () => {
    setSolvedBy("");
    setModel(null);
  }

  function getRows() {
    const rows: React.ReactElement[] = []
    if (!model) {
      return rows;
    }

    for (let row = model.size - 1; row >= 0; row--) {
      const fields: React.ReactElement[] = getFieldsForRow(row)
      rows.push(
        <Box key={row} className="row">
          {fields}
        </Box>
      )
    }
    return rows
  }

  function getFieldsForRow(row: number) {
    const fields: React.ReactElement[] = []
    if (!model) {
      return fields;
    }

    for (let column = 0; column < model.size - row; column++) {
      const index = model.getIndex(row, column)
      fields.push(
        <MathPyramidField
          key={index}
          index={index}
          model={model}
          inputHandler={inputHandler}
        />
      )
    }
    return fields
  }

  return showErrorMessage ? (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center">
      <div>
        My name: {USER_NAME}
      </div>
      <div>
        {ERROR_MESSAGE}
      </div>
      <Button color="primary" variant="contained" onClick={restart}>
        Try again
      </Button>
    </Stack>
  ) : (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center"
      className="math-pyramid"
    >
      <div>
        My name: {USER_NAME}
      </div>
      {getRows()}
      <SuccessDialog onClose={closePopup} solvedBy={solvedBy} userName={USER_NAME} />
      <Button color="primary" variant="contained" onClick={restart}>
        {model == null ? 'Start' : 'Restart'}
      </Button>
    </Stack>
  )
}

export default MathPyramidPractice
