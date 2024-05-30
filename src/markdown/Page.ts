import Line from "./Line.js";
import Chunk from "./Chunk.js";
import Token from "./Token.js";
import DocumentChunk from "./chunk/DocumentChunk.js";
import CodeChunk from "./chunk/CodeChunk.js";
import HeaderChunk from "./chunk/HeaderChunk.js";
import SeparatorChunk from "./chunk/SeparatorChunk.js";
import ListChunk from "./chunk/ListChunk.js";
import TableChunk from "./chunk/TableChunk.js";
import QuoteChunk from "./chunk/QuoteChunk.js";
import NodeChunk from "./chunk/NodeChunk.js";
import ParagraphChunk from "./chunk/ParagraphChunk.js";
import DetailsTagChunk from "./chunk/DetailsTagChunk.js";
import SummaryTagChunk from "./chunk/SummaryTagChunk.js";
import CommentTagChunk from "./chunk/CommentTagChunk.js";
import Book from "./Book.js";
import { dump } from "./Dump.js";

/**
 * DSNに対応したPageオブジェクト＝表示の単位。
 * 複数のChunkを管理する。
 */
export default class Page {
  // LineTypeで識別されたLineを保持するChunkクラス
  static readonly wrappers = {
    header: HeaderChunk,
    separator: SeparatorChunk,
    code: CodeChunk,
    document: DocumentChunk,
    list: ListChunk,
    table: TableChunk,
    quote: QuoteChunk,
  } as const;

  static readonly markups = {
    details: DetailsTagChunk,
    summary: SummaryTagChunk,
    comment: CommentTagChunk,
  };
  static readonly markup =
    /\<!--|--\>|<\s*(?<close>\/?)\s*(?<tag>[a-zA-Z]+)\s*(?<attr>[^/]*?)(?<oneliner>[/]?)>/;

  protected _id: number;
  private _path: string;
  public readonly book: Book;
  /** コンストラクタ */
  constructor(book: Book) {
    this.book = book;
    this._id = this.book.nextPageID;
    this._path = "";
  }

  get id() {
    return this._id;
  }

  get path() {
    return this._path;
  }

  /** ドキュメントをロードする */
  async load(parent: Token, dsn: string, from: string) {
    const normalized = this.book.normalizePath(dsn, from, false);
    const { path, markdown } = await this.book.onLoad(normalized);
    this._path = path;
    this.chunking(markdown).tokenize(parent);
  }

  /** Bookを共有した新しいPageを作成する */
  fork() {
    return new Page(this.book);
  }

  /** 検出した行のChunkクラスを返す */
  wrapper(type: keyof typeof Page.wrappers) {
    return Page.wrappers[type];
  }

  /** 検出したタグのChunkクラスを返す */
  makeup(type: keyof typeof Page.markups) {
    return Page.markups[type];
  }

  /** 行をパースしてチャンクを生成していく */
  parseMarkup(parent: NodeChunk, line: Line) {
    let source = line.text;
    /**
     *
     * @param parent
     * @param depth
     * @returns  戻り先のインデントレベルを示すNodeChunkを返す
     */
    let current = parent;
    const parse = (parent: NodeChunk): NodeChunk | undefined => {
      //setCurrent(parent, "parse()開始");
      while (source) {
        // タグが存在するか検索する
        const match = source.match(Page.markup);
        // マッチしなかったので全部をドキュメントとして取り込む
        if (!match) {
          parent.getCurrent(DocumentChunk).addLine(line.fork(source), true);
          source = "";
          break;
        }

        // コメントタグの特別処理
        switch (match[0]) {
          case "<!--":
          case "-->":
            match.groups = {
              close: match[0] === "-->" ? "/" : "",
              tag: "comment",
              attr: "",
              oneliner: "",
            };
            break;
        }

        // マッチした手前にテキストがあればドキュメントとして取り込む
        const index = match.index || 0;
        if (index > 0) {
          const doc = source.slice(0, index);
          source = source.slice(index);
          parent.getCurrent(DocumentChunk).addLine(line.fork(doc), true);
        }

        // マッチしたタグの処理
        const tag = match[0];
        const groups = match.groups!;
        const name = groups.tag.toLowerCase() as keyof typeof Page.markups;
        const isOpenTag = !groups.close;
        const attr = groups.attr;

        // タグを見つけたんでその分進める
        source = source.slice(tag.length);

        // チャンククラスを取得してみる
        // 無かったらそのままテキストとして取り込む
        const markup = Page.markups[name];
        if (!markup) {
          parent.getCurrent(DocumentChunk).addLine(line.fork(tag), true);
          continue;
        }

        // 開きタグだったら再帰して中に入る
        if (isOpenTag) {
          const open = (current = parent.addChild(markup));
          open.attributes = attr;
          const close = parse(open);
          // 一致するまで再帰を解消する
          if (!open.equals(close)) {
            return close;
          }
          continue;
        }
        //  閉じタグだったら開きタグまで再帰を解消する
        const open = parent.scanParent(markup);
        if (open) {
          current = open.parent;
          return open;
        } else {
          // いきなり閉じタグが現れたのでドキュメントとして取得する
          parent.getCurrent(DocumentChunk).addLine(line.fork(tag), true);
        }
      }
      return undefined; //  現状を維持する
    };
    parse(parent);
    return current;
  }

