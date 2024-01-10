"use client";
import { useState } from "react";
import ScreenActivityLoader from "../ScreenActivityLoader";
import NoteTextAreaActionBtns from "./NoteTextAreaActionBtns";

// Note textarea interface
interface NoteTextAreaProps {
  id: string;
  content: string;
}

const NoteTextArea: React.FC<NoteTextAreaProps> = ({ id, content }) => {
  // Variable states
  const [noteContent, setNoteContent] = useState<string>(content);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpellCheckerOn, setIsSpellCheckerOn] = useState<boolean>(true);

  // If note is not found or note is undefined
  if (noteContent === (undefined || null)) {
    return (
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-semibold">Error 404 : No note found</h3>
      </div>
    );
  }

  return (
    <>
      <NoteTextAreaActionBtns
        content={noteContent}
        setIsLoading={setIsLoading}
        id={id}
        setIsSpellCheckerOn={setIsSpellCheckerOn}
        isSpellCheckerOn={isSpellCheckerOn}
      />
      {/* Area where note is being written */}
      <textarea
        value={noteContent}
        placeholder={!isLoading ? "Start writing from here." : ""}
        onChange={(e) => setNoteContent(e.currentTarget.value)}
        spellCheck={isSpellCheckerOn}
        className="w-full h-[70svh] mt-3 px-2 md:px-1 font-semibold bg-transparent outline-none resize-none SCROLL_BAR"
      />

      {isLoading && <ScreenActivityLoader />}
    </>
  );
};

export default NoteTextArea;
