import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { Config, names, uniqueNamesGenerator } from "unique-names-generator"
import * as ls from "local-storage"

export interface UserNameContextState {
    userName: string;
    setUserName: (userName: string) => void
}

export const UserNameContext = createContext<UserNameContextState>(
    {} as UserNameContextState
)

export const useUserNameContext = () => useContext(UserNameContext)
const config: Config = { dictionaries: [names] }


const UserNameContextProvider = (props: { children?: ReactNode }) => {
    const [userName, setUserName] = useState<string>("")

    useEffect(() => {
        const userNameForLocalStorage = ls.get<string>("userName")
        if (userNameForLocalStorage) {
            console.log(`Use username from local storage: ${userNameForLocalStorage}`)
            setUserName(JSON.parse(userNameForLocalStorage))
        } else {
            const newUserName = uniqueNamesGenerator(config)
            setUserName(newUserName)
            console.log("creating new username: " + newUserName)
            ls.set<string>("userName", JSON.stringify(newUserName))
        }
    }, [])

    const setUserNameInLocalStorage = (newUserName: string) => {
        setUserName(newUserName)
        ls.set<string>("userName", JSON.stringify(newUserName))
    }

    return (
        <UserNameContext.Provider value={{ userName: userName, setUserName: setUserNameInLocalStorage }}>
            {props.children}
        </UserNameContext.Provider>
    )
}

export default UserNameContextProvider
