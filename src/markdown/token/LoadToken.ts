import Token from "../Token.js";
import CodeChunk from "../chunk/CodeChunk.js";
/**
 * LoadToken
 */
export default class LoadToken extends Token {
  filters: string[] = [];
  open() {
    return this;
  }
  close(filters: string[]) {
    this.filters = filters;
    return this;
  }
  htmlize(text: string) {
    switch (text) {
      case "br":
        return "<br />";
      case "formats":
        return CodeChunk.codes.join(" ");
    }
    return this.book.getDict(text) || "";
  }
}
