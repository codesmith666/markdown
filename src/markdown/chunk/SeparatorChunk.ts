import Token from "../Token.js";
import SeparatorToken from "../token/SeparatorToken.js";
import DataChunk from "./DataChunk.js";

/**
 * セパレータ
 */
export default class SeparatorChunk extends DataChunk {
  tokenize(parent: Token): Token {
    parent.add(SeparatorToken);
    return parent;
  }
}
