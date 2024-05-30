import Token from "../Token.js";
import Line from "../Line.js";
import DocumentChunk from "./DocumentChunk.js";
import BreakToken from "../token/BreakToken.js";
import QuoteToken from "../token/QuoteToken.js";
import DataChunk from "./DataChunk.js";

export class Quote {
  static tokenize(lines: string[], parent: Token) {
    // get iterator
    function* getLineIte() {
      for (let i = 0; i < lines.length; i++) {
        yield lines[i];
      }
    }
    // getLine
    const getLine = (ite: Generator<string, void, unknown>) => {
      const next = ite.next();
      return next.done ? undefined : next.value;
    };
    //
    const ite = getLineIte();
    const quoting = (parent: Token, depth: number, line?: string) => {
      while (line) {
        line = line.trim();
        const matched = line.match(/^(?<indent>(>\s*)+)(?<text>.*)$/);
        if (matched && matched.groups) {
          let indent = 0;
          for (const c of matched.groups["indent"]) {
            if (c === ">") indent++;
          }
          if (depth === indent) {
            DocumentChunk.tokenize(matched.groups["text"], parent);
            parent.add(BreakToken);
          } else if (depth < indent) {
            line = quoting(parent.add(QuoteToken), depth + 1, line);
            if (line) continue;
          } else {
            return line;
          }
        }
        line = getLine(ite);
      }
      return undefined;
    };
    quoting(parent, 0, getLine(ite));
  }
}

export default class QuoteChunk extends DataChunk {
  tokenize(parent: Token): Token {
    Quote.tokenize(this.texts, parent);
    return parent;
  }
}
