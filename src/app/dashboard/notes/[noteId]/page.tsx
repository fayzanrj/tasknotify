import GoBack from "@/components/GoBack";
import RefreshPage from "@/components/RefreshPage";
import NoteTextArea from "@/components/notes/NoteTextArea";
import { getHeaders } from "@/libs/GetHeaders";
import { NoteProps } from "@/props/NoteProps";
import React from "react";

const NoteDetail = async ({ params }: { params: { noteId: string } }) => {
  if (params.noteId.length !== 24) {
    return (
      <div className="relative">
        {/* Go back Button */}
        <GoBack href="/dashboard/notes" />
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-semibold">Error 404 : No note found</h3>
        </div>
      </div>
    );
  }

  const headers = await getHeaders();
  const response = await fetch(
    `${process.env.HOST}/api/notes/getNote/${params.noteId}`,
    {
      cache: "no-store",
      headers: headers,
    }
  );
  const res = await response.json();
  const note: NoteProps = res.note;

  return (
    <div className="relative">
      <RefreshPage />
      {/* Go back Button */}
      <GoBack href="/dashboard/notes" />

      <div className="w-full min-h-[calc(100svh_-_7.5rem)] sm:w-[30rem] md:w-[32rem] p-2 mx-auto mt-10">
        <NoteTextArea {...note} />
      </div>
    </div>
  );
};

export default NoteDetail;
