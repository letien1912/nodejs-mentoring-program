import { shortenPublicHoliday, validateInput } from '../helpers';
import { PublicHoliday } from '../types';

describe('helpers', () => {
  describe('validateInput', () => {

    it('should return true if input is valid', () => {
      const input = { year: 2023, country: 'GB' };
      const actual = validateInput(input);
      expect(actual).toBe(true)
    })

    it('should throw if invalid year', () => {
      const input = { year: 2022, country: 'GB' };
      expect(() => {
        validateInput(input)
      }).toThrow(`Year provided not the current, received: 2022`)
    })

    it('should throw if invalid country', () => {
      const input = { year: 2023, country: 'VN' };
      expect(() => {
        validateInput(input)
      }).toThrow(`Country provided is not supported, received: VN`)
    })

  })
  describe('shortenPublicHoliday', () => {
    it('should return shortened public holiday', () => {
      const holiday: PublicHoliday = {
        date: "string",
        localName: "string",
        name: "string",
        countryCode: "string",
        fixed: false,
        global: false,
        counties: null,
        launchYear: null,
        types: []
      };
      const actual = shortenPublicHoliday(holiday)
      expect(actual).toMatchObject({
        name: "string",
        localName: "string",
        date: "string",
      })
    })
  })
})
