import Token from "../Token.js";
/**
 * ListItem
 */
export default class ListItemToken extends Token {
  htmlize(text: string) {
    return `<li class="li">${text}</li>`;
  }
}
