import React from "react"
import PathConstants from "./pathConstants"

const Play = React.lazy(() => import("../components/MathPyramidGame/MathPyramidGame"))
const Help = React.lazy(() => import("../components/HelpView/HelpView"))

const routes = [
    { path: PathConstants.PLAY, element: <Play /> },
    { path: PathConstants.HELP, element: <Help /> },
]

export default routes