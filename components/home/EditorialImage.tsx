import Image from "next/image";
import type { SiteImage } from "@/lib/site-images";

interface EditorialImageProps {
  image: SiteImage;
  /** Ratio Tailwind aspect-*, ex. "aspect-[4/3]". */
  aspect?: string;
  /** Tailles responsives pour srcset. */
  sizes?: string;
  className?: string;
  eager?: boolean;
}

/**
 * Image éditoriale réutilisable : next/image optimisée (AVIF/WebP),
 * dimensions stables (aucun layout shift), lazy-load sous le fold.
 */
export function EditorialImage({
  image,
  aspect = "aspect-[4/3]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  eager = false,
}: EditorialImageProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-sand ${aspect} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={80}
        loading={eager ? "eager" : "lazy"}
        className="object-cover"
      />
    </div>
  );
}
