import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

describe('PUBLIC HOLIDAYS API', () => {
  describe('/AvailableCountries', () => {
    test('should return 200 and all available countries', async () => {
      const { status, data: body } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/AvailableCountries`)

      expect(status).toEqual(200);
      expect(body).toEqual(expect.any(Array));
    });

    test('should return 200 and random cat fact with max length specified', async () => {
      const { status, data: body } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/CountryInfo/241`)

      expect(status).toEqual(200);
      expect(body).toEqual({
        "commonName": "Vietnam",
        "officialName": "Socialist Republic of Vietnam",
        "countryCode": "VN",
        "region": "Asia",
        "borders": expect.any(Array),
      });

    });
  });
});
