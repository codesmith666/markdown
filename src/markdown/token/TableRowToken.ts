import Token from "../Token.js";
/**
 * TableRowToken
 */
export default class TableRowToken extends Token {
  htmlize(text: string) {
    return `<tr class="tr">${text}</tr>`;
  }
}
