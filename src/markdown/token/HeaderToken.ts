import TextToken from "./TextToken.js";
/**
 * Header
 */
export default class HeaderToken extends TextToken {
  level: number = 1;
  htmlize(text: string) {
    text = this.text;
    const id = this.getHeaderID(text);

    let tag = `h${this.level}`;
    tag = `<${tag} class="${tag}">${text}</${tag}>`;
    tag = `<a id="${id}" style="display:block;"></a>` + tag;
    return tag;
  }
}
