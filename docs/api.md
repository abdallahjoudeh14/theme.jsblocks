# Core

## Constructor

### `Theme()`

#### Syntax

```JS
const theme = new Theme();
```

#### Parameters

`initialTheme`: is the starter theme.

**Value**:

-   `light`
-   `dark`
-   `system`: if `prefersSystem` is `false` then it will raise an error.

</br>

`prefersSystem`

**boolean**:

-   `true`: you can use `system` theme in your project.
-   `false`: it will raise an error when you use it.

</br>

## Current Theme

### `currentTheme` (Read only)

Will return the current theme stored in `localStorage`

```JS
console.log(theme.currentTheme);
```

---

# Methods

`init()`: Will initialize the theme for your website

```JS
theme.init();
```

`toggleTo(theme)`: it will toggle to a theme that passed as a parameter

Let's see how we can use it:

```JS
document.querySelector(".dark-theme").addEventListener("click", () => {
    theme.toggleTo("dark");
});

document.querySelector(".light-theme").addEventListener("click", () => {
    theme.toggleTo("light");
});

document.querySelector(".system-theme").addEventListener("click", () => {
    theme.toggleTo("system");
});
```

`toggleTheme()`: if `prefersSystem` is `true` then will toggle theme between `(light, dark, system)`,
otherwise will toggle theme between `(light, dark)`

Here is an example:

```JS
document.querySelector(".toggle-theme").addEventListener("click", () => {
    theme.toggleTheme();
});
```

`onToggle(callback)`: you can pass a callback function and it will call it when toggle a theme.

Here is an example:

```JS
theme.onToggle(() => {
    console.log(theme.currentTheme);
});
```

`onLoad(callback)`: you can pass a callback function and it will call it when dom content has been loaded.

Here is an example:

```JS
theme.onLoad(() => {
    console.log(theme.currentTheme);
});
```

`destroy()`: it will remove everything related to it.

Here is an example:

```JS
theme.destroy();
```

# Notes

-   Make sure to initialize theme before CSS Stylesheet link, ensuring that the appropriate styling is applied based on the user's preference as early as possible in the page loading process.

```HTML
<script src="https://unpkg.com/@jsblocks/theme@1/dist/theme.min.js"></script>
<script>
    const theme = new Theme("light");
    theme.init();
</script>
<link rel="stylesheet" href="style.css" />
```

[![Back](../assets/back.svg)](../README.md "Back") &nbsp;&nbsp;&nbsp;&nbsp;
[![Guide](../assets/getting-started.svg)](./getting-started.md "Guide")

Was useful support me by buying me a coffee:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J1NMYT7)
