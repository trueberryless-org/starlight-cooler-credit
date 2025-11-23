---
"starlight-cooler-credit": minor
---

**⚠️ Potential breaking change:** Remove flexibility components that allowed to create custom content in the table of contents above and below the list of headings.

This includes these components:

- `DefaultBottomTableOfContentsWrapper.astro`
- `BottomTableOfContentsWrapper.astro`
- `TopTableOfContentsWrapper.astro`

Since those components do no longer exist and are not exported anymore, if you were relying on them, migrate your project to implement those features yourself by following this blog post: ["Add Additional Content to Starlight's Table of Contents"](https://blog.trueberryless.org/blog/starlight-customize-toc-additional-content/).

You can also a minimal reproducation on how to achieve this functionality on [GitHub](https://github.com/trueberryless/starlight-customize-toc-additional-content) and [StackBlitz](https://stackblitz.com/github/trueberryless/starlight-customize-toc-additional-content).
