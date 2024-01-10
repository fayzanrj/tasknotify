import React from "react";
import { Lia500Px } from "react-icons/lia";

const FetchError = () => {
  return (
    <div className="w-fit mt-20 mx-auto px-3 text-center">
      <span>
        <Lia500Px size={"4rem"} className="inline-block" />
      </span>
      <h3 style={{ wordSpacing: ".2rem" }} className="px-20 text-3xl font-semibold">
        Lets just say we are facing an error
      </h3>
    </div>
  );
};

export default FetchError;
