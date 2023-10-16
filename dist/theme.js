function isValidTheme(theme) {
    return ["light", "dark", "system", ""].includes(theme);
}

function setThemeAttr(rootElement, theme) {
    rootElement.setAttribute("data-theme", theme);
}

function removeThemeAttr(rootElement) {
    rootElement.removeAttribute("data-theme");
}

function handleThemeChange(e) {
    const rootElement = document.documentElement;
    if (e.matches) setThemeAttr(rootElement, "dark");
    else setThemeAttr(rootElement, "light");
}

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

var storage = { getTheme, setTheme, removeTheme };

function toggleTo(newTheme) {
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

function toggleTheme() {
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

const DARK_MODE_QUERY = window.matchMedia("(prefers-color-scheme: dark)");

function loadTheme() {
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

var theme = { toggleTo, toggleTheme, loadTheme };

function onToggle(callback) {
    const theme = this;
    if (typeof callback == "function") {
        theme.onToggleCallback = callback;
    }
}

function onLoad(callback) {
    const theme = this;
    if (typeof callback == "function") {
        theme.onLoadCallback = callback;
    }
}

var events = { onToggle, onLoad };

const prototypes = { storage, theme, events };

class Theme {
    constructor(initialTheme, prefersSystem) {
        if (!isValidTheme(initialTheme)) {
            console.error(new TypeError(`Unexpected theme type (${initialTheme}), expected ('dark', 'light', 'system')`));
            return;
        }
        this.initialTheme = initialTheme || (prefersSystem ? "system" : "light");
        this.prefersSystem = prefersSystem;
        this.onToggleCallback = null;
        this.onLoadCallback = null;
        this.rootElement = document.documentElement;
        window.addEventListener("DOMContentLoaded", () => {
            if (this.onLoadCallback) {
                this.onLoadCallback();
            }
        });
    }

    get currentTheme() {
        return window.__theme;
    }
    // initialize theme
    init() {
        window.__theme = this.getTheme();
        if (this.currentTheme == null) {
            this.toggleTo(this.initialTheme);
            return;
        }

        this.loadTheme();
    }
    // destroy theme
    destroy() {
        this.removeTheme();
        removeThemeAttr(this.rootElement);
        delete window.__theme;
    }
}

Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((prototypeMethod) => {
        Theme.prototype[prototypeMethod] = prototypes[prototypeGroup][prototypeMethod];
    });
});
