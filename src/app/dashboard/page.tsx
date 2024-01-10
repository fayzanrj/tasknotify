import DashboardNotesList from "@/components/dashboard/dashboardLists/DashboardNotesList";
import DashboardTasksList from "@/components/dashboard/dashboardLists/DashboardTasksList";
import DashboardWatchList from "@/components/dashboard/dashboardLists/DashboardWatchList";
import TaskCompletionStats from "@/components/dashboard/taskStats/TaskCompletionStats";
import { getHeaders } from "@/libs/GetHeaders";
import { NoteProps } from "@/props/NoteProps";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { authOptions } from "@/utilities/AuthOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const Dashboard: NextPage = async () => {
  const data = await getServerSession(authOptions);

  const headers = await getHeaders();

  // Watch Later fetch request
  const watchLaterFetch = await fetch(
    `${process.env.HOST}/api/watchlater/getwatchlaters`,
    { cache: "no-store", headers }
  );
  const watchLaterFetchRes = await watchLaterFetch.json();
  const watchLaters: WatchLaterProps[] = watchLaterFetchRes.watchlaters;

  // Notes fetch request
  const notesFetch = await fetch(`${process.env.HOST}/api/notes/getAllNotes`, {
    cache: "no-store",
    headers,
  });
  const notesFetchRes = await notesFetch.json();
  const notes: NoteProps[] = notesFetchRes.notes;


  return (
    <div className="w-full py-10 px-5">
      {/* @ts-ignore */}
      <TaskCompletionStats accessToken={data?.user?.accessToken} />

      <section className="w-full mt-2 mb-10 overflow-hidden">
        {/* TASKS */}
        {/* @ts-ignore */}
        <DashboardTasksList accessToken={data?.user?.accessToken} />

        {/* WATCH LATERS */}
        <DashboardWatchList watchLater={watchLaters} />

        {/* NOTES */}
        <DashboardNotesList notes={notes} />
      </section>
    </div>
  );
};

export default Dashboard;
