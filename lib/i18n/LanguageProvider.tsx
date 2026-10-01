"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  dictionaries,
  isLang,
  type Dictionary,
  type Lang,
} from "./dictionaries";
import { DEFAULT_LANG, LANG_COOKIE } from "./constants";

interface LanguageContextValue {
  lang: Lang;
  /** Dictionnaire complet de la langue active. */
  t: Dictionary;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  t: dictionaries[DEFAULT_LANG],
  setLang: () => {},
});

/**
 * Fournit la langue aux composants clients. `initialLang` vient du
 * serveur (cookie), ce qui évite tout flash de langue au chargement.
 * Le changement de langue met à jour le cookie puis rafraîchit les
 * Server Components via router.refresh().
 */
export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const router = useRouter();

  const setLang = useCallback(
    (l: Lang) => {
      if (!isLang(l) || l === lang) return;
      setLangState(l);
      try {
        document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
        window.localStorage.setItem(LANG_COOKIE, l);
      } catch {
        /* stockage indisponible : la langue reste en mémoire */
      }
      document.documentElement.lang = l;
      /* Les URL /en/* sont la version anglaise découvrable (hreflang) :
         on bascule de préfixe plutôt que de rester sur une URL incohérente. */
      try {
        const pathname = window.location.pathname;
        const search = window.location.search;
        if (l === "en" && !pathname.startsWith("/en")) {
          router.push(pathname === "/" ? `/en${search}` : `/en${pathname}${search}`);
          return;
        }
        if (l === "fr" && pathname.startsWith("/en")) {
          const rest = pathname === "/en" ? "/" : pathname.slice(3);
          router.push(`${rest}${search}`);
          return;
        }
      } catch {
        /* navigation indisponible : repli sur le rafraîchissement */
      }
      router.refresh();
    },
    [lang, router],
  );

  return (
    <LanguageContext.Provider
      value={{ lang, t: dictionaries[lang], setLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/** Accès à la langue dans les composants clients. */
export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
