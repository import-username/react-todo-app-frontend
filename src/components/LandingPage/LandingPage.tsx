import React, { useState, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import styles from "./LandingPage.module.scss";
import slideAnims from "../../css/animations/SlideAnims.module.scss";

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
                    <img className={styles["checkmark-logo"]} src="/images/checkmark-logo.svg" alt="Todo List Logo"/>
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
                displayModal
                ? <LandinPageModal type={displayModal} closeModal={setDisplayModal.bind(null, false)}/>
                : undefined
            }
            
        </>
    );
}

function LandinPageModal({ type, closeModal }: ModalProps) {
    const modalContainerRef: React.MutableRefObject<any> = useRef();

    function hideModal(event: any) {
        if (event.target === modalContainerRef.current) {
            closeModal();
        }
    }

    switch (type) {
        case "login-modal":
            return (
                <div ref={modalContainerRef} className={styles["landing-page-modal-container"]} onClick={hideModal}>
                    <LoginModal hideModal={closeModal.bind(null)} />
                </div>
            );
        case "signup-modal":
            return (
                <div ref={modalContainerRef} className={styles["landing-page-modal-container"]} onClick={hideModal}>
            
                </div>
            );
        default:
            return (null);    
    }
}

function LoginModal({ hideModal }: { hideModal: (event: any) => void }) {
    return (
        <div className={styles["modal-container"]}>
            <button className={styles["modal-close-button"]} onClick={hideModal}>
                <FaTimes />
            </button>
            <div className={styles["modal-heading-container"]}>
                <h1>LOG IN</h1>
            </div>
            <div className={styles["email-container"]}>
                <span>EMAIL</span>
                <input placeholder="Enter email" type={"email"} name="email"/>
            </div>
            <div className={styles["password-container"]}>
                <span>PASSWORD</span>
                <div>
                    <input placeholder="Enter password" type={"password"} name="password" />
                    <button>
                        <FaEye />
                    </button>
                </div>
            </div>
        </div>
    );
}

function SignupModal() {
    return (
        <div className={styles["signup-modal-container"]}>

        </div>
    );
}
