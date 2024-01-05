import { type ReactElement, StrictMode } from 'react'
import './App.css'
import MathPyramidGame from './components/MathPyramidGame/MathPyramidGame'
import { Stack } from '@mui/material'

function App(): ReactElement<any, any> {
  return (
    <StrictMode>
      <Stack
        spacing={4}
        justifyContent="center"
        alignItems="center"
        className="math-pyramid"
      >
        <MathPyramidGame />
      </Stack>
    </StrictMode>
  )
}
export default App
