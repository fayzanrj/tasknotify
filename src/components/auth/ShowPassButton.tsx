import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

// Show pass interface
interface ShowPassProp {
  showPass: boolean;
  setShowPass: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowPassButton: React.FC<ShowPassProp> = ({ showPass, setShowPass }) => {
  return (
    <span
      aria-label="show-pass-btn"
      onClick={() => setShowPass(!showPass)}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 select-none outline-none cursor-pointer"
    >
      {showPass ? <IoEyeOff size="1.2em" /> : <IoEye size="1.2em" />}
    </span>
  );
};

export default ShowPassButton;
