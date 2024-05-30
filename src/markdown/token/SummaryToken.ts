import Token from "../Token.js";
/**
 * Break
 */
export default class SummaryToken extends Token {
  htmlize(text: string) {
    return `<summary>${text}</summary>`;
  }
}
