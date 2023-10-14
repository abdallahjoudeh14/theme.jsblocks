import { setThemeAttr } from "./index.js";
export default function handleThemeChange(e) {
    const rootElement = document.documentElement;
    if (e.matches) setThemeAttr(rootElement, "dark");
    else setThemeAttr(rootElement, "light");
}
