import type { ResumeLayoutVariantId } from "./resume.types";

export type ResumeDensitySpec = {
  displaySizeAdjust: string;
  titleSizeAdjust: string;
  bodySizeAdjust: string;
  bodySmSizeAdjust: string;
  sectionGapAdjust: string;
  headingMarginAdjust: string;
  bulletGapAdjust: string;
  projectGapAdjust: string;
  projectPaddingAdjust: string;
};

export type ResumeVariantSpec = {
  id: ResumeLayoutVariantId;
  label: string;
  title: string;
  subtitle: string;
  chips: string[];
  margins: { top: string; right: string; bottom: string; left: string };
  columns: { sidebar: string; gutter: string; main: string };
  liveArea: { width: string; height: string };
  header: {
    rowGap: string;
    bottomPadding: string;
    summaryMaxWidth: string;
    titleMarginTop: string;
  };
  body: { rowGap: string; sidebarRightPadding: string; mainLeftPadding: string };
  sidebarSection: {
    marginBottom: string;
    titleMarginBottom: string;
    titlePaddingBottom: string;
    contentGap: string;
  };
  mainSection: {
    marginBottom: string;
    headingGap: string;
    headingMarginBottom: string;
  };
  experience: {
    dateColumn: string;
    columnGap: string;
    itemGap: string;
    orgMarginBottom: string;
    bulletsPaddingLeft: string;
    bulletsGap: string;
  };
  projects: { cardGap: string; cardPadding: string; cardBackground: "surface" | "surfaceMuted" };
  education: { itemGap: string };
  skills: { gap: string; paddingInline: string; paddingBlock: string };
  density: ResumeDensitySpec;
};

