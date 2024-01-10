"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import { UserProps } from "@/props/UserProps";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { IoMdWarning } from "react-icons/io";
import ScreenActivityLoader from "../ScreenActivityLoader";
import VerifyEmailModal from "../VerifyEmailModal";

// Verify Button props
interface VerifyEmailBtnProps {
  email: string;
  userId: string;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

const VerifyEmailBtn: React.FC<VerifyEmailBtnProps> = ({
  email,
  userId,
  setUser,
}) => {
  // Variable states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Headers for Api request
  const headers = useHeaders();

  // Function to handle click i.e. to send code and open verify modal
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/code/sendCode", {}, { headers });
      setIsModalOpen(true);
      toast.success(res.data.message);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-5">
      {/* Not verified message */}
      <div className="mt-2 text-red-500 font-semibold">
        <IoMdWarning className="mr-1 inline-block" />
        Email not verified
      </div>

      {/* Verify button */}
      <div className="mt-2">
        <button
          className="px-4 py-2 text-black font-bold rounded-lg bg-[#19fa91] flex items-center outline-none"
          onClick={handleClick}
        >
          <FiMail className="mr-1" />
          <p>Verify Your Email</p>
        </button>
      </div>

      {/* Screen loading */}
      {isLoading && <ScreenActivityLoader />}

      {/* Verification Modal */}
      {isModalOpen && (
        <VerifyEmailModal
          email={email}
          setState={setIsModalOpen}
          userId={userId}
          variant="PROFILE"
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default VerifyEmailBtn;
