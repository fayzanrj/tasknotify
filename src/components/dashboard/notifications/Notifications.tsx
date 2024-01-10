"use client";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import NotificationModal from "./NotificationModal";

const Notifications: React.FC = () => {
  // Variable state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle click function
  const handleClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="text-white absolute top-1/2 right-3 transform -translate-y-1/2">
      {/* Bell Icon */}
      <button
        aria-label="notification-btn"
        onClick={handleClick}
        className="cursor-pointer "
      >
        <FaBell size="1.6rem" className="dark:text-white text-black" />
      </button>

      {/* Notification Modal */}
      {isModalOpen && <NotificationModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Notifications;
