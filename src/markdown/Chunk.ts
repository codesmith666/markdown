import Page from "./Page.js";
import Token from "./Token.js";
import { dump } from "./Dump.js";
import type NodeChunk from "./chunk/NodeChunk.js";

/**
 *  Chunk
 *    全チャンクの基底クラス
 *    NodeChunk と DataChunk に派生する
 */
export type ChunkClass<T> = new (chunk: NodeChunk | Page) => T;

export default abstract class Chunk {
  public readonly id: number;
  public readonly page: Page;
  public readonly parent: NodeChunk;

  /** コンストラクタ */
  protected constructor(parent: NodeChunk | Page) {
    if (parent instanceof Page) {
      this.page = parent;
      this.parent = undefined!;
    } else {
      this.page = parent.page;
      this.parent = parent;
    }
    this.id = this.page.book.nextChunkID;
  }

  equals(target?: Chunk) {
    return this === target;
  }

  /** 自分自身から親に向かって一致する型を検索する */
  scanParent<T extends NodeChunk>(type: ChunkClass<T>): T | undefined {
    for (let chunk = this as Chunk; chunk; chunk = chunk.parent) {
      if (chunk instanceof type) return chunk;
    }
    return undefined;
  }

  dump() {
    return dump(this, "------------------------ chunk");
  }

  tokenize(root: Token): Token {
    return root;
  }
}
