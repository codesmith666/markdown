type LineType = (typeof Line.names)[number];
export default class Line {
  text: string;
  number: number;
  indent: number;
  tag: string;

  /** constructor */
  constructor(
    text: string,
    number: number,
    indent: number = 0,
    tag: string = ""
  ) {
    this.text = text;
    this.number = number;
    this.indent = indent;
    this.tag = tag;
  }

  addText(text: string) {
    this.text += text;
  }

  fork(text: string) {
    return new Line(text, this.number);
  }

  /**
   * ライン識別（順序に注意）
   *  <t> 識別タグ
   *  <i> インデント
   *  <x> テキストデータ
   */
  static readonly detectors = [
    { name: "header", regexp: `(?<t>#+) +(?<x>.*)` },
    { name: "separator", regexp: `(?<t>[-_*=]{3,})` },
    { name: "list", regexp: `(?<i>[\\t ]*)(?<t>-|\\d+\\.) +(?<x>.*)` },
    { name: "table", regexp: `(?<x>(?<t>[-+# ]?\\|).*\\|)\\s*` },
    { name: "quote", regexp: `(?<x>((?<t>>)\\s*)+(.*))` },
    { name: "block", regexp: "(?<t>```|@@@) *(?<x>.*) *" },
    { name: "code", regexp: `(?<t>(\t|    ))(?<x>.*)` },
    { name: "period", regexp: `(?<t>)` }, // 空行にマッチ
    { name: "document", regexp: `(?<x>.+)` }, // 最後にどんな文字列にもマッチさせる
  ] as const;
  /** */
  static readonly names = this.detectors.map((detector) => detector.name);
  static readonly detector = new RegExp(
    this.detectors
      .map((detector) => {
        return `^(?<${detector.name}>${detector.regexp})$`
          .replaceAll("<t>", `<${detector.name}Tag>`)
          .replaceAll("<i>", `<${detector.name}Indent>`)
          .replaceAll("<x>", `<${detector.name}Text>`);
      })
      .join("|")
  );

  /**
   * 文字列文字列を解析してLineTypeとLineクラスを得る
   *
   * @param lineText
   * @returns
   */
  static get(lineText: string, number: number): { type: LineType; line: Line } {
    const groups = lineText.match(this.detector)!.groups!;
    if (groups) {
      const type = this.names.find((n) => groups[n] !== undefined)! as LineType;
      //const text = (groups[type + "Text"] || "") + "\n"; // important \n
      const text = groups[type + "Text"] || "";
      const indent = (groups[type + "Indent"] || "").length;
      const tag = groups[type + "Tag"] || "";
      return { type, line: new Line(text, number, indent, tag) };
    }
    console.error(`lineText:"${lineText}"`);
    return undefined!;
  }
}
