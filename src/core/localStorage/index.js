const THEME_STORAGE_KEY = "theme-color";

function getTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY);
}

function setTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function removeTheme() {
    localStorage.removeItem(THEME_STORAGE_KEY);
}

export default { getTheme, setTheme, removeTheme };
