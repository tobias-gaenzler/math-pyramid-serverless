class ConfigService {
    public static getConfig(configVariable: string): string {
        switch (configVariable) {
            case "WS_URL": {
                const wsURL = process.env.REACT_APP_WS_URL ?? "ws://127.0.0.1:3002"
                return wsURL
            }
            case "PYRAMID_SIZE": {
                return process.env.REACT_APP_DEFAULT_SIZE ?? "3"
            }
            case "MAX_VALUE": {
                return process.env.REACT_APP_MAX_VALUE ?? "100"
            }
            default: {
                throw new Error(`Variable ${configVariable} is not a supported config variable.`)
            }
        }
    }
}

export { ConfigService }
