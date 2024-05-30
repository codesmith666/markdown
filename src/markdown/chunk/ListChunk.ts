import DocumentChunk from "./DocumentChunk.js";
import Token from "../Token.js";
import Line from "../Line.js";
import UnorderedListToken from "../token/UnorderedListToken.js";
import OrderedListToken from "../token/OrderedListToken.js";
import ListItemToken from "../token/ListItemToken.js";
import DataChunk from "./DataChunk.js";

/**
 * リスト
 */
export default class ListChunk extends DataChunk {
  tokenize(parent: Token): Token {
    const ite = this.getLineIte();

    // Quoteの入れ子を再帰しながら描画する
    const listing = (parent: Token, depth: number, line?: Line) => {
      while (line) {
        const d = Math.floor(line.indent / 2);
        if (depth === d) {
          const li = parent.add(ListItemToken);
          DocumentChunk.tokenize(line.text, li);
        } else if (depth < d) {
          const o = line.tag === "-" ? UnorderedListToken : OrderedListToken;
          line = listing(parent.add(o), depth + 1, line);
          if (line) continue;
        } else {
          return line;
        }
        line = this.getLine(ite);
      }
      return undefined;
    };
    listing(parent, -1, this.getLine(ite));
    return parent;
  }
}
