import React from "react";
import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.responsive}>Sorry not responsive at the moment , open the app in a computer</h1>
      <h1 className={styles.title}>Pokemon APP</h1>
      <Link to="/home" ><button className={styles.link}>Click here to enter</button></Link>
    </div>
  );
}

export default LandingPage;
