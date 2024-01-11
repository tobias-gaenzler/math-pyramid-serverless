import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { UserName } from "./UserName";
import { UserNameContext } from "../../context/UserNameContextProvider";
import userEvent from "@testing-library/user-event";

const setUserName = jest.fn();
describe("testing UserName component", () => {
    test("displays the user's name", () => {
        renderUserNameWithContext();

        const userNameText = screen.getByText(/Robert/i);

        expect(userNameText).toBeInTheDocument();
    });

    test("opens the dialog when the edit button is clicked", () => {
        renderUserNameWithContext();

        const editButton = screen.getByTestId("edit");
        fireEvent.click(editButton);

        const dialogTitle = screen.getByText(/Change Player Name/i);
        expect(dialogTitle).toBeInTheDocument();
    });

    test("updates the user name when 'Update' button is clicked", async () => {
        renderUserNameWithContext();

        const editButton = screen.getByTestId("edit");
        fireEvent.click(editButton);

        const inputField = screen.getByTestId("userNameInput").querySelector("input");
        act(() => userEvent.clear(inputField!));
        act(() => userEvent.type(inputField!, "NewName"));
        const updateButton = screen.getByText(/Update/i);
        fireEvent.click(updateButton);
        expect(setUserName).toHaveBeenCalledWith("NewName");
    });

    test("closes the dialog when 'Cancel' button is clicked", async () => {
        renderUserNameWithContext();

        const editButton = screen.getByTestId("edit");
        fireEvent.click(editButton);
        const cancelButton = screen.getByText(/Cancel/i);
        fireEvent.click(cancelButton);
        await waitFor(() => {
            const dialogTitle = screen.queryByText(/Change Player Name/i);
            expect(dialogTitle).not.toBeInTheDocument();
        });
    });
});

function renderUserNameWithContext() {
    return render(
        <UserNameContext.Provider value={{ userName: "Robert", setUserName: setUserName }}>
            <UserName />
        </UserNameContext.Provider>
    );
}

