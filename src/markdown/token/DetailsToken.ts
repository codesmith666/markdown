import Token from "../Token.js";
/**
 * Break
 */
export default class DetailsToken extends Token {
  htmlize(text: string) {
    const classes = this.parent.parent ? "details nested" : "details";

    return `<details class="${classes}">${text}</details>`;
  }
}
