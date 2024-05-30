import katex from "katex";

import Token from "../Token.js";
/**
 * Header
 */
export default class MathjaxToken extends Token {
  public isBlock: boolean = false;

  constructor(parent: Token) {
    super(parent);
  }

  htmlize(text: string) {
    const string = katex.renderToString(text, {
      throwOnError: false,
      output: "mathml",
    });
    if (this.isBlock) {
      return `<div class="center"><div class="mathjax block">${string}</div></div>`;
    }
    return `<div class="mathjax inline">${string}</div>`;
  }
}
