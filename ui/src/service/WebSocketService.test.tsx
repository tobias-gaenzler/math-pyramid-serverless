import { WebSocketService } from "./WebSocketService"

// Mock the dependencies
jest.mock("react-use-websocket/dist/lib/types", () => ({
    SendJsonMessage: jest.fn(),
}))

jest.mock("./ConfigService", () => ({
    ConfigService: {
        getConfig: jest.fn((key: string) => {
            if (key === "PYRAMID_SIZE") {
                return "5" // Mocking the value of PYRAMID_SIZE
            }
            if (key === "MAX_VALUE") {
                return "10" // Mocking the value of MAX_VALUE
            }
            return null
        }),
    },
}))

describe("WebSocketService", () => {
    it("should send restart message with correct data", () => {
        const sendJsonMessageMock = jest.fn()
        const userName = "John"

        const webSocketService = new WebSocketService(sendJsonMessageMock, userName)
        webSocketService.sendRestart()

        expect(sendJsonMessageMock).toHaveBeenCalledWith({
            action: "start",
            sender: userName,
            data: { size: "5", maxValue: "10" },
        })
    })
})
