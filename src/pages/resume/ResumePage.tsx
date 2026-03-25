import React from "react";
import "./resume-preview.css";

import { resumeLayoutSpec } from "./resume-layout.spec";
import type { ResumeData } from "./resume.types";

type ResumePageMode =
  | "comparison"
  | "comparisonAll"
  | "robial"
  | "onecol";

type ResumePageProps = {
  data: ResumeData;
  mode?: ResumePageMode;
};

type ResumeVariant =
  (typeof resumeLayoutSpec.variants)[keyof typeof resumeLayoutSpec.variants];

type OnecolMetaItem = {
  label: string;
  value: string;
};

type AutoFitLevel = "0" | "1" | "2" | "3" | "4";
const AUTO_FIT_LEVELS: AutoFitLevel[] = ["0", "1", "2", "3", "4"];

const MM_TO_PX = 96 / 25.4;
const PAGE_WIDTH_PX = 210 * MM_TO_PX;
const PAGE_HEIGHT_PX = 297 * MM_TO_PX;
const COMPACT_COMPARISON_BREAKPOINT = 1040;

type ComparisonCardCopy = {
  typography: string;
  color: string;
};

function useCompactComparison(isComparison: boolean) {
  const [isCompact, setIsCompact] = React.useState(() => {
    if (!isComparison || typeof window === "undefined") {
      return false;
    }

    return window.innerWidth <= COMPACT_COMPARISON_BREAKPOINT;
  });

  React.useEffect(() => {
    if (!isComparison) {
      setIsCompact(false);
      return;
    }

    const query = window.matchMedia(
      `(max-width: ${COMPACT_COMPARISON_BREAKPOINT}px)`
    );

    const syncMode = (matches: boolean) => {
      setIsCompact(matches);
    };

    syncMode(query.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncMode(event.matches);
    };

    query.addEventListener("change", handleChange);

    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, [isComparison]);

  return isCompact;
}

function usePreviewScale() {
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState(1);

  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const applyScale = () => {
      const availableWidth = stage.clientWidth;
      if (!availableWidth) return;

      const nextScale = Math.min(1, availableWidth / PAGE_WIDTH_PX);
      setScale(nextScale > 0 ? nextScale : 1);
    };

    const resizeObserver = new ResizeObserver(applyScale);
    resizeObserver.observe(stage);
    window.addEventListener("resize", applyScale);
    applyScale();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", applyScale);
    };
  }, []);

  return {
    stageRef,
    stageStyle: {
      "--preview-scale": scale,
      "--preview-stage-height": `${PAGE_HEIGHT_PX * scale}px`,
    } as React.CSSProperties,
  };
}

function useAutoFitPage() {
  const pageRef = React.useRef<HTMLElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const frameRef = React.useRef<number | null>(null);

  const applyFit = React.useCallback(() => {
    const page = pageRef.current;
    const inner = innerRef.current;
    if (!page || !inner) return;

    const overflows = () => inner.scrollHeight > inner.clientHeight + 1;

    for (const fit of AUTO_FIT_LEVELS) {
      page.dataset.fit = fit;

      if (!overflows() || fit === AUTO_FIT_LEVELS[AUTO_FIT_LEVELS.length - 1]) {
        break;
      }
    }
  }, []);

  const scheduleFit = React.useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      applyFit();
    });
  }, [applyFit]);

  React.useLayoutEffect(() => {
    const page = pageRef.current;
    const inner = innerRef.current;
    if (!page || !inner) return;

    const ro = new ResizeObserver(scheduleFit);
    const mo = new MutationObserver(scheduleFit);
    const fonts = document.fonts;

    ro.observe(page);
    ro.observe(inner);
    mo.observe(inner, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", scheduleFit);

    if (fonts?.ready) {
      fonts.ready.then(scheduleFit);
    }

    fonts?.addEventListener?.("loadingdone", scheduleFit);

    scheduleFit();

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", scheduleFit);
      fonts?.removeEventListener?.("loadingdone", scheduleFit);
    };
  }, [scheduleFit]);

  React.useLayoutEffect(() => {
    scheduleFit();
  });

  return { pageRef, innerRef };
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
      <div className={`sidebar-content sidebar-content--${variant.id}`}>
        {children}
      </div>
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

