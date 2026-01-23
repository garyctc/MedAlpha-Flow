import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

import { i18nInitPromise } from "./i18n";

const root = createRoot(document.getElementById("root")!);

// Wait for i18n to initialize before rendering to prevent blank page
// Fallback render after 100ms if i18n takes too long
let rendered = false;
const render = () => {
  if (!rendered) {
    rendered = true;
    root.render(<App />);
  }
};

i18nInitPromise.then(render).catch(render);
setTimeout(render, 100);
