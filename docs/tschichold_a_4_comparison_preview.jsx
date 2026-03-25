import { useState } from "react";

const PAGE = { width: 210, height: 297 };

function buildAlternatingBands(total, first = 17, second = 18) {
  const bands = [];
  const lines = [];
  let offset = 0;
  let useFirst = true;

  while (offset < total - 0.001) {
    const size = useFirst ? first : second;
    const clamped = Math.min(size, total - offset);
    bands.push({ start: offset, size: clamped, end: offset + clamped });
    offset += clamped;
    if (offset < total - 0.001) lines.push(Number(offset.toFixed(3)));
    useFirst = !useFirst;
  }

  return { bands, lines };
}

function buildUniformLines(total, divisions) {
  return Array.from({ length: divisions - 1 }, (_, index) => Number((((index + 1) * total) / divisions).toFixed(3)));
}

const ROBIAL_X = buildAlternatingBands(PAGE.width, 17, 18);
const ROBIAL_Y = buildAlternatingBands(PAGE.height, 17, 18);

const LEGEND = [
  { id: "page", label: "Page boundary", stroke: "var(--color-text)", width: 1.5 },
  { id: "construction", label: "Construction field", stroke: "var(--color-construction)", width: 0.7 },
  { id: "text", label: "Text block", stroke: "var(--color-accent)", width: 1.2 },
];

const MODELS = [
  {
    id: "01",
    title: "A4 9-Division Adaptation",
    divisions: "9-division model",
    type: "canon adaptation",
    margins: { left: 23.3, top: 33, right: 46.7, bottom: 66 },
    text: { width: 140, height: 198 },
    normalized: "1 : 1.414 : 2 : 2.828",
    exactCanon: "No",
    stroke: "var(--color-accent)",
    fill: "var(--color-accent-soft)",
    label: "var(--color-accent)",
    tableMargins: "23.3 / 33 / 46.7 / 66 mm",
    tableText: "140 × 198 mm",
    reading:
      "More spacious, with stronger ceremonial whitespace and a smaller block.",
    caption:
      "A more generous outer and lower margin preserves the classical directional weight while fitting the A4 sheet.",
    note:
      "The adapted A4 sequence preserves the inner/outer and top/bottom doubling logic, rather than the exact historical 2:3:4:6 proportion.",
    construction: {
      kind: "uniform",
      xLines: buildUniformLines(PAGE.width, 9),
      yLines: buildUniformLines(PAGE.height, 9),
    },
  },
  {
    id: "02",
    title: "A4 12-Division Adaptation",
    divisions: "12-division model",
    type: "canon adaptation",
    margins: { left: 17.5, top: 24.75, right: 35, bottom: 49.5 },
    text: { width: 157.5, height: 222.75 },
    normalized: "1 : 1.414 : 2 : 2.828",
    exactCanon: "No",
    stroke: "var(--swatch-2)",
    fill: "rgba(161, 98, 7, 0.14)",
    label: "var(--swatch-2)",
    tableMargins: "17.5 / 24.75 / 35 / 49.5 mm",
    tableText: "157.5 × 222.75 mm",
    reading:
      "More compact, with higher page efficiency and a broader working measure.",
    caption:
      "A denser interpretation with a larger text area, still following the same A4-adapted proportional sequence.",
    note:
      "This version increases text-area density while keeping the same adapted proportional logic for A4 rather than reverting to a literal historical canon.",
    construction: {
      kind: "uniform",
      xLines: buildUniformLines(PAGE.width, 12),
      yLines: buildUniformLines(PAGE.height, 12),
    },
  },
  {
    id: "03",
    title: "A4 Alternating 17/18 Module Field",
    divisions: "modular field",
    type: "modular field",
    margins: { left: 35, top: 35, right: 35, bottom: 52 },
    text: { width: 140, height: 210 },
    normalized: "17 / 18 alternating bands",
    exactCanon: "No",
    stroke: "var(--color-robial)",
    fill: "rgba(127, 29, 29, 0.12)",
    label: "var(--color-robial)",
    tableMargins: "Sample: 35 / 35 / 35 / 52 mm",
    tableText: "Sample: 140 × 210 mm",
    reading:
      "Grid-first full-page field; the text block is placed within it rather than generating it.",
    caption:
      "A full-page A4 modular field built by repeating 17 mm and 18 mm bands horizontally and vertically.",
    note:
      "The full A4 page is partitioned into alternating 17 mm and 18 mm bands in both directions. Across the width this produces 12 vertical bands; down the height it produces 17 horizontal bands, ending with a final 17 mm band.",
    construction: {
      kind: "alternating",
      xBands: ROBIAL_X.bands,
      yBands: ROBIAL_Y.bands,
      xLines: ROBIAL_X.lines,
      yLines: ROBIAL_Y.lines,
      xSequence: "17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18",
      ySequence:
        "17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17, 18, 17",
      cellTypes: ["17 × 17 mm", "17 × 18 mm", "18 × 17 mm", "18 × 18 mm"],
      xLabel: "12 vertical bands",
      yLabel: "17 horizontal bands",
    },
  },
];

