export default function onToggle(callback) {
    const theme = this;
    if (typeof callback == "function") {
        theme.onToggleCallback = callback;
    }
}
