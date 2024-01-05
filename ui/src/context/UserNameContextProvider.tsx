import { ReactNode, createContext, useContext } from "react";
import { Config, names, uniqueNamesGenerator } from "unique-names-generator";
import * as ls from "local-storage";

export interface UserNameContextState {
    userName: string;
}

export const UserNameContext = createContext<UserNameContextState>(
    {} as UserNameContextState
);

export const useUserNameContext = () => useContext(UserNameContext);

const config: Config = { dictionaries: [names] };

const UserNameContextProvider = (props: { children?: ReactNode }) => {

    var userName: string = "";
    const userNameForLocalStorage = ls.get<string>("userName");
    if (userNameForLocalStorage) {
        console.log(`Use username from local storage: ${userNameForLocalStorage}`);
        userName = userNameForLocalStorage;
    } else {
        userName = uniqueNamesGenerator(config);
        console.log("creating new username: " + userName);
        ls.set<string>("userName", JSON.stringify(userName));
    }

    return (
        <UserNameContext.Provider value={{ userName: userName }}>
            {props.children}
        </UserNameContext.Provider>
    );
};

export default UserNameContextProvider;
