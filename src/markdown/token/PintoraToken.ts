import Token from "../Token.js";
import RootToken from "./RootToken.js";
/**
 * Pintora
 */
export default class PintoraToken extends Token {
  htmlize(text: string) {
    this.scanParent(RootToken)!.usePintona();
    return `<div class="pintora">${text}</div>`;
  }
}
