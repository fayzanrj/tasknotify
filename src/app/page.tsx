import displayImg from "@/assets/displayImg.png";
import Navbar from "@/components/landingPage/Navbar";
import { Cinzel } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="BG_IMAGE dark:BG_IMAGE_DARK">
      {/* NAVBAR */}
      <Navbar />

      <div className="w-full min-h-screen h-fit py-20 px-5 lg:px-15 text-black dark:text-white flex justify-center lg:justify-between items-center flex-wrap">
        {/* SECTION 1 */}
        <section className="w-[28rem] p-10">
          <h1 className={`${cinzel.className} text-6xl font-bold`}>
            Manage Your{" "}
            <span className="text-[#19fa9a] drop-shadow-2xl -z-10">tasks</span>{" "}
            daily
          </h1>

          <p className="my-5 text-sm dark:text-gray-200">
            Start enjoying a more organized work in life to increase your
            productivity
          </p>

          <Link href={"/signup"}>
            <button className="mt-2 px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-br from-[#19fa9a] to-[#22C1C3] float-right">
              Get Started
            </button>
          </Link>
        </section>

        {/* SECTION 2 */}
        <section>
          <Image
            src={displayImg}
            width={450}
            height={450}
            quality={100}
            alt="img"
          />
        </section>
      </div>
    </main>
  );
}
