import React, { createContext, FC, useEffect, useRef } from "react";
import { useState } from "react";

const initialState = {
  mouse: { x: 0, y: 0 },
  wSize: {
    w: window.innerWidth,
    h: window.innerHeight,
  },
  top: 0,
};

export const Context = createContext(initialState);

export const StoreProvider: FC<any> = ({ children }) => {
  const [mouse, setMouse] = useState(initialState.mouse);
  const [wSize, setWSize] = useState(initialState.wSize);
  const [top, setTop] = useState(initialState.top);
  const [topThree, setTopThree] = useState(0);
  const requestRef = useRef<number>();

  let current = 0;
  let target = 0;
  let ease = 0.075;
  const MathUtils = {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b,
  };

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const updateScroll = () => {
    target = window.scrollY;
    current = MathUtils.lerp(current, target, ease);
    setTop(current);
    setTopThree(0);
    requestRef.current = requestAnimationFrame(updateScroll);
  };

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWResize);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
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
      wSize,
      top,
    }),
    [mouse, wSize, top]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
