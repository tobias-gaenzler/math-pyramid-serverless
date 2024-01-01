declare var REACT_APP_WS_URL: string;
declare var REACT_APP_DEFAULT_SIZE: string;
declare var REACT_APP_MAX_VALUE: string;

class ConfigService {
    public static getConfig(configVariable: string): string {
        switch (configVariable) {
            case "WS_URL": {
                return REACT_APP_WS_URL ?? (process.env.REACT_APP_WS_URL ?? "ws://127.0.0.1:3002");
            }
            case "PYRAMID_SIZE": {
                return REACT_APP_DEFAULT_SIZE ?? (process.env.REACT_APP_DEFAULT_SIZE ?? "3");
            }
            case "MAX_VALUE": {
                return REACT_APP_MAX_VALUE ?? (process.env.REACT_APP_MAX_VALUE ?? "100");
            }
            default: {
                throw (`Variable ${configVariable} is not a supported config variable.`);
            }
        }
    }
}

export { ConfigService };
