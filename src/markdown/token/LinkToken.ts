import Token from "../Token.js";
/**
 * Link
 */

const types = ["!", "=", "+", "-", ""] as const;
type Type = (typeof types)[number];

const modes = ["[", "][", "](", "]:"] as const;
type Mode = (typeof modes)[number];

export default class LinkToken extends Token {
  type: Type = "";
  mode: Mode = "[";

  /* */
  getContents(args: string) {
    //  引数を解釈する
    const params = args.split(/\s*,\s*/);
    const min = parseInt(params[0] || "2");
    const max = parseInt(params[1] || `${Number.MAX_SAFE_INTEGER}`);
    const skip = params[2] || "";
    const skips = ["Contents", "CONTENTS", "目次", "もくじ", skip];

    return this.book.getContents(min, max, skips);
  }

  render(label: string, dsn: string) {
    //
    // 目次
    //
    if (label === "#contents") {
      return this.getContents(dsn);
    }
    //
    // リンク
    //
    dsn = this.escapeAttribute(dsn);
    //label = this.escapeAttribute(label);
    if (this.type === "") {
      // dsnの指定がないときはリンクを表示できない。
      if (dsn === "" && label === "") return "[]()";
      if (label === "") label = dsn;

      // markdown内リンク
      if (dsn.startsWith("#")) {
        dsn = dsn.slice(1);
        const id = this.getHeaderID(dsn);
        return `<a class="anchor" href="#${id}">${label || label}</a> `;
      }
      // 注釈処理
      if (label.startsWith("^")) {
        label = label.slice(1);
        const src_id = this.getHeaderID("src-" + this.page.id + "-" + label);
        const dst_id = this.getHeaderID("dst-" + this.page.id + "-" + label);
        if (dsn) {
          // 注釈先
          return `&nbsp;<a class="anchor" href="#${src_id}" id="${dst_id}" style="font-size:small">^${label}</a>&nbsp;${dsn}`;
        } else {
          // 注釈元
          return `&nbsp;<a class="anchor" href="#${dst_id}" id="${src_id}" style="font-size:small">^${label}</a>&nbsp;`;
        }
      }
      // URLリンク
      if (dsn.match(/^https?:\/\//)) {
        return `<a class="anchor" href="${dsn}">${label || dsn}</a> `;
      }

      // 他のmarkdownへのリンク（rootを除く短いパス）
      const path = this.page.book.normalizePath(dsn, this.page.path, true);
      // リンクを生成する pathは""のときはforbiddenエラーのmdが返ってくる
      return this.page.book.onLinkHtml(path, label);
    }

    //
    // イメージ参照
    //
    if (this.type === "!") {
      if (dsn.match(/^https?:\/\//)) {
        return `<img src="${dsn}" alt=${label || dsn}/>`;
      }

      const path = this.page.book.normalizePath(dsn, this.page.path, false);
      return this.page.book.onImageHtml(path);
    }

    //
    // 単純表示
    //
    if (this.type === "=") {
      label = this.escapeAttribute(label);
      return `<span title="${label}">${dsn}</span> `;
    }

    // ルビで表示
    if (this.type === "+") {
      let text = `<rb>${label}</rb>`;
      let ruby = `<rp>(</rp><rt>${dsn}</rt><rp>)</rp>`;
      return `<ruby>${text}${ruby}</ruby>`;
    }
    // ルビを逆に表示
    if (this.type === "-") {
      let text = `<rb>${dsn}</rb>`;
      let ruby = `<rp>(</rp><rt>${label}</rt><rp>)</rp>`;
      return `<ruby>${text}${ruby}</ruby>`;
    }
    // 未知のレンダリングタイプ
    return `unknown render type ${this.type}<br/>`;
  }

  htmlize(text: string) {
    // textは捨ててる＝参照していない。
    // this.dump();
    let key = "";
    let val = "";
    switch (this.mode) {
      // リンクを表示する
      case "](":
        key = this.children[0].htmlize("").trim();
        val = this.children[1].htmlize("").trim();
        this.book.setDict(key, val);
        if (this.type === "=") {
          return "";
        }
        return this.render(key, val);

      // リンクを辞書から参照して表示
      case "][":
        key = this.children[0].htmlize("").trim();
        val = this.children[1].htmlize("").trim();
        val = this.book.getDict(val);
        return this.render(key, val);
      // リンクを辞書から参照して表示（無名）
      case "[":
        key = this.children[0].htmlize("").trim();
        if (key.startsWith("^")) {
          val = this.children[1].htmlize("").trim();
        } else {
          val = this.book.getDict(key);
        }
        return this.render(key, val);
      // リンクを辞書に保存する（keyの先頭が^だったら注釈処理）
      case "]:":
        key = this.children[0].htmlize("").trim();
        val = this.children[1].htmlize("").trim();
        this.book.setDict(key, val);
        if (key.startsWith("^")) {
          return this.render(key, val);
        }
        return "";
    }
  }
}
