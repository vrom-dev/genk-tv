import { UtilsService } from '../../src/services/utils.services';

describe('textShortener()', () => {
  it('returns a shortened version of a string ending with `...`', () => {
    const string = 'Después de establecerse en Green Hills, Sonic se muere por demostrar que tiene madera de auténtico héroe, pero Robotnik regresa con nuevo compañero Knuckles, en busca de una esmeralda que tiene el poder de destruir civilizaciones, pero Sonic no esta solo lo ayudara Tails.';
    const shortenedString = UtilsService.textShortener(string);
    expect(shortenedString.endsWith('...')).toBe(true);
  });

  it('the length of the returned string can be specified', () => {
    const string = 'Después de establecerse en Green Hills, Sonic se muere por demostrar que tiene madera de auténtico héroe, pero Robotnik regresa con nuevo compañero Knuckles, en busca de una esmeralda que tiene el poder de destruir civilizaciones, pero Sonic no esta solo lo ayudara Tails.';
    const shortenedString = UtilsService.textShortener(string, 100);
    expect(shortenedString.length).toBe(100);
    expect(shortenedString.endsWith('...')).toBe(true);
  });

  it('returns the original string if the length specified is less than the length of the string', () => {
    const string = 'Después de establecerse en Green Hills';
    const shortenedString = UtilsService.textShortener(string, 100);
    expect(shortenedString).toBe(string);
  });

  it('if it does not receive a string as an argument, it throws a TypeError with a descriptive error message', () => {
    const errors = [['Hello World'], { text: 'Hello World' }, null, undefined, true, 150, 150n];
    errors.forEach(error => {
      const errorThrower = () => UtilsService.textShortener(error);
      expect(errorThrower).toThrow(TypeError);
      expect(errorThrower).toThrow(`Argument must be a string. Received: ${error} (${typeof (error)})`);
    });
  });
});
