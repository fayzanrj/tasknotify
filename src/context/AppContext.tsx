"use client";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const AppContext = createContext<any | undefined>(undefined);

export function AppState({ children }: { children: React.ReactNode }) {
  // Variable state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Function to parse cookies
  const parseCookies = () => {
    const cookies = document.cookie;
    return cookies.split(";").map((cookie) => cookie.trim().split("="));
  };

  useLayoutEffect(() => {
    // Parsing cookies
    const cookieArray = parseCookies();
    // Finding theme cookie
    const themeCookie = cookieArray.find(([key]) => key === "theme");
    // Checking and setting dark mode
    if (themeCookie && decodeURIComponent(themeCookie[1]) === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Encoding theme value for setting the cookie
    const themeValue = isDarkMode ? "dark" : "light";
    document.cookie = `theme=${encodeURIComponent(themeValue)}`;

    // Toggle classes based on dark mode
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle("light", !isDarkMode);

  }, [isDarkMode]);
  
  return (
    <AppContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen, isDarkMode, setIsDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
}
