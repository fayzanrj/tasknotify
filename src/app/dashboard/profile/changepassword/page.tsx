import GoBack from "@/components/GoBack";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
};

const ChangePassword = () => {
  return (
    <div className="py-10 relative">
      {/* GoBack button  */}
      <GoBack href="/dashboard/profile" />

      {/* Heading */}
      <h3 className="w-fit mx-auto my-4 text-2xl font-bold">Change Password</h3>

      {/* Change Passwof Form */}
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
