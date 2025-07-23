"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Search } from "@/icons";

interface SearchFromProps {
  placeholderText?: string;
}

export default function SearchForm({ placeholderText }: SearchFromProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && inputRef.current) {
      inputRef.current.value = q;
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim() || "";
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form
      className="flex bg-white absolute left-1/2 transform -translate-x-1/2 rounded-2xl py-2 px-3 z-10001 border"
      onSubmit={handleSubmit}
    >
      <input ref={inputRef} placeholder={placeholderText} />
      <button
        className="font-bold cursor-pointer text-sm"
        onClick={handleClear}
        type="button"
      >
        {" "}
        Clear{" "}
      </button>
      <button type="submit">
        {<Search className="size-[24px] cursor-pointer ml-2" />}
      </button>
    </form>
  );
}
