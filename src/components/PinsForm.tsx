"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { UploadPin, UploadImage } from "@/icons";
import { PINS_FORM } from "@/utils";
interface CloudinaryResultType {
  info: {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    original_filename: string;
  };
}

export default function PinForm() {
  const [imageUrl, setImageUrl] = useState<string>();
  const [publicId, setPublicId] = useState<string>();
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    street: "",
    altText: "",
    yearTaken: "",
    description: "",
    tags: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      yearTaken: formData.yearTaken ? parseInt(formData.yearTaken) : undefined,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : undefined,
      imageUrl,
      publicId,
    };

    const res = await fetch("/api/pins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error response:", text);
      throw new Error(`Server error: ${res.status}`);
    }

    const json = await res.json();
    formRef.current?.reset();
    setImageUrl(undefined);
    setPublicId(undefined);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // auto-hide after 3s
    console.log("Inserted pin:", json);
  };

  return (
    <>
      <form
        className="flex flex-col gap-2"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          type="number"
          name="latitude"
          placeholder={PINS_FORM.LATITUDE}
          onChange={handleChange}
          min={-90}
          max={90}
          step="any"
          required
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          type="number"
          name="longitude"
          placeholder={PINS_FORM.LONGITUDE}
          onChange={handleChange}
          min={-180}
          max={180}
          step="any"
          required
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          type="text"
          name="street"
          placeholder={PINS_FORM.STREET}
          maxLength={200}
          onChange={handleChange}
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          type="text"
          name="altText"
          placeholder={PINS_FORM.ALT_TEXT}
          onChange={handleChange}
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          type="number"
          name="yearTaken"
          placeholder={PINS_FORM.YEAR}
          min={1}
          max={new Date().getFullYear()}
          onChange={handleChange}
        />
        <textarea
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          name="description"
          placeholder={PINS_FORM.DESCRIPTION}
          onChange={handleChange}
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          name="tags"
          placeholder={PINS_FORM.TAGS}
          onChange={handleChange}
        />

        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          onSuccess={(result, { widget }) => {
            const info = (result as CloudinaryResultType).info;
            setImageUrl(info.secure_url);
            setPublicId(info.public_id);
          }}
        >
          {({ open }) => (
            <button
              className="font-bold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full text-sm px-5 py-2.5 text-center my-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex justify-center align-middle"
              type="button"
              onClick={() => open()}
            >
              <UploadImage className="mr-2" />
              <span className="content-center">{PINS_FORM.UPLOAD_IMAGE}</span>
            </button>
          )}
        </CldUploadWidget>

        {imageUrl && (
          <img src={imageUrl} alt="preview" style={{ width: 200 }} />
        )}
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center"
          type="submit"
        >
          <UploadPin className="mr-2" />
          <span>{PINS_FORM.SEND}</span>
        </button>
      </form>
      {submitted && (
        <div className="bg-green-200 text-green-900 p-2 rounded mt-2">
          {PINS_FORM.SENT}
        </div>
      )}
    </>
  );
}
