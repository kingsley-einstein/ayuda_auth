export class Validator {
  /**
   * 
   * @param {object} body 
   * @param {string[]} keys 
   */
  static checkFields(body, keys) {
    return keys.every((key) => {
      return Object.keys(body).includes(key);
    });
  }
}
