import React from "react";

type ResumePageMode = "comparison" | "tschichold" | "golden" | "robial";

type ResumeMetadataItem = { label: string; value: string };
type ResumeContactItem = { label: string; value: string };
type ResumeLanguageItem = { name: string; level: string };
type ResumeExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
};
type ResumeProjectItem = {
  name: string;
  meta: string;
  description: string;
};
type ResumeEducationItem = {
  school: string;
  degree: string;
  period: string;
};

type ResumeData = {
  name: string;
  title: string;
  summary: string;
  metadata: ResumeMetadataItem[];
  contact: ResumeContactItem[];
  skills: string[];
  languages: ResumeLanguageItem[];
  experience: ResumeExperienceItem[];
  projects: ResumeProjectItem[];
  education: ResumeEducationItem[];
};

type ResumePageProps = {
  data?: ResumeData;
  mode?: ResumePageMode;
  themeClassName?: string;
};

const resumeLayoutSpec = {
  page: {
    width: "210mm",
    height: "297mm",
    borderRadius: "0px",
  },
  variants: {
    tschichold: {
      id: "tschichold",
      label: "Tschichold",
      title: "Tschichold layout",
      margins: { top: "24mm", right: "18mm", bottom: "20mm", left: "18mm" },
      columns: { sidebar: "48mm", gutter: "8mm", main: "1fr" },
      header: {
        rowGap: "16px",
        bottomPadding: "16px",
        summaryMaxWidth: "78%",
        titleMarginTop: "4px",
      },
      body: { rowGap: "16px", sidebarRightPadding: "8px", mainLeftPadding: "8px" },
      sidebarSection: {
        marginBottom: "20px",
        titleMarginBottom: "8px",
        titlePaddingBottom: "4px",
        contentGap: "8px",
      },
      mainSection: {
        marginBottom: "20px",
        headingGap: "8px",
        headingMarginBottom: "12px",
      },
      experience: {
        dateColumn: "76px",
        columnGap: "12px",
        itemGap: "12px",
        orgMarginBottom: "6px",
        bulletsPaddingLeft: "16px",
        bulletsGap: "6px",
      },
      projects: { cardGap: "12px", cardPadding: "0px" },
      education: { itemGap: "10px" },
      skills: { gap: "8px", paddingInline: "8px", paddingBlock: "6px" },
      density: {
        displaySizeAdjust: "0px",
        titleSizeAdjust: "0px",
        bodySizeAdjust: "0px",
        bodySmSizeAdjust: "0px",
        sectionGapAdjust: "0px",
        headingMarginAdjust: "0px",
        bulletGapAdjust: "0px",
        projectGapAdjust: "0px",
        projectPaddingAdjust: "0px",
      },
    },
    golden: {
      id: "golden",
      label: "Golden",
      title: "Golden layout",
      margins: { top: "22mm", right: "18mm", bottom: "20mm", left: "18mm" },
      columns: { sidebar: "52mm", gutter: "10mm", main: "1fr" },
      header: {
        rowGap: "18px",
        bottomPadding: "18px",
        summaryMaxWidth: "80%",
        titleMarginTop: "4px",
      },
      body: { rowGap: "18px", sidebarRightPadding: "10px", mainLeftPadding: "10px" },
      sidebarSection: {
        marginBottom: "22px",
        titleMarginBottom: "8px",
        titlePaddingBottom: "4px",
        contentGap: "8px",
      },
      mainSection: {
        marginBottom: "22px",
        headingGap: "10px",
        headingMarginBottom: "14px",
      },
      experience: {
        dateColumn: "84px",
        columnGap: "14px",
        itemGap: "14px",
        orgMarginBottom: "6px",
        bulletsPaddingLeft: "16px",
        bulletsGap: "6px",
      },
      projects: { cardGap: "14px", cardPadding: "0px" },
      education: { itemGap: "12px" },
      skills: { gap: "8px", paddingInline: "8px", paddingBlock: "6px" },
      density: {
        displaySizeAdjust: "2px",
        titleSizeAdjust: "1px",
        bodySizeAdjust: "0px",
        bodySmSizeAdjust: "0px",
        sectionGapAdjust: "2px",
        headingMarginAdjust: "0px",
        bulletGapAdjust: "0px",
        projectGapAdjust: "2px",
        projectPaddingAdjust: "0px",
      },
    },
    robial: {
      id: "robial",
      label: "Robial",
      title: "Robial layout",
      margins: { top: "20mm", right: "16mm", bottom: "18mm", left: "16mm" },
      columns: { sidebar: "50mm", gutter: "8mm", main: "1fr" },
      header: {
        rowGap: "16px",
        bottomPadding: "16px",
        summaryMaxWidth: "76%",
        titleMarginTop: "4px",
      },
      body: { rowGap: "16px", sidebarRightPadding: "8px", mainLeftPadding: "8px" },
      sidebarSection: {
        marginBottom: "18px",
        titleMarginBottom: "8px",
        titlePaddingBottom: "4px",
        contentGap: "8px",
      },
      mainSection: {
        marginBottom: "18px",
        headingGap: "8px",
        headingMarginBottom: "12px",
      },
      experience: {
        dateColumn: "82px",
        columnGap: "12px",
        itemGap: "12px",
        orgMarginBottom: "6px",
        bulletsPaddingLeft: "16px",
        bulletsGap: "6px",
      },
      projects: { cardGap: "12px", cardPadding: "0px" },
      education: { itemGap: "10px" },
      skills: { gap: "8px", paddingInline: "8px", paddingBlock: "6px" },
      density: {
        displaySizeAdjust: "4px",
        titleSizeAdjust: "0px",
        bodySizeAdjust: "0px",
        bodySmSizeAdjust: "0px",
        sectionGapAdjust: "0px",
        headingMarginAdjust: "0px",
        bulletGapAdjust: "0px",
        projectGapAdjust: "0px",
        projectPaddingAdjust: "0px",
      },
    },
  },
} as const;

