export class UtilsService {
  static slugify (text) {
    if (typeof text !== 'string') {
      throw new TypeError(`Argument must be a string. Received: ${text} (${typeof (text)})`);
    }
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }

  static textShortener (text, numOfWords = 50) {
    if (typeof text !== 'string') {
      throw new TypeError(`Argument must be a string. Received: ${text} (${typeof (text)})`);
    }
    if (text.length < numOfWords) return text;

    return text.substring(0, numOfWords - 3) + '...';
  }

  static getFullYear (string) {
    if (typeof string !== 'string') {
      throw new TypeError(`Argument must be a string. Received: ${string} (${typeof (string)})`);
    }
    return new Date(string).getFullYear();
  }

  static getRatingColor (rating) {
    if (typeof rating !== 'number') {
      throw new TypeError(`Argument must be a number. Received: ${rating} (${typeof (rating)})`);
    }
    const COLORS = {
      GOOD: 'hsla(143, 60%, 54%, 1)',
      REGULAR: 'hsla(44, 95%, 63%, 1)',
      BAD: 'hsla(352, 100%, 61%, 1)'
    };
    if (rating >= 7) return COLORS.GOOD;
    if (rating >= 5) return COLORS.REGULAR;
    return COLORS.BAD;
  }
}
