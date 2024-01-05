import { ReactNode, createContext, useContext, useRef } from "react";
import { Config, names, uniqueNamesGenerator } from "unique-names-generator";

export interface UserNameContextState {
    userName: string;
}

export const UserNameContext = createContext<UserNameContextState>(
    {} as UserNameContextState
);

export const useUserNameContext = () => useContext(UserNameContext);

const UserNameContextProvider = (props: { children?: ReactNode }) => {
    const config: Config = { dictionaries: [names] };
    const userNameRef = useRef(uniqueNamesGenerator(config));

    return (
        <UserNameContext.Provider value={{ userName: userNameRef.current }}>
            {props.children}
        </UserNameContext.Provider>
    );
};

export default UserNameContextProvider;
