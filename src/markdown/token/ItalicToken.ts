import Token from "../Token.js";
/**
 * Italic
 */
export default class ItalicToken extends Token {
  htmlize(text: string) {
    return `<span class="italic"/>${text}</span>`;
  }
}
