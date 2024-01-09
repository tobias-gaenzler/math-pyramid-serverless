import React from "react";
import { act, render, screen } from "@testing-library/react";
import UserNameContextProvider, { useUserNameContext, UserNameContext } from "./UserNameContextProvider";
import { uniqueNamesGenerator } from "unique-names-generator";
import * as ls from "local-storage";


// Mock local-storage module
jest.mock("local-storage", () => {
    const storage: { [key: string]: any } = {};
    return {
        set: (key: string, value: any) => {
            storage[key] = value;
        },
        get: (key: string) => {
            return storage[key];
        },
        clear: () => {
            for (const key in storage) {
                delete storage[key];
            }
        }
    };
});

// Mock unique-names-generator module
jest.mock("unique-names-generator", () => ({
    uniqueNamesGenerator: jest.fn(),
    Config: {},
    names: {},
}));

// Custom render function to wrap components with the context provider
const renderWithContext = (ui: React.ReactElement) => {
    return render(
        <UserNameContextProvider>
            {ui}
        </UserNameContextProvider>
    );
};

describe("UserNameContextProvider", () => {
    beforeEach(() => {
        ls.clear();
        (uniqueNamesGenerator as jest.Mock).mockClear();
    });
    test("renders children", () => {
        renderWithContext(<div>Test</div>);
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    test("sets userName to local storage", () => {
        (uniqueNamesGenerator as jest.Mock).mockReturnValue("testUserName");
        renderWithContext(
            <UserNameContext.Consumer>
                {value => <span>Received: {value.userName}</span>}
            </UserNameContext.Consumer>
        );
        expect(ls.get("userName")).toBe(JSON.stringify("testUserName"));
        expect(screen.getByText(/testUserName/i)).toBeInTheDocument();
    });
    test("uses userName from local storage", () => {
        ls.set<string>("userName", JSON.stringify("newUserName"));
        expect(ls.get("userName")).toBe(JSON.stringify("newUserName"));
        renderWithContext(
            <UserNameContext.Consumer>
                {value => <span>Received: {value.userName}</span>}
            </UserNameContext.Consumer>
        );
        expect(screen.getByText(/newUserName/i)).toBeInTheDocument();
    });

    test("sets userName in local storage on setUserNameInLocalStorage call", () => {
        (uniqueNamesGenerator as jest.Mock).mockReturnValue("testUserName");
        renderWithContext(
            <UserNameContext.Consumer>
                {value => <div>{`${value.setUserName("newUserName")}`}</div>}
            </UserNameContext.Consumer>
        );

        expect(ls.get("userName")).toBe(JSON.stringify("newUserName"));
    });
});

describe("useUserNameContext", () => {
    beforeEach(() => {
        ls.clear();
        (uniqueNamesGenerator as jest.Mock).mockClear();
    });
    test("returns default context values and updates user name on click", () => {
        const TestComponent = () => {
            const { userName, setUserName } = useUserNameContext();
            return (
                <div>
                    <span data-testid="userName">{userName}</span>
                    <button onClick={() => setUserName("newUserName")} data-testid="setUserNameButton">Set UserName</button>
                </div>
            );
        };

        renderWithContext(<TestComponent />);
        expect(screen.getByTestId("userName").textContent).toBe("");
        act(() => screen.getByTestId("setUserNameButton").click());
        expect(screen.getByTestId("userName").textContent).toBe("newUserName");
    });
});

