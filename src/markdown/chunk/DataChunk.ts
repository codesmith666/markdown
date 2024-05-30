import Line from "../Line.js";
import Chunk from "../Chunk.js";
import type Page from "../Page.js";
import NodeChunk from "./NodeChunk.js";
/**
 *
 */
export default abstract class DataChunk extends Chunk {
  /** データ */
  protected lines: Line[];

  /** コンストラクタ */
  constructor(parent: NodeChunk | Page) {
    super(parent);
    this.lines = [];
  }

  /** チャンクに行を追加する */
  addLine(line: Line, space: boolean = false) {
    if (space) line.text = " " + line.text;
    this.lines.push(line);
  }

  /** チャンクの最後の行にテキストを追加する */
  addText(text: string) {
    const lastLine = this.lines[this.lines.length - 1];
    if (!lastLine) {
      console.error("Could not find line to add.");
      return;
    }
    lastLine.addText(text);
  }

  addListText(text: string) {
    const lastLine = this.lines[this.lines.length - 1];
    if (!lastLine) {
      console.error("Could not find line to add.");
    }

    if (lastLine.text.endsWith("~")) {
      lastLine.text = lastLine.text.slice(0, -2) + " " + text;
    } else {
      lastLine.addText("@@br@@" + text);
    }
  }

  /** チャンク内のラインを素のテキストとして取得する(CodeBlock用) */
  get plain() {
    return this.texts.join("\n");
  }

  get texts() {
    return this.lines.map((line) => line.text);
  }

  get params() {
    const params: { [key: string]: string } = {};
    for (let text of this.texts) {
      const splitted = text.split(":");
      const key = splitted.shift();
      const val = splitted.join(":");
      params[(key || "").trim()] = (val || "").trim();
    }
    return params;
  }

  // リンク ]: の短縮表記
  linkLine(line: string) {
    const index = line.indexOf("]:");
    if (index >= 0) {
      return line + "]";
    }
    return undefined;
  }

  // ノート(!!!)の短縮表記
  noteLine(line: string) {
    const reNote = /^(?<prev>.*?)(?<tag>!{3,}\s+)(?<post>.*)$/;
    const match = line.match(reNote);
    if (match) {
      const groups = match.groups!;
      const prev = groups.prev || "";
      const post = (groups.post || "").replace("!", "\\!");
      return prev + "!!!" + post + "!!!";
    }
    return undefined;
  }
  // 強制改行("  ")表記
  returnLine(line: string) {
    if (line.endsWith("  ")) {
      return line + "@@br@@";
    }
    return undefined;
  }

  /** チャンク内のラインをドキュメントとして取得する（DocumentBlock用） */
  get document() {
    return this.lines
      .map((line) => {
        let result;
        result = this.linkLine(line.text);
        if (result) return result;
        result = this.noteLine(line.text);
        if (result) return result;
        result = this.returnLine(line.text);
        if (result) return result;
        return line.text;
      })
      .join("");
  }

  /** array to nest 処理用の generator */
  *getLineIte() {
    for (let i = 0; i < this.lines.length; i++) {
      yield this.lines[i];
    }
  }
  getLine(ite: Generator<Line, void, unknown>) {
    const next = ite.next();
    return next.done ? undefined : next.value;
  }
}
