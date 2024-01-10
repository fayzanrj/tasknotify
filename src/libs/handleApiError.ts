import toast from "react-hot-toast";

const getErrorMessage = (error: any): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  return "An error occurred.";
};

export const handleApiError = (error: any) => {
  console.error(error);
  const errorMessage = getErrorMessage(error);
  toast.error(errorMessage);
};
