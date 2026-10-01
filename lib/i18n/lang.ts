import { cookies, headers } from "next/headers";
import { isLang, type Lang } from "./dictionaries";
import { DEFAULT_LANG, LANG_COOKIE } from "./constants";

/**
 * Langue active côté serveur : l'en-tête `x-nesta-lang` (posé par le
 * middleware sur les URL /en/*) est prioritaire, puis le cookie
 * `nesta-lang`, puis "fr" par défaut. Utilisable dans les Server Components.
 */
export async function getLang(): Promise<Lang> {
  try {
    const h = (await headers()).get("x-nesta-lang");
    if (isLang(h)) return h;
  } catch {
    /* pas d'en-tête : on tombe sur le cookie */
  }
  try {
    const store = await cookies();
    const v = store.get(LANG_COOKIE)?.value;
    return isLang(v) ? v : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}
