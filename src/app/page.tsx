"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Header } from "@/components";

const Map = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 w-full items-center sm:items-start">
        <Header />
        <Map />
      </main>
    </div>
  );
}
