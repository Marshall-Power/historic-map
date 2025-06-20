"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";

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
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="number"
          name="latitude"
          placeholder="Latitude"
          onChange={handleChange}
          min={-90}
          max={90}
          step="any"
          required
        />
        <input
          type="number"
          name="longitude"
          placeholder="Longitude"
          onChange={handleChange}
          min={-180}
          max={180}
          step="any"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          maxLength={200}
          onChange={handleChange}
        />
        <input
          type="text"
          name="altText"
          placeholder="Image alt text"
          onChange={handleChange}
        />
        <input
          type="number"
          name="yearTaken"
          placeholder="Year Taken"
          min={1}
          max={new Date().getFullYear()}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
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
            <button type="button" onClick={() => open()}>
              Upload image
            </button>
          )}
        </CldUploadWidget>

        {imageUrl && (
          <img src={imageUrl} alt="preview" style={{ width: 200 }} />
        )}
        <button className='p-16' type="submit">Enviar Pin</button>
      </form>
      {submitted && (
        <div className="bg-green-200 text-green-900 p-2 rounded mt-2">
          Enviat!
        </div>
      )}
    </>
  );
}
