import React, { createContext, FC, useEffect } from "react";
import { useState } from "react";

const initialState = {
  mouse: { x: 0, y: 0 },
  wSize: {
    w: window.innerWidth,
    h: window.innerHeight,
  },
};

export const Context = createContext(initialState);

export const StoreProvider: FC<any> = ({ children }) => {
  const [mouse, setMouse] = useState(initialState.mouse);
  const [wSize, setWSize] = useState(initialState.wSize);
  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWResize);
  };

  const removeEventListeners = () => {
    window.removeEventListener("resize", onWResize);
  };

  const onMouseMove = (e: any) => {
    requestAnimationFrame(() => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    });
  };

  const onWResize = (e: any) => {
    requestAnimationFrame(() => {
      setWSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    });
  };

  const providerValue = React.useMemo(
    () => ({
      mouse,
      setMouse,
      wSize,
      setWSize,
    }),
    [mouse, wSize]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
