import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays
} from '../../services/public-holidays.service';
import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../../config';

describe('public-holidays-integration-test', () => {

  describe('getListOfPublicHolidays', () => {

    it('should return an array of public holidays', async () => {
      const axiosMock = jest.spyOn(axios, 'get')

      await getListOfPublicHolidays(2023, 'GB')

      expect(axiosMock).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/GB`)
    })
  })

  describe('checkIfTodayIsPublicHoliday', () => {

    it('should return false if today is not holiday', async () => {
      const axiosMock = jest.spyOn(axios, 'get')

      await checkIfTodayIsPublicHoliday('GB')

      expect(axiosMock).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/GB`)
    });

  })

  describe('getNextPublicHolidays', () => {

    it('should return an array of next public holidays', async () => {
      const axiosMock = jest.spyOn(axios, 'get')

      await getNextPublicHolidays('GB')

      expect(axiosMock).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/GB`)
    })

  })

})
