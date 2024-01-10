import Link from "next/link";

interface NotificationItemProps {
  id: string | number;
  type: string;
  message: string;
  time: string;
  handleClick: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  message,
  type,
  time,
  handleClick,
}) => {
  const notificationTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // Clicking on notification will take you to that task
    <Link href={`/dashboard/tasks/taskdetail/${id}`} onClick={handleClick}>
      <div className="min-h-[6.5rem] my-2 px-3 py-2 rounded-lg SHADOW_DIV relative">
        {/* Notification type */}
        <p className="w-fit py-[.1rem] px-2 text-xs font-extrabold  rounded-full bg-[#19fa9a]">
          {type}
        </p>

        {/* Notification message */}
        <p className="text-lg mt-2">{message}</p>

        {/* Notification time */}
        <p className="text-right text-xs absolute right-3 bottom-1">
          {notificationTime}
        </p>
      </div>
    </Link>
  );
};
export default NotificationItem;
