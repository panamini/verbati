import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  ColorAdjustments,
  DomainKey,
  DomainState,
  FontPair,
  FontPairId,
  ModeOption,
  PaletteOption,
  PaletteType,
  RadiusState,
  TextAdjustmentSeed,
  TextAdjustments,
  ThemeMode,
  ThemeResult,
  ThemeVars,
} from "@/types";

type ThemeContextValue = {
  dark: boolean;
  setDark: (value: boolean) => void;
  toggleTheme: () => void;
  baseColor: string;
  setBaseColor: (value: string) => void;
  paletteType: PaletteType;
  setPaletteType: (value: PaletteType) => void;
  themeMode: ThemeMode;
  setThemeMode: (value: ThemeMode) => void;
  globalHue: number;
  setGlobalHue: (value: number) => void;
  globalSaturation: number;
  setGlobalSaturation: (value: number) => void;
  globalLightness: number;
  setGlobalLightness: (value: number) => void;
  localHueShift: number;
  setLocalHueShift: (value: number) => void;
  localSaturationBias: number;
  setLocalSaturationBias: (value: number) => void;
  localLightnessBias: number;
  setLocalLightnessBias: (value: number) => void;
  textContrastBias: number;
  setTextContrastBias: (value: number) => void;
  textMutedBias: number;
  setTextMutedBias: (value: number) => void;
  textSubtleBias: number;
  setTextSubtleBias: (value: number) => void;
  textWarmthBias: number;
  setTextWarmthBias: (value: number) => void;
  resetCurrentModeAdjustments: () => void;
  selectedPairId: FontPairId;
  setSelectedPairId: (value: FontPairId) => void;
  selectedPair: FontPair;
  fontPairs: FontPair[];
  paletteOptions: PaletteOption[];
  modeOptions: ModeOption[];
  radius: RadiusState;
  setRadiusControl: (value: number) => void;
  setRadiusPanel: (value: number) => void;
  setRadiusLarge: (value: number) => void;
  setRadiusPill: (value: number) => void;
  theme: ThemeResult;
  composedTheme: ThemeResult;
  activeThemeVars: ThemeVars;
  radiusVars: ThemeVars;
  exportThemeCss: string;
  exportSiteCss: string;
  copyThemeCss: () => Promise<void>;
  downloadThemeCss: () => void;
  copySiteCss: () => Promise<void>;
  downloadSiteCss: () => void;
  activeDomain: "global" | DomainKey;
  isUsingGlobalForCurrentMode: boolean;
  currentModeUsesLocalOverride: boolean;
  currentModeCanUseLocalOverride: boolean;
  setCurrentModeUseLocalOverride: (value: boolean) => void;
  detachCurrentModeFromGlobal: () => void;
  resetCurrentModeToGlobal: () => void;
  resetAllModesToGlobal: () => void;
};

