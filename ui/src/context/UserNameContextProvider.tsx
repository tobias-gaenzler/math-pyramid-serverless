import { ReactNode, createContext, useContext, useRef } from "react";
import { UserNameProvider } from "../service/UserNameProvider";

export interface UserNameContextState {
    userName: string;
}

export const UserNameContext = createContext<UserNameContextState>(
    {} as UserNameContextState
);

export const useUserNameContext = () => useContext(UserNameContext);


const UserNameContextProvider = (props: { children?: ReactNode }) => {
    const userNameRef = useRef(new UserNameProvider().getUserName());

    return (
        <UserNameContext.Provider value={{ userName: userNameRef.current }}>
            {props.children}
        </UserNameContext.Provider>
    );
};

export default UserNameContextProvider;
