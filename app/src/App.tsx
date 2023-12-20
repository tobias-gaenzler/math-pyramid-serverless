import { type ReactElement, StrictMode } from 'react'
import './App.css'
import MathPyramidPractice from './components/MathPyramidPractice/MathPyramidPractice'

const defaultSize: string | undefined = process.env.REACT_APP_DEFAULT_SIZE
const defaultMaxValue: string | undefined = process.env.REACT_APP_DEFAULT_MAX_VALUE

function App(): ReactElement<any, any> {
  return (
    <StrictMode>
      <MathPyramidPractice size={Number(defaultSize)} maxValue={Number(defaultMaxValue)} />
    </StrictMode>
  )
}
export default App
