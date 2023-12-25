import { ICountry } from './types'
import { countries } from './countries'
import type { IFilterOption } from './types'
import { Country } from './country.cls'

export function findByCountryCode(code: string, opts?: IFilterOption): ICountry[] {
  return getAll(opts).filter(
    (country) => country.code.toLowerCase() === code.toLowerCase()
  )
}

export function findOneByCountryCode(code: string): ICountry | undefined {
  const filteredCountries = findByCountryCode(code)

  return filteredCountries.find((country) => {
    return !country.secondary
  })
}

export function findByCountryDialCode(code: string): ICountry[] {
  return getAll().filter((country) => country.dialCode === code)
}

export function findOneByCountryDialCode(code: string): ICountry | undefined {
  const filteredCountries = findByCountryDialCode(code)

  const preferred = filteredCountries.find((country) => country.preferred)

  if (preferred) {
    return preferred
  }

  return filteredCountries[0] ?? undefined
}

export function findByKeyword(keyword: string, option?: IFilterOption): ICountry[] {
  return getAll(option).filter((country) => {
    return (
      country.code.toLowerCase().includes(keyword.toLowerCase()) ||
      country.name.toLowerCase().includes(keyword.toLowerCase()) ||
      country.dialCode.toLowerCase().includes(keyword.toLowerCase())
    )
  })
}

export function getAll(option?: IFilterOption): ICountry[] {
  if (option && !option.withSecondary) {
    return countries
      .filter((country) => !country.secondary)
      .map((data) => new Country(data))
  }

  return countries.map((data) => new Country(data))
}
