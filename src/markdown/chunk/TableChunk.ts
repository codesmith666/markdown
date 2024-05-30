import DocumentChunk from "./DocumentChunk.js";
import Token from "../Token.js";
import TableToken from "../token/TableToken.js";
import TableRowToken from "../token/TableRowToken.js";
import TableDataToken, { TextAlign, TagType } from "../token/TableDataToken.js";
import DataChunk from "./DataChunk.js";

type CellType = "Data" | ">" | "^" | "<";

/**
 * セルクラス
 */
class Cell {
  row: Row; // 親row
  index: number; //  rowの中の位置
  //
  type: CellType;
  tag: TagType;
  text: string;
  align: TextAlign;
  rowSpan: number = 1;
  colSpan: number = 1;

  constructor(
    row: Row,
    text: string,
    index: number,
    align: TextAlign,
    tag: TagType
  ) {
    this.row = row;
    this.text = text.trim();
    this.index = index;
    this.align = align;
    this.tag = tag;

    // // データかを検出してセルを初期化する
    switch (this.text) {
      case ">":
      case "^":
      case "<":
        this.type = this.text;
        break;
      // 空白の時に左側に結合するという仕様は採用しない
      // case "":
      //   this.type = "<";
      //   break;
      default: {
        this.type = "Data";
        break;
      }
    }
  }

  dump() {
    const pos = `[${this.row.index},${this.index}]`;
    const type = `type="${this.type}"`;
    const tag = `tag="${this.tag}"`;
    const text = `text="${this.text}"`;
    const span = `colspan="${this.colSpan}" rowspan="${this.rowSpan}"`;
    const align = `align="${this.align[0] || ""}"`;
    console.log(`${pos} ${type} ${tag} ${align} ${text} ${span}`);
  }

  get right() {
    return this.row.cells[this.index + 1];
  }
  get left() {
    return this.row.cells[this.index - 1];
  }
  get up() {
    return this.row.table.rows[this.row.index - 1]?.cells[this.index];
  }
  get down() {
    return this.row.table.rows[this.row.index + 1]?.cells[this.index];
  }
  spanning() {
    const cell = this.traverse(this.type);
    if (!cell) return;
    switch (this.type) {
      case ">":
      case "<":
        cell.colSpan++;
        break;
      case "^":
        cell.rowSpan++;
        break;
    }
  }

  get isVisible() {
    return this.type === "Data";
  }

  tokenize(parent: Token) {
    if (this.isVisible) {
      const dataToken = parent.add(TableDataToken);
      dataToken.align = this.align;
      dataToken.colspan = this.colSpan;
      dataToken.rowspan = this.rowSpan;
      dataToken.tag = this.tag;
      DocumentChunk.tokenize(this.text, dataToken);
    }
  }

  traverse(dir: CellType) {
    let cell: Cell = this;
    // thisと同じcellTypeの方向に向かって検索する
    while (cell) {
      switch (dir) {
        case ">":
          cell = cell.right;
          break;
        case "<":
          cell = cell.left;
          break;
        case "^":
          cell = cell.up;
          break;
        case "Data":
          return undefined;
      }
      // 順番が重要なガード節
      if (!cell) return undefined;
      if (cell.isVisible) return cell;
      if (cell.type !== dir) return undefined;
    }
  }
}

/**;
 * 行クラス
 */
class Row {
  table: Table;
  index: number;
  cells: Cell[];

  static aligns: TextAlign[] = ["None", "Left", "Right", "Center"];
  constructor(table: Table, text: string, rowIdx: number, lineType: string) {
    this.table = table;
    this.index = rowIdx;
    this.cells = [];

    // 行をセルに分けて、いらないデータを削除
    const cells = text.split(/\|([-<>*]*)/);
    cells.shift();
    cells.pop();
    cells.pop();
    // セルを作成していく
    for (let colIdx = 0; colIdx < cells.length; colIdx += 2) {
      // セパレータにスタイルが負荷されていたら取得する
      const next = colIdx + 1;
      const style = cells[colIdx];
      const index = Math.floor(colIdx / 2);
      //  スタイルを検出（あれば）
      let align: TextAlign = this.table.getAlign(index);
      let tag: TagType = this.table.currentTag;
      for (let i = 0; i < style.length; i++) {
        const char = style[i];
        if (!cells[next].trim()) {
          cells[next] = char;
          continue;
        }
        switch (char) {
          case "-":
            align = "Center";
            break;
          case ">":
            align = "Right";
            break;
          case "<":
            align = "Left";
            break;
          case "*":
            tag = "th";
            break;
        }
      }

      const cell = new Cell(this, cells[next], index, align, tag);
      this.cells.push(cell);
    }
  }

