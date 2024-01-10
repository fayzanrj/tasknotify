import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up - Task Notify",
  description: "Sign Up to Task Notify",
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
