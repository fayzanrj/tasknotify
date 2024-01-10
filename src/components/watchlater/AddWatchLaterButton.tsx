import React from "react";
import ActivityLoader from "../ActivityLoader";

// Add watch later button interface
interface AddWatchLaterButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

const AddWatchLaterButton: React.FC<AddWatchLaterButtonProps> = ({
  isLoading,
  isDisabled,
}) => (
  <div className="w-4/5 sm:w-96 h-9 mt-5">
    <button
      aria-label="add-watchlater-button"
      type="submit"
      disabled={isDisabled}
      className="w-16 h-10 text-[#1F1F1F] disabled:text-gray-400 font-semibold rounded-lg bg-[#19fa9a] disabled:bg-[#19fa985f] float-right"
    >
      {isLoading ? <ActivityLoader /> : "Add"}
    </button>
  </div>
);

export default AddWatchLaterButton;
