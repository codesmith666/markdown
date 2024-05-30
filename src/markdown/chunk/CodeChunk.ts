import Prism from "../Prism.js";
import Token from "../Token.js";
import TextToken from "../token/TextToken.js";
import NoteToken from "../token/NoteToken.js";
import KatexToken from "../token/KatexToken.js";
import PrismToken from "../token/PrismToken.js";
import MermaidToken from "../token/MermaidToken.js";
import PintoraToken from "../token/PintoraToken.js";
import PlantUmlToken from "../token/PlantUmlToken.js";
import DataChunk from "./DataChunk.js";
import DocumentChunk from "./DocumentChunk.js";
import { Table } from "./TableChunk.js";
import { Quote } from "./QuoteChunk.js";

/**
 * コードブロック
 */
export default class CodeChunk extends DataChunk {
  // コードブロックの中身をどのようにレンダリングするか
  protected _type: string = "plain";
  protected _tag: string = "";

  set type(type: string) {
    this._type = type.trim();
  }
  set tag(tag: string) {
    this._tag = tag;
  }

  /**
   * 別のdsnをインポートする
   */
  import(parent: Token) {
    this.lines.forEach(async (line) => {
      const path = line.text.trim();
      // コメント行は無視
      if (!path.startsWith("//")) {
        // プレースホルダがないとロードの順番が壊れる
        const placeHolder = parent.add(Token);
        // Bookを共有する新しいページを作成して
        const page = this.page.fork();
        // ロードする
        const promise = page.load(placeHolder, path, this.page.path);
        this.page.book.promises.push(promise);
      }
    });
  }

  /**
   * prismで表示
   */
  prism(parent: Token) {
    let grammer = Prism.languages[this._type];
    if (!grammer) {
      this._type = "plain";
      grammer = Prism.languages[this._type];
    }
    const prismToken = parent.add(PrismToken);
    prismToken.type = this._type;
    prismToken.grammer = grammer;

    const textToken = prismToken.add(TextToken);
    textToken.text = this.plain;
  }

  /**
   * noteで表示
   */
  note(parent: Token, args: string[]) {
    const note = parent.add(NoteToken);
    let level = "note";
    for (const lv of ["info", "warn", "warning", "error", "alert"]) {
      if (args.includes(lv)) {
        level = lv;
        break;
      }
    }
    DocumentChunk.tokenize(level + " " + this.plain, note);
  }

  /**
   * pintora
   */
  pintora(parent: Token) {
    const pintoraToken = parent.add(PintoraToken);
    const textToken = pintoraToken.add(TextToken);
    textToken.text = this.plain;
    textToken.isDirty = false;
  }

  /**
   * plantumlで表示
   */
  plantuml(parent: Token) {
    const plantumlToken = parent.add(PlantUmlToken);
    const textToken = plantumlToken.add(TextToken);
    textToken.text = this.plain;
    textToken.isDirty = false;
  }

  /**
   * mathmaxで表示
   */
  mathjax(parent: Token, args: string[]) {
    const textToken = parent.add(TextToken);
    textToken.text = "not supported.";
    textToken.isDirty = false;
    //   const mathjaxToken = parent.add(MathjaxToken);
    //   mathjaxToken.isBlock = true;
    //   const textToken = mathjaxToken.add(TextToken);
    //   textToken.text = this.plain;
    //   textToken.isDirty = false;
  }

  /**
   * katexで表示
   */
  katex(parent: Token, args: string[]) {
    const katexToken = parent.add(KatexToken);
    katexToken.isBlock = true;

    const textToken = katexToken.add(TextToken);
    textToken.text = this.plain;
    textToken.isDirty = false;
  }

  /**
   * mermaid
   */
  mermaid(parent: Token) {
    const mermaidToken = parent.add(MermaidToken);

    const textToken = mermaidToken.add(TextToken);
    textToken.text = this.plain;
    textToken.isDirty = false;
  }

  /**
   * youtube
   */
  youtube(parent: Token) {
    const params = this.params;
    const id = Token.escapeAttribute(params.id || "");
    const width = Token.escapeAttribute(params.width || "640");
    const height = Token.escapeAttribute(params.height || "360");
    const title = Token.escapeAttribute(params.title || "untitled");
    const arrow = [
      "accelerometer",
      "autoplay",
      "clipboard-write",
      "encrypted-media",
      "gyroscope",
      "picture-in-picture",
      "web-share",
    ];

    const w = `width="${width}"`;
    const h = `height="${height}"`;
    const s = `src="https://www.youtube.com/embed/${id}"`;
    const t = `title="${title}"`;
    const f = `frameborder="0"`;
    const a = `arrow="${arrow.join("; ")}"`;
    const o = `allowfullscreen`;

    const textToken = parent.add(TextToken);
    textToken.text = `<iframe ${w} ${h} ${s} ${t} ${f} ${a} ${o}></iframe>`;
    textToken.isDirty = false;
  }

  /**
   * table
   */
  table(parent: Token) {
    const table = new Table(this.texts);
    table.tokenize(parent);
  }

  /**
   * quote
   */
  quote(parent: Token) {
    // lineのイテレータを取得
    Quote.tokenize(this.texts, parent);
  }

  /**
   *
   */
  image(parent: Token) {
    const params = this.params;
    const src = Token.escapeAttribute(params.src ?? "");
    const width = Token.escapeAttribute(params.width ?? "");
    const height = Token.escapeAttribute(params.height ?? "");
    const align = Token.escapeAttribute(params.align ?? "");
    const href = Token.escapeAttribute(params.href ?? "");
    if (src) {
      const path = this.page.book.normalizePath(src, this.page.path, false);
      const textToken = parent.add(TextToken);
      textToken.text = this.page.book.onImageHtml(
        path,
        width,
        height,
        align,
        href
      );
      textToken.isDirty = false;
    }
  }

  /**
   * token化
   */
  tokenize(parent: Token) {
    // コード以外
    const args = this._type.split(/\s+|:+/);
    const type = args.shift();
    switch (type) {
      case "import":
        this.import(parent);
        break;
      case "table":
        this.table(parent);
        break;
      case "quote":
        this.quote(parent);
        break;
      case "note":
        this.note(parent, args);
        break;
      case "pintora":
        this.pintora(parent);
        break;
      case "plantuml":
        this.plantuml(parent);
        break;
      case "mathjax":
        this.mathjax(parent, args);
        break;
      case "katex":
        this.katex(parent, args);
        break;
      case "youtube":
        this.youtube(parent);
        break;
      case "mermaid":
        this.mermaid(parent);
        break;
      case "image":
        this.image(parent);
        break;
      case "upsert":
      case "query":
      default:
        //this.dump();
        this.prism(parent);
        break;
    }
    return parent;
  }

  /**
   * 対応しているコードの一覧を返す
   */
  static readonly codes = Object.keys(Prism.languages).filter(
    (name) => Prism.languages[name]
  );
}
