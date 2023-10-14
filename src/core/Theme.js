import { isValidTheme, removeThemeAttr } from "../utils/index.js";

import storage from "./localStorage/index.js";
import theme from "./theme/index.js";
import events from "./events/index.js";

const prototypes = { storage, theme, events };

export default class Theme {
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
