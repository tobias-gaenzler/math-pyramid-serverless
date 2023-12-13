import { type ReactElement, StrictMode } from 'react'
import './App.css'
import Header from './components/Header/Header'

function App (): ReactElement<any, any> {
  return (
        <StrictMode>
            <Header />
        </StrictMode>
  )
}
export default App
