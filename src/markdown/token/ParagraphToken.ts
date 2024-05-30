import Token from "../Token.js";
/**
 * ParagraphToken
 */
export default class ParagraphToken extends Token {
  htmlize(text: string) {
    // Pタグは閉じなくていいという変態仕様になったらしいのでDIVタグにする
    return `<div class="paragraph">${text}</div>`;
  }
}
