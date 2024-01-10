import React from "react";
import { MdOutlineSearchOff } from "react-icons/md";

// No item found interface
interface NoItemFoundProps {
  variant: string;
}

const NoItemFound: React.FC<NoItemFoundProps> = ({ variant }) => {
  return (
    <div className="w-fit mx-auto px-3 text-center">
      <span>
        <MdOutlineSearchOff size={"4rem"} className="inline-block" />
      </span>
      <h3 style={{ wordSpacing: ".2rem" }} className="text-3xl font-semibold">
        {variant} found : ZERO
      </h3>
    </div>
  );
};

export default NoItemFound;
