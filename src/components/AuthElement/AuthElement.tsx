import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactElement | Array<ReactElement>,
    defaultElement: ReactElement,
    redirectPath?: string,
    loadScreen?: boolean | undefined
}

/**
 * This component is for rendering authenticated-only components, or another component when not authenticated.
 * If redirectPath is provided, will redirect instead of rendering non-auth component.
 * @param {React.ReactElement} defaultElement Element to render when not authenticated.
 * @param {string} [redirectPath] Path to redirect to in case of failed authentication. Has priority over defaultElement.
 * @param {ReactElement | Array<ReactElement>} children Child/children elements to render when authenticated.
 * @param {boolean} loadScreen Renders a loading screen while waiting for auth request to fulfill.
 */
export default function AuthElement({ defaultElement, redirectPath, loadScreen, children }: Props) {
    const { authenticated }  = useAuthContext();

    return (
        <>
            {
                authenticated === "loading" ? <AuthLoadScreen loadScreen={loadScreen} /> : authenticated
                ? children
                : redirectPath ? <Navigate to={redirectPath} /> : defaultElement
            }
        </>
    );
}

// TODO - add loading screen
function AuthLoadScreen({ loadScreen }: { loadScreen: boolean | undefined }) {
    return (
        loadScreen ?
        <div>loading</div> :
        null
    );
}
