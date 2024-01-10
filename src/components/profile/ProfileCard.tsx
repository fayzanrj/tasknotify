"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import { UserProps } from "@/props/UserProps";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLock } from "react-icons/fi";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import SendRemindersBtn from "./SendRemindersBtn";
import VerifyEmailBtn from "./VerifyEmailBtn";

const userEmptyObject = {
  id: "",
  name: "",
  email: "",
  profilePic: "",
  isVerified: false,
  sendReminders : false
};

const ProfileCard: React.FC = () => {
  // State variables
  const [user, setUser] = useState<UserProps>(userEmptyObject);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Headers for API request
  const headers = useHeaders();

  // Function to fetch user details
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user/getUser", { headers });
      setUser(res.data.user);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // If profile card is loading
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-[90%] md:w-[30rem] mx-auto p-4 rounded-lg">
      {/* Image */}
      <div className="w-20 h-20 mx-auto mb-4">
        <Image
          src={user?.profilePic || ""}
          width={100}
          height={100}
          className="rounded-full"
          quality={100}
          alt="Profile pic"
        />
      </div>

      {/* User info */}
      <div className="w-full mt-10 text-left">
        <UserInfoDiv label="Name" value={user?.name || ""} />
        <UserInfoDiv label="Email" value={user?.email || ""} />

        {/* If user's email is not verified */}
        {user?.isVerified === false && (
          <VerifyEmailBtn
            email={user?.email}
            userId={user?.id}
            setUser={setUser}
          />
        )}
      </div>

      {/* Change password button */}
      <ChangePasswordButton />

      {/* Send emails toggle button */}
      <SendRemindersBtn user={user}  />
    </div>
  );
};

export default ProfileCard;

// UserInfoDiv component for displaying user information
const UserInfoDiv = ({ label, value }: { label: string; value: string }) => {
  return (
    <p className={`my-2 text-lg font-bold`}>
      {label} : <span className="font-semibold">{value}</span>
    </p>
  );
};

// Change Password Component button
const ChangePasswordButton = () => (
  <Link href="/dashboard/profile/changepassword" className="mt-5">
    <button className="px-4 py-2 text-black font-bold rounded-lg bg-[#19fa91] flex items-center">
      <FiLock className="mr-1" />
      <p>Change Password</p>
    </button>
  </Link>
);
