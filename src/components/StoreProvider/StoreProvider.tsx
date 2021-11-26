import React, { createContext, FC, useEffect } from "react";
import { useState } from "react";
const initialState = {
  x: 0,
  y: 0,
};

export const Context = createContext(initialState);

export const StoreProvider: FC<any> = ({ children }) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e: any) => {
    requestAnimationFrame(() => {
      setState({
        x: e.clientX,
        y: e.clientY,
      });
    });
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
