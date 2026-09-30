import Link from "next/link";
import Image from "next/image";
import { EDITORIAL_IMAGES } from "@/lib/site-images";
import { getLang } from "@/lib/i18n/lang";
import { dictionaries } from "@/lib/i18n/dictionaries";

/**
 * Dernier appel à l'action : fond architectural sombre, texte minimaliste.
 */
export async function FinalCTA() {
  const t = dictionaries[await getLang()].accueil;
  return (
    <section className="relative overflow-hidden bg-forest-ink">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={EDITORIAL_IMAGES.finalCta.src}
          alt=""
          fill
          sizes="100vw"
          quality={78}
          loading="lazy"
          className="object-cover opacity-45"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d1c30]/60 via-[#0d1c30]/30 to-[#0d1c30]/70"
      />
      <div className="relative mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="font-display text-3xl text-white sm:text-5xl">
          {t.finalTitre}
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/search"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-forest transition-colors duration-200 hover:bg-ivory sm:w-auto"
          >
            {t.finalExplorer}
          </Link>
          <Link
            href="/sell/nouveau"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 sm:w-auto"
          >
            {t.finalPublier}
          </Link>
        </div>
      </div>
    </section>
  );
}
