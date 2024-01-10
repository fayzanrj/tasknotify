import TopBar from "@/components/dashboard/TopBar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import "@/styles/globals.css";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

// Metadata
export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s - Task Notify`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession(authOptions);
  const name = data && data.user ? data.user.name : "Guest";

  return (
    <main className="w-full h-[100svh] flex">
      {/* Side component */}
      <Sidebar />
      <div className="w-full relative">
        {/* Top Bar component */}
        <TopBar name={name || "Guest"} />
        {/* Rest of the pages */}
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
