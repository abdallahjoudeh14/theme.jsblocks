import { isValidTheme } from "../../utils/index.js";
export default function toggleTo(newTheme) {
    const theme = this;
    if (!isValidTheme(newTheme)) {
        console.error(new TypeError(`Unexpected theme type (${newTheme}), expected ('dark', 'light', 'system')`));
        return;
    }
    if (newTheme === "system" && !theme.prefersSystem) {
        console.error("The (system) theme is not permitted in a non-preferred system mode");
        return;
    }
    window.__theme = newTheme;
    theme.loadTheme();
}