const TABLE_ROWS = [
  {
    model: "A4 9-Division Adaptation",
    type: "canon adaptation",
    margins: "23.3 / 33 / 46.7 / 66 mm",
    text: "140 × 198 mm",
    normalized: "1 : 1.414 : 2 : 2.828",
    exact: "No",
    reading: "More spacious, with stronger ceremonial whitespace and a smaller block.",
  },
  {
    model: "A4 12-Division Adaptation",
    type: "canon adaptation",
    margins: "17.5 / 24.75 / 35 / 49.5 mm",
    text: "157.5 × 222.75 mm",
    normalized: "1 : 1.414 : 2 : 2.828",
    exact: "No",
    reading: "More compact, with higher page efficiency and a broader working measure.",
  },
  {
    model: "A4 Alternating 17/18 Module Field",
    type: "modular field",
    margins: "Sample: 35 / 35 / 35 / 52 mm",
    text: "Sample: 140 × 210 mm",
    normalized: "17 / 18 alternating bands",
    exact: "No",
    reading: "Full-page field first; text block shown only as one possible aligned placement.",
  },
  {
    model: "Classical canon",
    type: "historical reference",
    margins: "2 / 3 / 4 / 6",
    text: "Built for a 2:3 page rather than ISO A-series paper.",
    normalized: "2 : 3 : 4 : 6",
    exact: "Yes, on 2:3 pages",
    reading: "Useful as a proportional reference, but not directly transferable to A4 without adaptation.",
  },
];

function formatMm(value) {
  return `${value}`.replace(/\.0$/, "") + " mm";
}

