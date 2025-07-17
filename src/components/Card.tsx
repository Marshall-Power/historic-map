// Card.tsx
import Image from "next/image";

type CardProps = {
  imageSrc: string;
  title: string;
  text: string;
  onClickImage?: () => void;
};

export function Card({ imageSrc, title, text, onClickImage }: CardProps) {
  return (
    <div className="flex flex-col rounded-xl shadow-lg p-4 bg-white max-w-sm">
      <Image
        src={imageSrc}
        alt={title}
        width={100}
        height={50}
        onClick={onClickImage}
      />
      <h2 className="text-xl font-bold mb-2 p-2">{title}</h2>
      <p className="text-gray-700 p-2">{text}</p>
    </div>
  );
}
