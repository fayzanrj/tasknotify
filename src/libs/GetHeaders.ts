import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

export const getHeaders = async () => {
  const data = await getServerSession(authOptions);

  const headers = {
    "Content-Type": "application/json",
    //@ts-ignore
    accessToken: data?.user?.accessToken,
  };
  return headers;
};
