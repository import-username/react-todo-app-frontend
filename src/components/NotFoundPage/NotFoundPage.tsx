import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
    return (
        <div className={styles["not-found-container"]}>
            <span className={`${styles["not-found-title"]} ${styles["slide-up-anim"]}`}>404</span>
            <span className={styles["slide-left-anim"]}>That page does not exist. <Link className={styles["home-link"]} to={"/"}>Return Home</Link></span>
        </div>
    );
}