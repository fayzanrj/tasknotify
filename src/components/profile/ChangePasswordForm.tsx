"use client";
import ActivityLoader from "@/components/ActivityLoader";
import InputField from "@/components/auth/InputField";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Error types for form validation
interface ErrorProps {
  [key: string]: boolean;
}

const ChangePasswordForm: React.FC = () => {
  // State variables for managing component state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [error, setError] = useState<ErrorProps>({
    passwordError: true,
    newPasswordError: true,
    confirmPasswordError: true,
  });

  // Headers
  const headers = useHeaders();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (newPassword !== confirmNewPassword) {
        toast.error("Passwords does not matches");
        return;
      }
      // Api request
      const data = { oldPassword, newPassword };
      const res = await axios.put("/api/user/changePass", data, { headers });
      // Success message
      toast.success(res.data.message);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update button disable state based on form errors
  useEffect(() => {
    const isButtonDisabled =
      oldPassword.length <= 1 ||
      error.newPasswordError ||
      error.confirmPasswordError;
    setDisableBtn(isButtonDisabled);
  }, [error]);

  return (
    <form className="w-11/12 sm:w-96 m-auto" onSubmit={handleSubmit}>
      {/* Input field for the old password */}
      <InputField
        variant="NO_VALIDATION"
        type="password"
        id="password"
        label={"Old Password"}
        placeHolder="Enter old password"
        disabled={isLoading}
        state={oldPassword}
        setState={setOldPassword}
        setFormError={setError}
      />

      {/* Input field for the new password */}
      <InputField
        type="password"
        id="newPassword"
        label={"New Password"}
        placeHolder="Enter new password"
        disabled={isLoading}
        state={newPassword}
        setState={setNewPassword}
        setFormError={setError}
      />

      {/* Input field for confirming the new password */}
      <InputField
        type="password"
        id="confirmPassword"
        label={"Confirm New Password"}
        placeHolder="Confirm new password"
        disabled={isLoading}
        state={confirmNewPassword}
        setState={setConfirmNewPassword}
        password={newPassword}
        setFormError={setError}
      />

      {/* Button for submitting the form */}
      <div className="text-right">
        <ChangePasswordButton isLoading={isLoading} disableBtn={disableBtn} />
      </div>
    </form>
  );
};

export default ChangePasswordForm;

// Chang Password Button Component
const ChangePasswordButton = ({
  isLoading,
  disableBtn,
}: {
  isLoading: boolean;
  disableBtn: boolean;
}) => (
  <button
    aria-aria-label="change-password-button"
    type="submit"
    disabled={isLoading || disableBtn}
    className="w-56 h-10 mt-12 text-lg disabled:text-gray-500 font-semibold rounded-lg bg-[#19fa9a] disabled:bg-[#19fa984c] outline-none"
  >
    {/* Show loading spinner during form submission */}
    {isLoading ? <ActivityLoader /> : "Change Password"}
  </button>
);
