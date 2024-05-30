import Token from "../Token.js";
import Prism from "../Prism.js";

/**
 * Bold
 */
export default class PrismToken extends Token {
  type: string = "plane";
  grammer: any = Prism.languages.plane;
  /** htmlレンダリング */
  htmlize(text: string) {
    const html = Prism.highlight(text, this.grammer, this.type);
    return `<span class="prism"><pre class="language-">${html}</pre></span>`;
  }
}
