import Token from "../Token.js";

/**
 * UnorderedList
 */
export default class UnorderedList extends Token {
  htmlize(text: string) {
    return `<ul class="ul">${text}</ul>`;
  }
}
