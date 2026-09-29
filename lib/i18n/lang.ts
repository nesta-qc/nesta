import { cookies } from "next/headers";
import { isLang, type Lang } from "./dictionaries";
import { DEFAULT_LANG, LANG_COOKIE } from "./constants";

/**
 * Langue active côté serveur : lue depuis le cookie `nesta-lang`,
 * "fr" par défaut. Utilisable dans les Server Components.
 */
export async function getLang(): Promise<Lang> {
  try {
    const store = await cookies();
    const v = store.get(LANG_COOKIE)?.value;
    return isLang(v) ? v : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}
