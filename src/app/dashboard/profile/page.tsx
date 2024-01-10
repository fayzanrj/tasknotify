import ProfileCard from "@/components/profile/ProfileCard";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

const Profile: NextPage = async () => {
  return (
    <div className="w-full mx-auto my-10 text-center">
      <ProfileCard />
    </div>
  );
};

export default Profile;
