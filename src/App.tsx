import { type ReactElement, StrictMode } from 'react'
import './App.css'
import { MathPyramidPractice } from './components'

function App (): ReactElement<any, any> {
  return (
        <StrictMode>
            <MathPyramidPractice size={3} maxValue={100} />
        </StrictMode>
  )
}
export default App
