import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const Logo: React.FC = () => {
  return (
    <div
      className={`text-center text-2xl dark:text-white font-extrabold tracking-tighter ${montserrat.className}`}
    >
      <p>
        task<span className="logo">notify</span>
      </p>
    </div>
  );
};

export default Logo;