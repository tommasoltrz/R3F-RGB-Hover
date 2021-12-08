import React, { createContext, FC, useEffect, useRef } from "react";
import { useState } from "react";

const initialState = {
  mouse: { x: 0, y: 0 },
  wSize: {
    w: 1200,
    h: 0,
  },
  top: 0,
  velo: 0,
  fMouse: {
    x: 0,
    y: 0,
  },
};

export const Context = createContext(initialState);

export const StoreProvider: FC<any> = ({ children }) => {
  const [mouse, setMouse] = useState(initialState.mouse);
  const [wSize, setWSize] = useState(initialState.wSize);
  const [top, setTop] = useState(initialState.top);
  const [topThree, setTopThree] = useState(0);
  const [velo, setVelo] = useState(0);
  const [fMouse, setFMouse] = useState(initialState.fMouse);
  const requestRef = useRef<number | null>(null);

  let current = 0;
  let target = 0;
  let ease = 0.1;

  let speed = 0;
  let targetSpeed = 0;
  let testMouse = { x: 0, y: 0 };
  let followMouse = { x: 0.1, y: 0.1 };
  let prevMouse = { x: 0.1, y: 0.1 };

  const MathUtils = {
    lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
  };

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setWSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(requestRef.current || 0);
  }, []);

  const updateScroll = (mouse: any) => {
    target = window.scrollY;
    current = MathUtils.lerp(current, target, ease);
    setTop(current);
    setTopThree(0);
    requestRef.current = requestAnimationFrame(updateScroll);

    const mouseY = 1 - testMouse.y / window.innerHeight;
    const mouseX = testMouse.x / window.innerWidth;
    speed = Math.sqrt(
      (prevMouse.x - mouseX) ** 2 + (prevMouse.y - mouseY) ** 2
    );
    targetSpeed -= 0.1 * (targetSpeed - speed);
    followMouse.x -= 0.1 * (followMouse.x - mouseX);
    followMouse.y -= 0.1 * (followMouse.y - mouseY);

    prevMouse.x = mouseX;
    prevMouse.y = mouseY;
    setFMouse(followMouse);
    if (targetSpeed <= 0.002) {
      setVelo(0);
    } else {
      setVelo(Math.min(targetSpeed, 0.09));
    }
    targetSpeed *= 0.999;
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
      testMouse = {
        x: e.clientX,
        y: e.clientY,
      };
    });
  };

  const onWResize = (e: any) => {
    requestAnimationFrame(() => {
      if (typeof window !== `undefined`) {
        setWSize({
          w: window.innerWidth,
          h: window.innerHeight,
        });
      }
    });
  };

  const providerValue = React.useMemo(
    () => ({
      mouse,
      wSize,
      top,
      velo,
      fMouse,
    }),
    [mouse, wSize, top, velo, fMouse]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
