import * as React from "react";
import * as styles from "./index.module.scss";
import img1 from "../images/test-1.jpeg";
import img2 from "../images/test-2.jpeg";
import img3 from "../images/test-3.jpeg";
import { StoreProvider } from "../components/StoreProvider/StoreProvider";
import Three from "../components/Three/Three";
import cn from "classnames";
import { useEffect, useState } from "react";
const IndexPage = () => {
  return (
    <StoreProvider>
      <main className={styles.container}>
        <h1 className={styles.title}> I am a title</h1>
        <div className={styles.imgContainer}>
          <img
            src={img1}
            alt=""
            className={cn(styles.image, "js-img")}
            id="texture"
          />
          <img
            src={img2}
            alt=""
            className={cn(styles.image, "js-img")}
            id="texture2"
          />
          <img
            src={img3}
            alt=""
            className={cn(styles.image, "js-img")}
            id="texture2"
          />
        </div>
      </main>
      <Three />
    </StoreProvider>
  );
};

export default IndexPage;
