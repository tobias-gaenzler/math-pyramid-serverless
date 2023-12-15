import React, { useEffect, useRef, useState } from "react"
import axios from 'axios';
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

type MathPyramidPracticeProps = {
  size: number
  maxValue: number
}

interface MathPyramidModelData {
  size: number;
  solution: number[];
  startValues: number[];
}

const errorMessage = 'Could not retrieve math pyramid data from the API. Please try again later.'

const MathPyramidPractice: React.FC<MathPyramidPracticeProps> = ({ size, maxValue }: MathPyramidPracticeProps) => {
  const [model, setModel] = useState<(Model | null)>();
  const [solved, setSolved] = useState<boolean>(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      getMathPyramidData(size, maxValue);
    }
  }, []);

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
    //console.log(`In input handler of field ${index}, inputValue: '${inputValue}', correct: ${inputCorrect}`)
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
    axios
      .get<MathPyramidModelData>(`http://localhost:3001/hello?size=${size}&maxValue=${maxValue}`)
      .then((response) => {
        if (response && response.data) {
          setModel(new Model(response.data.size, response.data.solution, response.data.startValues));
          setShowErrorMessage(false);
        } else {
          throw new Error(`Invalid response from math pyramid api endpoint: ${JSON.stringify(response)}.`);
        }
      })
      .catch((error) => {
        console.error(`Could not get math pyramid data from API: ${error}`);
        setShowErrorMessage(true);
      });
    ;
  }

  return showErrorMessage ? (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center"
      className="math-pyramid"
    >
      <div>
        {errorMessage}
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
