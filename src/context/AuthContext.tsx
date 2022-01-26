import React, { useEffect, useState } from "react";

interface ContextValue {
    authenticated: string | boolean,
    login: (email: string, password: string, url?: string) => Promise<void>,
    signup: (email: string, password: string, url?: string) => Promise<void>,
    logout: (url?: string) => Promise<void>
}

type AuthState = [
    string | boolean,
    React.Dispatch<React.SetStateAction<any>>
]

const AuthContext: React.Context<any> = React.createContext(null);

export default function AuthContextProvider({ children }: { children: React.ReactElement }) {
    const [authenticated, setAuthenticated]: AuthState = useState("loading");

    async function login(): Promise<void> { }

    async function signup(): Promise<void> { }

    async function logout(): Promise<void> { }

    // check client auth status
    useEffect(() => {
        const api: string | undefined = process.env.REACT_APP_API_URL;

        if (authenticated === "loading" && api) {
            fetch(`${api}/authenticate`, { method: "GET", credentials: "include" })
                .then((response) => {
                    if (response.status !== 200) {
                        setAuthenticated(() => false);
                    }

                    setAuthenticated(() => true);
                }).catch((err) => {
                    setAuthenticated(() => false);
                })
        }
    }, []);

    const contextValue: ContextValue = {
        authenticated,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
