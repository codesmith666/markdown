import Token from "../Token.js";
/**
 * Quote
 */
export default class QuoteToken extends Token {
  htmlize(text: string) {
    return `<pre class="quote">${text}</pre>`;
  }
}
