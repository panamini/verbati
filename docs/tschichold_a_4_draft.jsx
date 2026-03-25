const MODELS = [
  {
    id: "01",
    title: "A4 9-Division Adaptation",
    divisions: "9-division model",
    margins: { left: 23.3, top: 33, right: 46.7, bottom: 66 },
    text: { width: 140, height: 198 },
    normalized: "1 : 1.414 : 2 : 2.828",
    stroke: "var(--color-accent)",
    fill: "var(--color-accent-soft)",
    label: "var(--color-accent)",
    caption:
      "A more generous outer and lower margin preserves the classical directional weight while fitting the A4 sheet.",
  },
  {
    id: "02",
    title: "A4 12-Division Adaptation",
    divisions: "12-division model",
    margins: { left: 17.5, top: 24.75, right: 35, bottom: 49.5 },
    text: { width: 157.5, height: 222.75 },
    normalized: "1 : 1.414 : 2 : 2.828",
    stroke: "var(--swatch-2)",
    fill: "rgba(161, 98, 7, 0.14)",
    label: "var(--swatch-2)",
    caption:
      "A denser interpretation with a larger text area, still following the same A4-adapted proportional sequence.",
  },
];

function formatMm(value) {
  return `${value}`.replace(/\.0$/, "") + " mm";
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

function PageDiagram({ model }) {
  const pageX = 74;
  const pageY = 28;
  const pageW = 210;
  const pageH = 297;

  const textX = pageX + model.margins.left;
  const textY = pageY + model.margins.top;
  const sideGuideY = textY + model.text.height * 0.5;
  const leftDimY = sideGuideY - 12;
  const rightDimY = sideGuideY + 12;
  const topGuideX = textX + model.text.width * 0.2;
  const bottomGuideX = textX + model.text.width * 0.8;

  return (
    <figure className="m-0 flex flex-col gap-4 rounded-[28px] border border-[var(--color-border-strong)] bg-[rgba(252,250,245,0.66)] p-4 shadow-[0_18px_50px_rgba(32,39,51,0.08)] backdrop-blur-sm transition-transform duration-500 ease-out hover:-translate-y-1">
      <div>
        <svg
          viewBox="0 0 360 372"
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
            TEXT BLOCK
          </text>
          <text x={textX + 8} y={textY + 29} fontSize="9" fill="var(--color-text)">
            {model.text.width} × {model.text.height} mm
          </text>
          <text x={pageX} y={pageY + pageH + 20} fontSize="8" fill="var(--color-text-muted)" letterSpacing="0.12em">
            A4 PAGE — 210 × 297 mm
          </text>
        </svg>
      </div>

      <figcaption className="border-t border-[var(--color-border)] pt-4">
        <div className="mb-3 flex items-end justify-between gap-3 border-b border-[var(--color-border)] pb-3 max-sm:flex-col max-sm:items-start">
          <div>
            <p className="m-0 text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Model {model.id}
            </p>
            <h2
              className="mt-2 text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.08] tracking-[-0.03em] text-[var(--color-text)]"
              style={{
                fontFamily: "var(--font-heading-family)",
                fontWeight: "var(--font-heading-weight)",
              }}
            >
              {model.title}
            </h2>
          </div>

          <p className="m-0 text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {model.divisions}
          </p>
        </div>

        <p className="m-0 text-[14px] leading-[1.5] text-[var(--color-text-muted)]">
          {model.caption}
        </p>
      </figcaption>
    </figure>
  );
}

export default function TschicholdA4ComparisonPreview() {
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
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
                  Two A4 adaptations rendered through your theme tokens
                </h1>

                <p className="mt-4 max-w-[40rem] text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.5] text-[var(--color-text-muted)]">
                  This preview uses semantic aliases for color, typography, borders, and spacing while keeping the diagrams proportional and the layout editorial.
                </p>

                <div className="mt-6 max-w-[40rem] border-t border-[var(--color-border)] pt-4">
                  <p
                    className="m-0 text-xl leading-tight text-[var(--color-text)]"
                    style={{
                      fontFamily: "var(--font-editorial-family)",
                      fontWeight: "var(--font-editorial-weight)",
                    }}
                  >
                    Classical canon: 2 : 3 : 4 : 6
                  </p>
                  <p className="mt-2 text-[14px] leading-7 text-[var(--color-text-muted)]">
                    These A4 versions are adaptations, not exact canon. The historical construction assumes a 2:3 page proportion, while A4 is 1:√2.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {MODELS.map((model) => (
                  <PageDiagram key={model.id} model={model} />
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
                Same adapted sequence, different text-area density
              </h2>
              <p className="mt-3 text-base leading-[1.5] text-[var(--color-text-muted)]">
                The table below uses stronger contrast and fixed column widths so nothing disappears.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto border-t border-[var(--color-border)] pt-3">
              <table className="w-full min-w-[980px] table-fixed border-collapse">
                <colgroup>
                  <col style={{ width: "24%" }} />
                  <col style={{ width: "17%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "28%" }} />
                </colgroup>

                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    {[
                      "Model",
                      "Margins (L / T / R / B)",
                      "Text area",
                      "Normalized ratio",
                      "Reading character",
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
                  <tr className="border-b border-[var(--color-border)] align-top">
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      <strong
                        className="block text-[1.05rem] leading-5 text-[var(--color-text)]"
                        style={{
                          fontFamily: "var(--font-heading-family)",
                          fontWeight: "var(--font-heading-weight)",
                        }}
                      >
                        A4 9-Division Adaptation
                      </strong>
                      <span className="inline-block text-[0.78rem] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                        9-division model
                      </span>
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      23.3 / 33 / 46.7 / 66 mm
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      140 × 198 mm
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      1 : 1.414 : 2 : 2.828
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      More spacious, with stronger ceremonial whitespace and a smaller block.
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--color-border)] align-top">
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      <strong
                        className="block text-[1.05rem] leading-5 text-[var(--color-text)]"
                        style={{
                          fontFamily: "var(--font-heading-family)",
                          fontWeight: "var(--font-heading-weight)",
                        }}
                      >
                        A4 12-Division Adaptation
                      </strong>
                      <span className="inline-block text-[0.78rem] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                        12-division model
                      </span>
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      17.5 / 24.75 / 35 / 49.5 mm
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      157.5 × 222.75 mm
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      1 : 1.414 : 2 : 2.828
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      More compact, with higher page efficiency and a broader working measure.
                    </td>
                  </tr>

                  <tr className="align-top">
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      <strong
                        className="block text-[1.05rem] leading-5 text-[var(--color-text)]"
                        style={{
                          fontFamily: "var(--font-heading-family)",
                          fontWeight: "var(--font-heading-weight)",
                        }}
                      >
                        Classical canon
                      </strong>
                      <span className="inline-block text-[0.78rem] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                        historical reference
                      </span>
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      2 / 3 / 4 / 6
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      Built for a 2:3 page rather than ISO A-series paper.
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      2 : 3 : 4 : 6
                    </td>
                    <td className="px-0 py-4 pr-4 text-[1.02rem] leading-[1.5] text-[var(--color-text-muted)]">
                      Useful as a proportional reference, but not directly transferable to A4 without adaptation.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
