import Image from "next/image";
import Link from "next/link";

interface ProductIconProps {
  image: string;
  title: string;
  url: string;
  className?: string;
}

const ProductIcon = ({
  image,
  title,
  url,
  className = "",
}: ProductIconProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center w-full p-3 rounded-xl border hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700/50 transition ${className}`}
    >
      <Image width={28} height={28} src={image} alt={title} className="mr-3" />
      <span className="font-medium text-sm">{title}</span>
    </Link>
  );
};

export default ProductIcon;
