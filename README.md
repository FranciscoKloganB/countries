# @franciscokloganb/countries

This package provides a client and server friendly objects and functions that facilitate the way you build web-based forms that intended to collect user telephone details.

With it you gain access to be country `dialCodes`, country `flags` and more.

## Features

This package provides all countries with their flag emoji, flag svg and dial number code.

- Avoid `falsey` values as much as possible, e.g.: `null` or `undefined`;
- Server-side-rendering compatible;
- No external dependencies;
- No opinions with respect to validation;
  - Example below on how to achieve that using `zod` and `libphonenumber-js`;
- No pollution of `globalThis` (a.k.a. `window`) on the client;

## Installation

```bash
npm install @franciscokloganb/countries
```

## Usage

For ease of use, the API outlined below (inspired in the Repository Pattern), is recommended. For details about the interfaces used by the methods, hover the function name on your IDE.

- `findByCountryCode(code: string, opts?: IFilterOption): ICountry[]`
- `findOneByCountryCode(code: string): ICountry | undefined`
- `findByCountryDialCode(code: string): ICountry[]`
- `findOneByCountryDialCode(code: string): ICountry | undefined`
- `findByKeyword(keyword: string, option?: IFilterOption): ICountry[]`
- `getAll(option?: IFilterOption): ICountry[]`

If this API is not enough, you can access the countries raw data by importing the `countries` array. Notice however, that the objects within the array contain more falsey values. Each country implements the `ICountry` interface, just like the functions above. However, the functions above, return concrete `Country` implementations which deal with falsey values.

```ts
import { countries } from '@franciscokloganb/countries'
```

You can may import SVG strings directly if you prefer those over the emoji flags found in `ICountry`-like objects.

```ts
import { FlagsSVGStrings } from '@franciscokloganb/countries'
```

If you prefer using real SVG files, you can import them from `@franciscokloganb/countries/dist/assets`. How you import those may depend on your bundler. An example with Vite is provided below.

Create an utility file.

```ts
// Assets path is an absolute import
const assets = 'node_modules/@franciscokloganb/countries/assets'

function ipath(c: string) {
  return new URL(`${assets}/${c.toLowerCase()}.svg`, import.meta.url).href
}

const FlagsSVG = {
  portugal: ipath('pt'),
} as const

export { FlagsSVG }
```

Use it in your `react`, `vue`, `angular` or whatever component

```html
<script setup lang="ts">
  import { FlagsSVG } from './your-utility-file'
</script>

<template>
  <img src="{FlagsSVG.portugal}" alt="the portuguese flag" />
</template>
```

## Example usage with libphonenumber-js (browser compatible) and zod

```ts
import { findOneByCountryDialCode } from '@franciscokloganb/countries'
import { type CountryCode, validatePhoneNumberLength } from 'libphonenumber-js'
import { z } from 'zod'

import type { ZodAppErrorCode } from './ZodAppErrorCode.type'

type FailParams = { ctx: z.RefinementCtx; errorCode: ZodAppErrorCode; field: string }

const dialCode = z.custom<string>(
  (value) => typeof value === 'string' && /^\+\d{1,4}$/.test(value),
  'telephone_dial_code_invalid_format' satisfies ZodAppErrorCode
)

const dialCodeExists = z.custom<string>((value) => {
  if (typeof value !== 'string') {
    return false
  }

  const maybeCountry = findOneByCountryDialCode(value)

  return maybeCountry && maybeCountry.code
}, 'telephone_dial_code_unknown' satisfies ZodAppErrorCode)

const onlyNumbers = z.custom<string>(
  (value) => typeof value === 'string' && /^[\d]*$/.test(value),
  'only_numbers' satisfies ZodAppErrorCode
)

function fail({ ctx, errorCode, field }: FailParams) {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    fatal: true,
    message: errorCode,
    path: [field],
  })

  return z.NEVER
}

const telephoneSchema = z
  .object({
    dialCode: z.string().min(2).pipe(dialCode).pipe(dialCodeExists),
    nationalNumber: z.string().max(16).pipe(onlyNumbers),
  })
  .superRefine(({ dialCode, nationalNumber }, ctx) => {
    console.debug('nationalNumber', { dialCode, nationalNumber })

    const country = findOneByCountryDialCode(dialCode)

    if (!country) {
      return fail({
        ctx,
        errorCode: `telephone_dial_code_is_required`,
        field: 'dialCode',
      })
    }

    const error = validatePhoneNumberLength(nationalNumber, country.code as CountryCode)

    if (error) {
      const errorCode =
        `telephone_national_number_${error.toLowerCase()}` as ZodAppErrorCode

      return fail({ ctx, errorCode, field: 'nationalNumber' })
    }

    console.debug('nationalNumber is valid', { dialCode, nationalNumber })
  })

type TelephoneSchema = z.infer<typeof telephoneSchema>

export type { TelephoneSchema }
export { telephoneSchema }
```
