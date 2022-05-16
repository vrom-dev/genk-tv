import { UtilsService } from '../../src/services/utils.services';

describe('getRatingColor()', () => {
  it('returns a string with the color depending of the rating', () => {
    expect(UtilsService.getRatingColor(10)).toBe('hsla(143, 60%, 54%, 1)');
    expect(UtilsService.getRatingColor(9.5)).toBe('hsla(143, 60%, 54%, 1)');
    expect(UtilsService.getRatingColor(7)).toBe('hsla(143, 60%, 54%, 1)');
    expect(UtilsService.getRatingColor(5)).toBe('hsla(44, 95%, 63%, 1)');
    expect(UtilsService.getRatingColor(4)).toBe('hsla(352, 100%, 61%, 1)');
    expect(UtilsService.getRatingColor(2)).toBe('hsla(352, 100%, 61%, 1)');
  });
  it('if it does not receive a number as an argument, it throws a TypeError with a descriptive error message', () => {
    const errors = [[2], { vote_average: 7.7 }, null, undefined, true, '150', 150n];
    errors.forEach(error => {
      const errorThrower = () => UtilsService.getRatingColor(error);
      expect(errorThrower).toThrow(TypeError);
      expect(errorThrower).toThrow(`Argument must be a number. Received: ${error} (${typeof (error)})`);
    });
  });
});
