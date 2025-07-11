"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export function Modal({ src, alt = "Image preview", onClose }: Props) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        cursor: "pointer",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          objectFit: "contain",
          // boxShadow: "0 0 20px black",
        }}
      />
    </div>
  );
}
