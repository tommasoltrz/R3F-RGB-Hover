import * as React from "react";
import * as styles from "./Layout.module.scss";

import { Context, StoreProvider } from "../StoreProvider/StoreProvider";
import Three from "../Three/Three";
import cn from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
const Layout = ({ children }) => {
  const scrollArea = useRef();
  const { top } = useContext(Context);
  console.log(top);

  useEffect(() => {
    setTimeout(() => {
      document.body.style.height = `${
        scrollArea?.current.getBoundingClientRect().height
      }px`;
    }, 100);
  }, []);

  useEffect(() => {
    scrollArea.current.style.transform = `translate3d(0,${-top}px, 0)`;
  }, [top]);

  return (
    <StoreProvider>
      <main ref={scrollArea} data-scroll className={styles.scrollArea}>
        {children}
      </main>
    </StoreProvider>
  );
};

export default Layout;
