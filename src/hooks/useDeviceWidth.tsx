import { useState, useEffect } from "react";

const useDeviceWidth = (): number => {
  const isClient = typeof window === "object"; // Checking if window is defined

  const [deviceWidth, setDeviceWidth] = useState<number>(
    isClient ? window.innerWidth : 0
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = (): void => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return deviceWidth;
};

export default useDeviceWidth;
