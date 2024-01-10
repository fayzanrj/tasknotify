import { WatchLaterProps } from "@/props/WatchLaterProps";
import WatchLaterActionButton from "./WatchLaterActionButton";

// Watcher later list item interface
interface WatchLaterListItemProps extends WatchLaterProps {
  setWatchLaterList: React.Dispatch<React.SetStateAction<WatchLaterProps[]>>;
}

const WatchLaterListItem: React.FC<WatchLaterListItemProps> = ({
  url,
  title,
  image,
  id,
  note,
  setWatchLaterList,
}) => {
  return (
    <article>
      <div className="w-[16rem] h-60 text-sm rounded-lg bg-white dark:bg-[#1D1F21] shadow-lg overflow-hidden">
        {/* Image Preview */}
        {image && (
          <a href={url} target="_blank" aria-label="video-link">
            <img src={image} className="w-full h-3/5" alt="image" />
          </a>
        )}

        {/* Link  and title*/}
        <div className="p-2 overflow-hidden select-text">
          {/* Title */}
          <p className="w-full text-[1rem] text-ellipsis font-bold whitespace-nowrap overflow-hidden">
            {title}
          </p>
          {/* Link */}
          <p className="text-xs mt-2">
            Link :{" "}
            <span>
              <a href={url} className="underline underline-offset-4">
                {url}
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* Action button to show note and delete button */}
      <WatchLaterActionButton
        note={note}
        id={id}
        setWatchLaterList={setWatchLaterList}
      />
    </article>
  );
};

export default WatchLaterListItem;