type ToneSeed = {
  h: number;
  s: number;
  l: number;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DEFAULTS = {
  radiusControl: 6,
  radiusPanel: 12,
  radiusLarge: 18,
  radiusPill: 999,
  dark: false,
  themeMode: "global" as ThemeMode,
  selectedPairId: "cormorant-source" as FontPairId,
};

const DEFAULT_GLOBAL_PRESET: DomainState = {
  baseColor: "#3f8f74",
  paletteType: "analogous",
  hue: 0,
  saturation: 0,
  lightness: 0,
};

const NEUTRAL_COLOR_ADJUSTMENTS: ColorAdjustments = {
  hueShift: 0,
  saturationBias: 0,
  lightnessBias: 0,
};

const NEUTRAL_TEXT_ADJUSTMENTS: TextAdjustments = {
  contrastBias: 0,
  mutedBias: 0,
  subtleBias: 0,
  warmthBias: 0,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function wrapHue(hue: number) {
  const value = hue % 360;
  return value < 0 ? value + 360 : value;
}

function cloneColorAdjustments(adjustments: ColorAdjustments): ColorAdjustments {
  return { ...adjustments };
}

function cloneTextAdjustments(adjustments: TextAdjustments): TextAdjustments {
  return { ...adjustments };
}

function hexToHsl(hex: string) {
  const clean = hex.replace("#", "");
  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean;

  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));

    if (max === r) {
      hue = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
      hue = 60 * ((b - r) / delta + 2);
    } else {
      hue = 60 * ((r - g) / delta + 4);
    }
  }

  return {
    h: wrapHue(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${Math.round(wrapHue(h))} ${Math.round(clamp(s, 0, 100))}% ${Math.round(
    clamp(l, 0, 100),
  )}%)`;
}

function hsla(h: number, s: number, l: number, a: number) {
  return `hsl(${Math.round(wrapHue(h))} ${Math.round(clamp(s, 0, 100))}% ${Math.round(
    clamp(l, 0, 100),
  )}% / ${a})`;
}

function parseHslTone(value: string): ToneSeed | null {
  const match = value.match(/hsl\(\s*([-\d.]+)\s+([-\d.]+)%\s+([-\d.]+)%/i);

  if (!match) {
    return null;
  }

  return {
    h: Number(match[1]),
    s: Number(match[2]),
    l: Number(match[3]),
  };
}

function createHarmonySwatches(baseHue: number, type: PaletteType, dark: boolean) {
  const configs: Record<PaletteType, number[]> = {
    complementary: [0, 180],
    analogous: [-30, 0, 30],
    triadic: [0, 120, 240],
    "split-complementary": [0, 150, 210],
    tetradic: [0, 90, 180, 270],
    monochromatic: [0, 0, 0, 0],
  };

  const offsets = configs[type];

  return offsets.map((offset, index) => {
    const hue = wrapHue(baseHue + offset);
    const saturation =
      type === "monochromatic"
        ? clamp(28 + index * 12, 22, 72)
        : clamp(44 + (index % 2) * 10, 36, 72);

    const lightness = dark
      ? clamp(58 + (index % 2) * 8 - Math.floor(index / 2) * 3, 50, 76)
      : clamp(42 + (index % 2) * 8 - Math.floor(index / 2) * 2, 34, 64);

    return {
      hue,
      color: hsl(hue, saturation, lightness),
    };
  });
}

function buildThemeVars(
  baseHue: number,
  type: PaletteType,
  dark: boolean,
  saturationBias: number,
  lightnessBias: number,
): ThemeResult {
  const swatches = createHarmonySwatches(baseHue, type, dark);
  const accentHue = swatches[0]?.hue ?? baseHue;
  const secondaryHue = swatches[1]?.hue ?? wrapHue(baseHue + 30);
  const tertiaryHue = swatches[2]?.hue ?? wrapHue(baseHue - 28);

  const accentSat = clamp((dark ? 52 : 46) + saturationBias, 18, 78);
  const accentHoverSat = clamp((dark ? 56 : 50) + saturationBias, 20, 82);
  const accentLight = clamp((dark ? 62 : 34) + lightnessBias, dark ? 36 : 20, dark ? 82 : 56);
  const accentHoverLight = clamp((dark ? 70 : 44) + lightnessBias, dark ? 42 : 24, dark ? 90 : 66);

  const accent = hsl(accentHue, accentSat, accentLight);
  const accentHover = hsl(accentHue, accentHoverSat, accentHoverLight);
  const accentSoft = dark
    ? hsl(
        secondaryHue,
        clamp(20 + saturationBias * 0.4, 8, 32),
        clamp(20 + lightnessBias * 0.4, 10, 30),
      )
    : hsl(
        secondaryHue,
        clamp(20 + saturationBias * 0.4, 8, 34),
        clamp(88 + lightnessBias * 0.4, 76, 96),
      );
  const onAccent = dark ? hsl(accentHue, 10, 8) : hsl(40, 20, 99);

  const canvas = dark
    ? hsl(baseHue, clamp(8 + saturationBias * 0.15, 2, 18), clamp(8 + lightnessBias, 4, 22))
    : hsl(baseHue, clamp(18 + saturationBias * 0.2, 6, 28), clamp(96 + lightnessBias, 86, 99));
  const surface = dark
    ? hsl(baseHue, clamp(8 + saturationBias * 0.12, 2, 16), clamp(11 + lightnessBias, 6, 24))
    : hsl(baseHue, clamp(14 + saturationBias * 0.18, 6, 24), clamp(93 + lightnessBias, 82, 98));
  const surfaceMuted = dark
    ? hsl(secondaryHue, clamp(8 + saturationBias * 0.16, 2, 18), clamp(16 + lightnessBias, 8, 28))
    : hsl(secondaryHue, clamp(14 + saturationBias * 0.2, 6, 26), clamp(88 + lightnessBias, 76, 96));
  const surfaceRaised = dark
    ? hsl(tertiaryHue, clamp(7 + saturationBias * 0.12, 2, 16), clamp(19 + lightnessBias, 10, 30))
    : hsl(tertiaryHue, clamp(16 + saturationBias * 0.18, 6, 26), clamp(99 + lightnessBias, 90, 100));

  const text = dark
    ? hsl(baseHue, clamp(12 + saturationBias * 0.12, 4, 22), clamp(88 + lightnessBias * 0.5, 72, 96))
    : hsl(baseHue, clamp(16 + saturationBias * 0.12, 4, 24), clamp(12 - lightnessBias * 0.4, 8, 24));
  const textMuted = dark
    ? hsl(baseHue, clamp(10 + saturationBias * 0.1, 4, 20), clamp(62 + lightnessBias * 0.45, 46, 78))
    : hsl(baseHue, clamp(10 + saturationBias * 0.1, 4, 20), clamp(42 - lightnessBias * 0.35, 28, 58));
  const textSubtle = dark
    ? hsl(baseHue, clamp(8 + saturationBias * 0.08, 2, 18), clamp(42 + lightnessBias * 0.4, 28, 62))
    : hsl(baseHue, clamp(8 + saturationBias * 0.08, 2, 18), clamp(62 - lightnessBias * 0.35, 42, 78));
  const border = dark
    ? hsla(baseHue, clamp(12 + saturationBias * 0.08, 2, 20), clamp(86 + lightnessBias * 0.3, 70, 96), 0.08)
    : hsla(baseHue, clamp(14 + saturationBias * 0.08, 2, 22), clamp(12 - lightnessBias * 0.2, 8, 20), 0.08);
  const borderStrong = dark
    ? hsla(baseHue, clamp(12 + saturationBias * 0.08, 2, 20), clamp(86 + lightnessBias * 0.3, 70, 96), 0.16)
    : hsla(baseHue, clamp(14 + saturationBias * 0.08, 2, 22), clamp(12 - lightnessBias * 0.2, 8, 20), 0.14);

  const successHue = wrapHue(baseHue + 110);
  const dangerHue = wrapHue(baseHue + 180);
  const warningHue = wrapHue(baseHue + 60);

  const successBg = dark
    ? hsl(successHue, clamp(20 + saturationBias * 0.25, 10, 34), clamp(14 + lightnessBias * 0.4, 8, 26))
    : hsl(successHue, clamp(28 + saturationBias * 0.25, 16, 46), clamp(92 + lightnessBias * 0.35, 82, 98));
  const successText = dark
    ? hsl(successHue, clamp(34 + saturationBias * 0.22, 18, 54), clamp(72 + lightnessBias * 0.35, 58, 86))
    : hsl(successHue, clamp(34 + saturationBias * 0.22, 18, 54), clamp(24 - lightnessBias * 0.2, 18, 34));
  const dangerBg = dark
    ? hsl(dangerHue, clamp(20 + saturationBias * 0.25, 10, 34), clamp(14 + lightnessBias * 0.4, 8, 26))
    : hsl(dangerHue, clamp(28 + saturationBias * 0.25, 16, 46), clamp(92 + lightnessBias * 0.35, 82, 98));
  const dangerText = dark
    ? hsl(dangerHue, clamp(34 + saturationBias * 0.22, 18, 54), clamp(72 + lightnessBias * 0.35, 58, 86))
    : hsl(dangerHue, clamp(34 + saturationBias * 0.22, 18, 54), clamp(24 - lightnessBias * 0.2, 18, 34));
  const warningBg = dark
    ? hsl(warningHue, clamp(20 + saturationBias * 0.25, 10, 34), clamp(14 + lightnessBias * 0.4, 8, 26))
    : hsl(warningHue, clamp(28 + saturationBias * 0.25, 16, 46), clamp(92 + lightnessBias * 0.35, 82, 98));
  const warningText = dark
    ? hsl(warningHue, clamp(34 + saturationBias * 0.22, 18, 54), clamp(72 + lightnessBias * 0.35, 58, 86))
    : hsl(warningHue, clamp(36 + saturationBias * 0.22, 18, 56), clamp(26 - lightnessBias * 0.2, 18, 36));

  return {
    swatches,
    accent: {
      "--accent": accent,
      "--accent-hover": accentHover,
      "--accent-soft": accentSoft,
      "--on-accent": onAccent,
      "--success-bg": successBg,
      "--success-text": successText,
      "--danger-bg": dangerBg,
      "--danger-text": dangerText,
      "--warning-bg": warningBg,
      "--warning-text": warningText,
    },
    surfaces: {
      "--canvas": canvas,
      "--surface": surface,
      "--surface-muted": surfaceMuted,
      "--surface-raised": surfaceRaised,
      "--border": border,
      "--border-strong": borderStrong,
    },
    text: {
      "--text": text,
      "--text-muted": textMuted,
      "--text-subtle": textSubtle,
    },
  };
}

function buildThemeFromPreset(preset: DomainState, dark: boolean): ThemeResult {
  const baseHsl = hexToHsl(preset.baseColor);
  const effectiveHue = wrapHue(baseHsl.h + preset.hue);

  return buildThemeVars(
    effectiveHue,
    preset.paletteType,
    dark,
    preset.saturation,
    preset.lightness,
  );
}

function buildThemeFromAdjustments(
  seed: DomainState,
  adjustments: ColorAdjustments,
  dark: boolean,
): ThemeResult {
  const seededPreset: DomainState = {
    ...seed,
    hue: seed.hue + adjustments.hueShift,
    saturation: seed.saturation + adjustments.saturationBias,
    lightness: seed.lightness + adjustments.lightnessBias,
  };

  return buildThemeFromPreset(seededPreset, dark);
}

function createTextSeed(vars: ThemeVars): TextAdjustmentSeed | null {
  const text = parseHslTone(vars["--text"] ?? "");
  const muted = parseHslTone(vars["--text-muted"] ?? "");
  const subtle = parseHslTone(vars["--text-subtle"] ?? "");

  if (!text || !muted || !subtle) {
    return null;
  }

  return { text, muted, subtle };
}

function createTextSeedFromSurfaces(vars: ThemeVars, dark: boolean): TextAdjustmentSeed | null {
  const canvas = parseHslTone(vars["--canvas"] ?? "");
  const surface = parseHslTone(vars["--surface"] ?? "");
  const surfaceMuted = parseHslTone(vars["--surface-muted"] ?? "");
  const surfaceRaised = parseHslTone(vars["--surface-raised"] ?? "");

  if (!canvas || !surface || !surfaceMuted || !surfaceRaised) {
    return null;
  }

  const baseSaturation = (canvas.s + surface.s + surfaceMuted.s + surfaceRaised.s) / 4;
  const baseLightness = (canvas.l + surface.l + surfaceRaised.l) / 3;
  const subtleSaturation = (surface.s + surfaceMuted.s) / 2;

  if (dark) {
    return {
      text: {
        h: surface.h,
        s: clamp(baseSaturation + 8, 4, 24),
        l: clamp(baseLightness + 75, 72, 96),
      },
      muted: {
        h: surface.h,
        s: clamp(baseSaturation + 6, 4, 20),
        l: clamp(baseLightness + 49, 46, 78),
      },
      subtle: {
        h: surfaceMuted.h,
        s: clamp(subtleSaturation + 4, 2, 18),
        l: clamp(surfaceMuted.l + 26, 28, 62),
      },
    };
  }

  return {
    text: {
      h: surface.h,
      s: clamp(baseSaturation + 4, 4, 24),
      l: clamp(baseLightness - 82, 8, 24),
    },
    muted: {
      h: surface.h,
      s: clamp(baseSaturation, 4, 20),
      l: clamp(baseLightness - 52, 28, 58),
    },
    subtle: {
      h: surfaceMuted.h,
      s: clamp(subtleSaturation - 2, 2, 18),
      l: clamp(surfaceMuted.l - 26, 42, 78),
    },
  };
}

function adjustTextTone(
  tone: ToneSeed,
  dark: boolean,
  lightnessBias: number,
  saturationBias: number,
  warmthBias: number,
) {
  const direction = dark ? 1 : -1;

  return {
    h: wrapHue(tone.h + warmthBias),
    s: clamp(tone.s + saturationBias, 0, 100),
    l: clamp(tone.l + lightnessBias * direction, 0, 100),
  };
}

function buildTextLayer(seed: TextAdjustmentSeed, dark: boolean, adjustments: TextAdjustments): ThemeVars {
  const textTone = adjustTextTone(
    seed.text,
    dark,
    adjustments.contrastBias,
    adjustments.warmthBias * 0.18,
    adjustments.warmthBias * 0.7,
  );

  const mutedTone = adjustTextTone(
    seed.muted,
    dark,
    adjustments.contrastBias * 0.55 + adjustments.mutedBias,
    adjustments.mutedBias * 0.18 + adjustments.warmthBias * 0.12,
    adjustments.warmthBias * 0.55,
  );

  const subtleTone = adjustTextTone(
    seed.subtle,
    dark,
    adjustments.contrastBias * 0.3 + adjustments.mutedBias * 0.45 + adjustments.subtleBias,
    adjustments.subtleBias * 0.18 + adjustments.warmthBias * 0.08,
    adjustments.warmthBias * 0.4,
  );

  return {
    "--text": hsl(textTone.h, textTone.s, textTone.l),
    "--text-muted": hsl(mutedTone.h, mutedTone.s, mutedTone.l),
    "--text-subtle": hsl(subtleTone.h, subtleTone.s, subtleTone.l),
  };
}

function createSemanticAliases(vars: ThemeVars): ThemeVars {
  return {
    "--color-canvas": vars["--canvas"] ?? "",
    "--color-surface": vars["--surface"] ?? "",
    "--color-surface-2": vars["--surface-muted"] ?? "",
    "--color-surface-raised": vars["--surface-raised"] ?? "",
    "--color-text": vars["--text"] ?? "",
    "--color-text-muted": vars["--text-muted"] ?? "",
    "--color-text-subtle": vars["--text-subtle"] ?? "",
    "--color-border": vars["--border"] ?? "",
    "--color-border-strong": vars["--border-strong"] ?? "",
    "--color-accent": vars["--accent"] ?? "",
    "--color-accent-hover": vars["--accent-hover"] ?? "",
    "--color-accent-soft": vars["--accent-soft"] ?? "",
    "--color-on-accent": vars["--on-accent"] ?? "",
    "--color-success": vars["--success-text"] ?? "",
    "--color-success-bg": vars["--success-bg"] ?? "",
    "--color-success-soft": vars["--success-bg"] ? "var(--color-success-bg)" : "",
    "--color-danger": vars["--danger-text"] ?? "",
    "--color-danger-bg": vars["--danger-bg"] ?? "",
    "--color-danger-soft": vars["--danger-bg"] ? "var(--color-danger-bg)" : "",
    "--color-warning": vars["--warning-text"] ?? "",
    "--color-warning-bg": vars["--warning-bg"] ?? "",
    "--color-warning-soft": vars["--warning-bg"] ? "var(--color-warning-bg)" : "",
    "--color-focus": vars["--accent"] ?? vars["--text"] ?? "",
  };
}

function createFontVars(pair: FontPair): ThemeVars {
  return {
    "--font-heading-family": pair.headingFamily,
    "--font-body-family": pair.bodyFamily,
    "--font-heading-weight": String(pair.headingWeight),
    "--font-body-weight": String(pair.bodyWeight),
    "--font-editorial-family": pair.editorialFamily,
    "--font-editorial-weight": String(pair.editorialWeight),
  };
}

function createSwatchVars(theme: ThemeResult): ThemeVars {
  return Object.fromEntries(
    theme.swatches.map((swatch, index) => [`--swatch-${index + 1}`, swatch.color]),
  );
}

function describeColorMode(label: string, linked: boolean, adjustments: ColorAdjustments) {
  if (linked) {
    return `${label}: linked to Global`;
  }

  return `${label}: detached local layer · h ${adjustments.hueShift} / s ${adjustments.saturationBias} / l ${adjustments.lightnessBias}`;
}

function describeTextMode(linked: boolean, adjustments: TextAdjustments) {
  if (linked) {
    return "text: linked to Global";
  }

  return `text: detached tone layer · contrast ${adjustments.contrastBias} / muted ${adjustments.mutedBias} / subtle ${adjustments.subtleBias} / warmth ${adjustments.warmthBias}`;
}

const fontPairs: FontPair[] = [
  {
    id: "fraunces-syne",
    label: "Fraunces Bold / Syne Regular",
    headingFamily: '"Fraunces", serif',
    bodyFamily: '"Syne", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    editorialFamily: '"Fraunces", serif',
    editorialWeight: 700,
  },
  {
    id: "cormorant-source",
    label: "Cormorant Bold / Source Sans Regular",
    headingFamily: '"Cormorant Garamond", serif',
    bodyFamily: '"Source Sans 3", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    editorialFamily: '"Cormorant Garamond", serif',
    editorialWeight: 700,
  },
  {
    id: "brico-source",
    label: "Bricolage Grotesque / Source Sans",
    headingFamily: '"Bricolage Grotesque", system-ui, sans-serif',
    bodyFamily: '"Source Sans 3", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    editorialFamily: '"Bricolage Grotesque", system-ui, sans-serif',
    editorialWeight: 700,
  },
  {
    id: "fraunces-source-serif",
    label: "Fraunces / Source Serif",
    headingFamily: '"Fraunces", serif',
    bodyFamily: '"Source Serif 4", serif',
    headingWeight: 600,
    bodyWeight: 400,
    editorialFamily: '"Fraunces", serif',
    editorialWeight: 600,
  },
];

const paletteOptions: PaletteOption[] = [
  { id: "complementary", label: "Complementary" },
  { id: "analogous", label: "Analogous" },
  { id: "triadic", label: "Triadic" },
  { id: "split-complementary", label: "Split-complementary" },
  { id: "tetradic", label: "Tetradic" },
  { id: "monochromatic", label: "Monochromatic" },
];

const modeOptions: ModeOption[] = [
  {
    id: "global",
    label: "Global",
    description:
      "Master generator. Editing Global updates the palette source and every mode that is still linked to it.",
  },
  {
    id: "accent",
    label: "Accent",
    description:
      "Accent is a local adjustment layer over Global. It can shift hue, saturation, and lightness without becoming its own preset source.",
  },
  {
    id: "surface",
    label: "Surface",
    description:
      "Surface is a local adjustment layer over Global for canvas, panels, and borders. It is not a separate palette generator.",
  },
  {
    id: "text",
    label: "Text",
    description:
      "Text is a contrast and tone layer derived from the system. Use local override only for text-specific bias controls.",
  },
];

function buildStarterSiteCss(themeCss: string) {
  return `${themeCss}

html, body {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--color-canvas);
  color: var(--color-text);
  font-family: var(--font-body-family, system-ui, sans-serif);
  font-weight: var(--font-body-weight, 400);
  font-size: var(--text-body-size, 16px);
  line-height: var(--text-body-line, 24px);
}

