import Style from "../lib/Style.js";
import Token from "../Token.js";
/**
 * Bold
 */
export default class StyleToken extends Token {
  private _style: string = "";
  get style() {
    return this._style;
  }
  set style(styles: string) {
    const css: { [key: string]: string } = {};
    for (const style of styles.split(",")) {
      if (!style) continue;
      const d = Style.isDisplay(style);
      if (d) {
        css.d = d;
        continue;
      }
      const s = Style.isSize(style);
      if (s) {
        css.s = s;
        continue;
      }
      const c = Style.isColor(style);
      if (c) {
        css.c = c;
        continue;
      }
    }
    this._style = Object.values(css).join("");
  }
  htmlize(text: string) {
    if (this.style) {
      return `<span style="${this.style}"/>${text}</span>`;
    }
    return `""${text}""`;
  }
}
