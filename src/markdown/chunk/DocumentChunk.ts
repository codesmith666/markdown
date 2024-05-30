import Token from "../Token.js";
import TextToken from "../token/TextToken.js";
import LoadToken from "../token/LoadToken.js";
import BoldToken from "../token/BoldToken.js";
import BreakToken from "../token/BreakToken.js";
import ItalicToken from "../token/ItalicToken.js";
import UnderlineToken from "../token/UnderlineToken.js";
import StrikeLineToken from "../token/StrikeLineToken.js";
import NoteToken from "../token/NoteToken.js";
import TeletypeToken from "../token/TeletypeToken.js";
// import MathjaxToken from "../token/MathjaxToken.ts";
import KatexToken from "../token/KatexToken.js";
import ItalicBoldToken from "../token/ItalicBoldToken.js";
import AnchorToken from "../token/AnchorToken.js";
import LinkToken from "../token/LinkToken.js";
import StyleToken from "../token/StyleToken.js";
import EmojiToken from "../token/EmojiToken.js";
import DataChunk from "./DataChunk.js";

/**
 * ドキュメント検出に関する型
 */
type Mode = keyof typeof Detector.modes;
type Tag = keyof typeof Detector.tags;
type Detected = {
  length: number; // マッチしたテキストのサイズ
  name: Tag; // 見つけたタグの名前
  all: string; // マッチしたすべて
  tag: string; // 見つけたタグ
  pos: number; // 見つけた位置（先頭からの）
  key: string; // 辞書ストア用のキー（あれば）
  filters: string[]; // 辞書ロード後のフィルタ群（あれば）
  link: string; // <img>として処理するか<a>として処理するか
  dsn: string; // [URL]か[ファイルパス]か[見出し文字列]
  styles: string; // 色文字列
  emoji: string;
};
/**
 * ドキュメント検出器
 */
class Detector {
  mode: Mode;
  detector: RegExp;

  /** コンストラクタ  */
  constructor(mode: Mode) {
    this.mode = mode;
    this.detector = new RegExp(
      Detector.modes[mode]
        .map((tag) => `(?<${tag}>${Detector.tags[tag]})`)
        .join("|")
    );
  }

  /** Detector自身のモードからタグの一覧を返す */
  get names() {
    return Detector.modes[this.mode];
  }

  /** ソーステキストから最初に見つけたタグを返す */
  detect(source: string): Detected | undefined {
    const match = source.match(this.detector);
    if (match) {
      const groups = match.groups!;
      const length = match[0].length;
      const all = match[0];
      const name = this.names.find((name) => groups[name] !== undefined)!;
      const tag = groups["tag"] || groups[name];
      const pos = match.index || 0;
      const key = groups["key"] || "";
      const filters = (groups["filters"] || "").split(".").filter((f) => !!f);
      const link = groups["link"] || "";
      const dsn = groups["dsn"] || "";
      const styles = groups["styles"] || "";
      const emoji = groups["Emoji"] || "";
      return {
        length,
        name,
        all,
        tag,
        pos,
        key,
        filters,
        link,
        dsn,
        styles,
        emoji,
      };
    }
    return undefined;
  }

  /** 検出器の定義 */
  static readonly url = `https?:\\/\\/[-!?/+_~:;.,*&@#$%()'[\\]a-zA-Z0-9]+`;
  static readonly tags = {
    url: Detector.url,
    escape: "\\\\[*|/#[\\]()@_~:!$`'\"]",
    italicBold: `\\*\\*\\*|___`,
    bold: `\\*\\*`,
    italic: `\\/\\/`,
    underline: `\\.\\.`,
    strikeLine: `~~`,
    note: "!!!",
    teletype: "`",
    math: "\\$\\$",
    emoji: ":",
    style: `""(?<styles>[,][,.a-zA-Z0-9#%()]+)?`,
    blacketBlacket: `\\]\\[`,
    blacketParen: `\\]\\(`,
    blacketColon: `\\]:`,
    blacketClose: `\\]\\s*`,
    parenClose: "[)]\\s*",
    blacketOpen: "(?<link>[-+!=]?)\\[",
    markup: "<\\s*(?<tag>[a-zA-Z]+)\\s*\\/?\\s*>",
    loadClose: `@@(?<filters>\\.[.a-zA-Z0-9]+)?`,
    loadOpen: `@@`,
    storeClose: `}@(?<filters>\.[.a-zA-Z0-9]+)?`,
    storeOpen: `@(?<key>[^ \t\r\n]*?){`,
  };

