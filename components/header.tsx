import Image from "next/image";
import { memo } from "react";
import { Logo } from "@/components/logo";

import GithubIcon from "@/components/icons/github-icon";
import Link from "next/link";

function Header() {
  return (
    <header className="relative mx-auto flex w-full shrink-0 items-center justify-between px-5 py-6">
      <Link href="/" className="flex items-center gap-2 group">
        <Logo />
        <span
          className="text-[1.75rem] font-black tracking-tight transition-all duration-300 group-hover:tracking-normal"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-white relative drop-shadow-lg">
            Pixon
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </span>
        </span>
      </Link>

      <a
        href="https://github.com/jayeshsingh-11/Pixly"
        target="_blank"
        className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-white hover:text-black hover:border-white hover:shadow-lg"
      >
        <GithubIcon className="size-4" />
        <span>Star on GitHub</span>
      </a>
    </header>
  );
}

export default memo(Header);
