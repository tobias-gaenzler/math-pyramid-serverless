import React from "react";
import { Model } from "../../model/Model";
import "./MathPyramidRow.css";
import { Box } from "@mui/material";
import MathPyramidField, { MathPyramidFieldHandler } from "../MathPyramidField/MathPyramidField";

type Props = {
  row: number
  model: Model
  inputHandler: MathPyramidFieldHandler
};

const MathPyramidRow: React.FC<Props> = ({
  row,
  model,
  inputHandler,
}: Props) => {
  const fields: React.ReactElement[] = [];
  if (model) {
    for (let column = 0; column < model.size - row; column++) {
      const index = model.getIndex(row, column);
      fields.push(
        <MathPyramidField
          key={index}
          index={index}
          model={model}
          inputHandler={inputHandler}
        />
      );
    }
  }

  return (
    <Box key={row} className="row">
      {fields}
    </Box>
  );
};

export default MathPyramidRow;
