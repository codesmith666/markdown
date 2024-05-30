import Token from "../Token.js";
import PrismToken from "./PrismToken.js";
//import MathjaxToken from "./MathjaxToken";
//import PlantUmlToken from "./PlantUmlToken";
/**
 * Text
 */
export default class TextToken extends Token {
  // 上層でsanitizeが入る場合はisCleanをtrueにする
  isDirty = true;
  private _text: string = "";

  constructor(parent: Token) {
    super(parent);
    switch (true) {
      // 親でサニタイズされるものは生テキストを返すようにする
      //case parent instanceof MathjaxToken:
      //case parent instanceof PlantUmlToken:
      case parent instanceof PrismToken:
        this.isDirty = false;
        break;
    }
  }

  set text(text: string) {
    this._text = text;
  }
  get text() {
    //  基本的にtextというのは汚れているので sanitize する
    if (this.isDirty) {
      return this._text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
    }
    //console.log(this._text);
    return this._text;
  }

  htmlize(text: string) {
    return this.text;
  }
}