export const resumeLayoutSpec = {
  page: {
    width: "210mm",
    height: "297mm",
    borderRadius: "8mm",
  },
  variants: {



    

    tschichold: {
      id: "tschichold",
      label: "Canon 12",
      title: "A4 12-grid résumé",
subtitle: "True A4 résumé canon: 18 / 25 / 35 / 50 mm",
chips: ["Resume", "A4", "12-grid"],
margins: { top: "25mm", right: "35mm", bottom: "50mm", left: "18mm" },
columns: { sidebar: "40mm", gutter: "9mm", main: "108mm" },
liveArea: { width: "157mm", height: "222mm" },
header: { rowGap: "3mm", bottomPadding: "5mm", summaryMaxWidth: "110mm", titleMarginTop: "1mm" },
      body: { rowGap: "8mm", sidebarRightPadding: "2mm", mainLeftPadding: "5mm" },
      sidebarSection: { marginBottom: "6mm", titleMarginBottom: "2mm", titlePaddingBottom: "1.5mm", contentGap: "1.6mm" },
      mainSection: { marginBottom: "6mm", headingGap: "3mm", headingMarginBottom: "2.5mm" },
      experience: { dateColumn: "20mm", columnGap: "4mm", itemGap: "5mm", orgMarginBottom: "1.6mm", bulletsPaddingLeft: "4mm", bulletsGap: "1.2mm" },
      projects: { cardGap: "3.5mm", cardPadding: "3.2mm", cardBackground: "surface" },
      education: { itemGap: "1.8mm" },
      skills: { gap: "2mm", paddingInline: "2.6mm", paddingBlock: "1.2mm" },
      density: {
        displaySizeAdjust: "-0.45mm",
        titleSizeAdjust: "-0.14mm",
        bodySizeAdjust: "-0.12mm",
        bodySmSizeAdjust: "-0.12mm",
        sectionGapAdjust: "-1.15mm",
        headingMarginAdjust: "-0.45mm",
        bulletGapAdjust: "-0.22mm",
        projectGapAdjust: "-0.55mm",
        projectPaddingAdjust: "-0.35mm",
      },
    },
   golden: {
  id: "golden",
  label: "Grid 17/18 atelier",
  title: "Editorial résumé alt",
  subtitle: "A quieter Grid 17/18 variant with a slimmer sidebar and wider content field",
  chips: ["Resume", "A4", "Editorial", "Alt"],

  margins: {
    top: "25mm",
    right: "27mm",
    bottom: "29mm",
    left: "25mm",
  },

  columns: {
    sidebar: "35mm",
    gutter: "13mm",
    main: "110mm",
  },

  liveArea: {
    width: "158mm",
    height: "243mm",
  },

  header: {
    rowGap: "4mm",
    bottomPadding: "6.5mm",
    summaryMaxWidth: "94mm",
    titleMarginTop: "2mm",
  },

  body: {
    rowGap: "8.2mm",
    sidebarRightPadding: "2.2mm",
    mainLeftPadding: "6.2mm",
  },

  sidebarSection: {
    marginBottom: "5.8mm",
    titleMarginBottom: "1.9mm",
    titlePaddingBottom: "1.1mm",
    contentGap: "1.45mm",
  },

  mainSection: {
    marginBottom: "6.2mm",
    headingGap: "3mm",
    headingMarginBottom: "2.3mm",
  },

  experience: {
    dateColumn: "22mm",
    columnGap: "5mm",
    itemGap: "5.1mm",
    orgMarginBottom: "1.35mm",
    bulletsPaddingLeft: "4.1mm",
    bulletsGap: "1.7mm",
  },

  projects: {
    cardGap: "3.8mm",
    cardPadding: "3.25mm",
    cardBackground: "surfaceMuted",
  },

  education: {
    itemGap: "1.8mm",
  },

  skills: {
    gap: "1.7mm",
    paddingInline: "1.95mm",
    paddingBlock: "0.82mm",
  },

  density: {
    displaySizeAdjust: "-0.05mm",
    titleSizeAdjust: "-0.05mm",
    bodySizeAdjust: "0mm",
    bodySmSizeAdjust: "-0.05mm",
    sectionGapAdjust: "-0.2mm",
    headingMarginAdjust: "0mm",
    bulletGapAdjust: "0.12mm",
    projectGapAdjust: "0mm",
    projectPaddingAdjust: "-0.05mm",
  },







      

    },

robial: {
  id: "robial",
  label: "Grid 17/18",
  title: "17/18 modular canon approximation",
  subtitle: "Closest practical 17 / 18 mm approximation to the A4 canon",
  chips: ["Modular", "17/18", "A4"],
  margins: {
    top: "26mm",
    right: "35mm",
    bottom: "53mm",
    left: "18mm",
  },
  columns: {
    sidebar: "35mm",
    gutter: "17mm",
    main: "105mm",
  },
  liveArea: {
    width: "157mm",
    height: "218mm",
  },
  header: {
    rowGap: "3mm",
    bottomPadding: "5mm",
    summaryMaxWidth: "128mm",
    titleMarginTop: "1mm",
  },
  body: {
    rowGap: "8mm",
    sidebarRightPadding: "0mm",
    mainLeftPadding: "0mm",
  },
  sidebarSection: {
    marginBottom: "5mm",
    titleMarginBottom: "2mm",
    titlePaddingBottom: "1.5mm",
    contentGap: "1.5mm",
  },
  mainSection: {
    marginBottom: "5mm",
    headingGap: "3mm",
    headingMarginBottom: "2.4mm",
  },
  experience: {
    dateColumn: "18mm",
    columnGap: "4mm",
    itemGap: "4.5mm",
    orgMarginBottom: "1.4mm",
    bulletsPaddingLeft: "3.5mm",
    bulletsGap: "1.1mm",
  },
  projects: {
    cardGap: "3mm",
    cardPadding: "3mm",
    cardBackground: "surfaceMuted",
  },
  education: {
    itemGap: "1.6mm",
  },
  skills: {
    gap: "1.6mm",
    paddingInline: "2.2mm",
    paddingBlock: "1mm",
  },
  density: {
    displaySizeAdjust: "-0.15mm",
    titleSizeAdjust: "0mm",
    bodySizeAdjust: "0mm",
    bodySmSizeAdjust: "-0.05mm",
    sectionGapAdjust: "-0.6mm",
    headingMarginAdjust: "-0.2mm",
    bulletGapAdjust: "-0.08mm",
    projectGapAdjust: "-0.2mm",
    projectPaddingAdjust: "-0.15mm",
  },
},
onecol: {
  id: "onecol",
  label: "One-column A4",
  title: "One-column editorial résumé",
  subtitle: "A4 one-column layout using the 17/18 page frame only",
  chips: ["Resume", "A4", "One-column"],

  margins: {
    top: "30mm",
    right: "35mm",
    bottom: "52mm",
    left: "35mm",
  },

  /* kept only for compatibility with the existing spec shape */
  columns: {
    sidebar: "0mm",
    gutter: "0mm",
    main: "0mm",
  },

  liveArea: {
    width: "150mm",
    height: "212mm",
  },

  header: {
    rowGap: "3.4mm",
    bottomPadding: "3.5mm",
    summaryMaxWidth: "98mm",
    titleMarginTop: "2mm",
  },

  body: {
    rowGap: "5.8mm",
    sidebarRightPadding: "0mm",
    mainLeftPadding: "0mm",
  },

  sidebarSection: {
    marginBottom: "0mm",
    titleMarginBottom: "0mm",
    titlePaddingBottom: "0mm",
    contentGap: "0mm",
  },

  mainSection: {
    marginBottom: "4.6mm",
    headingGap: "0mm",
    headingMarginBottom: "2.1mm",
  },

  experience: {
    dateColumn: "0mm",
    columnGap: "0mm",
    itemGap: "4mm",
    orgMarginBottom: "0.8mm",
    bulletsPaddingLeft: "3.4mm",
    bulletsGap: "0.9mm",
  },

  projects: {
    cardGap: "3.2mm",
    cardPadding: "2.8mm",
    cardBackground: "surfaceMuted",
  },

  education: {
    itemGap: "2mm",
  },

  skills: {
    gap: "1.5mm",
    paddingInline: "1.8mm",
    paddingBlock: "0.75mm",
  },

  density: {
    displaySizeAdjust: "-0.2mm",
    titleSizeAdjust: "-0.2mm",
    bodySizeAdjust: "-0.1mm",
    bodySmSizeAdjust: "-0.2mm",
    sectionGapAdjust: "-0.2mm",
    headingMarginAdjust: "0mm",
    bulletGapAdjust: "-0.1mm",
    projectGapAdjust: "-0.1mm",
    projectPaddingAdjust: "-0.1mm",
  },
},
    
  } satisfies Record<ResumeLayoutVariantId, ResumeVariantSpec>,
} as const;
