"use client";

import { CldUploadWidget } from "next-cloudinary";

export function UploadWidget() {
  return (
    <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params/route.ts">
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
}
