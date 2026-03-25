# Tschichold 


## 1) Proportions mentioned in the article

### A. Paper and folding proportions (**height : width**)

| Item | Ratio | Notes |
|---|---:|---|
| Common factory paper (earlier times) | 3 : 4 | Starting sheet proportion |
| Same sheet after one fold | 2 : 3 | Folio result when starting from 3 : 4 |
| Same sheet after another fold | 3 : 4 | Quarto returns to 3 : 4 |
| Octavo (16-page section) | 2 : 3 | Explicitly stated |
| DIN / A-series paper | 1 : √2 | Approx. `1 : 1.414`; stays constant when folded |

### B. Book page formats (**width : height**)

| Use | Ratio | Notes |
|---|---:|---|
| Hand-held tall books | 21 : 34 | Given as the golden-ratio option in the article |
| Hand-held tall books | 2 : 3 | Traditional tall-book format preferred by Tschichold |
| Very small books | 1 : √3 | Approx. `1 : 1.732` |
| Very small books | 3 : 5 | Also recommended |
| Bad for hand-held books | 3 : 4 | Considered awkward in the hand |
| Bad for hand-held books | 1 : √2 | Also considered poor for hand-held reading |
| Large books read open on a table | 3 : 4 | Acceptable for table reading |
| Oblong books | width > height | Also acceptable for table reading |

### C. Figure 2 page-format set (**width : height**)

| Label | Ratio |
|---|---:|
| A | 1 : √5 |
| B | 1 : 2 |
| C | 5 : 9 |
| D | 1 : √3 |
| E | 3 : 5 |
| F | 21 : 34 |
| G | 2 : 3 |
| H | 1 : √2 |
| I | 3 : 4 |

### D. Readability proportions / limits

| Item | Value | Meaning |
|---|---:|---|
| Average line length | 40–70 characters | Including spaces |
| Preferred upper emphasis | 70 characters | Rule stressed in the article |
| German line length | 8–12 words | Suggested optimum |
| Smallest practical font size | 8 pt | Smaller sizes are “not easily read” |

### E. Margin and text-block relations

| Item | Value | Notes |
|---|---:|---|
| Margin canon | 2 : 3 : 4 : 6 | inner : top : outer : bottom |
| Text block position | 1/9 across, 1/9 down | Top inner corner of each text block |
| Recursive rule | (1/3) × (1/3) = 1/9 | Basis of Tschichold’s recursive Villard construction |
| Standard divisions | 9 or 12 | Both can produce harmonious results |
| Special relation | page ratio 2 : 3 | Then the text-block height can equal the page width |
| Conclusion relation | spread/paper ratio 3 : 4 | If the text area must be as high as the page is wide, then the spread/paper must be 3 : 4, giving a page of 2 : 3 |

---

## 2) Construction rules, cleaned and practical

### Core idea
The typesetting area should be placed so that the **page, spread, text block, and surrounding white space remain harmonious**.
The construction is based on diagonals and proportional subdivision rather than arbitrary margin values.

### Main rules

1. **Choose the page format according to use**
   - For a hand-held book: prefer `2 : 3` or `21 : 34` (**width : height**).
   - For a large book read on a table: `3 : 4` can work.

2. **Use the spread, not only a single page**
   - The harmonious layout relates the text area to both the **diagonals of the spread** and the **diagonals of the page**.

3. **Place the text block by proportional construction**
   - Divide the page into **ninths**.
   - The **top inner corner** of the text block sits **1/9 across** and **1/9 down** the page.

4. **Use the Villard / van de Graaf / Tschichold construction**
   - Tschichold applies Villard’s division recursively.
   - Because `(1/3) × (1/3) = 1/9`, the recursive construction lands the text block correctly.

5. **Keep the text block in the same aspect ratio as the page**
   - The article states that this recursive Villard construction yields a typesetting area with the **same aspect ratio as the page**.

6. **The division into ninths is not mandatory**
   - Division by **12** can also yield harmonious results.

7. **Use the classical margin canon as a guide**
   - Inner : top : outer : bottom = **2 : 3 : 4 : 6**.

8. **Special 2 : 3 page property**
   - A page proportion of **2 : 3** allows a text block whose **height equals the page width**.

9. **Add binding correction after geometric construction**
   - The calculated inner margin of the spread must be increased to compensate for the optical loss at the binding edge.
   - The exact correction depends on paper thickness, book thickness, and binding method.

10. **Control readability after geometry**
   - Aim for lines of **40–70 characters**, preferably not exceeding **70**.
   - Adjust by choosing a narrower or broader font, or by changing the font size.
   - Avoid decorative, calligraphic, or italic faces for long running text.

---

## 3) Worked example from the article

### Input values used for figure 6

| Item | Value |
|---|---:|
| Paper height | 22 cm |
| Proportion A | 3 |
| Proportion B | 4 |
| Dividing factor | 12 |

### Calculated layout data (table 1)

| Item | Value |
|---|---:|
| Proportion of paper (**height : width**) | 3 : 4 |
| Dividing factor | 12 |
| Page height | 220 mm |
| Page width | 146.5 mm |
| Inner margin | 12 mm |
| Top margin | 18 mm |
| Outer margin | 24 mm |
| Lower margin | 37 mm |
| Height of typesetting area | 165 mm |
| Width of typesetting area | 110 mm |

### Context setup note from the article
The article then shows a Context setup where:
- `backspace` is enlarged from the inner margin by **4 mm** for binding correction
- `width = 110 mm`
- `topspace = 18 mm`
- `rightmargin = 24 mm`
- the layout is `doublesided`

---

## 4) Shortest useful summary

The article argues for a traditional harmonic page design based on proportion and geometric construction.
The most useful takeaways are:

- Use **2 : 3** or **21 : 34** for hand-held tall books.
- Use **3 : 4** only when the book is mainly read open on a table.
- Build the page from the **spread** and the **diagonals**, not from arbitrary margin guesses.
- The classic white-space canon is **2 : 3 : 4 : 6** for **inner, top, outer, bottom** margins.
- The text block’s top inner corner is placed at **1/9** of the page width and height.
- Division by **9** is traditional, but **12** can also work.
- A **2 : 3** page can have a text block whose **height equals the page width**.
- Always add **binding correction** after the geometric construction.
- For readability, keep lines around **40–70 characters** and avoid overly small or decorative type.

---

## 5) Practical warning for applying this to modern layouts

Before using these ratios, decide whether your working format is being described as:

- **height : width**, or
- **width : height**

The article uses **both**, depending on the section. That is the main place where mistakes happen.
