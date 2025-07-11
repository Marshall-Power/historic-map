"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { CldImage } from "next-cloudinary";
import "leaflet/dist/leaflet.css";
import { Modal } from "./Modal";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type Pin = {
  _id: string;
  latitude: number;
  longitude: number;
  street?: string;
  imageUrl?: string;
  description?: string;
};

export default function Map() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [preloadSrc, setPreloadSrc] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pins")
      .then((res) => res.json())
      .then((data) => setPins(data));
  }, []);
  console.log(pins);
  return (
    <>
      <MapContainer
        center={[41.98311, 2.82493]}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((pin) => (
          <Marker
            key={pin._id}
            position={[pin.latitude, pin.longitude]}
          >
            <Popup>
              <div>
                <strong>{pin.street}</strong>
                {pin.imageUrl && (
                  <CldImage
                    src={pin.imageUrl} // This can be public ID or full URL
                    width="100"
                    height="75"
                    alt={pin.description ?? "Historic photo"}
                    crop="fit"
                    gravity="auto"
                    onMouseOver={() => setPreloadSrc(pin.imageUrl as string)}
                    onClick={() => setModalSrc(pin.imageUrl as string) }
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {modalSrc && <Modal src={modalSrc} onClose={() => setModalSrc(null)} />}
    </>
  );
}
