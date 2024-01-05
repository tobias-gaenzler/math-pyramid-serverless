import { ConfigService } from "./ConfigService";

describe("testing ConfigService", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV;
  })

  test("should throw error on unknown variables", () => {
    const t = () => {
      ConfigService.getConfig("unknown");
    };
    expect(t).toThrow(Error);
  });
  test("should return default values if no environment is present", () => {
    expect(ConfigService.getConfig("WS_URL")).toEqual("ws://127.0.0.1:3002");
    expect(ConfigService.getConfig("PYRAMID_SIZE")).toEqual("3");
    expect(ConfigService.getConfig("MAX_VALUE")).toEqual("100");
  });
  test("should return variables from environment", () => {
    process.env.REACT_APP_WS_URL = "wsurl";
    process.env.REACT_APP_DEFAULT_SIZE = "5";
    process.env.REACT_APP_MAX_VALUE = "1000";
    expect(ConfigService.getConfig("WS_URL")).toEqual("wsurl");
    expect(ConfigService.getConfig("PYRAMID_SIZE")).toEqual("5");
    expect(ConfigService.getConfig("MAX_VALUE")).toEqual("1000");
  });
});