function HeaderMeta({
  items,
  variant,
}: {
  items: ResumeData["metadata"];
  variant: ResumeVariant;
}) {
  return (
    <dl
      className={`meta-grid meta-grid--${variant.id}`}
      aria-label="Resume metadata"
    >
      {items.map((item) => (
        <div key={item.label} className="meta-item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function OneColumnSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="onecol-section">
      <div className="onecol-section-rule" />
      <h2 className="onecol-section-title">{title}</h2>
      <div className="onecol-section-body">{children}</div>
    </section>
  );
}

function buildPageVars(variant: ResumeVariant): React.CSSProperties {
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

function RobialPeriod({ period }: { period: string }) {
  const parts = period.split(/\s*[—–-]\s*/);

  if (parts.length === 2) {
    return (
      <span className="robial-period-stack robial-period-stack--no-sep">
        <span>{parts[0]}</span>
        <span>{parts[1]}</span>
      </span>
    );
  }

  return <span>{period}</span>;
}

function getComparisonCardCopy(variant: ResumeVariant): ComparisonCardCopy {
  switch (variant.id) {
    case "robial":
      return {
        typography: "Serif headline, compact utility captions, structured date rail.",
        color: "Warm editorial neutrals with a sharper accent rule.",
      };
    case "onecol":
      return {
        typography: "Single-column editorial rhythm with quieter contact and date captions.",
        color: "Soft paper field with calmer accent contrast for long-form reading.",
      };
    default:
      return {
        typography: "Editorial serif headline with restrained utility typography.",
        color: "Warm paper neutrals with one restrained accent.",
      };
  }
}

function ComparisonVariantCard({ variant }: { variant: ResumeVariant }) {
  const copy = getComparisonCardCopy(variant);

  return (
    <article className="resume-variant-card">
      <p className="resume-variant-card-label">{variant.label}</p>
      <h2 className="resume-variant-card-title">{variant.title}</h2>
      <p className="resume-variant-card-subtitle">{variant.subtitle}</p>

      <dl className="resume-variant-card-specs">
        <div>
          <dt>Typography</dt>
          <dd>{copy.typography}</dd>
        </div>
        <div>
          <dt>Colour</dt>
          <dd>{copy.color}</dd>
        </div>
      </dl>

      <ul className="resume-variant-card-chips" aria-label={`${variant.label} tags`}>
        {variant.chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
    </article>
  );
}

function PreviewFrame({
  variant,
  comparisonLabel,
  compactComparison,
  onActivateComparison,
  children,
}: {
  variant: ResumeVariant;
  comparisonLabel?: string;
  compactComparison?: boolean;
  onActivateComparison?: (() => void) | undefined;
  children: React.ReactNode;
}) {
  const { stageRef, stageStyle } = usePreviewScale();
  const isInteractive = typeof onActivateComparison === "function";
  const lastTouchEndRef = React.useRef<number>(0);

  const handleActivateComparison = () => {
    onActivateComparison?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivateComparison();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    if (event.detail !== 0) {
      handleActivateComparison();
    }
  };

  const handleDoubleClick = () => {
    handleActivateComparison();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length >= 2) {
      handleActivateComparison();
    }
  };

  const handleTouchEnd = () => {
    const now = Date.now();

    if (now - lastTouchEndRef.current < 280) {
      handleActivateComparison();
    }

    lastTouchEndRef.current = now;
  };

  if (compactComparison && comparisonLabel) {
    return (
      <div
        className={`resume-variant-card-shell ${
          isInteractive ? "resume-variant-card-shell--clickable" : ""
        }`}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-label={
          isInteractive
            ? `Expand comparison and open ${variant.label} in large view`
            : undefined
        }
        onClick={isInteractive ? handleClick : undefined}
        onDoubleClick={isInteractive ? handleDoubleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        onTouchStart={isInteractive ? handleTouchStart : undefined}
        onTouchEnd={isInteractive ? handleTouchEnd : undefined}
      >
        <ComparisonVariantCard variant={variant} />
      </div>
    );
  }

  return (
    <div
      className={`resume-page-frame ${
        isInteractive ? "resume-page-frame--clickable" : ""
      }`}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={
        isInteractive
          ? `Expand comparison and open ${variant.label} in large view`
          : undefined
      }
      onClick={isInteractive ? handleClick : undefined}
      onDoubleClick={isInteractive ? handleDoubleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      onTouchStart={isInteractive ? handleTouchStart : undefined}
      onTouchEnd={isInteractive ? handleTouchEnd : undefined}
    >
      {comparisonLabel ? (
        <div className="resume-frame-label" aria-hidden="true">
          {comparisonLabel}
        </div>
      ) : null}

      <div ref={stageRef} className="resume-page-stage" style={stageStyle}>
        {children}
      </div>
    </div>
  );
}

function ClassicResumePage({
  variant,
  data,
  comparisonLabel,
  compactComparison,
  onActivateComparison,
}: {
  variant: ResumeVariant;
  data: ResumeData;
  comparisonLabel?: string;
  compactComparison?: boolean;
  onActivateComparison?: (() => void) | undefined;
}) {
  const pageVars = buildPageVars(variant);
  const { pageRef, innerRef } = useAutoFitPage();

  return (
    <PreviewFrame
      variant={variant}
      comparisonLabel={comparisonLabel}
      compactComparison={compactComparison}
      onActivateComparison={onActivateComparison}
    >
      <article
        ref={pageRef}
        className={`resume-page resume-page--${variant.id}`}
        style={pageVars}
        aria-label={variant.label}
      >
        <div ref={innerRef} className="resume-inner">
          <header className="resume-header">
            <div className="header-copy">
              <p className="eyebrow">Résumé</p>
              <h1 className="name">{data.name}</h1>
              <p className="title">{data.title}</p>
              <p className="summary">{data.summary}</p>
            </div>
            <HeaderMeta items={data.metadata} variant={variant} />
          </header>

          <div className="resume-grid">
            <aside className="resume-sidebar">
              <SidebarSection title="Contact" variant={variant}>
                <ul className="compact-list">
                  {data.contact.map((item) => (
                    <li key={item.label}>
                      <span className="label">{item.label}</span>
                      <span className="value">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection title="Skills" variant={variant}>
                <ul className="skills-list">
                  {data.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection title="Languages" variant={variant}>
                <ul className="compact-list compact-list--languages">
                  {data.languages.map((language) => (
                    <li key={language.name}>
                      <span className="label">{language.name}</span>
                      <span className="value">{language.level}</span>
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
                    <article
                      key={`${item.company}-${item.role}`}
                      className="experience-item"
                    >
<div
  className={`experience-period ${
    variant.id === "robial" ? "experience-period--robial" : ""
  }`}
>
  {variant.id === "robial" ? (
    <RobialPeriod period={item.period} />
  ) : (
    item.period
  )}
</div>                      <div>
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
                      className={`project-card project-card--${variant.id}`}
                      key={project.name}
                    >
                      <h3 className="entry-title">{project.name}</h3>
                      <p className="entry-subtitle entry-subtitle--project">
                        {project.meta}
                      </p>
                      <p className="project-copy">{project.description}</p>
                    </article>
                  ))}
                </div>
              </MainSection>

              <MainSection title="Education" variant={variant}>
                <div className="education-stack">
                  {data.education.map((item) => (
                    <article
                      key={`${item.school}-${item.degree}`}
                      className="education-item"
                    >
                      <div>
                        <h3 className="entry-title">{item.degree}</h3>
                        <p className="entry-subtitle">{item.school}</p>
                      </div>
                      <p className="education-period">{item.period}</p>
                    </article>
                  ))}
                </div>
              </MainSection>
            </main>
          </div>
        </div>
      </article>
    </PreviewFrame>
  );
}

function OneColumnPage({
  variant,
  data,
  comparisonLabel,
  compactComparison,
  onActivateComparison,
}: {
  variant: ResumeVariant;
  data: ResumeData;
  comparisonLabel?: string;
  compactComparison?: boolean;
  onActivateComparison?: (() => void) | undefined;
}) {
  const pageVars = buildPageVars(variant);
  const { pageRef, innerRef } = useAutoFitPage();

  const emailItem = data.contact.find(
    (item) => item.label.toLowerCase() === "email"
  );

  const phoneItem = data.contact.find(
    (item) => item.label.toLowerCase() === "phone"
  );

  const portfolioItem =
    data.contact.find((item) => item.label.toLowerCase() === "web") ??
    data.contact.find((item) => item.label.toLowerCase() === "portfolio") ??
    data.metadata.find((item) => item.label.toLowerCase() === "portfolio");

  const onecolMetaItems: OnecolMetaItem[] = [
    phoneItem ? { label: "Phone", value: phoneItem.value } : null,
    emailItem ? { label: "Email", value: emailItem.value } : null,
    portfolioItem ? { label: "Portfolio", value: portfolioItem.value } : null,
  ].filter((item): item is OnecolMetaItem => item !== null);

  return (
    <PreviewFrame
      variant={variant}
      comparisonLabel={comparisonLabel}
      compactComparison={compactComparison}
      onActivateComparison={onActivateComparison}
    >
      <article
        ref={pageRef}
        className={`resume-page resume-page--${variant.id}`}
        style={pageVars}
        aria-label={variant.label}
      >
        <div ref={innerRef} className="resume-inner resume-inner--onecol">
          <header className="onecol-header">
            <div className="header-copy header-copy--onecol">
              <h1 className="name name--onecol">{data.name}</h1>
              <p className="title title--onecol">{data.title}</p>
              <p className="summary summary--onecol">{data.summary}</p>
            </div>

            <dl
              className="onecol-meta"
              aria-label="Resume metadata"
              style={{
                gridTemplateColumns: `repeat(${Math.max(
                  1,
                  onecolMetaItems.length
                )}, minmax(0, 1fr))`,
              }}
            >
              {onecolMetaItems.map((item) => (
                <div key={item.label} className="onecol-meta-item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <main className="onecol-main">
            <OneColumnSection title="Experience">
              <div className="onecol-experience-stack">
                {data.experience.map((item) => (
                  <article
                    key={`${item.company}-${item.role}`}
                    className="onecol-entry"
                  >
                    <div className="onecol-entry-head">
                      <div>
                        <div className="onecol-entry-eyebrow">{item.company}</div>
                        <h3 className="entry-title">{item.role}</h3>
                        <p className="entry-subtitle">{item.location}</p>
                      </div>
                      <p className="experience-period">{item.period}</p>
                    </div>

                    <ul className="bullet-list bullet-list--onecol">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </OneColumnSection>

            {!!data.achievements?.length && (
              <OneColumnSection title="Achievements">
                <ul className="bullet-list bullet-list--onecol bullet-list--achievements">
                  {data.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </OneColumnSection>
            )}

            <OneColumnSection title="Education">
              <div className="education-stack education-stack--onecol">
                {data.education.map((item) => (
                  <article
                    key={`${item.school}-${item.degree}`}
                    className="education-item"
                  >
                    <div>
                      <h3 className="entry-title">{item.degree}</h3>
                      <p className="entry-subtitle">{item.school}</p>
                    </div>
                    <p className="education-period">{item.period}</p>
                  </article>
                ))}
              </div>
            </OneColumnSection>

            <OneColumnSection title="Skills">
              <ul className="skills-list skills-list--onecol">
                {data.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </OneColumnSection>

            <OneColumnSection title="Languages">
              <ul className="compact-list compact-list--languages compact-list--onecol">
                {data.languages.map((language) => (
                  <li key={language.name}>
                    <span className="label">{language.name}</span>
                    <span className="value">{language.level}</span>
                  </li>
                ))}
              </ul>
            </OneColumnSection>

            <div className="onecol-bottom-space" />
          </main>
        </div>
      </article>
    </PreviewFrame>
  );
}

function ResumeVariantPage({
  variant,
  data,
  comparisonLabel,
  compactComparison,
  onActivateComparison,
}: {
  variant: ResumeVariant;
  data: ResumeData;
  comparisonLabel?: string;
  compactComparison?: boolean;
  onActivateComparison?: (() => void) | undefined;
}) {
  if (variant.id === "onecol") {
    return (
      <OneColumnPage
        variant={variant}
        data={data}
        comparisonLabel={comparisonLabel}
        compactComparison={compactComparison}
        onActivateComparison={onActivateComparison}
      />
    );
  }

  return (
    <ClassicResumePage
      variant={variant}
      data={data}
      comparisonLabel={comparisonLabel}
      compactComparison={compactComparison}
      onActivateComparison={onActivateComparison}
    />
  );
}

export default function ResumePage({
  data,
  mode = "comparison",
}: ResumePageProps) {
  const isComparisonMode = mode === "comparison" || mode === "comparisonAll";
  const [expandedComparison, setExpandedComparison] = React.useState(false);

  React.useEffect(() => {
    setExpandedComparison(false);
  }, [mode]);

  const compactViewport = useCompactComparison(isComparisonMode);
  const compactComparison = isComparisonMode && compactViewport && !expandedComparison;
  const expandedComparisonView = isComparisonMode && expandedComparison;
  const variants =
    mode === "comparison"
      ? [
          resumeLayoutSpec.variants.robial,
          resumeLayoutSpec.variants.onecol,
        ]
      : mode === "comparisonAll"
        ? [
            resumeLayoutSpec.variants.robial,
            resumeLayoutSpec.variants.onecol,
          ]
        : [resumeLayoutSpec.variants[mode]];

  return (
    <div
      className={`resume-preview-shell ${
        isComparisonMode ? "resume-preview-shell--comparison" : ""
      }`}
    >
      {expandedComparisonView ? (
        <div className="resume-preview-bar">
          <button
            type="button"
            className="resume-preview-back"
            onClick={() => setExpandedComparison(false)}
          >
            Back to overview
          </button>
        </div>
      ) : null}

      <div
        className={`resume-preview-grid ${
          isComparisonMode ? "resume-preview-grid--comparison" : ""
        } ${compactComparison ? "resume-preview-grid--compact" : ""} ${
          expandedComparisonView ? "resume-preview-grid--expanded" : ""
        }`}
      >
        {variants.map((variant) => (
          <ResumeVariantPage
            key={variant.id}
            variant={variant}
            comparisonLabel={isComparisonMode ? variant.label : undefined}
            compactComparison={compactComparison}
            onActivateComparison={
              isComparisonMode && !expandedComparisonView
                ? () => setExpandedComparison(true)
                : undefined
            }
            data={data}
          />
        ))}
      </div>
    </div>
  );
}
