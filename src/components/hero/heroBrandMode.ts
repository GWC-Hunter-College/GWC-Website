export type HeroBrandMode = "static" | "animated" | "auto";
export type HeroBrandVariant = Exclude<HeroBrandMode, "auto">;

export const resolveHeroBrandVariant = (
  mode: HeroBrandMode,
  prefersReducedMotion: boolean,
): HeroBrandVariant => {
  if (mode === "auto") {
    return prefersReducedMotion ? "static" : "animated";
  }

  return mode;
};