function isPairBoundary(value) {
  return Math.abs(value % 35) < 0.001;
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
        fill="rgba(252,250,245,0.92)"
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
  const badgeX = side === "center" ? x : side === "right" ? x + 10 : x - badgeW - 10;
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

function ConstructionOverlay({ model, pageX, pageY, pageW, pageH, visible }) {
  if (!visible) return null;

  if (model.construction.kind === "uniform") {
    return (
      <g>
        {model.construction.xLines.map((line) => (
          <line
            key={`${model.id}-vx-${line}`}
            x1={pageX + line}
            y1={pageY}
            x2={pageX + line}
            y2={pageY + pageH}
            stroke="var(--color-construction)"
            strokeWidth="0.6"
            opacity="0.72"
          />
        ))}
        {model.construction.yLines.map((line) => (
          <line
            key={`${model.id}-hy-${line}`}
            x1={pageX}
            y1={pageY + line}
            x2={pageX + pageW}
            y2={pageY + line}
            stroke="var(--color-construction)"
            strokeWidth="0.6"
            opacity="0.72"
          />
        ))}
      </g>
    );
  }

  return (
    <g>
      {model.construction.xBands.map((band, index) => (
        <rect
          key={`${model.id}-xband-${index}`}
          x={pageX + band.start}
          y={pageY}
          width={band.size}
          height={pageH}
          fill={index % 2 === 0 ? "rgba(32,39,51,0.018)" : "transparent"}
        />
      ))}
      {model.construction.yBands.map((band, index) => (
        <rect
          key={`${model.id}-yband-${index}`}
          x={pageX}
          y={pageY + band.start}
          width={pageW}
          height={band.size}
          fill={index % 2 === 0 ? "rgba(32,39,51,0.012)" : "transparent"}
        />
      ))}
      {model.construction.xLines.map((line) => (
        <line
          key={`${model.id}-vx-${line}`}
          x1={pageX + line}
          y1={pageY}
          x2={pageX + line}
          y2={pageY + pageH}
          stroke="var(--color-construction)"
          strokeWidth={isPairBoundary(line) ? 0.85 : 0.55}
          opacity={isPairBoundary(line) ? 0.9 : 0.62}
        />
      ))}
      {model.construction.yLines.map((line) => (
        <line
          key={`${model.id}-hy-${line}`}
          x1={pageX}
          y1={pageY + line}
          x2={pageX + pageW}
          y2={pageY + line}
          stroke="var(--color-construction)"
          strokeWidth={isPairBoundary(line) ? 0.85 : 0.55}
          opacity={isPairBoundary(line) ? 0.9 : 0.62}
        />
      ))}
    </g>
  );
}

function FactGrid({ model }) {
  const facts = [
    ["Type", model.type],
    ["Page", "210 × 297 mm"],
    ["Normalized", model.normalized],
    ["Exact 2:3:4:6?", model.exactCanon],
  ];

  return (
    <dl className="grid gap-3 border-t border-[var(--color-border)] pt-4 sm:grid-cols-2">
      {facts.map(([label, value]) => (
        <div key={`${model.id}-${label}`}>
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">{label}</dt>
          <dd className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function PageDiagram({ model, showConstruction }) {
  const pageX = 82;
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
  const labelTone = model.id === "03" ? "SAMPLE TEXT BLOCK" : "TEXT BLOCK";

  return (
    <figure className="m-0 flex h-full flex-col gap-4 rounded-[28px] border border-[var(--color-border-strong)] bg-[rgba(252,250,245,0.66)] p-4 shadow-[0_18px_50px_rgba(32,39,51,0.08)] backdrop-blur-sm transition-transform duration-500 ease-out hover:-translate-y-1">
      <div>
        <svg viewBox="0 0 392 382" className="block h-auto w-full" role="img" aria-label={model.title}>
          <rect x={94} y={38} width={pageW} height={pageH} rx={2} fill="rgba(32,39,51,0.08)" />
          <rect
            x={pageX}
            y={pageY}
            width={pageW}
            height={pageH}
            rx={2}
            fill="var(--color-surface-raised)"
            stroke="var(--color-text)"
            strokeWidth="1.45"
          />

          <ConstructionOverlay model={model} pageX={pageX} pageY={pageY} pageW={pageW} pageH={pageH} visible={showConstruction} />

          <rect
            x={textX}
            y={textY}
            width={model.text.width}
            height={model.text.height}
            fill={model.fill}
            stroke={model.stroke}
            strokeWidth={model.id === "03" ? 1.5 : 1.35}
          />

          <DimH x1={pageX} x2={textX} y={leftDimY} label={formatMm(model.margins.left)} />
          <DimH x1={textX + model.text.width} x2={pageX + pageW} y={rightDimY} label={formatMm(model.margins.right)} />
          <DimV x={topGuideX} y1={pageY} y2={textY} label={formatMm(model.margins.top)} side="right" />
          <DimV x={bottomGuideX} y1={textY + model.text.height} y2={pageY + pageH} label={formatMm(model.margins.bottom)} side="center" />

          {model.id === "03" && showConstruction ? (
            <text x={pageX + 10} y={pageY + 15} fontSize="6.5" fill="var(--color-text-muted)" letterSpacing="0.12em">
              FULL-PAGE MODULAR FIELD
            </text>
          ) : null}

          <text x={textX + 8} y={textY + 16} fontSize="7" fill={model.label} letterSpacing="0.12em">
            {labelTone}
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
            <p className="m-0 text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">Model {model.id}</p>
            <h2
              className="mt-2 text-[clamp(1.2rem,2vw,1.46rem)] leading-[1.08] tracking-[-0.03em] text-[var(--color-text)]"
              style={{
                fontFamily: "var(--font-heading-family)",
                fontWeight: "var(--font-heading-weight)",
              }}
            >
              {model.title}
            </h2>
          </div>

          <p className="m-0 text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">{model.divisions}</p>
        </div>

        <p className="m-0 text-[14px] leading-[1.5] text-[var(--color-text-muted)]">{model.caption}</p>

        <div className="mt-4 rounded-[18px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.38)] p-3">
          <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Construction note</p>
          <p className="mt-2 text-[13px] leading-[1.5] text-[var(--color-text-muted)]">{model.note}</p>
          {model.id === "03" ? (
            <div className="mt-3 grid gap-3 border-t border-[var(--color-border)] pt-3">
              <div>
                <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Horizontal sequence</p>
                <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text)]">{model.construction.xSequence}</p>
              </div>
              <div>
                <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Vertical sequence</p>
                <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text)]">{model.construction.ySequence}</p>
              </div>
              <div>
                <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Cell types</p>
                <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text)]">{model.construction.cellTypes.join(" · ")}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <FactGrid model={model} />
        </div>
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
          --color-construction:rgba(76,89,107,0.42);
          --color-accent:#0f766e;
          --color-accent-soft:rgba(15,118,110,0.12);
          --swatch-2:#a16207;
          --color-robial:#7f1d1d;
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1.34fr)] lg:gap-12">
              <div>
                <p className="m-0 text-[12px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">Theme-token Swiss study</p>

                <h1
                  className="mt-3 max-w-[11ch] text-[clamp(3rem,7vw,5.8rem)] leading-[0.92] tracking-[-0.05em] text-[var(--color-text)]"
                  style={{
                    fontFamily: "var(--font-editorial-family)",
                    fontWeight: "var(--font-editorial-weight)",
                  }}
                >
                  Three A4 constructions rendered through your theme tokens
                </h1>

                <p className="mt-4 max-w-[42rem] text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.5] text-[var(--color-text-muted)]">
                  This version keeps the two A4 canon adaptations and adds an Etienne Robial modular-field preview, using the same warm-paper gradients, animated atmosphere, and editorial page language.
                </p>

                <div className="mt-6 rounded-[22px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.38)] p-4">
                  <p
                    className="m-0 text-xl leading-tight text-[var(--color-text)]"
                    style={{
                      fontFamily: "var(--font-editorial-family)",
                      fontWeight: "var(--font-editorial-weight)",
                    }}
                  >
                    Canon note: 2 : 3 : 4 : 6 → 1 : 1.5 : 2 : 3
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.5] text-[var(--color-text-muted)]">
                    The classical Tschichold-style canon is usually expressed as inner : top : outer : bottom = 2 : 3 : 4 : 6. This simplifies to 1 : 1.5 : 2 : 3. That exact proportion fits a 2:3 page best. A4 is 1:√2, so these A4 examples preserve the inner/outer and top/bottom doubling logic, but not the exact 2:3:4:6 margin ratio.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-4">
                  <button
                    type="button"
                    onClick={() => setShowConstruction((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[rgba(252,250,245,0.88)] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-[var(--color-text)] transition hover:-translate-y-[1px]"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: showConstruction ? "var(--color-accent)" : "rgba(76,89,107,0.28)" }}
                    />
                    {showConstruction ? "Construction on" : "Construction off"}
                  </button>

                  <div className="flex flex-wrap items-center gap-3">
                    {LEGEND.map((item) => (
                      <div key={item.id} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        <svg width="28" height="10" viewBox="0 0 28 10" aria-hidden="true">
                          <line x1="1" y1="5" x2="27" y2="5" stroke={item.stroke} strokeWidth={item.width} />
                        </svg>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
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
            <div className="max-w-4xl">
              <p className="m-0 text-[12px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">Comparison</p>
              <h2
                className="mt-2 text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.04em] text-[var(--color-text)]"
                style={{
                  fontFamily: "var(--font-heading-family)",
                  fontWeight: "var(--font-heading-weight)",
                }}
              >
                Two canon adaptations and one full-page modular field
              </h2>
              <p className="mt-3 text-base leading-[1.5] text-[var(--color-text-muted)]">
                The third format is grid-first: its sample text rectangle is aligned inside the field, but the full-page modular schema is the primary construction.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto border-t border-[var(--color-border)] pt-3">
              <table className="w-full min-w-[1180px] table-fixed border-collapse">
                <colgroup>
                  <col style={{ width: "19%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "14%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "9%" }} />
                  <col style={{ width: "22%" }} />
                </colgroup>
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    {[
                      "Model",
                      "Type",
                      "Margins / field",
                      "Text area",
                      "Normalized ratio",
                      "Exact 2:3:4:6?",
                      "Reading character",
                    ].map((heading) => (
                      <th key={heading} className="px-0 py-4 pr-4 text-left text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((row) => (
                    <tr key={row.model} className="border-b border-[var(--color-border)] align-top last:border-b-0">
                      <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                        <strong
                          className="block text-[1.05rem] leading-5 text-[var(--color-text)]"
                          style={{
                            fontFamily: "var(--font-heading-family)",
                            fontWeight: "var(--font-heading-weight)",
                          }}
                        >
                          {row.model}
                        </strong>
                      </td>
                      <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">{row.type}</td>
                      <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">{row.margins}</td>
                      <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">{row.text}</td>
                      <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">{row.normalized}</td>
                      <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">{row.exact}</td>
                      <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">{row.reading}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-t border-[var(--color-border)] py-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8">
              <div>
                <p className="m-0 text-[12px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">Footer note</p>
                <h3
                  className="mt-2 text-[clamp(1.6rem,2.2vw,2rem)] leading-[1.02] tracking-[-0.03em] text-[var(--color-text)]"
                  style={{
                    fontFamily: "var(--font-heading-family)",
                    fontWeight: "var(--font-heading-weight)",
                  }}
                >
                  A4 can host both adapted canon logic and full-page modular logic
                </h3>
              </div>
              <div className="space-y-3 text-[14px] leading-[1.5] text-[var(--color-text-muted)]">
                <p className="m-0">
                  The first two diagrams are A4 reinterpretations of a Tschichold-style margin logic. They preserve directional weight and doubling relationships, but not the exact historical proportion of a 2:3 page.
                </p>
                <p className="m-0">
                  The third diagram is a full-page modular field associated here with Etienne Robial: the grid comes first, the page is partitioned into alternating 17 mm and 18 mm bands, and the text block shown inside it is only a sample aligned placement rather than a canonical source construction.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
