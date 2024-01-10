import { useSession } from "next-auth/react";

const useHeaders = () => {
  const { data: session } = useSession(); 

  // Create headers object
  const headers = {
    'Content-Type': 'application/json',
    // @ts-ignore
    accessToken: session?.user?.accessToken,
  };

  return headers;
};

export default useHeaders;
