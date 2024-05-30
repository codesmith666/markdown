import Token from "../Token.js";
/**
 * Bold
 */
export default class BoldToken extends Token {
  htmlize(text: string) {
    return `<span class="bold"/>${text}</span>`;
  }
}
