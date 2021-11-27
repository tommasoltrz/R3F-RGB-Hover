import * as React from "react";
import * as styles from "./index.module.scss";
import img1 from "../images/test-1.jpeg";
import img2 from "../images/test-2.jpeg";
import img3 from "../images/test-3.jpeg";

import Three from "../components/Three/Three";
import cn from "classnames";
import Layout from "../components/Layout/Layout";
import { StoreProvider } from "../components/StoreProvider/StoreProvider";
const IndexPage = () => {
  return (
    <StoreProvider>
      <Layout>
        <div>
          <h1 className={styles.title}> I am a title</h1>
          <div className={styles.imgContainer}>
            <img
              src={img1}
              alt=""
              className={cn(styles.image, "js-img")}
              id="texture"
            />

            <h2>Caption 1</h2>
            <img
              src={img2}
              alt=""
              className={cn(styles.image, "js-img")}
              id="texture2"
            />
            <h2>Caption 2</h2>
            <img
              src={img3}
              alt=""
              className={cn(styles.image, "js-img")}
              id="texture2"
            />
            <h2>Caption 3</h2>
          </div>
        </div>
      </Layout>
      <Three />
    </StoreProvider>
  );
};

export default IndexPage;
