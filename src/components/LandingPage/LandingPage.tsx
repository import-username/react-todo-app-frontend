import React, { useState, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaGithub } from "react-icons/fa";
import styles from "./LandingPage.module.scss";
import slideAnims from "../../css/animations/SlideAnims.module.scss";
import { useNavigate } from "react-router-dom";
import { isResponseSuccessful } from "../../helper/HttpHelper";
import { useAuthContext } from "../../context/AuthContext";

type ModalState = [string | boolean, Dispatch<SetStateAction<any>>];

type ModalType = "login-modal" | "signup-modal";

interface ModalProps {
    type: ModalType,
    closeModal: () => void
}

// TODO - improve responsive styles
export default function LandingPage() {
    const [displayModal, setDisplayModal]: ModalState = useState(false);

    function displayModalFunc(modalType: ModalType) {
        setDisplayModal(() => modalType);
    }

    return (
        <>
            <div className={styles["landing-page-root"]}>
                <div className={styles["landing-page-header"]}>
                    <img className={styles["checkmark-logo"]} src="/images/checkmark-logo.svg" alt="Todo List Logo" />
                    <button className={styles["login-button"]} onClick={displayModalFunc.bind(null, "login-modal")}>
                        <span>LOG IN</span>
                    </button>
                    <button className={styles["signup-button"]} onClick={displayModalFunc.bind(null, "signup-modal")}>
                        <span>SIGN UP</span>
                    </button>
                </div>
                <div className={styles["landing-page-container"]}>
                    <div className={styles["landing-page-text-container"]}>
                        <span className={`${styles["landing-page-title"]} ${slideAnims["slide-left-anim"]}`}>Welcome to my todo-list website!</span>
                        <span className={`${styles["landing-page-description"]} ${slideAnims["slide-up-anim"]}`}>Login or create an account to get started.</span>
                    </div>
                </div>
            </div>
            {
                process.env.REACT_APP_GITHUB_REPO_LINK &&
                <a target={"_blank"} href={process.env.REACT_APP_GITHUB_REPO_LINK || ""} className={styles["github-link"]}>
                    <FaGithub />
                </a>
            }
            {
                displayModal
                    ? <LandingPageModal type={displayModal} closeModal={setDisplayModal.bind(null, false)} />
                    : undefined
            }
        </>
    );
}

function LandingPageModal({ type, closeModal }: ModalProps) {
    const modalContainerRef: React.MutableRefObject<any> = useRef();

    function hideModal(event: any) {
        if (event.target === modalContainerRef.current) {
            closeModal();
        }
    }

    return (
        <div ref={modalContainerRef} className={styles["landing-page-modal-container"]} onClick={hideModal}>
            <Modal type={type} hideModal={closeModal} />
        </div>
    );
}

function Modal({ type, hideModal }: { type: ModalType, hideModal: (event: any) => void }) {
    const [showPassword, setShowPassword] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const { login, signup } = useAuthContext();

    const navigate = useNavigate();

    const modalProperties = {
        title: {
            "login-modal": "LOG IN",
            "signup-modal": "SIGN UP"
        },
        requestButton: {
            "login-modal": "Login",
            "signup-modal": "Sign up"
        }
    }

    function submitRequest() {
        switch (type) {
            case "login-modal":
                loginRequest();
                break;
            case "signup-modal":
                signupRequest();
                break;
        }
    }

    // TODO - handle errors and non-2xx status codes
    async function loginRequest() {
        if (emailRef.current && passwordRef.current) {
            try {
                const loginRequest = await login(emailRef.current.value, passwordRef.current.value);
    
                if (loginRequest.status !== 200) {
                    //TODO - handle non-2xx code here
                } else {
                    navigate("/");
                }
            } catch (exc) {
                // TODO - handle errors here
                console.log("Login request error.");
            }
        }
    }

    async function signupRequest() {
        if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
            try {
                const signupRequest = await signup(emailRef.current.value, passwordRef.current.value);

                if (!isResponseSuccessful(signupRequest.status)) {
                    //TODO - handle non-2xx code here
                } else {
                    hideModal(null);
                }
            } catch (exc) {
                console.log("Signup request error.");
            }
        }
    }

    return (
        <div className={styles["modal-container"]}>
            <button className={styles["modal-close-button"]} onClick={hideModal}>
                <FaTimes />
            </button>
            <div className={styles["modal-heading-container"]}>
                <h1>{modalProperties.title[type]}</h1>
            </div>
            <div className={styles["email-container"]}>
                <span>EMAIL</span>
                <input ref={emailRef} placeholder="Enter email" type={"email"} name="email" />
            </div>
            <div className={styles["password-container"]}>
                <span>PASSWORD</span>
                <div>
                    <input ref={passwordRef} placeholder="Enter password" type={showPassword ? "text" : "password"} name="password" />
                    <button onClick={setShowPassword.bind(null, !showPassword)}>
                        {
                            showPassword
                                ? <FaEye />
                                : <FaEyeSlash />
                        }
                    </button>
                </div>
            </div>
            {
                type === "signup-modal" &&
                <div className={styles["password-container"]}>
                    <span>CONFIRM PASSWORD</span>
                    <div>
                        <input ref={confirmPasswordRef} placeholder="Confirm password" type={showPassword ? "text" : "password"} name="password" />
                    </div>
                </div>
            }
            <div className={styles["modal-request-button-container"]}>
                <button onClick={submitRequest} className={styles["login-button"]}>{modalProperties.requestButton[type]}</button>
            </div>
        </div>
    );
}
