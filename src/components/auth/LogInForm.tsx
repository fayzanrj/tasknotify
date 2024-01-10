"use client";
import { isValidEmail } from "@/libs/FormValidations";
import { handleApiError } from "@/libs/handleApiError";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthSubmitButton from "./AuthSubmitButton";
import Header from "./Header";
import InputField from "./InputField";

// Error interface
interface ErrorProps {
  [key: string]: boolean;
}

const LogInForm: React.FC = () => {
  // State variables for form fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [errors, setErrors] = useState<ErrorProps>({ emailError: true });
  // Router to navigate
  const router = useRouter();

  // Function to handle login form submission
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Invalid Email");
      return;
    }
    if (password.length === 0) {
      toast.error("Enter Password");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: email.toLowerCase(),
        password: password,
        redirect: false,
      });

      if (res && res.ok) {
        router.push("/dashboard");
        toast.success("Logged in successfully. Redirecting to dashboard.");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // use effect to check validations status and disable button
  useEffect(() => {
    setDisableBtn(password.length <= 1 && errors.emailError);
  }, [errors, password]);

  return (
    <form
      className="w-11/12 md:w-96 h-96 px-7 py-8 rounded-md dark:bg-[#151515] bg-white shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      onSubmit={handleLogIn}
    >
      {/* Header i.e. logo and theme toggle */}
      <Header />

      {/* Email Input */}
      <InputField
        label="Email"
        type="text"
        id="email"
        disabled={isLoading}
        placeHolder="Enter your email"
        state={email}
        setState={setEmail}
        setFormError={setErrors}
      />

      {/* Password Input */}
      <InputField
        label="Password"
        type="password"
        id="password"
        disabled={isLoading}
        placeHolder="Enter your password"
        state={password}
        setState={setPassword}
        variant="NO_VALIDATION"
      />

      {/* Login Button */}
      <AuthSubmitButton
        disableBtn={disableBtn}
        isLoading={isLoading}
        btnText="LOG IN"
      />

      {/* Signup Link */}
      <div className="my-4 text-center">
        <p className="text-sm font-semibold">
          Not a user?{" "}
          <span className="text-lg underline">
            <Link href={"/signup"}>Sign up</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default LogInForm;
