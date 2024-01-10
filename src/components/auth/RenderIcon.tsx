import React from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Render Icon interface
interface RenderIconProps {
  error: boolean;
  label: string;
}

const RenderIcon: React.FC<RenderIconProps> = ({ error, label }) => (
  <button
    aria-label="validation-button"
    type="button"
    tabIndex={-1}
    onClick={() =>
      error
        ? label === "Confirm Password"
          ? toast.error(`Passwords are not matching`)
          : toast.error(`Please enter a valid ${label.toLowerCase()}`)
        : toast.success(`${label} is valid`)
    }
    className="outline-none"
  >
    {/* Check or Cross icon based on the error status */}
    {error ? (
      <FaTimesCircle
        size="1rem"
        color="red"
        className="ml-2 inline-block cursor-pointer outline-none"
      />
    ) : (
      <FaCheckCircle
        size="1rem"
        color="#19fa9a"
        className="ml-2 inline-block cursor-pointer outline-none"
      />
    )}
  </button>
);

export default RenderIcon;
