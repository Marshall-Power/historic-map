import { Suspense } from "react";
import { AUTH } from "@/utils";
import { SearchBar } from "@/components";
import Link from "next/link";
import { SEARCHBAR } from "@/utils/constants";

const Header = () => {
  return (
    <header className="absolute w-full flex justify-end items-center z-1001 p-2">
      <Suspense>
        <SearchBar placeholderText={SEARCHBAR.PLACEHOLDER} />
      </Suspense>
      <Link
        className="hover:underline hover:underline-offset-4 flex justify-center bg-white rounded-2xl py-2 pl-2 pr-3 cursor-pointer"
        href="/auth/login?returnTo=/upload"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-[24px] mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <span>{AUTH.LOGIN}</span>
      </Link>
    </header>
  );
};

export default Header;
