"use client";
import NavbarCloseButton from "@/components/landingPage/NavbarCloseButton";
import React, { useLayoutEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const EmailMessage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    const showMessage = localStorage.getItem("showMessage");
    if (!showMessage) {
      setIsOpen(true);
    }
  }, []);

  const handleCloseMessage = (): void => setIsOpen(false);

  const handleNotShow = async () => {
    localStorage.setItem("showMessage", "false");
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="w-64 h-64 px-4 py-8 rounded-lg bg-white dark:bg-[#1f1f1f] absolute right-2 md:right-10 top-2 z-40 SHADOW_DIV">
        <button
          aria-label="close-message-button"
          onClick={handleCloseMessage}
          className="absolute top-2 right-3"
        >
          <IoMdClose className="" size="1.5rem" />
        </button>
        <p className="text-lg font-semibold">
          In order to receive reminder of your schedule task make sure your
          email is verified and send notifications through email are activated
        </p>

        <button
          aria-label="donotshow-message-button"
          onClick={handleNotShow}
          className="font-semibold absolute bottom-2 right-2 underline underline-offset-4"
        >
          Do not show again
        </button>
      </div>
    )
  );
};

export default EmailMessage;
