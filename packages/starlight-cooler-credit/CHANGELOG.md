# starlight-cooler-credit

## 0.5.0

### Minor Changes

- [#102](https://github.com/trueberryless-org/starlight-cooler-credit/pull/102) [`73df515`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/73df5153d453dadc05586252a6a3070f15910191) Thanks [@trueberryless](https://github.com/trueberryless)! - **⚠️ Potential breaking change:** Remove flexibility components that allowed to create custom content in the table of contents above and below the list of headings.

  This includes these components:
  - `DefaultBottomTableOfContentsWrapper.astro`
  - `BottomTableOfContentsWrapper.astro`
  - `TopTableOfContentsWrapper.astro`

  Since those components do no longer exist and are not exported anymore, if you were relying on them, migrate your project to implement those features yourself by following this blog post: ["Add Additional Content to Starlight's Table of Contents"](https://blog.trueberryless.org/blog/starlight-customize-toc-additional-content/).

  There is also a minimal reproducation on how to achieve this functionality on [GitHub](https://github.com/trueberryless/starlight-customize-toc-additional-content) and [StackBlitz](https://stackblitz.com/github/trueberryless/starlight-customize-toc-additional-content).

## 0.4.1

### Patch Changes

- [#96](https://github.com/trueberryless-org/starlight-cooler-credit/pull/96) [`46145e7`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/46145e789710e0a7e70b120134a14cc04ddd904a) Thanks [@trueberryless-org](https://github.com/apps/trueberryless-org)! - Setups trusted publishing using OpenID Connect (OIDC) authentication — no code changes.

## 0.4.0

### Minor Changes

- [#74](https://github.com/trueberryless-org/starlight-cooler-credit/pull/74) [`694417d`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/694417d070bb872eb2feced3c7b853ab3f54a526) Thanks [@trueberryless](https://github.com/trueberryless)! - Add Cooler Credit at the bottom of the page if the Table of Contents is not visible

### Patch Changes

- [#72](https://github.com/trueberryless-org/starlight-cooler-credit/pull/72) [`5ff0132`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/5ff01323065dd5daedf4a37978f7957cd5abd375) Thanks [@trueberryless](https://github.com/trueberryless)! - Fix issue where Table of Contents is visible on mobile devices because of CSS override

## 0.3.1

### Patch Changes

- [`50153b0`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/50153b02563c1f23e683bf6900f4b7d2e8071a70) Thanks [@trueberryless](https://github.com/trueberryless)! - Small fixes in docs and throw Warnings

## 0.3.0

### Minor Changes

- [#60](https://github.com/trueberryless-org/starlight-cooler-credit/pull/60) [`e9995e0`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/e9995e0f50bec1cdbc121899769219b62ee57223) Thanks [@trueberryless](https://github.com/trueberryless)! - ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now version `0.32.0`.

  Please use the `@astrojs/upgrade` command to upgrade your project:

  ```sh
  npx @astrojs/upgrade
  ```

- [#60](https://github.com/trueberryless-org/starlight-cooler-credit/pull/60) [`e9995e0`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/e9995e0f50bec1cdbc121899769219b62ee57223) Thanks [@trueberryless](https://github.com/trueberryless)! - Component exports allows user to place and customize everything the plugin offers.

  Read more about this change under [Components](https://starlight-cooler-credit.trueberryless.org/credit-reference-card/).

### Patch Changes

- [#60](https://github.com/trueberryless-org/starlight-cooler-credit/pull/60) [`6e77f96`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/6e77f96ab4ce84d069f1ba3eed4f7c9c541a4093) Thanks [@trueberryless](https://github.com/trueberryless)! - Add a11y to credit image. If you have set a `customImage` then you are now required to also describe the image by setting `customImageAlt`.

  Read more about the new config [here](https://starlight-cooler-credit.trueberryless.org/configuration/#customimagealt).

## 0.2.3

### Patch Changes

- [#55](https://github.com/trueberryless-org/starlight-cooler-credit/pull/55) [`ee37459`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/ee374593e459b728e34503cc5ae1a6c177a4396f) Thanks [@PanConDev](https://github.com/PanConDev)! - Add Spanish language translation

## 0.2.2

### Patch Changes

- [#50](https://github.com/trueberryless-org/starlight-cooler-credit/pull/50) [`45b5eb8`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/45b5eb85c5bc3be4899cbd907acabeb6f20bfd3c) Thanks [@trueberryless](https://github.com/trueberryless)! - Add support for custom image.

  You can hereby specify another image which will be used inside the component by setting the `customImage` configuration like this:

  ```
  plugins: [
    starlightCoolerCredit({
      customImage: "./src/assets/rainsberger.ca.webp",
    })
  ]
  ```

## 0.2.1

### Patch Changes

- [`9e2f769`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/9e2f7698d3079bf36e1e7cc811e0ed9f032f401d) Thanks [@trueberryless](https://github.com/trueberryless)! - Bump patch version because 0.2.0 was published before and although unpublished within 72h there is still an entry in the time object of the registry

## 0.2.0

### Minor Changes

- [#41](https://github.com/trueberryless-org/starlight-cooler-credit/pull/41) [`30bee54`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/30bee54b86c1c8ccd30413e3d8c4b53a6af0e370) Thanks [@trueberryless](https://github.com/trueberryless)! - Adds support for Astro v5, drops support for Astro v4.

  ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now `0.30.0`.

  Please follow the [upgrade guide](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.30.0) to update your project.

  Note that the [`legacy.collections` flag](https://docs.astro.build/en/reference/legacy-flags/#collections) is not supported by this plugin and you should update your collections to use Astro's new Content Layer API.

### Patch Changes

- [#43](https://github.com/trueberryless-org/starlight-cooler-credit/pull/43) [`2b47021`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/2b47021d50251b18592a692240066e0d4cf3418e) Thanks [@trueberryless](https://github.com/trueberryless)! - Make Image in Cooler Credit Component optional

## 0.1.9

### Patch Changes

- [#25](https://github.com/trueberryless-org/starlight-cooler-credit/pull/25) [`ab0d6d0`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/ab0d6d02f2e8dca47620b19924bdd8f1909540c9) Thanks [@X7md](https://github.com/X7md) and [@Omar](https://github.com/OmarIsAdev)! - Add Arabic language translation

- [#26](https://github.com/trueberryless-org/starlight-cooler-credit/pull/26) [`04c1813`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/04c181327f6a676fe63422724f92498a2690bfc5) Thanks [@trueberryless](https://github.com/trueberryless)! - Fix german grammar translation

- [#27](https://github.com/trueberryless-org/starlight-cooler-credit/pull/27) [`cae1ef3`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/cae1ef353f0d8cf3d63ccbfd08f7ebcece1abc19) Thanks [@trueberryless](https://github.com/trueberryless)! - Make English blog description better

## 0.1.8

### Patch Changes

- [`5c104d5`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/5c104d5b14b13966290122df58a8a752e98997d4) Thanks [@trueberryless](https://github.com/trueberryless)! - Completes ci release

## 0.1.7

### Patch Changes

- [#20](https://github.com/trueberryless-org/starlight-cooler-credit/pull/20) [`9135a0e`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/9135a0e4db720ddbe8f77b564d5f2754e382e844) Thanks [@Nin3lee](https://github.com/Nin3lee)! - Add Chinese language translation.

## 0.1.6

### Patch Changes

- [#18](https://github.com/trueberryless-org/starlight-cooler-credit/pull/18) [`6822737`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/6822737ce5a66924a967e5fecc8041a60b2c164b) Thanks [@staticWagomU](https://github.com/staticWagomU)! - Add Japanese language translation.

## 0.1.5

## 0.1.4

### Patch Changes

- [#11](https://github.com/trueberryless-org/starlight-cooler-credit/pull/11) [`fe5c299`](https://github.com/trueberryless-org/starlight-cooler-credit/commit/fe5c29942aec69c3beb91ab613c83f6d810fc03f) Thanks [@ztxone](https://github.com/ztxone)! - Adds Russian language translation

## 0.1.3

### Patch Changes

- b073fee: Adds Italian language translation

## 0.1.2

### Patch Changes

- 3b7d9e6: Adds changeset