  /**
   * テキストをパースして得られたチャンクをparentに設定する
   * @param source
   */
  chunking(source: string): Chunk {
    const hoge = source;
    // 全行スキャンの準備
    function* iterator() {
      const lines = source.split(/\r\n|\r|\n/);
      for (let i = 0; i < lines.length; i++) {
        const lineText = lines[i];
        const lineNumber = i + 1;
        yield { lineText, lineNumber };
      }
    }
    const ite = iterator();

    const chunking = (parent: NodeChunk): NodeChunk => {
      // コードブロックを認識するためのフラグ
      var isBlock = "";

      for (const { lineText, lineNumber } of ite) {
        //  行を検査してtypeとlineを得る
        let { type, line } = Line.get(lineText, lineNumber);

        // ブロックの開始・終了処理制御
        if (type === "block") {
          const block = line.tag;
          // 開始
          if (!isBlock) {
            const codeChunk = parent.addChild(CodeChunk);
            codeChunk.type = line.text;
            codeChunk.tag = line.tag;
            isBlock = block;
            continue;
          }
          // 終了（開いたタイプでしか閉じられない）
          else if (isBlock === block) {
            isBlock = "";
            continue;
          }
        }

        // ブロックのときは検査結果を捨ててcodeとする
        if (isBlock) {
          type = "code";
          line = new Line(lineText, lineNumber);
        }

        //  目次を作る（非同期読み込みがあるので目次はgetHtmlで作成）
        // if (type === "header") {
        //   this.book.addContents(line.tag.length, line.text.trim());
        // }

        // ラインタイプ別処理
        switch (type) {
          case "header":
          case "separator":
            if (parent instanceof ParagraphChunk) {
              parent = parent.parent;
            }
            parent.addChild(this.wrapper(type)).addLine(line);

            parent = parent.addChild(ParagraphChunk);
            break;
          case "code":
            if (parent.isCurrentType(ListChunk)) {
              parent.getCurrent(ListChunk).addListText(line.text);
            } else {
              parent.getCurrent(CodeChunk).addLine(line);
            }
            break;
          case "document":
            if (parent.isCurrentType(ListChunk)) {
              parent.getCurrent(ListChunk).addListText(line.text);
            } else {
              parent = this.parseMarkup(parent, line);
            }
            break;
          case "list":
          case "table":
          case "quote":
            parent.getCurrent(this.wrapper(type)).addLine(line);
            break;
          case "period": {
            if (parent instanceof ParagraphChunk) {
              parent = parent.parent;
            }
            parent = parent.addChild(ParagraphChunk);
            // const last = parent.last;
            // if (last && last instanceof DocumentChunk) {
            //   parent.getCurrent(PeriodChunk);
            // }
            break;
          }
          default:
            console.log("unknown line type -", type);
            break;
        }
      }
      return parent;
    };
    const root = new NodeChunk(this);
    const p = root.addChild(ParagraphChunk);
    chunking(p);
    //this.book.onChunked(root);
    return root;
  }
  dump(wantDump: boolean) {
    return dump(this, "------------------------ page");
  }
}
