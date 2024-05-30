import Token from "../Token.js";
/**
 * TableDataToken
 */
export type TextAlign = "Left" | "Right" | "Center" | "None";
export type TagType = "th" | "td";

export default class TableDataToken extends Token {
  public tag: TagType = "th";
  public colspan: number = 0;
  public rowspan: number = 0;
  public align: TextAlign = "Left";
  static alignToClass = {
    None: "",
    Left: "textLeft",
    Right: "textRight",
    Center: "textCenter",
  };
  htmlize(text: string) {
    const colspan = this.colspan > 1 ? `colspan="${this.colspan}"` : "";
    const rowspan = this.rowspan > 1 ? `rowspan="${this.rowspan}"` : "";
    const align = TableDataToken.alignToClass[this.align] || "";
    const tag = this.tag;
    return `<${tag} class="${tag} ${align}" ${colspan} ${rowspan} >${text}</${tag}>`;
  }
}
