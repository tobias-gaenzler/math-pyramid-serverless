import { type ReactElement, StrictMode } from 'react'
import './App.css'
import MathPyramidGame from './components/MathPyramidGame/MathPyramidGame'
import { Stack } from '@mui/material'
import UserNameContextProvider from './context/UserNameContextProvider'
import WebSocketContextProvider from './context/WebSocketContextProvider'

function App(): ReactElement<any, any> {
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
            <MathPyramidGame />
          </Stack>
        </WebSocketContextProvider>
      </UserNameContextProvider>
    </StrictMode>
  )
}
export default App