  /**
   * dump object for debug
   */
  dump() {
    this.cells.forEach((cell) => {
      cell.dump();
    });
  }

  /**
   * 情報をtoken化する
   */
  tokenize(parent: Token) {
    const row = parent.add(TableRowToken);
    this.cells.forEach((cell) => {
      cell.tokenize(row);
    });
  }
}

/**
 * テーブルクラス
 */
export class Table {
  align: TextAlign[] = [];
  rows: Row[] = [];
  currentTag: TagType;
  constructor(texts: string[]) {
    this.currentTag = "th";
    let rowIdx = 0;
    for (let text of texts) {
      // 改行や空白を削除
      text = text.trim();
      // \t 表記をエスケープする
      text = text.replaceAll("\\|", "&#x7c;");

      // 行のタイプを検出（nence拡張）
      let lineType = "";
      if (text[0] !== "|") {
        lineType = text[0];
        text = text.slice(1);
      }

      // align行だった場合の処理
      if (text.match(/^([|]\s*[:-]+\s*)+[|]$/)) {
        this.currentTag = "td";
        const aligns = text.split(/\s*[|]\s*/);
        aligns.shift();
        aligns.pop();
        aligns.forEach((cell, colIdx) => {
          let align: TextAlign;
          if (cell.startsWith(":")) {
            align = cell.endsWith(":") ? "Center" : "Left";
          } else {
            align = cell.endsWith(":") ? "Right" : "None";
          }
          this.setAlign(colIdx, align);
        });
        continue;
      }

      // 上の行と連結する（nence拡張）
      if (lineType === "+") {
        const cells = text.split(/\s*[|]\s*/);
        cells.shift();
        cells.pop();
        for (let colIdx = 0; colIdx < cells.length; colIdx++) {
          const lastRow = this.rows[this.rows.length - 1];
          const baseCell = lastRow.cells[colIdx];
          const text = cells[colIdx];
          if (baseCell.type === "Data") {
            if (baseCell.text.endsWith("~")) {
              baseCell.text = baseCell.text.slice(0, -1) + " " + text;
            } else {
              baseCell.text += "<br>" + text;
            }
          }
        }
        continue;
      }

      // 行をコメントアウトします（nence拡張）
      if (lineType === "#") {
        continue;
      }

      // ヘッダー行を終了してデータ行に移行する
      if (lineType === "-") {
        this.currentTag = "td";
        continue;
      }
      // データ行だった時の処理
      const row = new Row(this, text, rowIdx++, lineType);
      this.rows.push(row);
    }
    // データが出揃ったらspan処理を行う
    // このときエスケープした文字も戻す
    for (const row of this.rows) {
      for (const cell of row.cells) {
        cell.text = cell.text.replaceAll("&#x7c;", "|");
        cell.spanning();
      }
    }
    //this.dump();
  }

  /**
   * dump object for debug
   */
  dump() {
    console.log("-------- dump table");
    this.rows.forEach((row) => {
      row.dump();
    });
  }

  setAlign(index: number, align: TextAlign) {
    this.align[index] = align;
  }
  getAlign(index: number): TextAlign {
    return this.align[index] || "None";
  }
  tokenize(parent: Token) {
    const table = parent.add(TableToken);
    this.rows.forEach((row) => {
      row.tokenize(table);
    });
  }
}

/**
 * テーブルチャンククラス
 */
export default class TableChunk extends DataChunk {
  tokenize(parent: Token): Token {
    const table = new Table(this.texts);
    table.tokenize(parent);
    return parent;
  }
}
