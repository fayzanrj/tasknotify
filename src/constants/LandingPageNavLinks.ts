import { NavbarLinkProps } from "@/props/NavbarLinksProps";

export const NAVBAR_LINKS: NavbarLinkProps[] = [
  { text: "Repository", href: "https://github.com/fayzanrj/tasknotify" },
  { text: "Twitter", href: "https://twitter.com/fayzanrj" },
  { text: "Login", href: "/login" },
  {
    text: "Sign Up",
    href: "/signup",
    className:
      "px-5 py-2 text-black font-semibold rounded-lg bg-[#19fa9a]",
  },
];
