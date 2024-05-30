import Token from "../Token.js";
/**
 * Separator
 */
export default class SeparatorToken extends Token {
  htmlize(text: string) {
    return `<hr class="separator"/>`;
  }
}
