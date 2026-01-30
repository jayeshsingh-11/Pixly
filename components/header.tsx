import Image from "next/image";
import { memo } from "react";

import GithubIcon from "@/components/icons/github-icon";
import Link from "next/link";

function Header() {
  return (
    <header className="relative mx-auto flex w-full shrink-0 items-center justify-between px-5 py-6">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-500/40 overflow-hidden">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 relative z-10">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 7.5L12 13L22 7.5L12 2ZM3.5 16.5L11 20.6V14L3.5 9.9V16.5ZM13 14V20.6L20.5 16.5V9.9L13 14Z" fill="currentColor" fillOpacity="0.9" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 transition-all duration-300">Pixly</span>
      </Link>

      <a
        href="https://github.com/jayeshsingh-11/Pixly"
        target="_blank"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 hover:shadow"
      >
        <GithubIcon className="size-4" />
        <span>Star on GitHub</span>
      </a>
    </header>
  );
}

export default memo(Header);
