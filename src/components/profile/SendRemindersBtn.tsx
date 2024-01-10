import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import React, { useEffect, useState } from "react";
import ScreenActivityLoader from "../ScreenActivityLoader";
import axios from "axios";
import toast from "react-hot-toast";
import { UserProps } from "@/props/UserProps";

// Send reminder button interface
interface SendRemindersBtnProps {
  user: UserProps;
}

const SendRemindersBtn: React.FC<SendRemindersBtnProps> = ({ user }) => {
  // Variable state
  const [sendEmails, setSendEmails] = useState<boolean | null>(
    user.sendReminders
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Headers for Api request
  const headers = useHeaders();

  useEffect(() => {
    setSendEmails(user.sendReminders);
  }, [user]);

  const toggleSendEmails = async () => {
    const previousSendEmailsState = sendEmails;
    try {
      setIsLoading(true);
      setSendEmails(!sendEmails);
      const res = await axios.put(
        "/api/user/changeSendReminders",
        {},
        { headers }
      );
      toast.success(res.data.message);
    } catch (error) {
      setSendEmails(previousSendEmailsState);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-4 flex items-center justify-between">
      {/* Text */}
      <p className="font-semibold">Send reminders through email</p>
      {/* Toggle button */}
      <div className="toggle-switch">
        <input
          id="toggle"
          type="checkbox"
          checked={sendEmails !== null ? sendEmails : false}
          onChange={toggleSendEmails}
          className="toggle-input"
          disabled={isLoading || !user.isVerified}
        />
        <label className="toggle-label" htmlFor="toggle"></label>
      </div>

      {/* Screen loading */}
      {isLoading && <ScreenActivityLoader />}
    </div>
  );
};

export default SendRemindersBtn;
