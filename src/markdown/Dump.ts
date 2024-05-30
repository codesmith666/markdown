import Page from "./Page.js";
import Book from "./Book.js";
import Chunk from "./Chunk.js";
import Line from "./Line.js";
import Token from "./Token.js";

type SUPPORTED_TYPES = Page | Book | Chunk | Line | Token;
export function dump<T extends SUPPORTED_TYPES>(obj: T, title: string): T {
  const convert = (value: any, key: string = ""): any => {
    //console.log(value?.constructor?.name);

    if (key === "") {
      if (value instanceof Array) {
        const array = [];
        for (let i = 0; i < value.length; i++) {
          array.push(convert(value[i], i + ""));
        }
        return array;
      } else if (value instanceof Object) {
        const object: { [key: string]: any } = {
          class: value.constructor.name,
        };
        for (const k of Object.keys(value)) {
          const v = convert(value[k], k);
          if (v !== undefined) {
            object[k] = v;
          }
        }
        return object;
      }
      return value;
    }
    // 上に向かう参照は循環を生むので消す
    //  PrismTokenのgrammerも循環参照があるっぽい
    if (["page", "book", "parent", "grammer"].includes(key)) {
      return undefined;
    }

    return convert(value);
  };

  console.log(title);
  console.log(JSON.stringify(convert(obj), undefined, 2));
  return obj;
}
