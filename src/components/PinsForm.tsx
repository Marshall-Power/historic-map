"use client";

import { useState } from "react";
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
    console.log("Inserted pin:", json);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="latitude"
        placeholder="Latitude"
        onChange={handleChange}
        required
      />
      <input
        name="longitude"
        placeholder="Longitude"
        onChange={handleChange}
        required
      />
      <input
        name="street"
        placeholder="Street"
        onChange={handleChange}
        required
      />
      <input
        name="altText"
        placeholder="Image alt text"
        onChange={handleChange}
      />
      <input
        name="yearTaken"
        placeholder="Year Taken"
        type="number"
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
        onSuccess={(result) => {
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

      {imageUrl && <img src={imageUrl} alt="preview" style={{ width: 200 }} />}
      <button type="submit">Save Pin</button>
    </form>
  );
}
