import { fr } from "./fr";
import { en } from "./en";

export type Lang = "fr" | "en";
export type Dictionary = typeof fr;

export const dictionaries: Record<Lang, Dictionary> = { fr, en };

export const LANGS: Lang[] = ["fr", "en"];

export function isLang(v: unknown): v is Lang {
  return v === "fr" || v === "en";
}
