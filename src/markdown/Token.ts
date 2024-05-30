/**
 * ドキュメントを解析した後に作られるトークンとその一覧を管理
 * デバッグ時のダンプのしやすさを考慮して、
 * オブジェクトツリーにはせず、配列とIDによる参照をで管理する。
 * どこからでも全体にアクセスできるし辞書にもアクセスできる。
 */
import { dump } from "./Dump.js";
import type Book from "./Book.js";
import type Page from "./Page.js";
import Crc64 from "./lib/Crc64.js";
//@ts-ignore
//import crc32 from "crc/crc32";

export default class Token {
  // クラス内のローカルなメンバ
  public readonly id: number;
  public readonly book: Book;
  public readonly page: Page;
  public readonly parent: Token;
  protected children: Token[];

  /**
   * コンストラクタ
   */
  constructor(parent: Token | Page) {
    if (parent instanceof Token) {
      this.book = parent.book;
      this.page = parent.page;
      this.parent = parent;
      parent.children.push(this);
    } else {
      this.book = parent.book;
      this.page = parent;
      this.parent = undefined!;
    }
    this.id = this.book.nextTokenID;
    this.children = [];
  }

  /**
   * 指定された型のトークンが見つかるまで親に向かってスキャン
   */
  scanParent<T extends Token>(type: new (parent: Token) => T): T | undefined {
    for (let token = this as Token; token; token = token.parent) {
      if (token instanceof type) return token;
    }
    return undefined;
  }

  /**
   
   */
  scan(callback: (token: Token) => void): void {
    const scan = (token: Token) => {
      callback(token);
      for (const child of token.children) {
        scan(child);
      }
    };
    scan(this);
  }

  /**
   * 同じトークンか？
   */
  equals(target?: Token) {
    return this === target;
  }

  /**
   * 子トークンを持っているか？
   */
  get childCount() {
    return this.children.length;
  }

  /**
   * 自分以下のトークンをレンダリング
   */
  getHtml() {
    // レンダリング
    const render = (token: Token) => {
      // 先に子トークンを処理して親トークンの引数にする
      let text = "";
      token.children.forEach((token) => {
        text += render(token);
      });
      // 子から取り出したテキストを処理する
      return token.htmlize(text);
    };
    return render(this);
  }

  /**
   * トークンを作成して子として登録する
   */
  add<T extends Token>(type: new (parent: Token) => T) {
    return new type(this);
  }

  /**
   * トークンの型を調べる
   */
  isType<T extends Token>(type: new (parent: Token) => T) {
    return this instanceof type;
  }

  /** dump */
  dump() {
    return dump(this, "------------------------ token");
  }

  /** forEach */
  forEach(callback: (token: Token) => void) {
    this.children.forEach(callback);
  }

  escapeAttribute(attr: string) {
    return Token.escapeAttribute(attr);
  }

  /** escape tag attribute */
  static escapeAttribute(attr: string) {
    attr = attr ?? "";
    if (attr.indexOf("javascript:") >= 0) {
      return "";
    }
    attr = attr.replaceAll('"', '\\"');
    attr = attr.replaceAll("<", "&lt;");
    attr = attr.replaceAll(">", "&gt;");
    return attr;
  }

  /** */
  static readonly base62 =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  getHeaderID(header: string) {
    return Token.getHeaderID(header);
  }
  static getHeaderID(header: string) {
    return new Crc64(header).base62;
  }

  /**
   * オーバーライドして利用するHTML化関数
   */
  htmlize(text: string) {
    return text;
  }
}
