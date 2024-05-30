import SummaryToken from "../token/SummaryToken.js";
import TagChunk from "./TagChunk.js";
import Token from "../Token.js";
/**
 * リスト
 */
export default class SumamryTagChunk extends TagChunk {
  tokenize(parent: Token): Token {
    const details = parent.add(SummaryToken);
    super.tokenize(details);
    return parent;
  }
}
