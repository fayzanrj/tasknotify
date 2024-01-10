import LogInForm from "@/components/auth/LogInForm";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log In  - Task Notify",
};

const LogIn : NextPage = () => {
  return <LogInForm />;
};

export default LogIn;
