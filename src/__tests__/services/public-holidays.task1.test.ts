import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays
} from '../../services/public-holidays.service';
import axios from 'axios';
import * as helpers from '../../helpers';

describe('public-holidays', () => {

  beforeAll(() => {
    jest.spyOn(helpers, 'validateInput')
      .mockImplementation(() => true);

    jest.spyOn(helpers, 'shortenPublicHoliday')
      .mockImplementation(() => ({
        name: "string",
        localName: "string",
        date: "string",
      }));
  })

  describe('getListOfPublicHolidays', () => {

    it('should return an array of public holidays', async () => {
      jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: [{}] }));

      const actual = await getListOfPublicHolidays(2023, 'GB')

      expect(actual).toMatchObject([{ name:'string', localName:'string', date:'string' }])
    })

    it('should return an empty array if not able to get', async () => {
      jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.reject({ data: 'Validation failure' }));

      const actual = await getListOfPublicHolidays(2023, 'GB')

      expect(actual).toMatchObject([])
    })
  })

  describe('checkIfTodayIsPublicHoliday', () => {

    it('should return true if today is holiday', async () => {
      jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ status: 200 }));

      const actual = await checkIfTodayIsPublicHoliday('GB')
      expect(actual).toBe(true)
    });

    it('should return false if today is not holiday', async () => {
      jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.reject({ status: 204 }));

      const actual = await checkIfTodayIsPublicHoliday('GB')
      expect(actual).toBe(false)
    });

  })

  describe('getNextPublicHolidays', () => {

    it('should return an array of next public holidays', async () => {
      jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: [{}] }));

      const actual = await getNextPublicHolidays('GB')

      expect(actual).toMatchObject([{ name:'string', localName:'string', date:'string' }])
    })

    it('should return an empty array if not able to get next public holidays', async () => {
      jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.reject({ data: 'Validation failure' }));

      const actual = await getNextPublicHolidays('GB')

      expect(actual).toMatchObject([])
    })
  })
})
