Voici une version propre en **spec de mise en page**, qui explique les **deux systèmes**, leur construction, les marges, les divisions et leur usage.

---

# A4 Layout Specification

## Van de Graaf Adapted Canons + Robial 17/18 Modular Grid

## 1. Scope

This specification defines two A4 layout systems:

1. **Van de Graaf adapted to A4**, in two variants:

   * **Canon 12**
   * **Canon 9**

2. **Robial 17/18 modular grid**, intended as a more modern editorial or résumé grid.

Page format for all systems:

* **Page size:** A4
* **Width:** 210 mm
* **Height:** 297 mm

---

# 2. System A — Van de Graaf adapted to A4

## 2.1 Principle

This system adapts the classical Van de Graaf page logic to A4 using a simple proportional rule:

* **inner margin = 1 division**
* **top margin = 1 division**
* **outer margin = 2 divisions**
* **bottom margin = 2 divisions**

This preserves the classical asymmetry:

* smaller inner and top margins
* larger outer and bottom margins

The result is a page that feels balanced, bookish, and typographically stable.

---

## 2.2 Canon 12 — A4 adaptation

### Construction logic

A4 divided into **12 units**:

* **210 / 12 = 17.5 mm**
* **297 / 12 = 24.75 mm**

So the page module is:

* **horizontal division:** 17.5 mm
* **vertical division:** 24.75 mm

### Margins

Using the Van de Graaf ratio:

* **left / inner:** 1 × 17.5 = **17.5 mm**
* **top:** 1 × 24.75 = **24.75 mm**
* **right / outer:** 2 × 17.5 = **35 mm**
* **bottom:** 2 × 24.75 = **49.5 mm**

### Live area

* **width:** 210 − 17.5 − 35 = **157.5 mm**
* **height:** 297 − 24.75 − 49.5 = **222.75 mm**

### Canon 12 spec

```js
{
  page: { width: "210mm", height: "297mm" },
  grid: { columns: 12, rows: 12 },
  division: { x: "17.5mm", y: "24.75mm" },
  margins: {
    top: "24.75mm",
    right: "35mm",
    bottom: "49.5mm",
    left: "17.5mm"
  },
  liveArea: {
    width: "157.5mm",
    height: "222.75mm"
  }
}
```

### Recommended usage

Canon 12 is the more practical version for dense documents such as:

* résumé / CV
* structured editorial pages
* reports
* information-heavy layouts

It gives:

* more usable space
* better density
* easier page exploitation

---

## 2.3 Canon 9 — A4 adaptation

### Construction logic

A4 divided into **9 units**:

* **210 / 9 = 23.333... mm**
* **297 / 9 = 33 mm**

So the page module is:

* **horizontal division:** 23.333 mm
* **vertical division:** 33 mm

### Margins

Same Van de Graaf logic:

* **left / inner:** 1 × 23.333 = **23.333 mm**
* **top:** 1 × 33 = **33 mm**
* **right / outer:** 2 × 23.333 = **46.667 mm**
* **bottom:** 2 × 33 = **66 mm**

Rounded production values:

* **left:** 23.3 mm
* **top:** 33 mm
* **right:** 46.7 mm
* **bottom:** 66 mm

### Live area

* **width:** 210 − 23.333 − 46.667 = **140 mm**
* **height:** 297 − 33 − 66 = **198 mm**

### Canon 9 spec

```js
{
  page: { width: "210mm", height: "297mm" },
  grid: { columns: 9, rows: 9 },
  division: { x: "23.333mm", y: "33mm" },
  margins: {
    top: "33mm",
    right: "46.7mm",
    bottom: "66mm",
    left: "23.3mm"
  },
  liveArea: {
    width: "140mm",
    height: "198mm"
  }
}
```

### Recommended usage

Canon 9 is more generous and more spacious. It feels:

* more noble
* more breathable
* more editorial
* more luxurious

But it is also less dense, so it is less efficient for documents that need a lot of content.

Best suited for:

* premium editorial layouts
* cover pages
* portfolios
* minimalist typography-led documents

---

## 2.4 Summary of Van de Graaf A4 values

### Canon 12

* **left:** 17.5 mm
* **top:** 24.75 mm
* **right:** 35 mm
* **bottom:** 49.5 mm
* **live area:** 157.5 × 222.75 mm

### Canon 9

* **left:** 23.3 mm
* **top:** 33 mm
* **right:** 46.7 mm
* **bottom:** 66 mm
* **live area:** 140 × 198 mm

