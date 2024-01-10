import WatchLaterForm from "@/components/watchlater/WatchLaterForm";
import { Metadata, NextPage } from "next";

export const metadata : Metadata = {
  title : "Add Watch Later"
}

const WatchLater: NextPage = () => {
  return(
    <WatchLaterForm/>
  );
};

export default WatchLater;
