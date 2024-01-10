"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import { previewUrl } from "@/utilities/PreviewUrl";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import GoBack from "../GoBack";
import AddWatchLaterButton from "./AddWatchLaterButton";
import PreviewSection from "./PreviewSection";

const WatchLaterForm = () => {
  // Variable states
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  // Function to make all states an empty string
  const clearStates = () => {
    setUrl("");
    setImage("");
    setTitle("");
    setNote("");
  };

  // Handle change function
  const handleUrlChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 1) {
      setImage("");
      setTitle("");
    }
    setUrl(e.currentTarget.value);
  };

  // Handle blur function i.e. previews url
  const handleBlur = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      setIsPreviewing(true);
      const { title, img } = await previewUrl(e.currentTarget.value);
      setTitle(title);
      setImage(img);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsPreviewing(false);
    }
  };

  // Headers
  const headers = useHeaders();

  // Handle submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // API REQUEST
      const res = await axios.post(
        "/api/watchlater/addwatchlater",
        { url, title, image, note },
        { headers }
      );
      toast.success(res.data.message);
      clearStates();
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 relative">
      {/* Go back button */}
      <GoBack href="/dashboard/watchlater/" />

      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">Add watch later</h2>
      </div>

      <form
        className="w-full py-10 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {/* Preview */}
        <PreviewSection title={title} url={url} image={image} isPreviewing={isPreviewing} />

        <section className="w-11/12 sm:w-96 mx-auto mt-5">
          {/* URL Input */}
          <div className="w-full sm:w-96">
            <label htmlFor={"url"} className="ml-1 text-[1rem] font-semibold">
              Add a url
            </label>
            <br />
            <input
              type={"url"}
              id={"url"}
              placeholder="e.g. youtube.com"
              value={url}
              onChange={handleUrlChange}
              disabled={isLoading}
              onBlur={handleBlur}
              className="w-full my-1 p-2 font-semibold rounded-lg border-2 dark:border-[#1F1F1F] dark:bg-[#1F1F1F] outline-none"
            />
          </div>

          {/* Note input */}
          <div className="w-full sm:w-96 mt-5">
            <label htmlFor={note} className="text-[1rem] ml-1 font-semibold">
              Add a note <span className="text-sm">({note.length}/80)</span>
            </label>
            <br />
            <input
              type={"text"}
              id={note}
              placeholder={"e.g. To become a better developer"}
              maxLength={80}
              value={note}
              onChange={(e) => setNote(e.currentTarget.value)}
              disabled={isLoading}
              className="w-full my-1 p-2 font-semibold rounded-lg border-2 dark:border-[#1F1F1F] dark:bg-[#1F1F1F] outline-none"
            />
          </div>
        </section>

        {/* Submit button */}
        <AddWatchLaterButton
          isLoading={isLoading}
          isDisabled={!!(isLoading || !url || !note)}
        />
      </form>
    </div>
  );
};

export default WatchLaterForm;
