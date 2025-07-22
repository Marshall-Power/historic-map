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
    <div className="flex flex-col rounded-xl shadow-lg p-4 m-4 bg-white items-center border min-h-[360px]">
      <Image
        src={imageSrc}
        className="my-auto"
        alt={title}
        width={100}
        height={50}
        onClick={onClickImage}
      />
      <h2 className="text-xl font-bold mb-2 p-2 min-w-1xs text-center">
        {title}
      </h2>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
