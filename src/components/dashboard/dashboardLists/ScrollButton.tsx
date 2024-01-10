import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface ScrollButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  onClick,
  disabled,
}) => (
  <button
    aria-label={`scroll-btn-${direction}`}
    aria-disabled={disabled}
    onClick={onClick}
    disabled={disabled}
    className="w-fit h-40 disabled:text-stone-800 rounded-lg z-20"
  >
    {direction === "left" ? (
      <MdArrowBackIos size={"2rem"} className="inline-block" />
    ) : (
      <MdArrowForwardIos size={"2rem"} className="inline-block" />
    )}
  </button>
);

export default ScrollButton;
