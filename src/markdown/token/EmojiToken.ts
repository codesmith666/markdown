import Token from "../Token.js";
import Emoji from "../lib/Emoji.js";

/**
 * Quote
 */
export default class EmojiToken extends Token {
  htmlize(text: string) {
    text = text.trim();

    let html = "";
    if (text === "all") {
      const names = [];
      for (const name of Emoji.emojis.keys()) {
        const code = Emoji.getEmojiCode(name);
        if (code === "category" || code === "group") continue;
        const title = Token.escapeAttribute(name);
        names.push(
          `<span onClick="alert('${title}')" title="${title}">${code}</span>`
        );
      }
      return names.join(" ");
    }
    if (text === "group names") {
      const names = [];
      for (const name of Emoji.groupNames) {
        names.push(`"${name}"`);
      }
      return `"emoji groups":[ ${names.join(" , ")} ]`;
    }

    if (Emoji.isGroupName(text)) {
      const names = [];
      for (const name of Emoji.getEmojiNames(text)) {
        names.push(`[${name}]:${Emoji.getEmojiCode(name)}`);
      }
      return `${text}":{ ${names.join(" , ")} }`;
    }

    return Emoji.getEmojiCode(text);
  }
}
