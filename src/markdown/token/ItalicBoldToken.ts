import Token from "../Token.js";
/**
 * ItalicBold
 */
export default class ItalicBoldToken extends Token {
  htmlize(text: string) {
    return `<span class="italicbold"/>${text}</span>`;
  }
}
