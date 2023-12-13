import { createContext, useContext, useState } from "react";
import { MathPyramidCalculator } from "../service/MathPyramidCalculator";
import { ChildrenProps } from "./ChildrenProps";
import { Model } from "./Model";

type ModelContextProps = {
  contextModel: Model;
  saveModel: (newModel: Model) => void;
};

const ModelContext = createContext<ModelContextProps>({
  contextModel: new Model(3, 100, new MathPyramidCalculator()),
  saveModel: () => {},
});
const useModelContext = () => useContext(ModelContext);

function ModelContextProvider(props: ChildrenProps) {
  const [contextModel, setContextModel] = useState<Model>(
    new Model(3, 100, new MathPyramidCalculator())
  );
  console.log(
    "Model Provider: current model:".concat(JSON.stringify(contextModel))
  );

  const saveModel = (newModel: Model) => {
    console.log("Saving new model".concat(JSON.stringify(newModel)));
    setContextModel(newModel);
  };

  return (
    <ModelContext.Provider value={{ contextModel, saveModel }}>
      {props.children}
    </ModelContext.Provider>
  );
}

export { useModelContext, ModelContextProvider };
export type { ModelContextProps };
