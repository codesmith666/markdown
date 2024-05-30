import Token from "../Token.js";
/**
 * Break
 */
export default class BreakToken extends Token {
  htmlize(text: string) {
    return `<br />`;
  }
}
