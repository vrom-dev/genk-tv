import { UtilsService } from '../../src/services/utils.services';

describe('Slugify', () => {
  it('returns a new normalized String converted to slug', () => {
    const title = 'Las aventuras de Pil';
    const slug = UtilsService.slugify(title);
    expect(slug).toBe('las-aventuras-de-pil');
  });
  it('removes all chars not letters, numbers and spaces from the text', () => {
    const title = 'Virus-32{}[]/*-+!"·$%/$&)/=';
    const slug = UtilsService.slugify(title);
    expect(slug).toBe('virus32');
  });
  it('removes all accents from the text', () => {
    const title = 'Sonic 3: la Película';
    const slug = UtilsService.slugify(title);
    expect(slug).toBe('sonic-3-la-pelicula');
  });
  it('does not receive a string as an argument, it throws a TypeError with a descriptive error message', () => {
    const errors = [['Sonic 3: la Película'], { title: 'Sonic 3: la Película' }, null, undefined, true, 150, 150n];
    errors.forEach(error => {
      const errorThrower = () => UtilsService.slugify(error);
      expect(errorThrower).toThrow(TypeError);
      expect(errorThrower).toThrow(`Argument must be a string. Received: ${error} (${typeof (error)})`);
    });
  });
});
