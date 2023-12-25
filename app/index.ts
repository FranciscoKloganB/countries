// Since esModuleInterop the two statements below are equivalent;
// const utilsCJS = require("@franciscokloganb/countries");
import * as pkg from "@franciscokloganb/countries";
// Spread MJS import
import { toHumanReadableString } from "@franciscokloganb/countries";

// To test default MJS export (must be provided by your pacakge) uncomment below
// import pkg from "@franciscokloganb/countries"
// console.log("MJS Default Import:", pkg, pkg.toHumanReadableString("2022"));

console.log("MJS Import:", toHumanReadableString("2022"));
console.log("CJS Require:", pkg, pkg.toHumanReadableString("2023"));

/**
 * This file serves only to test your publishable NPM package various import
 * statements and typings.
 *
 * Use `npm link` and try to import your stuff in this file.
 */
