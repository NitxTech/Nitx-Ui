import Image from "next/image";
import Link from "next/link";

interface ProductIconProps {
  id: string;
  image: string;
  title: string;
  url: string;
  className?: string;
}

const ProductIcon = ({
  id,
  image,
  title,
  url,
  className = "",
}: ProductIconProps) => {
  return (
    <Link
      id={id}
      data-testid={`product-${id}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center w-full p-3 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-700/50 dark:border-zinc-700/50 transition ${className}`}
    >
      <Image width={28} height={28} src={image} alt={title} className="mr-3" />
      <span className="font-medium text-sm">{title}</span>
    </Link>
  );
};

export default ProductIcon;
