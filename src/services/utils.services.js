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

  static textShortener (text) {
    if (typeof text !== 'string') {
      throw new TypeError(`Argument must be a string. Received: ${text} (${typeof (text)})`);
    }
    return text
      .trim()
      .split(' ')
      .slice(0, 15)
      .join(' ') + ' [...]';
  }

  static getFullYear (string) {
    if (typeof string !== 'string') {
      throw new TypeError(`Argument must be a string. Received: ${string} (${typeof (string)})`);
    }
    return new Date(string).getFullYear();
  }
}
