"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Header } from "@/components";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-screen h-screen items-start">
        <Header />
        <Map />
      </main>
    </div>
  );
}