::selection {
  background: var(--color-accent-soft);
  color: var(--color-text);
}

a {
  color: var(--color-accent);
  text-decoration-color: color-mix(in srgb, var(--color-accent) 42%, transparent);
  text-underline-offset: 0.16em;
}

a:hover {
  color: var(--color-accent-hover);
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-heading-family, serif);
  font-weight: var(--font-heading-weight, 700);
  letter-spacing: -0.02em;
}

h1 {
  font-size: clamp(34px, 4vw, 48px);
  line-height: 1.04;
}

h2 {
  font-size: var(--text-display-size, 32px);
  line-height: var(--text-display-line, 40px);
}

h3 {
  font-size: var(--text-title-size, 20px);
  line-height: var(--text-title-line, 30px);
}

p {
  margin: 0;
}

.container {
  width: min(100% - 2 * var(--gutter-mobile, 16px), var(--container-lg, 1024px));
  margin-inline: auto;
}

.card {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card, 16px);
  box-shadow: var(--shadow-sm);
  padding: var(--space-4, 32px);
}

.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-surface, 18px);
  padding: var(--space-4, 32px);
}

.button,
button {
  appearance: none;
  border: 1px solid transparent;
  border-radius: var(--radius-inline, 6px);
  min-height: var(--control-md, 40px);
  padding-inline: var(--space-3, 24px);
  font: inherit;
  font-weight: 600;
  transition:
    background-color var(--duration-fast, 120ms) var(--ease-standard, ease),
    border-color var(--duration-fast, 120ms) var(--ease-standard, ease),
    color var(--duration-fast, 120ms) var(--ease-standard, ease),
    box-shadow var(--duration-fast, 120ms) var(--ease-standard, ease);
  cursor: pointer;
}

