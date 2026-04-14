import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export function CategoryTile({
  src,
  title,
  href,
  size,
  priority = false,
}: {
  src: string;
  title: string;
  href: string;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={clsx(
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1",
      )}
    >
      <Link
        href={href}
        className="relative block aspect-square h-full w-full group overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
      >
        <Image
          src={src}
          alt={title}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        {/* Overlay progressivo para garantir contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

        {/* Conteúdo do Card posicionado exatamente como o label original */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-center transform transition-transform duration-300 group-hover:translate-y-[-10px]">
          <h3
            className={clsx(
              "mb-3 font-bold text-white drop-shadow-md",
              size === "full" ? "text-2xl md:text-4xl" : "text-lg md:text-xl",
            )}
          >
            {title}
          </h3>

          <div className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition-colors duration-300 shadow-lg">
            Ver Categoria
          </div>
        </div>
      </Link>
    </div>
  );
}