### Interpretation

Both are valid A4 adaptations of the Van de Graaf spirit.

* Choose **Canon 9** for a more classical, spacious, luxurious page
* Choose **Canon 12** for a more usable and efficient working page, especially for a real résumé

---

# 3. System B — Robial 17/18 modular grid

## 3.1 Principle

This system is not a classical canon. It is a **modular editorial grid** based on an alternating rhythm:

* **17 mm**
* **18 mm**
* **17 mm**
* **18 mm**
* etc.

The alternation runs in **both directions**:

* horizontally
* vertically

This creates a grid that is:

* more dynamic than a uniform square grid
* less rigid than a strict classical canon
* well suited to modern editorial design
* very strong for résumé and portfolio layouts

---

## 3.2 Base rule

Use a full-page modular sequence:

* **width rhythm:** 17, 18, 17, 18, 17, 18...
* **height rhythm:** 17, 18, 17, 18, 17, 18...

This creates a stable top-left origin:

* first cell = **17 × 17**
* then the rhythm expands consistently across and down

That makes alignment easier and preserves a visible but flexible structure.

---

## 3.3 Recommended résumé configuration

### Margins

Recommended margins:

* **top:** 17 mm
* **left:** 17 mm
* **right:** 35 mm
* **bottom:** 35 mm

### Page zoning

Recommended page structure:

* **header:** full width
* **body:** 2-column asymmetric layout
* **sidebar:** 35 mm
* **gutter:** 18 mm
* **main column:** 105 mm

### Spec

```js
{
  page: { width: "210mm", height: "297mm" },
  grid: {
    type: "alternating-modular",
    stepX: ["17mm", "18mm"],
    stepY: ["17mm", "18mm"]
  },
  margins: {
    top: "17mm",
    right: "35mm",
    bottom: "35mm",
    left: "17mm"
  },
  layout: {
    header: "full-width",
    body: "2-column asymmetric",
    sidebar: "35mm",
    gutter: "18mm",
    main: "105mm"
  }
}
```

---

## 3.4 Reference line positions

Because of the alternating rhythm, the cumulative positions become very easy to reason with.

### Horizontal positions

* 17
* 35
* 52
* 70
* 87
* 105
* 122
* 140
* 157
* 175
* 192

### Vertical positions

* 17
* 35
* 52
* 70
* 87
* 105
* 122
* 140
* 157
* 175
* 192
* 210
* 227
* 245
* 262
* 280

These coordinates are useful for:

* column breaks
* baseline blocks
* image anchoring
* sidebar sizing
* repeatable vertical rhythm

---

## 3.5 Why this system is strong

The 17/18 modular system is a very strong A4 grid because:

* it fits A4 cleanly
* it creates a fine rhythm without becoming too granular
* it avoids the stiffness of a perfectly uniform grid
* it works for both text-led and image-led layouts
* it creates repeatable structure without forcing a classical page canon

In practice, it is one of the best modern starting points for:

* resumes
* editorial pages
* structured portfolios
* visual systems needing both rigor and flexibility

---

# 4. Choosing between the two systems

## Use Van de Graaf adapted canons when you want:

* classical page logic
* typographic authority
* book-like proportions
* margin hierarchy based on historical composition

### Best choice inside this family

* **Canon 9** = more luxurious, more spacious
* **Canon 12** = more practical, more efficient

## Use Robial 17/18 when you want:

* a modern modular layout
* flexible subdivision
* easier multi-column construction
* better support for résumé and editorial hybrid layouts

---

# 5. Final recommendation

For a real résumé on A4:

* **best classical option:** Canon 12
* **best modern modular option:** Robial 17/18

In other words:

* choose **Canon 12** if you want a page that still feels rooted in classical proportion
* choose **Robial 17/18** if you want the strongest contemporary working grid

---

# 6. Ultra-direct values

## Canon 12

* left: **17.5**
* top: **24.75**
* right: **35**
* bottom: **49.5**

## Canon 9

* left: **23.3**
* top: **33**
* right: **46.7**
* bottom: **66**

## Robial 17/18 résumé setup

* left: **17**
* top: **17**
* right: **35**
* bottom: **35**
* sidebar: **35**
* gutter: **18**
* main: **105**

---

Je peux aussi te transformer ça en **spec ultra propre en anglais pour designers/developers**, ou en **version JSON / CSS tokens / design system doc**.
