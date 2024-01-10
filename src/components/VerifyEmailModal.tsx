import { isValidCode } from "@/libs/IsValidCode";
import { handleApiError } from "@/libs/handleApiError";
import { UserProps } from "@/props/UserProps";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import ActivityLoader from "./ActivityLoader";
import Logo from "./Logo";
import ThemeToggleNavbarBtn from "@/components/landingPage/LandingThemeToggleBtn";

// TO DO : ADD VALIDATION

// Verify Email Modal interface
interface VerifyEmailModalProps {
  email: string;
  userId: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "SIGNUP" | "PROFILE";
  setUser?: React.Dispatch<React.SetStateAction<UserProps>>;
}

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  email,
  userId,
  setState,
  variant,
  setUser,
}) => {
  // Variable states
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Router for navigation
  const router = useRouter();

  // Function to handle suvmit i.e. verifying code
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Checking if code format is valid
      if (code.length < 6 || !isValidCode(code)) {
        toast.error("Please enter a valid code");
        return;
      }

      setIsLoading(true);
      const res = await axios.post("/api/code/verifyCode", { userId, code });
      toast.success(res.data.message);
      if (variant === "SIGNUP") {
        // If modal is being used in sign up
        router.push("/login");
      } else {
        // If modal is being used in profile
        setUser &&
          setUser((prev) => ({
            ...prev,
            isVerified: true,
            sendReminders: true,
          })); 
      }
      setState(false); // Closing Modal
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-[rgb(0,0,0,0.2)] flex justify-center items-center absolute top-0 left-0 z-20">
      <div className="w-[90%] sm:w-[60%] md:w-[30rem] h-96 p-10 text-center rounded-lg bg-white dark:bg-[#1F1F1F] relative">
        {/* LOGO */}
        <div>
          <Logo />
          <button
            className="absolute top-9 right-3"
            onClick={() => setState(false)}
            disabled={isLoading}
          >
            <IoMdClose size="1.5rem" />
          </button>
          <div className="absolute top-[1.95rem] left-3">
            <ThemeToggleNavbarBtn />
          </div>
        </div>

        <div>
          {/* Header */}
          <h3 className="my-4 text-3xl font-bold">Code Sent</h3>
          {/* Info */}
          <p className="font-semibold">
            A 6 digit code has been sent on <br />
            <span className="font-bold text-lg">{email}</span>
          </p>
        </div>

        <form className="mt-10" onSubmit={handleSubmit}>
          {/* Label */}
          <label htmlFor="code" className="sr-only">
            Enter Code
          </label>
          {/* Input Field */}
          <input
            disabled={isLoading}
            maxLength={6}
            placeholder="Enter code here"
            className="w-[50%] text-2xl text-center font-semibold placeholder:text-sm border-b-2 border-stone-700 rounded-none bg-white dark:bg-[#1F1F1F] disabled:bg-transparent outline-none "
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
          />
          <br />
          {/* Verify Button */}
          <button
            aria-label="verify-email-button"
            type="submit"
            disabled={isLoading}
            className="w-28 h-10 mt-12 text-lg text-black font-semibold rounded-lg bg-[#19fa9a] outline-none"
          >
            {isLoading ? <ActivityLoader /> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
