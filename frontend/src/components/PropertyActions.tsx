"use client";

import { Check, GitCompareArrows, Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import {
  MAX_COMPARE_PROPERTIES,
  useCompare,
} from "@/context/CompareContext";

type Props = {
  property: {
    slug: string;
    name: string;
  };
};

export default function PropertyActions({ property }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { compareSlugs, isCompared, toggleCompare } = useCompare();

  const favorite = isFavorite(property.slug);
  const compared = isCompared(property.slug);
  const limitReached =
    compareSlugs.length >= MAX_COMPARE_PROPERTIES && !compared;

  const buttonStyle =
    "inline-flex min-h-10 items-center justify-center gap-2 border px-3 py-2 text-[10px] tracking-wide transition-colors";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={favorite}
        onClick={() => toggleFavorite(property.slug)}
        className={`${buttonStyle} ${
          favorite
            ? "border-[#8C8174] bg-[#E8E0D4] text-[#292724]"
            : "border-[#292724]/20 text-[#71685E] hover:bg-[#E8E0D4]"
        }`}
      >
        <Heart size={14} fill={favorite ? "currentColor" : "none"} />
        {favorite ? "SAVED" : "SAVE"}
      </button>

      <button
        type="button"
        aria-pressed={compared}
        disabled={limitReached}
        title={limitReached ? "Compare up to three properties." : undefined}
        onClick={() => toggleCompare(property.slug)}
        className={`${buttonStyle} ${
          compared
            ? "border-[#292724] bg-[#292724] text-[#F5F1EA]"
            : "border-[#292724]/20 text-[#71685E] hover:bg-[#E8E0D4]"
        } disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {compared ? <Check size={14} /> : <GitCompareArrows size={14} />}
        {compared ? "ADDED" : "COMPARE"}
      </button>
    </div>
  );
}
