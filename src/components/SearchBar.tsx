"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Search } from "@/icons";

export default function SearchForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim() || "";
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      className="flex bg-white absolute left-1/2 transform -translate-x-1/2 rounded-2xl py-2 px-3"
      onSubmit={handleSubmit}
    >
      <input ref={inputRef} placeholder="e.g. Francesc Mateu" />
      <button type="submit">
        {<Search className="size-[24px] cursor-pointer ml-2" />}
      </button>
    </form>
  );
}
