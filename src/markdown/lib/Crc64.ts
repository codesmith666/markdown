export default class CRC64 {
  crc64: bigint = 0n;
  static table: bigint[][] = undefined!;

  constructor(source: string) {
    this.crc64 = this.calc(source);
  }

  get raw() {
    return this.crc64;
  }

  get hex() {
    return this.crc64.toString(16);
  }

  get base62() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    let crc64 = this.crc64;
    while (crc64 > 0) {
      code += chars[Number(crc64 % BigInt(chars.length))];
      crc64 /= BigInt(chars.length);
    }
    return code;
  }

  stringToUtf8(string: string): string {
    return unescape(encodeURIComponent(string));
  }

  stringToBytes(string: string): number[] {
    const bytes: number[] = [];

    for (let index = 0; index < string.length; ++index) {
      bytes.push(string.charCodeAt(index));
    }

    return bytes;
  }

  calc(string: string) {
    CRC64.initialize();

    const utf8String = this.stringToUtf8(string);
    let bytes = this.stringToBytes(utf8String);
    let crc = ~BigInt(0) & 0xffffffffffffffffn;

    while (bytes.length > 8) {
      crc ^=
        BigInt(bytes[0]) |
        (BigInt(bytes[1]) << 8n) |
        (BigInt(bytes[2]) << 16n) |
        (BigInt(bytes[3]) << 24n) |
        (BigInt(bytes[4]) << 32n) |
        (BigInt(bytes[5]) << 40n) |
        (BigInt(bytes[6]) << 48n) |
        (BigInt(bytes[7]) << 56n);

      crc =
        CRC64.table[7][Number(crc & 0xffn)] ^
        CRC64.table[6][Number((crc >> 8n) & 0xffn)] ^
        CRC64.table[5][Number((crc >> 16n) & 0xffn)] ^
        CRC64.table[4][Number((crc >> 24n) & 0xffn)] ^
        CRC64.table[3][Number((crc >> 32n) & 0xffn)] ^
        CRC64.table[2][Number((crc >> 40n) & 0xffn)] ^
        CRC64.table[1][Number((crc >> 48n) & 0xffn)] ^
        CRC64.table[0][Number(crc >> 56n)];

      bytes = bytes.slice(8);
    }

    for (let i = 0; i < bytes.length; i++) {
      const lower = Number(crc & 0xffn);
      const index = lower ^ bytes[i];
      crc = CRC64.table[0][index] ^ (crc >> 8n);
    }

    crc = ~crc & 0xffffffffffffffffn;

    return crc;
  }

  static hex(source: string) {
    return new CRC64(source).hex;
  }
  static raw(source: string) {
    return new CRC64(source).raw;
  }
  static base62(source: string) {
    return new CRC64(source).base62;
  }
  // https://en.wikipedia.org/wiki/Cyclic_redundancy_check
  static initialize() {
    // 初期化されていたら終了
    if (this.table) return;

    const table: bigint[][] = [];
    // 8行初期化
    for (let i = 0; i < 8; i++) {
      table[i] = [];
    }

    // まず最初の行を初期化
    const poly = 0xc96c5795d7870f42n;
    let crc = 0n;
    for (let i = 0; i < 256; i++) {
      crc = BigInt(i);
      for (let j = 0; j < 8; j++) {
        if (crc & 1n) {
          crc = poly ^ (crc >> 1n);
        } else {
          crc = crc >> 1n;
        }
      }
      table[0][i] = crc;
    }
    // 8行 * 256列 の参照用テーブルを作成
    for (let i = 0; i < 256; i++) {
      crc = table[0][i];
      for (let j = 1; j < 8; j++) {
        const index = Number(crc & 0xffn);
        crc = table[0][index] ^ (crc >> 8n);
        table[j][i] = crc;
      }
    }
    this.table = table;
  }
}
