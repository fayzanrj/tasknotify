import React from "react";
import ActivityLoader from "../ActivityLoader";

// Preview Section interface
interface PreviewSectionProps {
  url: string;
  title: string;
  image: string;
  isPreviewing: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  url,
  image,
  title,
  isPreviewing,
}) => (
  <section className="w-full sm:w-96 h-[65vw] sm:h-72">
    <div className="w-[90%] sm:w-96 h-[50vw] sm:h-56 m-auto font-semibold rounded-lg border-2 dark:border-[#1F1F1F] dark:bg-[#1F1F1F] relative SCROLL_BAR">
      <>
        {/* Enter url message */}
        {!url && !isPreviewing && <EnterUrlMessage />}

        {/* Loading state */}
        {isPreviewing && <Loader />}

        {/* Image */}
        {image && <img src={image} className="w-full h-full" alt="image" />}
      </>
    </div>

    {/* Url preview title */}
    {
      <p className="w-[90%] py-2 px-3 font-semibold">
        {title.slice(0, 90) + (title.length > 90 ? "...." : "")}
      </p>
    }
  </section>
);

export default PreviewSection;

// Enter url message component
const EnterUrlMessage = () => (
  <div className="w-full text-center text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    Enter a URL to preview
  </div>
);

const Loader = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <ActivityLoader />
  </div>
);
