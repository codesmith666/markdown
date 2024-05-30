import Token from "../Token.js";
import RootToken from "./RootToken.js";
/**
 * Anchor
 */
export default class MermaidToken extends Token {
  htmlize(text: string) {
    this.scanParent(RootToken)!.useMermaid();
    return `<pre class="mermaid">${text}</pre>`;
  }
}
