import { Card } from "@/components";

export const CardList = (pins: any) => {
  return (
    <>
      {pins.map((pin: any) => (
        <Card
          key={pin._id.toString()}
          imageSrc={pin.imageUrl}
          title={pin.street}
          text={pin.description}
        />
      ))}
    </>
  );
};
