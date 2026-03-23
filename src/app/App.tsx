import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ShowcasePage } from "@/pages/showcase/ShowcasePage";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/utilities.css";

/**
 * Minimal DASTI app shell.
 *
 * The application root should stay intentionally thin:
 * - style layers are imported once here
 * - ThemeProvider owns runtime theme state and CSS variable injection
 * - product pages render inside that system
 */
export default function App() {
  return (
    <ThemeProvider>
      <ShowcasePage />
    </ThemeProvider>
  );
}
