import type { ICountry } from './types';

class Country implements ICountry {
  #data: ICountry;

  constructor(data: ICountry) {
    this.#data = data;
  }

  get name(): string {
    return this.#data.name;
  }

  get dialCode(): string {
    return this.#data.dialCode;
  }

  get code(): string {
    return this.#data.code;
  }

  get flag(): string {
    return this.#data.flag;
  }

  get preferred(): boolean {
    return this.#data.preferred ?? false;
  }

  get secondary(): boolean {
    return this.#data.secondary ?? false;
  }

  get areaCodes(): string[] {
    return this.#data.areaCodes ?? [];
  }

  get countryCode(): string {
    return this.#data.countryCode ?? this.#data.dialCode;
  }
}

export { Country };
