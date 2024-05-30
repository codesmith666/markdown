import Token from "../Token.js";
/**
 * OrderedListToken
 */
export default class OrderedListToken extends Token {
  htmlize(text: string) {
    return `<ol class="ol">${text}</ol>`;
  }
}
