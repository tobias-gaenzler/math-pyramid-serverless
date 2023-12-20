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
const ERROR_MESSAGE = 'Error while retrieving math pyramid data from the API. Please try again later.';
const WS_URL: string = process.env.REACT_APP_WS_URL ?? '';

const MathPyramidPractice: React.FC<{}> = ({ }) => {
  const [model, setModel] = useState<(Model | null)>();
  const [solved, setSolved] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<string>(
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
    console.log(`Connection state changed to: ${ReadyState[readyState]}`)
  }, [readyState])

  useEffect(() => {
    // Execute when a new WebSocket message is received
    if (lastJsonMessage) {
      console.log(`Received message: ${JSON.stringify(lastJsonMessage)}`)
      if (isBroadcastMessage(JSON.stringify(lastJsonMessage))) {
      } else {
        const newModel = new Model(JSON.parse(JSON.stringify(lastJsonMessage)!) as MathPyramidModelData);
        setModel(newModel)
        setSolved(false)
        setShowErrorMessage(false)
      }
    }
  }, [lastJsonMessage])

  function isBroadcastMessage(jsonMessage: string): boolean {
    return jsonMessage.includes("\"action\":\"message\"");
  }

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
          payload: "Pyramid solved by: "
        })
      }
      setSolved(model.isSolved())
    }
    return inputCorrect
  }

  const restart = () => {
    sendJsonMessage({ action: "start", sender: USER_NAME })
    setShowErrorMessage(false)
  }

  const closePopup = () => {
    setSolved(false)
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
    <Stack spacing={4} justifyContent="center" alignItems="center">
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
      <SuccessDialog open={solved} onClose={closePopup} />
      <Button color="primary" variant="contained" onClick={restart}>
        {model == null ? 'Start' : 'Restart'}
      </Button>
    </Stack>
  )
}

export default MathPyramidPractice
