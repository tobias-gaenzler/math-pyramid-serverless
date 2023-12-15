import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import "./MathPyramidField.css"
import TextField from "@mui/material/TextField"
import { Model } from "../../common"

export interface MathPyramidFieldHandler {
  (index: number, inputValue: string): boolean
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
    if (model.startValues[index]) {
      return model.startValues[index]!.toString()
    } else {
      return ""
    }
  }, [model, index]);

  const [value, setValue] = useState<string>(() => { return getStartValue() })
  const [disabled, setDisabled] = useState<boolean>(
    value === "" ? false : true
  )
  const [className, setClassName] = useState<string>("pyramid-field")

  // set field color when input changes
  useEffect(() => {
    if (!model || !model.solution) {
      //setClassName("pyramid-field disabled")
      return
    }
    const expectsUserInput = (getStartValue() === "");
    if (expectsUserInput) {
      if (value === "") {
        setClassName("pyramid-field");
      } else if (model.solution[index].toString() === value) {
        setClassName("pyramid-field correct");
        setDisabled(true);
      } else {
        setClassName("pyramid-field incorrect");
      }
    } else {
      setClassName("pyramid-field disabled");
    }
  }, [model, index, getStartValue, value])

  // initialize field when model changes 
  // useLayoutEffect instead of useEffect, to prevent that field is red (caused by old value)
  useLayoutEffect(() => {
    let startValue = getStartValue()
    setValue(startValue)
    const disabled: boolean = startValue !== ""
    setDisabled(disabled)
    if (disabled) {
      setClassName("pyramid-field disabled")
    } else {
      setClassName("pyramid-field")
    }
  }, [model, getStartValue])

  return (
    <TextField
      className={className}
      inputProps={{ type: "number" }}
      onKeyPress={(event) => {
        // allow only numbers
        if (!/[0-9]/.test(event.key)) {
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
