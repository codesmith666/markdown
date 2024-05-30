import Token from "../Token.js";
/**
 * Anchor
 */
export default class AnchorToken extends Token {
  htmlize(text: string) {
    return `<a class="anchor" href="${text}" target="_blank">${text}</a>`;
  }
}
