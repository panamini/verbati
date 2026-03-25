import React, { useMemo, useState } from "react";

const PAGE = { width: 210, height: 297 };

const MODULAR_X_BANDS = [17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18];
const MODULAR_Y_BANDS = [17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17];

const MODELS = [
  {
    id: "01",
    title: "A4 9-Division Adaptation",
    short: "9-division model",
    type: "canon adaptation",
    margins: { left: 23.3, top: 33, right: 46.7, bottom: 66 },
    text: { width: 140, height: 198 },
    normalized: "1 : 1.414 : 2 : 2.828",
    exactCanon: "No",
    stroke: "var(--color-accent)",
    fill: "var(--color-accent-soft)",
    label: "var(--color-accent)",
    caption:
      "A more generous outer and lower margin preserves the classical directional weight while fitting the A4 sheet.",
    constructionNote:
      "The page is divided into ninths in each direction. The text block is an A4 adaptation of the directional weight of a classical canon rather than a literal 2 : 3 : 4 : 6 reconstruction.",
    tableNote:
      "Generous margins and a smaller block give the page a more ceremonial reading character.",
    getLines() {
      return {
        x: getDivisionLines(PAGE.width, 9),
        y: getDivisionLines(PAGE.height, 9),
      };
    },
  },
  {
    id: "02",
    title: "A4 12-Division Adaptation",
    short: "12-division model",
    type: "canon adaptation",
    margins: { left: 17.5, top: 24.75, right: 35, bottom: 49.5 },
    text: { width: 157.5, height: 222.75 },
    normalized: "1 : 1.414 : 2 : 2.828",
    exactCanon: "No",
    stroke: "var(--swatch-2)",
    fill: "rgba(161, 98, 7, 0.14)",
    label: "var(--swatch-2)",
    caption:
      "A denser interpretation with a larger text area, still following the same A4-adapted proportional sequence.",
    constructionNote:
      "The full page is divided into twelfths in each direction. The resulting field supports a tighter A4 adaptation while preserving the inner/outer and top/bottom directional doubling logic.",
    tableNote:
      "A denser page with broader working measure and higher page efficiency than the 9-division version.",
    getLines() {
      return {
        x: getDivisionLines(PAGE.width, 12),
        y: getDivisionLines(PAGE.height, 12),
      };
    },
  },
  {
    id: "03",
    title: "A4 Alternating 17/18 Module Field",
    short: "modular field",
    type: "modular field",
    margins: { left: 35, top: 35, right: 35, bottom: 52 },
    text: { width: 140, height: 210 },
    normalized: "17 / 18 alternating bands",
    exactCanon: "No",
    stroke: "var(--color-text)",
    fill: "rgba(32, 39, 51, 0.09)",
    label: "var(--color-text)",
    caption:
      "A full-page A4 modular field built by repeating 17 mm and 18 mm bands horizontally and vertically.",
    constructionNote:
      "The full A4 page is partitioned into alternating 17 mm and 18 mm bands in both directions. Across the width this produces 12 vertical bands; down the height it produces 17 horizontal bands, ending with a final 17 mm band.",
    tableNote:
      "The grid comes first; any text block inside it is a sample placement aligned to the field rather than a block derived from a canon.",
    note:
      "Sample text block shown at 35 / 35 / 35 / 52 mm, aligned to the field rather than canonically derived.",
    getLines() {
      return {
        x: getBandLines(MODULAR_X_BANDS),
        y: getBandLines(MODULAR_Y_BANDS),
      };
    },
  },
];

function getDivisionLines(size, count) {
  return Array.from({ length: count - 1 }, (_, index) =>
    Number((((index + 1) * size) / count).toFixed(2)),
  );
}

function getBandLines(bands) {
  let total = 0;
  return bands
    .slice(0, -1)
    .map((band) => {
      total += band;
      return total;
    });
}

function formatMm(value) {
  return `${value}`.replace(/\.0$/, "") + " mm";
}

function formatMmCompact(value) {
  return `${value}`.replace(/\.0$/, "");
}

function boundaryStrength(position, type = "division") {
  if (type === "modular") {
    return position % 35 === 0 ? 0.55 : 0.24;
  }
  return 0.22;
}