  /** タグ検出モード（モード内には検出の優先順位でタグを定義） */
  static readonly modes = {
    document: [
      "url",
      "escape",
      "italicBold",
      "bold",
      "italic",
      "underline",
      "strikeLine",
      "note",
      "markup",
      "style",
      "blacketOpen",
      "loadOpen",
      "storeOpen",
      "linkOpen",
      "teletype",
      "math",
      "emoji",
    ] as Tag[],
    emoji: ["escape", "emoji"] as Tag[],
    teletype: ["escape", "teletype"] as Tag[],
    math: ["escape", "math"] as Tag[],
    store: ["escape", "storeClose"] as Tag[],
    load: ["escape", "loadClose"] as Tag[],
    link: [
      "escape",
      "blacketOpen",
      "blacketBlacket",
      "blacketParen",
      "blacketColon",
      "blacketClose",
      "parenClose",
    ] as Tag[],
  };

  /** 検出器のキャッシュ */
  private static detectors: { [key: string]: Detector } = {};

  /** モードに応じた検出器を返す */
  static get(mode: Mode): Detector {
    if (!this.detectors[mode]) {
      this.detectors[mode] = new Detector(mode);
    }
    return this.detectors[mode];
  }
}

/**
 *  ドキュメントブロック
 */
export default class DocumentChunk extends DataChunk {
  /**
   * ドキュメントを段落としてトークン化する
   */
  tokenize(parent: Token): Token {
    DocumentChunk.tokenize(this.document, parent);
    return parent;
  }