type ResumeVariant =
  (typeof resumeLayoutSpec.variants)[keyof typeof resumeLayoutSpec.variants];

const sampleData: ResumeData = {
  name: "Avery Stone",
  title: "Product Designer / Frontend Developer",
  summary:
    "Designs and ships interface systems with strong typographic discipline, product clarity, and production-ready front-end execution.",
  metadata: [
    { label: "Location", value: "Paris, France" },
    { label: "Email", value: "avery@portfolio.dev" },
    { label: "Phone", value: "+33 6 12 34 56 78" },
    { label: "Website", value: "averystone.design" },
  ],
  contact: [
    { label: "Email", value: "avery@portfolio.dev" },
    { label: "Phone", value: "+33 6 12 34 56 78" },
    { label: "Portfolio", value: "averystone.design" },
    { label: "LinkedIn", value: "linkedin.com/in/averystone" },
  ],
  skills: [
    "Product Design",
    "UI Systems",
    "React",
    "TypeScript",
    "Design Systems",
    "Accessibility",
    "Prototyping",
    "Editorial Layout",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "French", level: "Professional" },
  ],
  experience: [
    {
      company: "Northline Studio",
      role: "Senior Product Designer",
      location: "Paris",
      period: "2023 — Present",
      bullets: [
        "Led end-to-end design for a B2B workflow platform used by 40k+ monthly users.",
        "Built a reusable design language that reduced new screen production time by 35%.",
        "Partnered with engineering to turn prototypes into accessible, responsive production UI.",
      ],
    },
    {
      company: "Lattice Works",
      role: "Frontend Designer",
      location: "Remote",
      period: "2020 — 2023",
      bullets: [
        "Designed and implemented marketing and product surfaces in React and TypeScript.",
        "Improved conversion on the core signup flow through layout simplification and hierarchy improvements.",
        "Created an 8px spacing system for consistent cross-team execution.",
      ],
    },
  ],
  projects: [
    {
      name: "Helio Commerce",
      meta: "Onboarding / Conversion",
      description:
        "Redesigned merchant onboarding, cutting setup drop-off and simplifying the first-run experience.",
    },
    {
      name: "Field Notes",
      meta: "Editorial / Portfolio",
      description:
        "Built a responsive editorial portfolio with stronger hierarchy and motion-led transitions.",
    },
  ],
  education: [
    {
      school: "École de Design Numérique",
      degree: "B.A. in Visual Communication",
      period: "2020",
    },
  ],
};

