import Token from "../Token.js";

/**
 * StrikeLine
 */
export default class StrikeLineToken extends Token {
  htmlize(text: string) {
    return `<span class="strikeLine">${text}</span>`;
  }
}
