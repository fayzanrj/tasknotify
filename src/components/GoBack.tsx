"use client";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

// Go back interface
interface GoBackProps {
  href: string;
}

const GoBack: React.FC<GoBackProps> = ({ href }) => {
  return (
    <>
      <Link
        href={href}
        className="absolute top-4 left-4 select-none cursor-pointer"
      >
        <FaArrowLeftLong className="inline-block" />
        <p className="ml-1 text-sm font-semibold inline-block">Go back</p>
      </Link>
      <div className="w-full h-4"></div>
    </>
  );
};

export default GoBack;
