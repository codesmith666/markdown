import Page from "./Page.js";
import Token from "./Token.js";
import RootToken from "./token/RootToken.js";
import HeaderToken from "./token/HeaderToken.js";

/** markdown2htmlの本体 */
export default class Book {
  //protected resolver: Resolver;
  protected assoc: { [key: string]: string };
  protected rootPath: string;
  protected rootToken: Token;
  // デバッグ用のID番号を採番する変数
  protected pageID: number = 0;
  protected tokenID: number = 0;
  protected chunkID: number = 0;
  /** コンストラクタ */
  constructor(rootPath: string) {
    this.assoc = {};
    this.rootToken = undefined!;
    this.rootPath = rootPath.endsWith("/") ? rootPath : rootPath + "/";
    console.log(this.rootPath);
  }

  /** ID採番 */
  get nextPageID() {
    return this.pageID++;
  }
  get nextTokenID() {
    return this.tokenID++;
  }
  get nextChunkID() {
    return this.chunkID++;
  }

  /**
   *
   *
   */
  normalizePath(dsn: string, from: string, wantShortPath: boolean) {
    // fromを正規化
    if (!from || dsn.startsWith("/")) from = this.rootPath + "/dummy";

    // dsnをfromからの相対パスに変更（from は必ずある）
    dsn = from.slice(0, from.lastIndexOf("/")) + "/" + dsn;

    // .. や . を処理
    const names: string[] = [];
    for (const part of dsn.split("/")) {
      if (part === ".") continue;
      if (part === "..") {
        names.pop();
        continue;
      }
      names.push(part);
    }
    const path = names.join("/").replace(/[/]{2,}/g, "/");

    // ディレクトリトラバーシングのチェック
    const starts = path.slice(0, this.rootPath.length);
    if (starts !== this.rootPath) {
      return "";
    }

    // 短いパスを返すか完全なパスを返すか
    const p = wantShortPath ? path.slice(this.rootPath.length) : path;

    return p === "/" ? "" : p;
  }

  /** 目次生成関連 */
  getContents(min: number, max: number, skips: string[]) {
    const contents: { indent: number; text: string }[] = [];

    // トークンをスキャンして目次を集計する
    this.rootToken.scan((token) => {
      if (token instanceof HeaderToken) {
        contents.push({ indent: token.level, text: token.text });
      }
    });

    // イテレータ
    function* iterator() {
      for (const content of contents) {
        const { indent, text } = content;
        if (min <= indent && indent <= max && !skips.includes(text)) {
          yield { indent: content.indent - min, text: content.text };
        }
      }
    }
    // 目次取得
    function get(ite: Generator<(typeof contents)[number], void, unknown>) {
      const next = ite.next();
      return next.done ? undefined : next.value;
    }

    // リスティング
    let html = "";
    const ite = iterator();
    const listing = (depth: number, content?: (typeof contents)[number]) => {
      while (content) {
        if (depth === content.indent) {
          const id = Token.getHeaderID(content.text);
          html += `・<a class="anchor" href="#${id}">${content.text}</a><br>`;
        } else if (depth < content.indent) {
          html += `<div style="padding-left:16px;">`;
          content = listing(depth + 1, content);
          html += `</div>`;
          if (content) continue;
        } else {
          return content;
        }
        content = get(ite);
      }
      return undefined;
    };
    listing(0, get(ite));

    return `<div style="font-size:10pt;">${html}</div>`;
  }

  /** 旧resolver */
  async onLoad(dsn: string) {
    return { path: "", markdown: "override Book::onLoad()." };
  }

  onLinkHtml(dsn: string, label: string) {
    const d = encodeURIComponent(dsn);
    return `<a class="anchor" href="/dsn-${d}">${label}</a> `;
  }

  onImageHtml(
    path: string,
    width: string = "",
    height: string = "",
    align: string = "",
    href: string = ""
  ) {
    return `<img src="${path}"/> `;
  }

  onTokenized(token: Token) {
    return;
  }

  promises: Promise<void>[] = [];

  // onChunked(chunk: Chunk) {
  //   return this.resolver("chunked", chunk);
  // }

  /** markdownIDをレンダリング */
  async render(dsn: string) {
    const page = new Page(this);
    this.rootToken = new RootToken(page);

    this.promises = [];
    await page.load(this.rootToken, dsn, "");
    await Promise.all(this.promises);

    //token.dump();
    this.onTokenized(this.rootToken);
    const html = this.rootToken.getHtml();
    return html;
  }

  /** */
  getDict(key: string) {
    return this.assoc[key];
  }
  setDict(key: string, value: string) {
    this.assoc[key] = value;
  }
}
