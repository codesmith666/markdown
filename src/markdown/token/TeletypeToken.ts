import Token from "../Token.js";
import Style from "../lib/Style.js";
/**
 * Teletype
 */
export default class TeletypeToken extends Token {
  htmlize(text: string) {
    text = text.trim();
    const cssColor = Style.isColor(text);
    if (cssColor) {
      const style = `display:inline-block;width:12px;height:12px;background-${cssColor};margin-left:4px;`;
      text += `<span style="${style}"></span>`;
    }
    return `<span class="teletype"/>${text}</span>`;
  }
}
