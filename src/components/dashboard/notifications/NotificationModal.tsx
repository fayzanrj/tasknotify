import React from "react";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { DummyNotifications } from "@/constants/NotificationsData";
import { IoMdClose } from "react-icons/io";

const NotificationModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setIsModalOpen(false);
  };

  // Notifications
  const notifications = DummyNotifications;

  return (
    <div className="w-[80vw] sm:w-96 h-96 text-black dark:text-white rounded-lg bg-white dark:bg-[#1F1F1F] shadow-lg drop-shadow-lg absolute top-5 right-[98%] z-40">
      {/* Heading */}
      <div className="h-10 mt-3 px-3 border-b-[.1px] border-gray-400 relative">
        <h3 className="text-2xl font-extrabold">Notifications</h3>
        {/* Button to close modal */}
        <CloseButton handleClick={handleClick} />
      </div>

      {/* Notifications */}
      <div className="h-[20.5rem] px-2 overflow-x-auto scroll-smooth SCROLL_BAR">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            {...notification}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationModal;

// Close button
const CloseButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button
      aria-label="close-modal-button"
      onClick={handleClick}
      className="absolute top-[35%] transform -translate-y-1/2 right-3"
    >
      <IoMdClose className="" size="1.5rem" />
    </button>
  );
};
