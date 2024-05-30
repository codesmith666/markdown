import Token from "../Token.js";

/**
 * StoreToken
 */
export default class StoreToken extends Token {
  key: string = "";
  openTag: string = "";
  closeTag: string = "";
  open(key: string, openTag: string) {
    this.key = key;
    this.openTag = openTag;
    return this;
  }
  close(closeTag: string) {
    this.closeTag = closeTag;
    return this;
  }
  htmlize(text: string) {
    this.book.setDict(this.key, text);
    return ``;
  }
}
