import { type ReactElement, StrictMode, JSXElementConstructor } from "react"
import "./App.css"
import MathPyramidGame from "./components/MathPyramidGame/MathPyramidGame"
import { Stack } from "@mui/material"
import UserNameContextProvider from "./context/UserNameContextProvider"
import WebSocketContextProvider from "./context/WebSocketContextProvider"
import { UserName } from "./components/UserName/UserName"

function App(): ReactElement<object, JSXElementConstructor<object>> {
  return (
    <StrictMode>
      <UserNameContextProvider>
        <WebSocketContextProvider>
          <Stack
            spacing={4}
            justifyContent="center"
            alignItems="center"
            className="math-pyramid"
          >
            <UserName />
            <MathPyramidGame />
          </Stack>
        </WebSocketContextProvider>
      </UserNameContextProvider>
    </StrictMode>
  )
}
export default App
