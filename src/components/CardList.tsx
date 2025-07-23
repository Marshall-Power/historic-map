"use client";
import { useState } from "react";
import { Card, Modal } from "@/components";

export const CardList = ({ pins }: any) => {
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  return (
    <>
      {pins.map((pin: any) => (
        <Card
          key={pin._id.toString()}
          imageSrc={pin.imageUrl}
          title={pin.street}
          text={pin.description}
          onClickImage={() => setModalSrc(pin.imageUrl as string)}
        />
      ))}
      {modalSrc && <Modal src={modalSrc} onClose={() => setModalSrc(null)} />}
    </>
  );
};
