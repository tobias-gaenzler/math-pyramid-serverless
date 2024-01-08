import React, { useCallback, useEffect, useState } from "react"
import "./MathPyramidField.css"
import TextField from "@mui/material/TextField"
import { Model } from "../../model/Model"

export interface MathPyramidFieldHandler {
  (index: number, inputValue: string): void
}

type Props = {
  index: number
  model: Model
  inputHandler: MathPyramidFieldHandler
}

const MathPyramidField: React.FC<Props> = ({
  index,
  model,
  inputHandler,
}: Props) => {
  const getStartValue = useCallback(() => {
    if (model.startValues && model.startValues[index]) {
      return model.startValues[index]!.toString()
    } else {
      return ""
    }
  }, [model, index]);

  const [value, setValue] = useState<string>(() => getStartValue())
  const [disabled, setDisabled] = useState<boolean>(value === "")
  const [className, setClassName] = useState<string>("pyramid-field")

  // set field color when input changes
  useEffect(() => {
    if (!model || !model.solutionValues) {
      return;
    }
    const expectsUserInput = getStartValue() === "";
    if (expectsUserInput) {
      if (value === "") {
        setClassName("pyramid-field");
      } else if (model.solutionValues[index].toString() === value) {
        setClassName("pyramid-field correct");
        setDisabled(true);
      } else {
        setClassName("pyramid-field incorrect");
      }
    } else {
      setClassName("pyramid-field disabled");
    }
  }, [model, index, value, getStartValue]);


  // initialize field when model changes
  useEffect(() => {
    const startValue = getStartValue();
    setValue(startValue);
    const disabled = startValue !== "";
    setDisabled(disabled);
    if (disabled) {
      setClassName("pyramid-field disabled");
    } else {
      setClassName("pyramid-field");
    }
  }, [model, getStartValue]);

  return (
    <TextField
      className={className}
      data-testid={`field${index}`}
      inputProps={{ type: "number" }}
      onKeyDown={(event) => {
        // allow only numbers and Backspace
        if (!/[0-9]/.test(event.key) && !/Backspace/.test(event.key)) {
          event.preventDefault()
        }
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = event.target.value
        setValue(currentInputValue)
        const hasInput = ("" !== currentInputValue)
        if (hasInput) {
          inputHandler(index, currentInputValue)
        }
      }}
      value={value}
      disabled={disabled}
    />
  )
}

export default MathPyramidField