.button-primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.button-primary:hover {
  background: var(--color-accent-hover);
}

.button-secondary {
  background: var(--color-surface-raised);
  color: var(--color-text);
  border-color: var(--color-border);
}

.button-secondary:hover {
  background: var(--color-surface-2);
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-inline, 6px);
  background: var(--color-surface-raised);
  color: var(--color-text);
  font: inherit;
  min-height: var(--control-md, 40px);
  padding: 0.75rem 0.875rem;
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible,
.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-focus);
}

.status {
  display: inline-flex;
  align-items: center;
  min-height: var(--control-sm, 32px);
  padding-inline: 0.75rem;
  border-radius: var(--radius-pill, 999px);
  font-size: var(--text-body-sm-size, 14px);
  line-height: 1;
}

.status-success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.status-danger {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.status-warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}
`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [radiusControl, setRadiusControl] = useState(DEFAULTS.radiusControl);
  const [radiusPanel, setRadiusPanel] = useState(DEFAULTS.radiusPanel);
  const [radiusLarge, setRadiusLarge] = useState(DEFAULTS.radiusLarge);
  const [radiusPill, setRadiusPill] = useState(DEFAULTS.radiusPill);
  const [dark, setDark] = useState(DEFAULTS.dark);
  const [themeMode, setThemeMode] = useState<ThemeMode>(DEFAULTS.themeMode);

  const [globalPreset, setGlobalPreset] = useState<DomainState>(DEFAULT_GLOBAL_PRESET);

  const [accentOverrideEnabled, setAccentOverrideEnabled] = useState(false);
  const [surfaceOverrideEnabled, setSurfaceOverrideEnabled] = useState(false);
  const [textOverrideEnabled, setTextOverrideEnabled] = useState(false);

  const [accentAdjustments, setAccentAdjustments] = useState<ColorAdjustments>(
    NEUTRAL_COLOR_ADJUSTMENTS,
  );
  const [surfaceAdjustments, setSurfaceAdjustments] = useState<ColorAdjustments>(
    NEUTRAL_COLOR_ADJUSTMENTS,
  );
  const [textAdjustments, setTextAdjustments] = useState<TextAdjustments>(
    NEUTRAL_TEXT_ADJUSTMENTS,
  );


  const [selectedPairId, setSelectedPairId] = useState<FontPairId>(DEFAULTS.selectedPairId);

  const selectedPair = useMemo(
    () => fontPairs.find((pair) => pair.id === selectedPairId) ?? fontPairs[0],
    [selectedPairId],
  );

  const sourceState = useMemo(
    () => ({
      globalPreset,
      accentOverrideEnabled,
      surfaceOverrideEnabled,
      textOverrideEnabled,
      accentAdjustments,
      surfaceAdjustments,
      textAdjustments,
    }),
    [
      accentAdjustments,
      accentOverrideEnabled,
      globalPreset,
      surfaceAdjustments,
      surfaceOverrideEnabled,
      textAdjustments,
      textOverrideEnabled,
    ],
  );

  const globalTheme = useMemo(() => buildThemeFromPreset(sourceState.globalPreset, dark), [dark, sourceState.globalPreset]);

  const effectiveAccentSettings = useMemo(
    () => ({
      seed: sourceState.globalPreset,
      adjustments: sourceState.accentOverrideEnabled
        ? sourceState.accentAdjustments
        : NEUTRAL_COLOR_ADJUSTMENTS,
    }),
    [sourceState.accentAdjustments, sourceState.accentOverrideEnabled, sourceState.globalPreset],
  );

  const effectiveSurfaceSettings = useMemo(
    () => ({
      seed: sourceState.globalPreset,
      adjustments: sourceState.surfaceOverrideEnabled
        ? sourceState.surfaceAdjustments
        : NEUTRAL_COLOR_ADJUSTMENTS,
    }),
    [sourceState.globalPreset, sourceState.surfaceAdjustments, sourceState.surfaceOverrideEnabled],
  );

  const accentTheme = useMemo(
    () => buildThemeFromAdjustments(effectiveAccentSettings.seed, effectiveAccentSettings.adjustments, dark),
    [dark, effectiveAccentSettings],
  );

  const surfaceTheme = useMemo(
    () => buildThemeFromAdjustments(effectiveSurfaceSettings.seed, effectiveSurfaceSettings.adjustments, dark),
    [dark, effectiveSurfaceSettings],
  );

  const defaultTextSeed = useMemo(
    () =>
      createTextSeedFromSurfaces(buildThemeFromPreset(DEFAULT_GLOBAL_PRESET, dark).surfaces, dark) ??
      createTextSeed(buildThemeFromPreset(DEFAULT_GLOBAL_PRESET, dark).text)!,
    [dark],
  );

  const linkedTextSeed = useMemo(
    () => createTextSeedFromSurfaces(surfaceTheme.surfaces, dark) ?? defaultTextSeed,
    [dark, defaultTextSeed, surfaceTheme.surfaces],
  );

  const effectiveTextSettings = useMemo(
    () => ({
      seed: linkedTextSeed,
      adjustments: sourceState.textOverrideEnabled
        ? sourceState.textAdjustments
        : NEUTRAL_TEXT_ADJUSTMENTS,
    }),
    [linkedTextSeed, sourceState.textAdjustments, sourceState.textOverrideEnabled],
  );

  const textThemeVars = useMemo(
    () => buildTextLayer(effectiveTextSettings.seed, dark, effectiveTextSettings.adjustments),
    [dark, effectiveTextSettings],
  );

  const composedTheme = useMemo<ThemeResult>(
    () => ({
      swatches: globalTheme.swatches,
      accent: accentTheme.accent,
      surfaces: surfaceTheme.surfaces,
      text: textThemeVars,
    }),
    [accentTheme.accent, globalTheme.swatches, surfaceTheme.surfaces, textThemeVars],
  );

  const activeDomain = useMemo<"global" | DomainKey>(() => {
    if (themeMode === "accent") return "accent";
    if (themeMode === "surface") return "surface";
    if (themeMode === "text") return "text";
    return "global";
  }, [themeMode]);

  const isUsingGlobalForCurrentMode = useMemo(() => {
    if (themeMode === "accent") return !sourceState.accentOverrideEnabled;
    if (themeMode === "surface") return !sourceState.surfaceOverrideEnabled;
    if (themeMode === "text") return !sourceState.textOverrideEnabled;
    return false;
  }, [sourceState.accentOverrideEnabled, sourceState.surfaceOverrideEnabled, sourceState.textOverrideEnabled, themeMode]);

  const currentModeCanUseLocalOverride = activeDomain !== "global";
  const currentModeUsesLocalOverride = currentModeCanUseLocalOverride && !isUsingGlobalForCurrentMode;

  const swatchTheme = useMemo<ThemeResult>(() => {
    if (themeMode === "accent") {
      return accentTheme;
    }

    if (themeMode === "surface") {
      return surfaceTheme;
    }

    return globalTheme;
  }, [accentTheme, globalTheme, surfaceTheme, themeMode]);

  const activeThemeVars = useMemo<ThemeVars>(() => {
    if (themeMode === "accent") return composedTheme.accent;
    if (themeMode === "surface") return composedTheme.surfaces;
    if (themeMode === "text") return composedTheme.text;

    return {
      ...composedTheme.surfaces,
      ...composedTheme.text,
      ...composedTheme.accent,
    };
  }, [composedTheme, themeMode]);

  const semanticAliasVars = useMemo<ThemeVars>(
    () =>
      createSemanticAliases({
        ...composedTheme.surfaces,
        ...composedTheme.text,
        ...composedTheme.accent,
      }),
    [composedTheme],
  );

  const radiusVars = useMemo<ThemeVars>(
    () => ({
      "--radius-sm": `${radiusControl}px`,
      "--radius-md": `${radiusPanel}px`,
      "--radius-lg": `${radiusLarge}px`,
      "--radius-pill": `${radiusPill}px`,
      "--radius-inline": `${Math.max(6, radiusControl)}px`,
      "--radius-item": `${Math.max(8, Math.min(radiusPanel, 12))}px`,
      "--radius-card": `${Math.max(14, Math.max(radiusPanel, 16))}px`,
      "--radius-surface": `${Math.max(radiusLarge, 18)}px`,
      "--radius-input-pillish": `${Math.min(24, Math.max(16, radiusPanel * 2))}px`,
    }),
    [radiusControl, radiusLarge, radiusPanel, radiusPill],
  );

  const setCurrentColorAdjustmentPatch = useCallback(
    (patch: Partial<ColorAdjustments>) => {
      if (themeMode === "accent") {
        if (!sourceState.accentOverrideEnabled) return;
        setAccentAdjustments((current) => ({ ...current, ...patch }));
        return;
      }

      if (themeMode === "surface") {
        if (!sourceState.surfaceOverrideEnabled) return;
        setSurfaceAdjustments((current) => ({ ...current, ...patch }));
      }
    },
    [sourceState.accentOverrideEnabled, sourceState.surfaceOverrideEnabled, themeMode],
  );

  const setCurrentTextAdjustmentPatch = useCallback(
    (patch: Partial<TextAdjustments>) => {
      if (themeMode !== "text" || !sourceState.textOverrideEnabled) {
        return;
      }

      setTextAdjustments((current) => ({ ...current, ...patch }));
    },
    [sourceState.textOverrideEnabled, themeMode],
  );

  const resetCurrentModeAdjustments = useCallback(() => {
    if (themeMode === "global") {
      setGlobalPreset((current) => ({ ...current, hue: 0, saturation: 0, lightness: 0 }));
      return;
    }

    if (themeMode === "accent") {
      setAccentAdjustments(cloneColorAdjustments(NEUTRAL_COLOR_ADJUSTMENTS));
      return;
    }

    if (themeMode === "surface") {
      setSurfaceAdjustments(cloneColorAdjustments(NEUTRAL_COLOR_ADJUSTMENTS));
      return;
    }

    setTextAdjustments(cloneTextAdjustments(NEUTRAL_TEXT_ADJUSTMENTS));
  }, [themeMode]);

  const setCurrentModeUseLocalOverride = useCallback(
    (value: boolean) => {
      if (themeMode === "accent") {
        setAccentOverrideEnabled(value);
        return;
      }

      if (themeMode === "surface") {
        setSurfaceOverrideEnabled(value);
        return;
      }

      if (themeMode === "text") {
        setTextOverrideEnabled(value);
      }
    },
    [themeMode],
  );

  const detachCurrentModeFromGlobal = useCallback(() => {
    setCurrentModeUseLocalOverride(true);
  }, [setCurrentModeUseLocalOverride]);

  const resetCurrentModeToGlobal = useCallback(() => {
    setCurrentModeUseLocalOverride(false);
  }, [setCurrentModeUseLocalOverride]);

  const resetAllModesToGlobal = useCallback(() => {
    setAccentOverrideEnabled(false);
    setSurfaceOverrideEnabled(false);
    setTextOverrideEnabled(false);
  }, []);

  const exportThemeCss = useMemo(() => {
    const exportedVars = {
      ...composedTheme.surfaces,
      ...composedTheme.text,
      ...composedTheme.accent,
      ...semanticAliasVars,
      ...radiusVars,
      ...createFontVars(selectedPair),
    };

    const entries = Object.entries(exportedVars)
      .filter(([key, value]) => key.startsWith("--") && typeof value === "string" && value.length > 0)
      .sort(([a], [b]) => a.localeCompare(b));

    const lines = [
      "/* DASTI exported theme */",
      "/* global master + local layer composition */",
      `/* appearance: ${dark ? "dark" : "light"} */`,
      `/* global: ${sourceState.globalPreset.baseColor.toUpperCase()} · ${sourceState.globalPreset.paletteType} · h ${sourceState.globalPreset.hue} / s ${sourceState.globalPreset.saturation} / l ${sourceState.globalPreset.lightness} */`,
      `/* ${describeColorMode("accent", !sourceState.accentOverrideEnabled, sourceState.accentAdjustments)} */`,
      `/* ${describeColorMode("surface", !sourceState.surfaceOverrideEnabled, sourceState.surfaceAdjustments)} */`,
      `/* ${describeTextMode(!sourceState.textOverrideEnabled, sourceState.textAdjustments)} */`,
      ":root {",
      ...entries.map(([key, value]) => `  ${key}: ${value};`),
      "}",
    ];

    return lines.join("\n");
  }, [
    composedTheme,
    dark,
    radiusVars,
    selectedPair,
    semanticAliasVars,
    sourceState.accentAdjustments,
    sourceState.accentOverrideEnabled,
    sourceState.globalPreset,
    sourceState.surfaceAdjustments,
    sourceState.surfaceOverrideEnabled,
    sourceState.textAdjustments,
    sourceState.textOverrideEnabled,
  ]);

  const exportSiteCss = useMemo(() => buildStarterSiteCss(exportThemeCss), [exportThemeCss]);

  const copyThemeCss = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      throw new Error("Clipboard API unavailable in this environment.");
    }

    await navigator.clipboard.writeText(exportThemeCss);
  }, [exportThemeCss]);

  const downloadThemeCss = useCallback(() => {
    if (typeof document === "undefined") return;

    const blob = new Blob([exportThemeCss], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dasti-theme-${dark ? "dark" : "light"}.css`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [dark, exportThemeCss]);

  const copySiteCss = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      throw new Error("Clipboard API unavailable in this environment.");
    }

    await navigator.clipboard.writeText(exportSiteCss);
  }, [exportSiteCss]);

  const downloadSiteCss = useCallback(() => {
    if (typeof document === "undefined") return;

    const blob = new Blob([exportSiteCss], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dasti-site-starter-${dark ? "dark" : "light"}.css`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [dark, exportSiteCss]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = dark ? "dark" : "light";
    root.style.colorScheme = dark ? "dark" : "light";

    const appliedVars = {
      ...createFontVars(selectedPair),
      ...composedTheme.surfaces,
      ...composedTheme.text,
      ...composedTheme.accent,
      ...semanticAliasVars,
      ...radiusVars,
      ...createSwatchVars(swatchTheme),
    };

    Object.entries(appliedVars).forEach(([key, value]) => {
      if (typeof value === "string" && value.length > 0) {
        root.style.setProperty(key, value);
      }
    });

    return () => {
      Object.keys(appliedVars).forEach((key) => {
        root.style.removeProperty(key);
      });
      delete root.dataset.theme;
      root.style.removeProperty("color-scheme");
    };
  }, [composedTheme, dark, radiusVars, selectedPair, semanticAliasVars, swatchTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      dark,
      setDark,
      toggleTheme: () => setDark((current) => !current),
      baseColor: sourceState.globalPreset.baseColor,
      setBaseColor: (value) => setGlobalPreset((current) => ({ ...current, baseColor: value })),
      paletteType: sourceState.globalPreset.paletteType,
      setPaletteType: (value) => setGlobalPreset((current) => ({ ...current, paletteType: value })),
      themeMode,
      setThemeMode,
      globalHue: sourceState.globalPreset.hue,
      setGlobalHue: (value) => setGlobalPreset((current) => ({ ...current, hue: value })),
      globalSaturation: sourceState.globalPreset.saturation,
      setGlobalSaturation: (value) => setGlobalPreset((current) => ({ ...current, saturation: value })),
      globalLightness: sourceState.globalPreset.lightness,
      setGlobalLightness: (value) => setGlobalPreset((current) => ({ ...current, lightness: value })),
      localHueShift:
        themeMode === "accent"
          ? sourceState.accentAdjustments.hueShift
          : themeMode === "surface"
            ? sourceState.surfaceAdjustments.hueShift
            : 0,
      setLocalHueShift: (value) => setCurrentColorAdjustmentPatch({ hueShift: value }),
      localSaturationBias:
        themeMode === "accent"
          ? sourceState.accentAdjustments.saturationBias
          : themeMode === "surface"
            ? sourceState.surfaceAdjustments.saturationBias
            : 0,
      setLocalSaturationBias: (value) => setCurrentColorAdjustmentPatch({ saturationBias: value }),
      localLightnessBias:
        themeMode === "accent"
          ? sourceState.accentAdjustments.lightnessBias
          : themeMode === "surface"
            ? sourceState.surfaceAdjustments.lightnessBias
            : 0,
      setLocalLightnessBias: (value) => setCurrentColorAdjustmentPatch({ lightnessBias: value }),
      textContrastBias: themeMode === "text" ? sourceState.textAdjustments.contrastBias : 0,
      setTextContrastBias: (value) => setCurrentTextAdjustmentPatch({ contrastBias: value }),
      textMutedBias: themeMode === "text" ? sourceState.textAdjustments.mutedBias : 0,
      setTextMutedBias: (value) => setCurrentTextAdjustmentPatch({ mutedBias: value }),
      textSubtleBias: themeMode === "text" ? sourceState.textAdjustments.subtleBias : 0,
      setTextSubtleBias: (value) => setCurrentTextAdjustmentPatch({ subtleBias: value }),
      textWarmthBias: themeMode === "text" ? sourceState.textAdjustments.warmthBias : 0,
      setTextWarmthBias: (value) => setCurrentTextAdjustmentPatch({ warmthBias: value }),
      resetCurrentModeAdjustments,
      selectedPairId,
      setSelectedPairId,
      selectedPair,
      fontPairs,
      paletteOptions,
      modeOptions,
      radius: {
        control: radiusControl,
        panel: radiusPanel,
        large: radiusLarge,
        pill: radiusPill,
      },
      setRadiusControl,
      setRadiusPanel,
      setRadiusLarge,
      setRadiusPill,
      theme: swatchTheme,
      composedTheme,
      activeThemeVars,
      radiusVars,
      exportThemeCss,
      exportSiteCss,
      copyThemeCss,
      downloadThemeCss,
      copySiteCss,
      downloadSiteCss,
      activeDomain,
      isUsingGlobalForCurrentMode,
      currentModeUsesLocalOverride,
      currentModeCanUseLocalOverride,
      setCurrentModeUseLocalOverride,
      detachCurrentModeFromGlobal,
      resetCurrentModeToGlobal,
      resetAllModesToGlobal,
    }),
    [
      activeDomain,
      activeThemeVars,
      composedTheme,
      copySiteCss,
      copyThemeCss,
      currentModeCanUseLocalOverride,
      currentModeUsesLocalOverride,
      dark,
      detachCurrentModeFromGlobal,
      downloadSiteCss,
      downloadThemeCss,
      exportSiteCss,
      exportThemeCss,
      isUsingGlobalForCurrentMode,
      paletteOptions,
      radiusControl,
      radiusLarge,
      radiusPanel,
      radiusPill,
      radiusVars,
      resetAllModesToGlobal,
      resetCurrentModeAdjustments,
      resetCurrentModeToGlobal,
      selectedPair,
      selectedPairId,
      setCurrentColorAdjustmentPatch,
      setCurrentModeUseLocalOverride,
      setCurrentTextAdjustmentPatch,
      sourceState.accentAdjustments.hueShift,
      sourceState.accentAdjustments.lightnessBias,
      sourceState.accentAdjustments.saturationBias,
      sourceState.globalPreset.baseColor,
      sourceState.globalPreset.hue,
      sourceState.globalPreset.lightness,
      sourceState.globalPreset.paletteType,
      sourceState.globalPreset.saturation,
      sourceState.surfaceAdjustments.hueShift,
      sourceState.surfaceAdjustments.lightnessBias,
      sourceState.surfaceAdjustments.saturationBias,
      sourceState.textAdjustments.contrastBias,
      sourceState.textAdjustments.mutedBias,
      sourceState.textAdjustments.subtleBias,
      sourceState.textAdjustments.warmthBias,
      swatchTheme,
      themeMode,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeSystem() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeSystem must be used within ThemeProvider.");
  }

  return context;
}
