// 段落
import NodeChunk from "./NodeChunk.js";
import ParagraphToken from "../token/ParagraphToken.js";
import Token from "../Token.js";

export default class ParagraphChunk extends NodeChunk {
  tokenize(parent: Token): Token {
    if (this.children.length > 0) {
      const paragraphToken = parent.add(ParagraphToken);
      for (const chunk of this.children) {
        // chunk.dump();
        chunk.tokenize(paragraphToken);
      }
    }
    return parent;
  }
}
