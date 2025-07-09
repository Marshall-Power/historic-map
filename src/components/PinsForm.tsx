"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import SendPin from "/public/icons/send_pin.svg";

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
          placeholder="Latitud"
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
          placeholder="Longitud"
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
          placeholder="Carrer"
          maxLength={200}
          onChange={handleChange}
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          type="text"
          name="altText"
          placeholder="Text Alt Imatge"
          onChange={handleChange}
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          type="number"
          name="yearTaken"
          placeholder="Any"
          min={1}
          max={new Date().getFullYear()}
          onChange={handleChange}
        />
        <textarea
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          name="description"
          placeholder="Descripció"
          onChange={handleChange}
        />
        <input
          className="border-solid border-black border-1 rounded-lg px-[12px] py-[4px]"
          name="tags"
          placeholder="Tags (separats amb commes)"
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
              <svg
                className="mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              <span className="content-center">Pujar image</span>
            </button>
          )}
        </CldUploadWidget>

        {imageUrl && (
          <img src={imageUrl} alt="preview" style={{ width: 200 }} />
        )}
        <button
          className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center"
          type="submit"
        >
          <SendPin className="mr-2" />
          <span>Enviar Pin</span>
        </button>
      </form>
      {submitted && (
        <div className="bg-green-200 text-green-900 p-2 rounded mt-2">
          Enviat!
        </div>
      )}
    </>
  );
}
