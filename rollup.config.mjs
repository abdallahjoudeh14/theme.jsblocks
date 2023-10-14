import terser from "@rollup/plugin-terser";
export default {
    input: "index.js",
    output: [
        {
            file: "dist/theme.js",
            format: "es",
        },
        {
            file: "dist/theme.min.js",
            format: "iife",
            name: "Theme",
            plugins: [terser()],
        },
    ],
};
