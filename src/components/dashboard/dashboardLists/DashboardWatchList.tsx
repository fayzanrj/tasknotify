"use client";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import React, { useState } from "react";
import FetchError from "../../FetchError";
import NoItemFound from "../../NoItemFound";
import DashboardList from "./DashboardList";

// Dasboard watch later list interface
interface DashboardWatchListProps {
  watchLater: WatchLaterProps[] | undefined;
}
const DashboardWatchList: React.FC<DashboardWatchListProps> = ({
  watchLater,
}) => {
  // Variable States
  const [initialWatchLater, setInitialWatchLater] = useState<
    WatchLaterProps[] | undefined
  >(watchLater);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to scroll
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("watchLaterContainer");

    if (container) {
      const scrollAmount = 252;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      if (newPosition >= 0 && newPosition < container.scrollWidth) {
        container.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });

        setScrollPosition(newPosition);
      } else {
        setScrollPosition(0);
      }
    }
  };

  // If there is an error
  if (initialWatchLater === undefined) {
    return <FetchError />;
  }

  return (
    <DashboardList
      handleScroll={handleScroll}
      id="watchLaterContainer"
      heading="Maybe you'd like to watch"
      itemsArray={initialWatchLater}
    >
      {/* List */}
      {initialWatchLater.length > 0 ? (
        initialWatchLater.map((watchlater: WatchLaterProps, index: number) => (
          <DashboardWatchListItem key={index} {...watchlater} />
        ))
      ) : (
        <NoItemFound variant="Watch Laters" />
      )}
    </DashboardList>
  );
};

export default DashboardWatchList;

// List Item Component
const DashboardWatchListItem = ({
  url,
  image,
  title,
}: {
  url: string;
  image: string;
  title: string;
}) => (
  <div className="min-w-[15rem] max-w-[15rem] h-56 rounded-lg bg-white dark:bg-[#1D1F21]  overflow-hidden">
    {/* Image */}
    <a href={url} target="_blank" className="w-full h-3/5">
      <img src={image} className="w-full object-cover" />
    </a>
    <p className="h-2/5 py-2 px-2 text-sm font-semibold rounded-b-lg border-[0.1rem] border-t-0 dark:border-[#1D1F21]">
      {title.slice(0, 90) + (title.length > 90 ? "....." : "")}
    </p>
  </div>
);
