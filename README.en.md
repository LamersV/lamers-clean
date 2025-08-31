# @lamersv/clean

This package provides TypeScript utilities for string cleaning and formatting, lightweight random generators, common Brazilian data validations, and simple HTML and URI helpers. It aims to offer small, straightforward calls for frequent tasks in both back-end and front-end projects. Source is written in TypeScript and the published artifact exposes the compiled output under `dist`. The distribution follows an exports map for the main module as well as direct per-module imports.

## Installation

The package is published on GitHub Packages under the `@lamersv` scope. You must configure an access token with at least `read:packages` permission and add your authentication to `.npmrc`. Create or update the `.npmrc` file in your project pointing the `@lamersv` scope to GitHub’s registry.

```
@lamersv:registry=https://npm.pkg.github.com
```

Then install it with your favorite package manager. Examples follow for npm, yarn and pnpm.

```
npm install @lamersv/clean
```

```
yarn add @lamersv/clean
```

```
pnpm add @lamersv/clean
```

## Basic usage

You can import everything from the index or import specific modules, whichever better fits your bundle strategy. The snippets below use ESM/TypeScript, but the package can be consumed from plain JavaScript as well.

```ts
// Aggregated import from the entry point
import { cleanString, capitalize, toCurrency, toCPF, toCNPJ, formatLink, validateCPF, validateLink, decodeHTML, encodeURIString, decodeURIString, generateRandomCode, generateRandomPassword, generateTimestamp } from "@lamersv/clean";

// Path-based imports, useful to keep bundles smaller
import { cleanString } from "@lamersv/clean/modules/clean";
import { capitalize } from "@lamersv/clean/modules/format";
import { toCurrency, toCPF, toCNPJ, formatLink } from "@lamersv/clean/modules/format";
import { validateCPF, validateLink } from "@lamersv/clean/modules/validate";
import { decodeHTML } from "@lamersv/clean/modules/html";
import { encodeURIString, decodeURIString } from "@lamersv/clean/modules/uri";
import { generateRandomCode, generateRandomPassword, generateTimestamp } from "@lamersv/clean/modules/generate";
```

## Practical examples

`cleanString` normalizes diacritics via `NFD`, optionally removes non-alphanumeric characters, lowercases common Portuguese joiners, and applies user-defined regex replacements. Supported options are `trim`, `case` with `none` | `lower` | `upper`, `removeSpecial`, `removeJoiners`, and `replace` which takes an array of `{ searchValue, replaceValue, flags? }`.

```ts
import { cleanString } from "@lamersv/clean";

const text = " João  da Silva — São Paulo ";
const out = cleanString(text, {
  trim: true,
  case: "none",
  removeSpecial: true,
  removeJoiners: true,
  replace: [{ searchValue: /\\s{2,}/g, replaceValue: " " }],
});
// "Joao Silva Sao Paulo"
```

`capitalize` works on a single word or an entire phrase while keeping common joiners in lowercase when not at the beginning.

```ts
import { capitalize } from "@lamersv/clean";

capitalize("joão");                     // "João"
capitalize("joão da silva", { all: true }); // "João da Silva"
```

Use `toCurrency` for BRL formatting powered by `Intl.NumberFormat` with `pt-BR` locale and `BRL` currency.

```ts
import { toCurrency } from "@lamersv/clean";

toCurrency(1234.5); // "R$ 1.234,50"
```

For Brazilian document strings use `toCPF` and `toCNPJ`. Both functions validate the input and, if invalid, emit a `console.warn` and return the original string unchanged.

```ts
import { toCPF, toCNPJ } from "@lamersv/clean";

toCPF("12345678909");     // "123.456.789-09" after validation
toCNPJ("11222333000181"); // "11.222.333/0001-81" after validation
```

`formatLink` sanitizes links by removing spaces, keeping original casing, warning when the input is invalid, and prefixing `https://` when the scheme is missing.

```ts
import { formatLink } from "@lamersv/clean";

formatLink(" example.com/test ");
// "https://example.com/test"
```

Validation helpers include `validateCPF` and `validateLink`. CPF validation strips non-digits and computes check digits, while the link validator cleans the input and tests it against a simple regular expression.

```ts
import { validateCPF, validateLink } from "@lamersv/clean";

validateCPF("123.456.789-09"); // true/false
validateLink("https://mysite.com/path"); // true/false
```

HTML and URI helpers provide direct functions to decode HTML entities and encode or decode strings for URIs.

```ts
import { decodeHTML } from "@lamersv/clean";
import { encodeURIString, decodeURIString } from "@lamersv/clean";

decodeHTML("Tom &amp; Jerry"); // "Tom & Jerry"
encodeURIString("a b");        // "a%20b"
decodeURIString("a%20b");      // "a b"
```

Generator utilities include `generateTimestamp`, `generateRandomCode` with a customizable length, and `generateRandomPassword` which always includes at least one special character, one uppercase, one lowercase and one digit.

```ts
import { generateTimestamp, generateRandomCode, generateRandomPassword } from "@lamersv/clean";

generateTimestamp();        // "1735649123456"
generateRandomCode(12);     // e.g. "aZ09Bx..."
generateRandomPassword(12); // strong password with minimal composition enforced
```

## Exports map

The package exposes the main entry `./dist/index.js` and `./modules/*` for direct module imports, enabling natural tree-shaking with modern bundlers and Node.js.

```json
{
  ".": {
    "import": "./dist/index.js",
    "require": "./dist/index.js",
    "default": "./dist/index.js",
    "types": "./dist/index.d.ts"
  },
  "./modules/*": {
    "import": "./dist/modules/*.js",
    "require": "./dist/modules/*.js",
    "default": "./dist/modules/*.js",
    "types": "./dist/modules/*.d.ts"
  }
}
```

## License

MIT. See the license file in the official repository. [LICENSE](./LICENSE)
