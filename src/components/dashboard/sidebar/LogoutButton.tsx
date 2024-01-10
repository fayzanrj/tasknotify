import { signOut } from "next-auth/react";
import React from "react";
import { CiLogout } from "react-icons/ci";

// Log out button
const LogoutButton: React.FC = () => (
  <li className="h-[2.9rem] my-1 p-3 text-sm dark:text-[#8D8D8D] text-black rounded-xl relative">
    <button
      onClick={() => signOut()}
      className="w-full h-full text-left overflow-hidden"
    >
      {/* Icon */}
      <span>
        <CiLogout className="inline-block font-semibold" size="1.3rem" />
      </span>

      {/* Text */}
      <p className="w-full font-bold absolute left-12 top-1/2 transform -translate-y-1/2">
        Log out
      </p>
    </button>
  </li>
);

export default LogoutButton;
