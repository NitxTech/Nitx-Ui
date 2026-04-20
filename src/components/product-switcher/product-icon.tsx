import Image from "next/image";
import Link from "next/link";

interface ProductIconProps {
  id: string;
  image: string;
  dark_image:string
  title: string;
  url: string;
  className?: string;
}

const ProductIcon = ({
  id,
  image,
  dark_image,
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
      className={`flex items-center ltr:flex-row rtl:flex-row-reverse w-full p-3 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-700/50 dark:border-zinc-700/50 transition ${className}`}
    >
      <Image width={28} height={28} src={image} alt={title} className="mr-3 dark:hidden" />
      <Image width={28} height={28} src={dark_image} alt={title} className="mr-3 hidden dark:block" />
      <span className="font-medium text-sm text-left">{title}</span>
    </Link>
  );
};

export default ProductIcon;
