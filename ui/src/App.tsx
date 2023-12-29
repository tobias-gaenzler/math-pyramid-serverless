import { type ReactElement, StrictMode } from 'react'
import './App.css'
import MathPyramidPractice from './components/MathPyramidPractice/MathPyramidPractice'

function App(): ReactElement<any, any> {
  return (
    <StrictMode>
      <MathPyramidPractice />
    </StrictMode>
  )
}
export default App
