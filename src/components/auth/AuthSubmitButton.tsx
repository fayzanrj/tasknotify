import React from "react";
import ActivityLoader from "../ActivityLoader";

// Auth Button interface
interface AuthSubmitButtonProps {
  disableBtn: boolean;
  isLoading: boolean;
  btnText: "SIGN UP" | "LOG IN";
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  disableBtn,
  isLoading,
  btnText,
}) => {
  return (
    <button
      aria-label="auth-sbumit-button"
      aria-busy={isLoading}
      aria-disabled={disableBtn || isLoading}
      type="submit"
      disabled={disableBtn || isLoading}
      className="w-full h-10 my-2 text-lg text-black disabled:text-white font-bold rounded-lg bg-gradient-to-br from-[#19fa9a] to-[#22C1C3] disabled:from-[#19fa984c] disabled:to-[#22c0c34c] outline-none"
    >
      {!isLoading ? <span>{btnText}</span> : <ActivityLoader />}
    </button>
  );
};

export default AuthSubmitButton;
