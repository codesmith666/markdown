import TagChunk from "./TagChunk.js";
import Token from "../Token.js";
/**
 * リスト
 */
export default class CommentTagChunk extends TagChunk {
  tokenize(parent: Token): Token {
    return parent;
  }
}
