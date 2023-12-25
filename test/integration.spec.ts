import {
  Country,
  FlagsSVGStrings,
  findByCountryDialCode,
  findByCountryCode,
  findByKeyword,
  findOneByCountryDialCode,
  findOneByCountryCode,
  getAll,
} from '@src'

describe('CountryFlagSVG', () => {
  test('svg should return string', () => {
    const result = findOneByCountryCode('ac')

    if (result) {
      const flagSvg = FlagsSVGStrings[result.code]

      expect(typeof flagSvg).toBe('string')
    }
  })
})

describe('getList', () => {
  test('getList', () => {
    expect(getAll()).toBeInstanceOf(Array)
  })

  test('findFlag type Object', () => {
    expect(findOneByCountryCode('mm')).toBeInstanceOf(Country)
  })

  test('findFlag with Capital type Object', () => {
    expect(findOneByCountryCode('MM')).toBeInstanceOf(Country)
  })

  test('findFlag return exact value', () => {
    const result = findOneByCountryCode('mm')
    expect(result?.code).toEqual('MM')
    expect(result?.dialCode).toEqual('+95')
    expect(result?.flag).toEqual('🇲🇲')
    expect(result?.name).toEqual('Myanmar')
    expect(result?.preferred).toEqual(false)
  })

  test('findFlag with Capital return exact value', () => {
    const result = findOneByCountryCode('MM')
    expect(result?.code).toEqual('MM')
    expect(result?.dialCode).toEqual('+95')
    expect(result?.dialCode).toEqual('+95')
    expect(result?.flag).toEqual('🇲🇲')
    expect(result?.name).toEqual('Myanmar')
    expect(result?.preferred).toEqual(false)
  })
})

describe('findFlagByDialCode', () => {
  it('should return the correct object for the given dialing code', () => {
    const result = findOneByCountryDialCode('+95')

    expect(result?.code).toEqual('MM')
    expect(result?.dialCode).toEqual('+95')
    expect(result?.dialCode).toEqual('+95')
    expect(result?.flag).toEqual('🇲🇲')
    expect(result?.name).toEqual('Myanmar')
    expect(result?.preferred).toEqual(false)
  })

  /** A few examples for sanity */
  it('should return United Kingdom for dialCode +44', () => {
    expect(findOneByCountryDialCode('+44')?.code).toEqual('GB')
  })

  it('should return Portugal for dialCode +351', () => {
    expect(findOneByCountryDialCode('+351')?.code).toEqual('PT')
  })

  it('should return Canary Islands for dialCode +34', () => {
    expect(findOneByCountryDialCode('+34')?.code).toEqual('IC')
  })

  it('should return France for dialCode +34', () => {
    expect(findOneByCountryDialCode('+33')?.code).toEqual('FR')
  })
})

describe('findFlagsByDialCode', () => {
  test('findFlagsByDialCode length', () => {
    const result = findByCountryDialCode('+44')
    expect(result.length).toBe(4)
  })
})

describe('searchFlag', () => {
  test('Search Flag length', () => {
    const result = findByKeyword('Myanm')
    expect(result).toEqual([
      new Country({ name: 'Myanmar', dialCode: '+95', code: 'MM', flag: '🇲🇲' }),
    ])
  })
})

describe('multiple area code', () => {
  test('withSecondary true', () => {
    const result = findByCountryCode('DO', { withSecondary: true })
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(3)
  })

  test('withSecondary false', () => {
    const result = findByCountryCode('DO', { withSecondary: false })
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(1)
  })
})
