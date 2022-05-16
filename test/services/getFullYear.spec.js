import { UtilsService } from '../../src/services/utils.services';

describe('getFullYear()', () => {
  it('returns the full year as a number', () => {
    const dates = [
      '2022-05-10',
      'Thu May 10 2022 8:55:52 GMT+0200 (hora de verano de Europa central)',
      'Thu May 10 2022',
      '2022-05-10T08:56:51.640Z',
      '10/5/2022'
    ];
    dates.forEach(date => {
      const year = UtilsService.getFullYear(date);
      expect(year).toBe(2022);
      expect(typeof year).toBe('number');
    });
  });

  it('if it does not receive a string as an argument, it throws a TypeError with a descriptive error message', () => {
    const errors = [[new Date()], { date: new Date() }, null, undefined, true, 150, 150n];
    errors.forEach(error => {
      const errorThrower = () => UtilsService.getFullYear(error);
      expect(errorThrower).toThrow(TypeError);
      expect(errorThrower).toThrow(`Argument must be a string. Received: ${error} (${typeof (error)})`);
    });
  });
});
