import Token from "../Token.js";

/**
 * Table
 */
export default class TableTable extends Token {
  htmlize(text: string) {
    return `<table class="table">${text}</table>`;
  }
}
