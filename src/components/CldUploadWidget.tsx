"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface CloudinaryResult {
    public_id: string,
    secure_url: string,
};

export function UploadWidget() {
  const [resource, setResource] = useState<CloudinaryResult | undefined>();
  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params/route.ts"
      onSuccess={(result) => {
        setResource(result?.info as CloudinaryResult);
      }}
      onQueuesEnd={(_, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return <button onClick={handleOnClick}>Puja una imatge</button>;
      }}
    </CldUploadWidget>
  );
}
