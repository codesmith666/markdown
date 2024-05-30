import Token from "../Token.js";
import Chunk, { ChunkClass } from "../Chunk.js";
import Page from "../Page.js";

/**
 * NodeChunk
 *   親子関係を表現するための専用チャンク
 *   NodeChunkだけが子を持ち、
 *   すべてのチャンクの親は、NodeChunkの派生クラスである
 */
export default class NodeChunk extends Chunk {
  protected children: Chunk[];

  /** コンストラクタ */
  constructor(parent: NodeChunk | Page) {
    super(parent);
    this.children = [];
  }

  /** 子  チャンクを作成して追加する */
  addChild<T extends Chunk>(type: ChunkClass<T>): T {
    const chunk = new type(this);
    this.children.push(chunk);
    return chunk;
  }

  /** 書き込み対象のチャンクを取得する（現在は末尾） */
  getCurrent<T extends Chunk>(type: ChunkClass<T>): T {
    const last = this.last;
    return last instanceof type ? last : this.addChild(type);
  }

  /** 末尾のチャンクの型を調べる */
  isCurrentType<T extends Chunk>(type: ChunkClass<T>): boolean {
    return this.last instanceof type;
  }

  /** 末尾のチャンクを取得する */
  get last(): Chunk | undefined {
    return this.children[this.children.length - 1];
  }

  /** 所有するチャンクをすべてトークン化する */
  tokenize(token: Token): Token {
    for (const chunk of this.children) {
      chunk.tokenize(token);
    }
    return token;
  }
}
