export type ThemeMode = "global" | "accent" | "surface" | "text";

export type ThemeName = "light" | "dark";

export type DomainKey = "accent" | "surface" | "text";

export type DomainState = {
  baseColor: string;
  paletteType: PaletteType;
  hue: number;
  saturation: number;
  lightness: number;
};

export type ColorAdjustmentSeed = DomainState;

export type ColorAdjustments = {
  hueShift: number;
  saturationBias: number;
  lightnessBias: number;
};

export type ToneSeed = {
  h: number;
  s: number;
  l: number;
};

export type TextAdjustmentSeed = {
  text: ToneSeed;
  muted: ToneSeed;
  subtle: ToneSeed;
};

export type TextAdjustments = {
  contrastBias: number;
  mutedBias: number;
  subtleBias: number;
  warmthBias: number;
};

export type FontPairId =
  | "fraunces-syne"
  | "cormorant-source"
  | "brico-source"
  | "fraunces-source-serif";

export type FontPair = {
  id: FontPairId;
  label: string;
  headingFamily: string;
  bodyFamily: string;
  headingWeight: number;
  bodyWeight: number;
  editorialFamily: string;
  editorialWeight: number;
};

export type PaletteType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic"
  | "monochromatic";

export type PaletteOption = {
  id: PaletteType;
  label: string;
};

export type ModeOption = {
  id: ThemeMode;
  label: string;
  description: string;
};

export type ThemeVars = Record<`--${string}`, string>;

export type ThemeSwatch = {
  hue: number;
  color: string;
};

export type ThemeResult = {
  swatches: ThemeSwatch[];
  accent: ThemeVars;
  surfaces: ThemeVars;
  text: ThemeVars;
};

export type RadiusState = {
  control: number;
  panel: number;
  large: number;
  pill: number;
};

export type RadiusKey = keyof RadiusState;

export type StatusTone = "success" | "warning" | "danger";
