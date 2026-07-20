<p align="center"><a href="https://mega.tensorplay.cn/"><img src="https://mega.tensorplay.cn/assets/logo-D1t6EjrA.webp" alt="MEGA" width="420" /></a></p>
<p align="center"><i>Vue 3 UI components and styles for MEGA experiences.</i></p>
<p align="center">
  <img alt="Vue 3" src="https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white">
  <img alt="npm package" src="https://img.shields.io/npm/v/@tensorplay/mega-ui?logo=npm&logoColor=white">
  <a href="https://github.com/ohtensorplay/mega-ui/blob/main/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/ohtensorplay/mega-ui"></a>
</p>

# @tensorplay/mega-ui

`@tensorplay/mega-ui` is a Vue 3 component library for building clear, consistent MEGA interfaces. It pairs reusable controls, form fields, dialogs, status views, settings components, and a shared visual language in one installable package.

## Install

```bash
npm install @tensorplay/mega-ui
```

The package expects Vue, Vue Router, and Pinia to be available in the host application.

## Quick start

Import the styles once in your application entry point, then import the components you need.

```vue
<script setup lang="ts">
import { UiButton, UiTextField } from "@tensorplay/mega-ui";
import "@tensorplay/mega-ui/styles.css";
</script>

<template>
  <form>
    <UiTextField label="Email" type="email" />
    <UiButton type="submit">Continue</UiButton>
  </form>
</template>
```

## Build with it

Import named components from the package root and use the shared stylesheet once per application. The library is designed for composition: start with a small control such as `UiButton` or `UiTextField`, then combine dialogs, menus, directory views, and settings views as your interface grows.

## Included building blocks

- Buttons, icons, avatars, badges, alerts, loading states, and toasts
- Text, number, select, range, checkbox, radio, and search controls
- Dialogs, menus, pagination, filter controls, and file dropzones
- Directory, settings, account, and status views
- Markdown rendering and editing helpers

Components are individually exported from the package root, so applications can import only what they use.

| Export | Use it for |
| --- | --- |
| `@tensorplay/mega-ui` | Vue components, helpers, and types |
| `@tensorplay/mega-ui/styles.css` | The shared MEGA stylesheet |
| `@tensorplay/mega-ui/ai-icons/*` | AI application artwork |

## Assets

The package also exposes AI application artwork through `@tensorplay/mega-ui/ai-icons/*`. Use these paths when integrating components such as `OAuthApplicationLogo` or when rendering a supported application icon yourself.

## Explore MEGA

- [MEGA Hub](https://mega.tensorplay.cn/)
- [MEGA Hub source](https://github.com/ohtensorplay/mega-hub)
- [MEGA Agent Skills](https://github.com/ohtensorplay/mega-skills)

## License

[MIT](LICENSE)
