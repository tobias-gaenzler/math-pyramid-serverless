import { type ReactElement, JSXElementConstructor } from "react"
import "./App.css"
import UserNameContextProvider from "./context/UserNameContextProvider"
import WebSocketContextProvider from "./context/WebSocketContextProvider"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/MainLayout/MainLayout"
import routes from "./routes"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: routes
  }
])

function App(): ReactElement<object, JSXElementConstructor<object>> {
  return (
    <UserNameContextProvider>
      <WebSocketContextProvider>
        <RouterProvider router={router} />
      </WebSocketContextProvider>
    </UserNameContextProvider>
  )
}
export default App
