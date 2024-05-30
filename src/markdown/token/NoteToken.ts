import Token from "../Token.js";

export default class NoteToken extends Token {
  static readonly levels = "note|notice|info|warning|warn|error|alert";
  static readonly reLevel = new RegExp(`^(?<level>${NoteToken.levels})\\s+`);
  static readonly normalize: { [key: string]: string } = {
    notice: "info",
    warning: "warn",
    error: "alert",
  };
  static readonly svgs: { [key: string]: string } = {
    note: `<svg xmlns="http://www.w3.org/2000/svg" style="width:32pt;" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"/><path  stroke="currentColor" fill="currentColor" d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" style="width:32pt;" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path  stroke="currentColor" fill="currentColor" d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"/></svg>`,
    warn: `<svg xmlns="http://www.w3.org/2000/svg" style="width:32pt;" viewBox="0 0 512 512"><path d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" fill="currentColor" d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"/></svg>`,
    alert: `<svg xmlns="http://www.w3.org/2000/svg" style="width:32pt;" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192M192 320l128-128"/></svg>`,
  };
  htmlize(text: string) {
    let level = "note";
    const match = text.match(NoteToken.reLevel);
    if (match) {
      level = match.groups?.level || level;
      level = NoteToken.normalize[level] || level;
      text = text.slice(match[0].length);
    }

    const icon = NoteToken.svgs[level];

    text = `
<div>
  <div style="display:inline-block">
    <div class="note ${level}">
        <span class="icon_${level}">${icon}</span>
        <pre class="text">${text}</pre>
    </div>
  </div>
</div>
`;
    // if (!this.inlined) {
    //   text = `<div class="center">${text}</div>`;
    // }
    return text;
  }
}
