export default function toggleTheme() {
    const theme = this;
    if (theme.prefersSystem) {
        if (theme.currentTheme === "light") {
            theme.toggleTo("dark");
        } else if (theme.currentTheme === "dark") {
            theme.toggleTo("system");
        } else if (theme.currentTheme === "system") {
            theme.toggleTo("light");
        }
    } else {
        if (theme.currentTheme === "light") {
            theme.toggleTo("dark");
        } else if (theme.currentTheme === "dark") {
            theme.toggleTo("light");
        }
    }
}
