import { setThemeAttr, handleThemeChange } from "../../utils/index.js";

const DARK_MODE_QUERY = window.matchMedia("(prefers-color-scheme: dark)");

export default function loadTheme() {
    const theme = this;
    if (theme.currentTheme === "system") {
        DARK_MODE_QUERY.addEventListener("change", handleThemeChange);
        handleThemeChange(DARK_MODE_QUERY);
    } else {
        setThemeAttr(theme.rootElement, theme.currentTheme);
    }

    theme.setTheme(theme.currentTheme);
    
    if (theme.onToggleCallback) theme.onToggleCallback();
}
