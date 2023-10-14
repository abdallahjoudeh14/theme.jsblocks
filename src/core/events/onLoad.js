export default function onLoad(callback) {
    const theme = this;
    if (typeof callback == "function") {
        theme.onLoadCallback = callback;
    }
}
