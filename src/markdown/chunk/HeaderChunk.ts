import Token from "../Token.js";
import HeaderToken from "../token/HeaderToken.js";
import DataChunk from "./DataChunk.js";
/**
 * ヘッダ
 */
export default class HeaderChunk extends DataChunk {
  tokenize(parent: Token): Token {
    const text = this.lines[0].text;
    const level = (this.lines[0].tag || "#").length;
    const header = parent.add(HeaderToken);
    header.level = level;
    header.text = text.trim();
    return parent;
  }
}
