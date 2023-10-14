export default function isValidTheme(theme) {
    return ["light", "dark", "system", ""].includes(theme);
}