  /**
   * ドキュメントをトークン化する
   *
   * @param document nence マークダウン書式のドキュメント
   * @param parent 親となるトークン
   */
  static tokenize(document: string, parent: Token) {
    /**
     * テキストをトークン化する再帰関数
     *
     * documentはparse()間ではやり取りせず、closureで処理する。
     * ※documentが大きかった時の関数のオーバヘッドを減らすため。効果は未知数。
     */
    const tokenizer = (parent: Token, mode: Mode): Token | undefined => {
      const detector = Detector.get(mode);
      //while (document) {
      while (document) {
        //  タグを検出
        const detected = detector.detect(document);

        // 検出されなかったら残りをすべてテキストとして取り込む
        if (!detected) {
          //console.log(`capture all: ${document}`);
          parent.add(TextToken).text = document;
          document = "";
          break;
        }

        // タグの前にデータがあればそれはテキストとして取り込む
        if (detected.pos > 0) {
          const prevText = document.slice(0, detected.pos);
          //console.log(`capture prev: ${prevText}`);
          parent.add(TextToken).text = prevText;
          document = document.slice(detected.pos);
        }

        // タグの分documentを進める
        document = document.slice(detected.length);

        // タグ別の処理を行う
        //  似たようなcaseが並ぶが仕様変更に備えてこうしておく、見通しもいいし
        switch (detected.name) {
          case "url": {
            parent.add(AnchorToken).add(TextToken).text = detected.tag;
            break;
          }
          case "escape": {
            parent.add(TextToken).text = detected.tag[1];
            break;
          }
          case "italicBold": {
            const open = parent.scanParent(ItalicBoldToken);
            if (open) return open;
            const token = parent.add(ItalicBoldToken);
            const close = tokenizer(token, "document");
            if (!token.equals(close)) return close;
            break;
          }
          case "bold": {
            const open = parent.scanParent(BoldToken);
            if (open) return open;
            const token = parent.add(BoldToken);
            const close = tokenizer(token, "document");
            if (!token.equals(close)) return close;
            break;
          }
          case "italic": {
            const open = parent.scanParent(ItalicToken);
            if (open) return open;
            const token = parent.add(ItalicToken);
            const close = tokenizer(token, "document");
            if (!token.equals(close)) return close;
            break;
          }
          case "underline": {
            const open = parent.scanParent(UnderlineToken);
            if (open) return open;
            const token = parent.add(UnderlineToken);
            const close = tokenizer(token, "document");
            if (!token.equals(close)) return close;
            break;
          }
          case "strikeLine": {
            const open = parent.scanParent(StrikeLineToken);
            if (open) return open;
            const token = parent.add(StrikeLineToken);
            const close = tokenizer(token, "document");
            if (!token.equals(close)) return close;
            break;
          }
          case "style": {
            const open = parent.scanParent(StyleToken);
            if (open) {
              open.style = detected.styles;
              return open;
            }
            const token = parent.add(StyleToken);
            token.add(TextToken).text = detected.styles;
            const close = tokenizer(token, "document");
            if (!token.equals(close)) return close;
            break;
          }

          case "note": {
            const open = parent.scanParent(NoteToken);
            if (open) return open;
            const token = parent.add(NoteToken);
            const close = tokenizer(token, "document");
            if (!token.equals(close)) return close;
            break;
          }
          case "emoji": {
            const open = parent.scanParent(EmojiToken);
            if (open) return open;
            const token = parent.add(EmojiToken);
            const close = tokenizer(token, "emoji");
            if (!token.equals(close)) return close;
            break;
          }

          case "teletype": {
            const open = parent.scanParent(TeletypeToken);
            if (open) return open;
            const token = parent.add(TeletypeToken);
            const close = tokenizer(token, "teletype");
            if (!token.equals(close)) return close;
            break;
          }
          case "math": {
            const open = parent.scanParent(KatexToken);
            if (open) return open;
            const token = parent.add(KatexToken);
            const close = tokenizer(token, "math");
            if (!token.equals(close)) return close;
            break;
          }
          case "markup": {
            switch (detected.tag.toLowerCase()) {
              case "br":
                parent.add(BreakToken);
                break;
              default:
                parent.add(TextToken).text = detected.all;
                break;
            }
            break;
          }
          case "blacketOpen": {
            const token = parent.add(LinkToken);
            token.type = detected.link as typeof token.type;
            token.mode = "[";
            const close = tokenizer(token, "link");
            if (!token.equals(close)) return close;
            break;
          }
          case "blacketBlacket": {
            const open = parent.scanParent(LinkToken);
            if (open) {
              open.mode = "][";
              if (open.childCount < 1) {
                open.add(TextToken).text = "";
              }
            } else {
              parent.add(TextToken).text = detected.all;
            }
            break;
          }
          case "blacketParen": {
            const open = parent.scanParent(LinkToken);
            if (open) {
              open.mode = "](";
              if (open.childCount < 1) {
                open.add(TextToken).text = "";
              }
            } else {
              parent.add(TextToken).text = detected.all;
            }
            break;
          }
          case "blacketColon": {
            const open = parent.scanParent(LinkToken);
            if (open) {
              open.mode = "]:";
              if (open.childCount < 1) {
                open.add(TextToken).text = "";
              }
            } else {
              parent.add(TextToken).text = detected.all;
            }
            break;
          }
          case "blacketClose": {
            const open = parent.scanParent(LinkToken);
            if (open && ["[", "][", "]:"].includes(open.mode)) {
              if (open.childCount < 2) {
                open.add(TextToken).text = "";
              }
              return open;
            }
            parent.add(TextToken).text = detected.all;
            break;
          }
          case "parenClose": {
            const open = parent.scanParent(LinkToken);
            if (open && ["]("].includes(open.mode)) {
              if (open.childCount < 2) {
                open.add(TextToken).text = "";
              }
              return open;
            }
            parent.add(TextToken).text = detected.all;
            break;
          }
          case "loadOpen": {
            const open = parent.scanParent(LoadToken);
            if (open) {
              // もし見つかったらmode遷移が変
              parent.add(TextToken).text = detected.tag;
            } else {
              const token = parent.add(LoadToken);
              const close = tokenizer(token, "load");
              if (!token.equals(close)) return close;
            }
            break;
          }
          case "loadClose": {
            // mode==load の時しか来ないので必ず親は見つかるはず
            const open = parent.scanParent(LoadToken);
            if (open instanceof LoadToken) {
              open.close(detected.filters);
              return open;
            }
            // もし見つからなかったらmode遷移が変
            parent.add(TextToken).text = detected.tag;
            break;
          }
          //   case "storeOpen": {
          //     const { tag, key } = detected;
          //     const open = parent.scanParent(StoreToken);
          //     if (open) {
          //       // もし見つかったらmode遷移が変
          //       parent.add(TextToken).text = tag;
          //     } else {
          //       const token = parent.add(StoreToken).open(key, tag);
          //       const close = tokenizer(token, "store");
          //       if (!token.equals(close)) return close;
          //     }
          //     break;
          //   }
          //   case "storeClose":
          //     const open = parent.scanParent(StoreToken);
          //     if (open) {
          //       open.close(detected.tag);
          //       if (detected.filters.length) {
          //         open
          //           .add(LoadToken)
          //           .close(detected.filters)
          //           .add(TextToken).text = detected.key;
          //       }
          //       return open;
          //     }
          //     parent.add(TextToken).text = detected.tag;
          //     break;
          //   case "link":
          //     break;
        }
      }
      return undefined;
    };

    tokenizer(parent, "document");
  }
}