function MeasureBadge({ x, y, label, anchor = "middle" }) {
  const width = Math.max(34, label.length * 4.7 + 14);
  const height = 16;
  const left = anchor === "middle" ? x - width / 2 : x;

  return (
    <g>
      <rect
        x={left}
        y={y - height / 2}
        width={width}
        height={height}
        rx={8}
        fill="rgba(252,250,245,0.94)"
        stroke="var(--color-measure-stroke)"
        strokeWidth="0.8"
      />
      <text
        x={anchor === "middle" ? x : x + width / 2}
        y={y + 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="6.4"
        fill="var(--color-text-muted)"
        letterSpacing="0.08em"
      >
        {label}
      </text>
    </g>
  );
}

function DimH({ x1, x2, y, label }) {
  const mid = (x1 + x2) / 2;
  const badgeW = Math.max(34, label.length * 4.7 + 14);
  const gap = 6;

  return (
    <g>
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} stroke="var(--color-measure)" strokeWidth="0.9" opacity="0.9" />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} stroke="var(--color-measure)" strokeWidth="0.9" opacity="0.9" />

      <line x1={x1} y1={y} x2={mid - badgeW / 2 - gap} y2={y} stroke="var(--color-measure)" strokeWidth="0.95" />
      <line x1={mid + badgeW / 2 + gap} y1={y} x2={x2} y2={y} stroke="var(--color-measure)" strokeWidth="0.95" />

      <circle cx={x1} cy={y} r="1.7" fill="var(--color-measure)" />
      <circle cx={x2} cy={y} r="1.7" fill="var(--color-measure)" />

      <MeasureBadge x={mid} y={y} label={label} />
    </g>
  );
}

function DimV({ x, y1, y2, label, side = "right" }) {
  const mid = (y1 + y2) / 2;
  const badgeH = 16;
  const badgeW = Math.max(34, label.length * 4.7 + 14);
  const gap = 6;
  const badgeX =
    side === "center"
      ? x
      : side === "right"
        ? x + 10
        : x - badgeW - 10;
  const badgeAnchor = side === "center" ? "middle" : "start";

  return (
    <g>
      <line x1={x - 5} y1={y1} x2={x + 5} y2={y1} stroke="var(--color-measure)" strokeWidth="0.9" opacity="0.9" />
      <line x1={x - 5} y1={y2} x2={x + 5} y2={y2} stroke="var(--color-measure)" strokeWidth="0.9" opacity="0.9" />

      <line x1={x} y1={y1} x2={x} y2={mid - badgeH / 2 - gap} stroke="var(--color-measure)" strokeWidth="0.95" />
      <line x1={x} y1={mid + badgeH / 2 + gap} x2={x} y2={y2} stroke="var(--color-measure)" strokeWidth="0.95" />

      <circle cx={x} cy={y1} r="1.7" fill="var(--color-measure)" />
      <circle cx={x} cy={y2} r="1.7" fill="var(--color-measure)" />

      <MeasureBadge x={badgeX} y={mid} label={label} anchor={badgeAnchor} />
    </g>
  );
}

function BandLegend({ bands, axis }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        {axis}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {bands.map((band, index) => (
          <span
            key={`${axis}-${index}`}
            className="inline-flex min-w-[34px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[rgba(252,250,245,0.92)] px-2 py-1 text-[11px] leading-none text-[var(--color-text-muted)]"
          >
            {formatMmCompact(band)}
          </span>
        ))}
      </div>
    </div>
  );
}