function buildVariantVars(variant: ResumeVariant): React.CSSProperties {
  return {
    "--page-width": resumeLayoutSpec.page.width,
    "--page-height": resumeLayoutSpec.page.height,
    "--page-radius": resumeLayoutSpec.page.borderRadius,
    "--margin-top": variant.margins.top,
    "--margin-right": variant.margins.right,
    "--margin-bottom": variant.margins.bottom,
    "--margin-left": variant.margins.left,
    "--sidebar-width": variant.columns.sidebar,
    "--gutter-width": variant.columns.gutter,
    "--main-width": variant.columns.main,
    "--header-row-gap": variant.header.rowGap,
    "--header-bottom-padding": variant.header.bottomPadding,
    "--header-summary-width": variant.header.summaryMaxWidth,
    "--header-title-margin-top": variant.header.titleMarginTop,
    "--body-row-gap": variant.body.rowGap,
    "--sidebar-right-padding": variant.body.sidebarRightPadding,
    "--main-left-padding": variant.body.mainLeftPadding,
    "--sidebar-section-gap": variant.sidebarSection.marginBottom,
    "--sidebar-title-margin": variant.sidebarSection.titleMarginBottom,
    "--sidebar-title-padding": variant.sidebarSection.titlePaddingBottom,
    "--sidebar-content-gap": variant.sidebarSection.contentGap,
    "--main-section-gap": variant.mainSection.marginBottom,
    "--main-heading-gap": variant.mainSection.headingGap,
    "--main-heading-margin": variant.mainSection.headingMarginBottom,
    "--experience-date-column": variant.experience.dateColumn,
    "--experience-column-gap": variant.experience.columnGap,
    "--experience-item-gap": variant.experience.itemGap,
    "--experience-org-margin": variant.experience.orgMarginBottom,
    "--experience-bullets-padding": variant.experience.bulletsPaddingLeft,
    "--experience-bullets-gap": variant.experience.bulletsGap,
    "--project-gap": variant.projects.cardGap,
    "--project-padding": variant.projects.cardPadding,
    "--education-gap": variant.education.itemGap,
    "--skill-gap": variant.skills.gap,
    "--skill-padding-inline": variant.skills.paddingInline,
    "--skill-padding-block": variant.skills.paddingBlock,
    "--display-size-adjust": variant.density.displaySizeAdjust,
    "--title-size-adjust": variant.density.titleSizeAdjust,
    "--body-size-adjust": variant.density.bodySizeAdjust,
    "--body-sm-size-adjust": variant.density.bodySmSizeAdjust,
    "--section-gap-adjust": variant.density.sectionGapAdjust,
    "--heading-margin-adjust": variant.density.headingMarginAdjust,
    "--bullet-gap-adjust": variant.density.bulletGapAdjust,
    "--project-gap-adjust": variant.density.projectGapAdjust,
    "--project-padding-adjust": variant.density.projectPaddingAdjust,
  } as React.CSSProperties;
}

function InlineStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=IBM+Plex+Mono:wght@500;600&display=swap');

      :root {
        --font-display: 'Archivo', sans-serif;
        --font-mono: 'IBM Plex Mono', monospace;
        --color-paper: #f6f3ed;
        --color-ink: #111111;
        --color-body: #2e2a24;
        --color-muted: #6e665c;
        --color-line: rgba(17, 17, 17, 0.16);
        --color-panel: #171717;
        --color-accent: #ff6b2c;
        --color-bg: #e8e4dc;
        --shadow-page: 0 32px 72px rgba(0,0,0,0.14);
      }

      * { box-sizing: border-box; }
      body { margin: 0; }

      .theme-resume-calm {
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(255,107,44,0.16), transparent 24%),
          linear-gradient(180deg, #efebe5 0%, #e3ddd2 100%);
        color: var(--color-ink);
        font-family: var(--font-display);
      }

      .resume-preview-shell {
        width: 100%;
        padding: 24px;
      }

      .resume-preview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
        align-items: start;
      }

      .resume-page-frame {
        display: flex;
        justify-content: center;
      }

      .resume-page {
        position: relative;
        width: min(100%, var(--page-width));
        min-height: var(--page-height);
        background: var(--color-paper);
        border: 1px solid var(--color-line);
        border-radius: var(--page-radius);
        box-shadow: var(--shadow-page);
        overflow: hidden;
      }

      .resume-page::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(to right, rgba(17,17,17,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(17,17,17,0.06) 1px, transparent 1px);
        background-size: 48px 48px;
        opacity: 0.72;
      }

      .page-label {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 32px;
        display: grid;
        place-items: center;
        background: var(--color-accent);
        color: var(--color-panel);
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        z-index: 1;
      }

      .resume-inner {
        position: relative;
        z-index: 1;
        padding: calc(var(--margin-top) + 16px) var(--margin-right) var(--margin-bottom) var(--margin-left);
      }

      .resume-header {
        display: grid;
        gap: var(--header-row-gap);
        padding-bottom: var(--header-bottom-padding);
        border-bottom: 1px solid var(--color-line);
        margin-bottom: calc(16px + var(--section-gap-adjust));
      }

      .header-copy {
        display: grid;
        gap: 10px;
        justify-items: center;
        text-align: center;
      }
      .eyebrow {
        margin: 0;
        min-height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        background: rgba(255,107,44,0.12);
        border: 1px solid rgba(17,17,17,0.12);
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-muted);
      }

      .name {
        margin: var(--header-title-margin-top) 0 0;
        font-size: calc(56px + var(--display-size-adjust));
        line-height: 0.88;
        letter-spacing: -0.09em;
        text-transform: uppercase;
        font-weight: 900;
        max-width: 100%;
      }

      .title {
        margin: 0;
        font-size: calc(18px + var(--title-size-adjust));
        line-height: 1.1;
        font-weight: 800;
        color: var(--color-ink);
      }

      .summary {
        margin: 0 auto;
        max-width: min(78%, 560px);
        font-size: calc(14px + var(--body-size-adjust));
        line-height: 1.6;
        color: var(--color-body);
      }

      .header-band {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin-top: 6px;
        border: 1px solid rgba(255,255,255,0.14);
        background: var(--color-panel);
      }

      .header-band-item {
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        text-align: center;
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--color-accent);
        border-right: 1px solid rgba(255,255,255,0.14);
      }

      .header-band-item:last-child {
        border-right: 0;
      }

      .meta-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px 16px;
      }

      .meta-item dt,
      .label {
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--color-muted);
      }

      .meta-item dd,
      .value {
        margin: 2px 0 0;
        font-size: 13px;
        line-height: 1.4;
        color: var(--color-body);
      }

      .resume-grid {
        display: grid;
        grid-template-columns: var(--sidebar-width) var(--gutter-width) minmax(0, 1fr);
        align-items: start;
        gap: 0;
      }

      .resume-sidebar {
        padding-right: var(--sidebar-right-padding);
      }

      .resume-divider {
        width: 1px;
        height: 100%;
        margin: 0 auto;
        background: linear-gradient(180deg, rgba(17,17,17,0.06), rgba(17,17,17,0.24), rgba(17,17,17,0.06));
      }

      .resume-main {
        padding-left: var(--main-left-padding);
      }

      .sidebar-section {
        margin-bottom: calc(var(--sidebar-section-gap) + var(--section-gap-adjust));
      }

      .sidebar-title,
      .main-heading {
        margin: 0;
        font-size: 12px;
        line-height: 1.1;
        font-family: var(--font-mono);
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--color-muted);
      }

      .sidebar-title {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        margin-bottom: calc(var(--sidebar-title-margin) + var(--heading-margin-adjust));
        padding: 0 10px;
        border: 1px solid rgba(17,17,17,0.12);
        background: rgba(255,107,44,0.1);
      }

      .sidebar-content {
        display: grid;
        gap: var(--sidebar-content-gap);
      }

      .main-section {
        margin-bottom: calc(var(--main-section-gap) + var(--section-gap-adjust));
      }

      .main-heading-row {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: var(--main-heading-gap);
        margin-bottom: calc(var(--main-heading-margin) + var(--heading-margin-adjust));
      }

      .main-heading {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        padding: 0 10px;
        background: var(--color-panel);
        color: var(--color-accent);
      }

      .main-heading-rule {
        height: 1px;
        background: var(--color-line);
      }

      .compact-list,
      .skills-list,
      .bullet-list,
      .experience-stack,
      .projects-grid,
      .education-stack {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .compact-list { display: grid; gap: 8px; }
      .compact-list li { display: grid; gap: 2px; }

      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--skill-gap);
      }

      .skills-list li {
        padding: var(--skill-padding-block) var(--skill-padding-inline);
        border: 1px solid var(--color-line);
        font-size: 11px;
        line-height: 1.2;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.04em;
      }

      .experience-stack { display: grid; gap: var(--experience-item-gap); }

      .experience-item {
        display: grid;
        grid-template-columns: var(--experience-date-column) minmax(0, 1fr);
        gap: var(--experience-column-gap);
      }

      .experience-period,
      .education-period,
      .entry-subtitle {
        color: var(--color-muted);
      }

      .experience-period,
      .education-period {
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .entry-title {
        margin: 0;
        font-size: 18px;
        line-height: 1.02;
        font-weight: 800;
        letter-spacing: -0.05em;
        color: var(--color-ink);
      }

      .entry-subtitle {
        margin: var(--experience-org-margin) 0 0;
        font-size: 13px;
        line-height: 1.45;
      }

      .bullet-list {
        margin-top: 8px;
        padding-left: var(--experience-bullets-padding);
        list-style: square;
        display: grid;
        gap: calc(var(--experience-bullets-gap) + var(--bullet-gap-adjust));
      }

      .bullet-list li,
      .project-copy {
        font-size: calc(13px + var(--body-sm-size-adjust));
        line-height: 1.55;
        color: var(--color-body);
      }

      .projects-grid {
        display: grid;
        gap: calc(var(--project-gap) + var(--project-gap-adjust));
      }

      .project-card {
        padding: calc(var(--project-padding) + var(--project-padding-adjust));
      }

      .entry-subtitle--project {
        margin-bottom: 6px;
      }

      .project-copy {
        margin: 0;
      }

      .education-stack {
        display: grid;
        gap: var(--education-gap);
      }

      .education-item {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 16px;
      }

      .tail-grid {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 16px;
      }

      .languages-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 8px;
      }

      .languages-list li {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid var(--color-line);
      }

      .languages-list li:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }

      .resume-page--robial .name,
      .resume-page--robial .entry-title {
        letter-spacing: -0.07em;
      }

      .resume-page--robial .page-label {
        background: var(--color-accent);
        color: var(--color-panel);
      }

      .resume-page--robial .resume-page::after,
      .resume-page::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 28%),
          linear-gradient(0deg, rgba(255,107,44,0.05), rgba(255,107,44,0));
        mix-blend-mode: screen;
      }

      .resume-page--robial .skills-list li {
        background: rgba(255,107,44,0.08);
      }

      .resume-page--robial .project-card {
        border-top: 2px solid var(--color-accent);
        padding-top: 10px;
      }

      .resume-page--robial .experience-period,
      .resume-page--robial .education-period,
      .resume-page--robial .label {
        color: #8d4d27;
      }

      .resume-page--robial .bullet-list li::marker {
        color: var(--color-accent);
      }

      @page {
        size: A4 portrait;
        margin: 0;
      }

      @media (max-width: 900px) {
        .resume-preview-shell { padding: 12px; }
        .resume-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .resume-divider { display: none; }
        .resume-sidebar,
        .resume-main {
          padding: 0;
        }
        .summary {
          max-width: 100%;
        }
        .header-band {
          grid-template-columns: 1fr;
        }
        .header-band-item {
          border-right: 0;
          border-bottom: 1px solid rgba(255,255,255,0.14);
        }
        .header-band-item:last-child {
          border-bottom: 0;
        }
        .education-item,
        .experience-item {
          grid-template-columns: 1fr;
        }
        .tail-grid {
          grid-template-columns: 1fr;
        }
        .languages-list li {
          align-items: start;
          flex-direction: column;
          gap: 2px;
        }
      }

      @media print {
        .theme-resume-calm {
          background: white;
        }
        .resume-preview-shell {
          padding: 0;
        }
        .resume-preview-grid {
          display: block;
        }
        .resume-page {
          width: 210mm;
          min-height: 297mm;
          box-shadow: none;
          border: none;
          break-after: page;
        }
      }
    `}</style>
  );
}

function SidebarSection({
  title,
  children,
  variant,
}: {
  title: string;
  children: React.ReactNode;
  variant: ResumeVariant;
}) {
  return (
    <section className={`sidebar-section sidebar-section--${variant.id}`}>
      <h3 className={`sidebar-title sidebar-title--${variant.id}`}>{title}</h3>
      <div className={`sidebar-content sidebar-content--${variant.id}`}>{children}</div>
    </section>
  );
}

function MainSection({
  title,
  children,
  variant,
}: {
  title: string;
  children: React.ReactNode;
  variant: ResumeVariant;
}) {
  return (
    <section className={`main-section main-section--${variant.id}`}>
      <div className={`main-heading-row main-heading-row--${variant.id}`}>
        <h2 className={`main-heading main-heading--${variant.id}`}>{title}</h2>
        <div className={`main-heading-rule main-heading-rule--${variant.id}`} />
      </div>
      {children}
    </section>
  );
}

function HeaderBand({
  data,
}: {
  data: ResumeData;
}) {
  const bandItems = [data.title, data.metadata[0]?.value, data.projects[0]?.meta].filter(Boolean);

  return (
    <div className="header-band" aria-label="Resume overview band">
      {bandItems.map((item, index) => (
        <div key={`${item}-${index}`} className="header-band-item">
          {item}
        </div>
      ))}
    </div>
  );
}

function ResumeVariantPage({
  variant,
  data,
}: {
  variant: ResumeVariant;
  data: ResumeData;
}) {
  return (
    <div className="resume-page-frame">
      <article
        className={`resume-page resume-page--${variant.id}`}
        style={buildVariantVars(variant)}
        aria-label={variant.title}
      >
        <div className="page-label">{variant.label}</div>

        <div className="resume-inner">
          <header className="resume-header">
            <div className="header-copy">
              <p className="eyebrow">Résumé</p>
              <h1 className="name">{data.name}</h1>
              <p className="title">{data.title}</p>
              <p className="summary">{data.summary}</p>
            </div>
            <HeaderBand data={data} />
          </header>

          <div className="resume-grid">
            <aside className="resume-sidebar">
              <SidebarSection title="Contact" variant={variant}>
                <ul className="compact-list">
                  {data.contact.map((item) => (
                    <li key={`${item.label}-${item.value}`}>
                      <span className="label">{item.label}</span>
                      <span className="value">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              
            </aside>

            <div className="resume-divider" aria-hidden="true" />

            <main className="resume-main">
              <MainSection title="Experience" variant={variant}>
                <div className="experience-stack">
                  {data.experience.map((item) => (
                    <article key={`${item.company}-${item.role}-${item.period}`} className="experience-item">
                      <div className="experience-period">{item.period}</div>
                      <div>
                        <h3 className="entry-title">{item.role}</h3>
                        <p className="entry-subtitle">
                          {item.company} · {item.location}
                        </p>
                        <ul className="bullet-list">
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </MainSection>

              <MainSection title="Selected projects" variant={variant}>
                <div className="projects-grid">
                  {data.projects.map((project) => (
                    <article
                      key={`${project.name}-${project.meta}`}
                      className={`project-card project-card--${variant.id}`}
                    >
                      <h3 className="entry-title">{project.name}</h3>
                      <p className="entry-subtitle entry-subtitle--project">{project.meta}</p>
                      <p className="project-copy">{project.description}</p>
                    </article>
                  ))}
                </div>
              </MainSection>

              <MainSection title="Education" variant={variant}>
                <div className="education-stack">
                  {data.education.map((item) => (
                    <article key={`${item.school}-${item.degree}-${item.period}`} className="education-item">
                      <div>
                        <h3 className="entry-title">{item.degree}</h3>
                        <p className="entry-subtitle">{item.school}</p>
                      </div>
                      <p className="education-period">{item.period}</p>
                    </article>
                  ))}
                </div>
              </MainSection>

              <MainSection title="Skills & Languages" variant={variant}>
                <div className="tail-grid">
                  <div>
                    <ul className="skills-list">
                      {data.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="languages-list">
                      {data.languages.map((language) => (
                        <li key={`${language.name}-${language.level}`}>
                          <span className="label">{language.name}</span>
                          <span className="value">{language.level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MainSection>
            </main>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function ResumePage({
  data = sampleData,
  mode = "robial",
  themeClassName = "theme-resume-calm",
}: ResumePageProps) {
  const variants: ResumeVariant[] =
    mode === "comparison"
      ? [
          resumeLayoutSpec.variants.tschichold,
          resumeLayoutSpec.variants.golden,
          resumeLayoutSpec.variants.robial,
        ]
      : [resumeLayoutSpec.variants[mode]];

  return (
    <div className={themeClassName}>
      <InlineStyles />
      <div className="resume-preview-shell">
        <div className="resume-preview-grid">
          {variants.map((variant) => (
            <ResumeVariantPage key={variant.id} variant={variant} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
