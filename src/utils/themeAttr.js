function setThemeAttr(rootElement, theme) {
    rootElement.setAttribute("data-theme", theme);
}

function removeThemeAttr(rootElement) {
    rootElement.removeAttribute("data-theme");
}

export { setThemeAttr, removeThemeAttr };
