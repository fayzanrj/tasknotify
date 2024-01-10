import WatchLaterList from "@/components/watchlater/WatchLaterList";
import { getHeaders } from "@/libs/GetHeaders";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Watch Laters",
};

const WatchLater: NextPage = async () => {
  // HEADERS FOR API REQUEST
  const headers = await getHeaders();

  const response = await fetch(
    `${process.env.HOST}/api/watchlater/getwatchlaters`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const watchLaters: WatchLaterProps[] = res.watchlaters;

  return (
    <div className="relative p-5">
      {/* Watch Later List */}
      <WatchLaterList watchLaters={watchLaters} />
    </div>
  );
};

export default WatchLater;
