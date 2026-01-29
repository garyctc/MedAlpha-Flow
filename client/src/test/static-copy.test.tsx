import "@/i18n";
import { render } from "@testing-library/react";
import About from "@/pages/static/about";
import Terms from "@/pages/static/terms";
import Privacy from "@/pages/static/privacy";
import Faq from "@/pages/static/faq";

const STATIC_PAGES = [
  { name: "About", Component: About },
  { name: "Terms", Component: Terms },
  { name: "Privacy", Component: Privacy },
  { name: "FAQ", Component: Faq },
];

it("static pages avoid telemedicine and video references", () => {
  STATIC_PAGES.forEach(({ name, Component }) => {
    const { container, unmount } = render(<Component />);
    const text = container.textContent || "";
    expect(text, `${name} page contains telemedicine references`).not.toMatch(/\btelemedicine\b/i);
    expect(text, `${name} page contains video references`).not.toMatch(/\bvideo\b/i);
    unmount();
  });
});