function PageDiagram({ model, showConstruction }) {
  const pageX = 74;
  const pageY = 28;
  const pageW = PAGE.width;
  const pageH = PAGE.height;

  const textX = pageX + model.margins.left;
  const textY = pageY + model.margins.top;
  const sideGuideY = textY + model.text.height * 0.5;
  const leftDimY = sideGuideY - 12;
  const rightDimY = sideGuideY + 12;
  const topGuideX = textX + model.text.width * 0.2;
  const bottomGuideX = textX + model.text.width * 0.8;

  const lines = model.getLines();

  const lineNodes = useMemo(
    () => (
      <>
        {lines.x.map((value) => (
          <line
            key={`vx-${model.id}-${value}`}
            x1={pageX + value}
            y1={pageY}
            x2={pageX + value}
            y2={pageY + pageH}
            stroke={model.stroke}
            strokeWidth={model.id === "03" ? 0.8 : 0.75}
            opacity={boundaryStrength(value, model.id === "03" ? "modular" : "division")}
          />
        ))}
        {lines.y.map((value) => (
          <line
            key={`hy-${model.id}-${value}`}
            x1={pageX}
            y1={pageY + value}
            x2={pageX + pageW}
            y2={pageY + value}
            stroke={model.stroke}
            strokeWidth={model.id === "03" ? 0.8 : 0.75}
            opacity={boundaryStrength(value, model.id === "03" ? "modular" : "division")}
          />
        ))}
      </>
    ),
    [lines.x, lines.y, model.id, model.stroke],
  );

  return (
    <figure className="m-0 flex h-full flex-col gap-4 rounded-[28px] border border-[var(--color-border-strong)] bg-[rgba(252,250,245,0.66)] p-4 shadow-[0_18px_50px_rgba(32,39,51,0.08)] backdrop-blur-sm transition-transform duration-500 ease-out hover:-translate-y-1">
      <div>
        <svg
          viewBox="0 0 360 382"
          className="block h-auto w-full"
          role="img"
          aria-label={model.title}
        >
          <rect x={84} y={38} width={pageW} height={pageH} rx={2} fill="rgba(32,39,51,0.08)" />

          <rect
            x={pageX}
            y={pageY}
            width={pageW}
            height={pageH}
            rx={2}
            fill="var(--color-surface-raised)"
            stroke="var(--color-text)"
            strokeWidth="1.35"
          />

          {showConstruction && lineNodes}

          {showConstruction && model.id !== "03" && (
            <>
              <line
                x1={pageX}
                y1={pageY}
                x2={pageX + pageW}
                y2={pageY + pageH}
                stroke={model.stroke}
                strokeWidth="0.8"
                opacity="0.18"
              />
              <line
                x1={pageX + pageW}
                y1={pageY}
                x2={pageX}
                y2={pageY + pageH}
                stroke={model.stroke}
                strokeWidth="0.8"
                opacity="0.18"
              />
            </>
          )}

          <rect
            x={textX}
            y={textY}
            width={model.text.width}
            height={model.text.height}
            fill={model.fill}
            stroke={model.stroke}
            strokeWidth="1.35"
          />

          <DimH x1={pageX} x2={textX} y={leftDimY} label={formatMm(model.margins.left)} />
          <DimH x1={textX + model.text.width} x2={pageX + pageW} y={rightDimY} label={formatMm(model.margins.right)} />
          <DimV x={topGuideX} y1={pageY} y2={textY} label={formatMm(model.margins.top)} side="right" />
          <DimV x={bottomGuideX} y1={textY + model.text.height} y2={pageY + pageH} label={formatMm(model.margins.bottom)} side="center" />

          <text x={textX + 8} y={textY + 16} fontSize="7" fill={model.label} letterSpacing="0.12em">
            {model.id === "03" ? "SAMPLE TEXT BLOCK" : "TEXT BLOCK"}
          </text>
          <text x={textX + 8} y={textY + 29} fontSize="9" fill="var(--color-text)">
            {model.text.width} × {model.text.height} mm
          </text>
          <text x={pageX} y={pageY + pageH + 20} fontSize="8" fill="var(--color-text-muted)" letterSpacing="0.12em">
            A4 PAGE — 210 × 297 mm
          </text>
        </svg>
      </div>

      <figcaption className="flex flex-1 flex-col border-t border-[var(--color-border)] pt-4">
        <div className="mb-3 flex items-end justify-between gap-3 border-b border-[var(--color-border)] pb-3 max-sm:flex-col max-sm:items-start">
          <div>
            <p className="m-0 text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Model {model.id}
            </p>
            <h2
              className="mt-2 text-[clamp(1.22rem,2vw,1.48rem)] leading-[1.08] tracking-[-0.03em] text-[var(--color-text)]"
              style={{
                fontFamily: "var(--font-heading-family)",
                fontWeight: "var(--font-heading-weight)",
              }}
            >
              {model.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {model.short}
            </span>
            <span className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {model.type}
            </span>
          </div>
        </div>

        <p className="m-0 text-[14px] leading-[1.55] text-[var(--color-text-muted)]">
          {model.caption}
        </p>

        <p className="mt-3 text-[13px] leading-[1.55] text-[var(--color-text-muted)]">
          {model.constructionNote}
        </p>

        {model.note ? (
          <p className="mt-3 rounded-2xl border border-[var(--color-border)] bg-[rgba(252,250,245,0.76)] px-3 py-2 text-[12px] leading-[1.5] text-[var(--color-text-muted)]">
            {model.note}
          </p>
        ) : null}

        {model.id === "03" && (
          <div className="mt-4 flex flex-col gap-3 border-t border-[var(--color-border)] pt-4">
            <BandLegend bands={MODULAR_X_BANDS} axis="width bands" />
            <BandLegend bands={MODULAR_Y_BANDS} axis="height bands" />
            <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(252,250,245,0.76)] px-3 py-3 text-[12px] leading-[1.55] text-[var(--color-text-muted)]">
              Internal vertical lines: 17, 35, 52, 70, 87, 105, 122, 140, 157, 175, 192 mm
              <br />
              Internal horizontal lines: 17, 35, 52, 70, 87, 105, 122, 140, 157, 175, 192, 210, 227, 245, 262, 280 mm
            </div>
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default function TschicholdA4ComparisonPreview() {
  const [showConstruction, setShowConstruction] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text)]">
      <style>{`
        :root{
          --color-canvas:#f5f0e6;
          --color-surface:#fcfaf5;
          --color-surface-raised:rgba(255,255,255,0.84);
          --color-text:#202733;
          --color-text-muted:#4c596b;
          --color-border:rgba(32,39,51,0.12);
          --color-border-strong:rgba(32,39,51,0.18);
          --color-measure:rgba(76,89,107,0.82);
          --color-measure-stroke:rgba(76,89,107,0.18);
          --color-accent:#0f766e;
          --color-accent-soft:rgba(15,118,110,0.12);
          --swatch-2:#a16207;
          --font-heading-family: Georgia, serif;
          --font-heading-weight: 700;
          --font-editorial-family: Georgia, serif;
          --font-editorial-weight: 700;
        }

        @keyframes drift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-12px,0) scale(1.03); }
        }

        @keyframes gridPulse {
          0%,100% { opacity: .10; }
          50% { opacity: .18; }
        }
      `}</style>

      <div className="relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(15,118,110,0.12), transparent 35%),
              radial-gradient(circle at 86% 18%, rgba(161,98,7,0.12), transparent 32%),
              linear-gradient(180deg, var(--color-surface) 0%, var(--color-canvas) 100%)
            `,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            animation: "gridPulse 12s ease-in-out infinite",
            opacity: 0.15,
          }}
        />
        <div
          className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "rgba(15,118,110,0.16)",
            animation: "drift 18s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute -right-12 bottom-16 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "rgba(161,98,7,0.16)",
            animation: "drift 22s ease-in-out infinite reverse",
          }}
        />

        <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="border-y border-[var(--color-border)] py-6 lg:py-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-12">
              <div>
                <p className="m-0 text-[12px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                  Theme-token Swiss study
                </p>

                <h1
                  className="mt-3 max-w-[10ch] text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.05em] text-[var(--color-text)]"
                  style={{
                    fontFamily: "var(--font-editorial-family)",
                    fontWeight: "var(--font-editorial-weight)",
                  }}
                >
                  Three A4 layout fields rendered through your theme tokens
                </h1>

                <p className="mt-4 max-w-[40rem] text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.5] text-[var(--color-text-muted)]">
                  This preview uses semantic aliases for color, typography, borders, and spacing while keeping the diagrams proportional and the layout editorial.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowConstruction((value) => !value)}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.18em] transition ${
                      showConstruction
                        ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-surface)]"
                        : "border-[var(--color-border-strong)] bg-[rgba(252,250,245,0.74)] text-[var(--color-text-muted)]"
                    }`}
                  >
                    {showConstruction ? "Construction on" : "Construction off"}
                  </button>

                  <div className="flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-[2px] w-8 bg-[var(--color-text)]" />
                      page boundary
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-[2px] w-8 bg-[var(--color-text-muted)] opacity-40" />
                      construction field
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-3 w-8 rounded-full bg-[var(--color-accent-soft)] ring-1 ring-[var(--color-border)]" />
                      text block
                    </span>
                  </div>
                </div>

                <div className="mt-6 max-w-[40rem] border-t border-[var(--color-border)] pt-4">
                  <p
                    className="m-0 text-xl leading-tight text-[var(--color-text)]"
                    style={{
                      fontFamily: "var(--font-editorial-family)",
                      fontWeight: "var(--font-editorial-weight)",
                    }}
                  >
                    Classical canon: inner : top : outer : bottom = 2 : 3 : 4 : 6
                  </p>
                  <p className="mt-2 text-[14px] leading-7 text-[var(--color-text-muted)]">
                    The classical Tschichold-style canon is usually expressed as inner : top : outer : bottom = 2 : 3 : 4 : 6. This simplifies to 1 : 1.5 : 2 : 3. That exact proportion fits a 2:3 page best. A4 is 1:√2, so these A4 examples preserve the inner/outer and top/bottom doubling logic, but not the exact 2:3:4:6 margin ratio.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {MODELS.map((model) => (
                  <PageDiagram key={model.id} model={model} showConstruction={showConstruction} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="max-w-3xl">
              <p className="m-0 text-[12px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Comparison
              </p>
              <h2
                className="mt-2 text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.04em] text-[var(--color-text)]"
                style={{
                  fontFamily: "var(--font-heading-family)",
                  fontWeight: "var(--font-heading-weight)",
                }}
              >
                Two canon adaptations and one modular field
              </h2>
              <p className="mt-3 text-base leading-[1.5] text-[var(--color-text-muted)]">
                The third model is intentionally not a canon reconstruction. It is a full-page modular A4 field that can host text blocks, logos, cards, and aligned compositional modules.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto border-t border-[var(--color-border)] pt-3">
              <table className="w-full min-w-[1120px] table-fixed border-collapse">
                <colgroup>
                  <col style={{ width: "23%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "22%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "16%" }} />
                </colgroup>

                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    {[
                      "Model",
                      "Page size",
                      "Margins / field",
                      "Text area",
                      "Exact 2:3:4:6?",
                      "Normalized ratio",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-0 py-4 pr-4 text-left text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {MODELS.map((model) => (
                    <tr key={`row-${model.id}`} className="border-b border-[var(--color-border)] align-top last:border-b-0">
                      <td className="px-0 py-4 pr-4 text-[1rem] leading-[1.5] text-[var(--color-text-muted)]">
                        <strong
                          className="block text-[1.05rem] leading-5 text-[var(--color-text)]"
                          style={{
                            fontFamily: "var(--font-heading-family)",
                            fontWeight: "var(--font-heading-weight)",
                          }}
                        >
                          {model.title}
                        </strong>
                        <span className="inline-block text-[0.78rem] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                          {model.type}
                        </span>
                      </td>

                      <td className="px-0 py-4 pr-4 text-[1rem] leading-[1.5] text-[var(--color-text-muted)]">
                        210 × 297 mm
                      </td>

                      <td className="px-0 py-4 pr-4 text-[1rem] leading-[1.5] text-[var(--color-text-muted)]">
                        {model.id === "03"
                          ? "17 / 18 alternating bands across the full page; sample margins 35 / 35 / 35 / 52 mm"
                          : `${formatMm(model.margins.left)} / ${formatMm(model.margins.top)} / ${formatMm(model.margins.right)} / ${formatMm(model.margins.bottom)}`}
                      </td>

                      <td className="px-0 py-4 pr-4 text-[1rem] leading-[1.5] text-[var(--color-text-muted)]">
                        {model.text.width} × {model.text.height} mm
                      </td>

                      <td className="px-0 py-4 pr-4 text-[1rem] leading-[1.5] text-[var(--color-text-muted)]">
                        {model.exactCanon}
                      </td>

                      <td className="px-0 py-4 pr-4 text-[1rem] leading-[1.5] text-[var(--color-text-muted)]">
                        {model.normalized}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="rounded-[24px] border border-[var(--color-border)] bg-[rgba(252,250,245,0.7)] p-4">
                <p className="m-0 text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Third model classification
                </p>
                <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-text-muted)]">
                  Type: modular field.
                  <br />
                  Not a classical Tschichold canon.
                  <br />
                  Exact 2:3:4:6? No.
                </p>
              </div>

              <div className="rounded-[24px] border border-[var(--color-border)] bg-[rgba(252,250,245,0.7)] p-4">
                <p className="m-0 text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Footer note
                </p>
                <p className="mt-3 text-[14px] leading-[1.65] text-[var(--color-text-muted)]">
                  The alternating 17 / 18 field is useful when page construction needs to coordinate with repeated module sizes such as cards, logos, badges, or label systems. In that case the page becomes a modular substrate first, and the text block becomes one aligned occupant within it rather than the source of the construction itself.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}