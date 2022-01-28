import React from "react";
import styles from "./LandingPage.module.scss";
import slideAnims from "../../css/animations/SlideAnims.module.scss";

// TODO - improve responsive styles
export default function LandingPage() {
    return (
        <div className={styles["landing-page-root"]}>
            <div className={styles["landing-page-header"]}>
                <img className={styles["checkmark-logo"]} src="/images/checkmark-logo.svg" alt="Todo List Logo"/>
                <button className={styles["login-button"]}>
                    <span>LOG IN</span>
                </button>
                <button className={styles["signup-button"]}>
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
    );
}