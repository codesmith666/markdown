import Token from "../Token.js";
/**
 * Root
 */
export default class RootToken extends Token {
  /** html化 */
  private mermaid = 0;
  private pintona = 0;

  htmlize(text: string) {
    let doc = "";
    if (this.mermaid) {
      doc += `import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs'\n`;
    }
    if (this.pintona) {
      doc += `import pintora from 'https://cdn.skypack.dev/@pintora/standalone'\n`;
      doc += `pintora.initBrowser();`;
    }

    if (doc) {
      doc = `<script type="module">${doc}</script>`;
    }

    return `<div class="nence">${text}</div>` + doc;
  }
  useMermaid() {
    this.mermaid++;
  }
  usePintona() {
    this.pintona++;
  }
}
