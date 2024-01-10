"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import ActivityLoader from "../ActivityLoader";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import WatchLaterListItem from "./WatchLaterListItem";

// Watch later list interface
interface WatchLaterListProps {
  watchLaters: WatchLaterProps[];
}

const WatchLaterList: React.FC<WatchLaterListProps> = ({ watchLaters }) => {
  const [watchLaterList, setWatchLaterList] =
    useState<WatchLaterProps[]>(watchLaters);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HEADERS FOR API REQUEST
  const headers = useHeaders();

  // Handle Refresh
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/watchlater/getwatchlaters", {
        headers,
      });
      setWatchLaterList(res.data.watchlaters);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // if there is an error fetching watch later
  if (watchLaterList === undefined) {
    return (
      <>
        <ButtonSection isLoading={isLoading} handleRefresh={handleRefresh} />
        <FetchError />;
      </>
    );
  }

  // If there are no items in watch later
  if (watchLaterList.length === 0) {
    return (
      <>
        <ButtonSection isLoading={isLoading} handleRefresh={handleRefresh} />
        <div className="mt-20">
          <NoItemFound variant="Watch Laters" />
        </div>
      </>
    );
  }

  return (
    <>
      <ButtonSection isLoading={isLoading} handleRefresh={handleRefresh} />
      {/* Watch Laters */}
      <section className="w-full pb-10 flex justify-center flex-wrap gap-5">
        {watchLaterList.map((watchlater: WatchLaterProps, index: number) => (
          <WatchLaterListItem
            key={index}
            {...watchlater}
            setWatchLaterList={setWatchLaterList}
          />
        ))}
      </section>
    </>
  );
};

export default WatchLaterList;

// Button Section component
const ButtonSection = ({
  isLoading,
  handleRefresh,
}: {
  isLoading: boolean;
  handleRefresh: () => void;
}) => {
  return (
    <section className="w-full h-10 my-2 flex justify-end items-center gap-5">
      {/* Add watch later page link */}
      <Link href={"/dashboard/watchlater/addwatchlater"}>
        <button
          aria-label="add-watchlater-button"
          className="px-3 py-1.5 text-[#1F1F1F] font-bold rounded-lg bg-[#19fa9a]"
        >
          Add watch later
        </button>
      </Link>

      {/* Refresh button */}
      <button
        aria-label="refresh-watchlater-button"
        onClick={handleRefresh}
        disabled={isLoading}
        className="w-16 h-10 font-semibold rounded-lg"
      >
        {isLoading ? <ActivityLoader /> : "Refresh"}
      </button>
    </section>
  );
};
