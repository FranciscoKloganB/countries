// With TypeScript `esModuleInterop` the two statements below are equivalent;
// const utilsCJS = require("@franciscokloganb/countries");
import * as CountriesAliasPKG from '@franciscokloganb/countries'
// Destruct MJS import
import { countries } from '@franciscokloganb/countries'
// Default MJS export
import CountriesDefaultPKG from '@franciscokloganb/countries'
// console.log("MJS Default Import:", pkg, pkg.toHumanReadableString("2022"));

console.log('CJS Require Import:', typeof CountriesAliasPKG.countries !== 'undefined')
console.log('MJS Destructured Import:', typeof countries !== 'undefined')
console.log('MJS Default Import:', typeof CountriesDefaultPKG.countries !== 'undefined')

/**
 * This file serves only to test your publishable NPM package various import
 * statements and typings.
 *
 * Use `npm link` and try to import your stuff in this file.
 */

const assets = 'node_modules/@franciscokloganb/countries/assets'

function ipath(c: string) {
  return new URL(`${assets}/${c.toLowerCase()}.svg`, import.meta.url).href
}

const FlagsSVG = {
  portugal: ipath('pt'),
} as const

export { FlagsSVG }
