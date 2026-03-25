import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ShowcasePage } from "@/pages/showcase/ShowcasePage";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/utilities.css";

export default function App() {
  return (
    <ThemeProvider>
      <ShowcasePage />
    </ThemeProvider>
  );
}