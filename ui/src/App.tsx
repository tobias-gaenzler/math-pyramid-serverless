import { type ReactElement, StrictMode } from 'react'
import './App.css'
import MathPyramidGame from './components/MathPyramidGame/MathPyramidGame'
import { Stack } from '@mui/material'
import UserNameContextProvider from './context/UserNameContextProvider'

function App(): ReactElement<any, any> {
  return (
    <StrictMode>
      <UserNameContextProvider>
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          className="math-pyramid"
        >
          <MathPyramidGame />
        </Stack>
      </UserNameContextProvider>
    </StrictMode>
  )
}
export default App
