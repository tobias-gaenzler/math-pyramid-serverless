import React, { useEffect, useRef, useState } from "react"
import "./MathPyramidPractice.css"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import MathPyramidField, {
  MathPyramidFieldHandler,
} from "../MathPyramidField/MathPyramidField"
import {
  Button,
} from "@mui/material"
import { Model } from "../../common"
import { SuccessDialog } from ".."
import useWebSocket, { ReadyState } from "react-use-websocket"
import { RestService } from "../../service/rest-service";


type MathPyramidPracticeProps = {
  size: number
  maxValue: number
}

const ERROR_MESSAGE = 'Error while retrieving math pyramid data from the API. Please try again later.'
const WS_URL = "ws://127.0.0.1:3002"

const MathPyramidPractice: React.FC<MathPyramidPracticeProps> = ({ size, maxValue }: MathPyramidPracticeProps) => {
  const [model, setModel] = useState<(Model | null)>();
  const [solved, setSolved] = useState<boolean>(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const initialized = useRef<boolean>(false);
  const restService: RestService = new RestService();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      getMathPyramidData(size, maxValue);
    }
  }, []);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log(`Connection state changed to: ${readyState}`)
    if (readyState === ReadyState.OPEN) {
      console.log("Connection is OPEN")
      // sendJsonMessage({
      //   event: "subscribe",
      //   data: {
      //     channel: "general-chatroom",
      //   },
      // })
    } else if (readyState === ReadyState.CLOSED) {
      console.log("Connection is CLOSED")
    }
  }, [readyState])

  // Run when a new WebSocket message is received
  useEffect(() => {
    if (lastJsonMessage) {
      console.log(`Got a new message: ${lastJsonMessage}`)
    }
  }, [lastJsonMessage])

  const inputHandler: MathPyramidFieldHandler = (
    index: number,
    inputValue: string
  ): boolean => {
    if (!model || !model.solution) {
      return false;
    }
    const inputCorrect = (model.solution[index].toString() === inputValue)
    if (inputCorrect) {
      model.userInput[index] = parseInt(inputValue)
      setSolved(model.isSolved())
    }
    return inputCorrect
  }

  const restart = () => {
    getMathPyramidData(size, maxValue);
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

  function getMathPyramidData(
    size: number,
    maxValue: number
  ): void {
    restService
      .getMathPyramidModel(size, maxValue)
      .then((data) => {
        setModel(new Model(data))
        setShowErrorMessage(false)
      })
      .catch((error) => {
        setShowErrorMessage(true)
        console.error(`Could not get math pyramid data from API: ${error}`)
      })
  }

  return showErrorMessage ? (
    <Stack spacing={4} justifyContent="center" alignItems="center">
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
      {getRows()}
      <SuccessDialog open={solved} onClose={closePopup} />
      <Button color="primary" variant="contained" onClick={restart}>
        {model == null ? 'Fetching Data ...' : 'Restart'}
      </Button>
    </Stack>
  )
}

export default MathPyramidPractice
