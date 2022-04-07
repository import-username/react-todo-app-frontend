import React, { useContext, useEffect, useState } from "react";
import { isResponseSuccessful } from "../helper/HttpHelper";

interface ContextValue {
    authenticated: string | boolean,
    login: (email: string, password: string, url?: string) => Promise<Response>,
    signup: (email: string, password: string, url?: string) => Promise<Response>,
    logout: (url?: string) => Promise<void>
}

type AuthState = [
    string | boolean,
    React.Dispatch<React.SetStateAction<any>>
]

const AuthContext: React.Context<any> = React.createContext(null);

export default function AuthContextProvider({ children }: { children: React.ReactElement }) {
    const [authenticated, setAuthenticated]: AuthState = useState("loading");

    async function login(email: string, password: string, url?: string): Promise<Response> {
        const api: string = url || process.env.REACT_APP_API_URL || "";

        return new Promise((resolve, reject) => {
            fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            }).then((response) => {
                if (!isResponseSuccessful(response.status)) {
                    setAuthenticated(() => false);
                } else {
                    setAuthenticated(() => true);
                }

                resolve(response);
            }).catch((err) => {
                setAuthenticated(() => false);

                reject(err);
            });
        });
    }

    async function signup(email: string, password: string, url?: string): Promise<Response> {
        const api: string = url || process.env.REACT_APP_API_URL || "";

        return new Promise((resolve, reject) => {
            fetch(`${api}/signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }).then((response) => {
                if (!isResponseSuccessful(response.status)) {
                    console.log("Request failed.");
                }

                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    async function logout(): Promise<void> { }

    // check client auth status
    useEffect(() => {
        const api: string = process.env.REACT_APP_API_URL || "";

        if (authenticated === "loading") {
            fetch(`${api}/authenticate`, { method: "GET", credentials: "include" })
                .then((response) => {
                    if (response.status !== 200) {
                        setAuthenticated(() => false);
                    } else {
                        setAuthenticated(() => true);
                    }
                }).catch((err) => {
                    setAuthenticated(() => false);
                });
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

export function useAuthContext(): ContextValue {
    return useContext(AuthContext);
}
