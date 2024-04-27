interface ICountry {
  areaCodes?: string[];
  code: string;
  countryCode?: string;
  dialCode: string;
  flag: string;
  name: string;
  preferred?: boolean;
  secondary?: boolean;
}

interface ICountryFlagSVG {
  [key: string]: string;
}

interface IFilterOption {
  withSecondary: boolean;
}

export type { ICountry, ICountryFlagSVG, IFilterOption };
