import NodeChunk from "./NodeChunk.js";

export default class TagChunk extends NodeChunk {
  isLone: boolean = false;
  protected attr: { [key: string]: string } = {};
  set attributes(attr: string) {
    this.attr["test"] = attr;
  }
}
