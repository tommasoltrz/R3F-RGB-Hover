import * as React from "react";
import * as styles from "./Layout.module.scss";
import { Context } from "../StoreProvider/StoreProvider";
import { useContext, useEffect } from "react";

const Layout = ({ children }) => {
  const scrollArea = React.createRef<HTMLDivElement>();
  const { top, wSize } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      document.body.style.height = `${
        scrollArea?.current?.getBoundingClientRect().height
      }px`;
    }, 100);
  }, []);

  useEffect(() => {
    scrollArea.current.style.transform = `translate3d(0,${-top}px, 0)`;
  }, [top]);

  useEffect(() => {
    document.body.style.height = `${
      scrollArea?.current?.getBoundingClientRect().height
    }px`;
  }, [wSize]);

  return (
    <main ref={scrollArea} data-scroll className={styles.scrollArea}>
      {children}
    </main>
  );
};

export default Layout;
