import Token from "../Token.js";
/**
 * Underline
 */
export default class UnderlineToken extends Token {
  htmlize(text: string) {
    return `<span class="underline">${text}</span>`;
  }
}
