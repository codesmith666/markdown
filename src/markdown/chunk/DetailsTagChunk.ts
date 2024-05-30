import DetailsToken from "../token/DetailsToken.js";
import TagChunk from "./TagChunk.js";
import Token from "../Token.js";
/**
 * リスト
 */
export default class DetailsTagChunk extends TagChunk {
  tokenize(parent: Token): Token {
    const details = parent.add(DetailsToken);
    super.tokenize(details);
    return parent;
  }
}
