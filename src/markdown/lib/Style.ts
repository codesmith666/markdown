export default class Style {
  // https://developer.mozilla.org/ja/docs/Web/CSS/font-size
  static readonly reLength = /^(\d+([.]\d+)?(px|cm|mm|Q|in|pc|pt|%))$/;
  static readonly absolutes: { [key: string]: string } = {
    xxs: "xx-small",
    xs: "x-small",
    s: "small",
    m: "medium",
    l: "large",
    xl: "x-large",
    xxl: "xx-large",
    xxxl: "xxx-large",
    L: "larger",
    S: "smaller",
  };
  static reHex = "#[a-fA-F0-9]{6,6}";
  static reRGB = "rgba?\\(\\d+,\\d+,\\d+(,[01]([.]\\d+)?)?\\)";
  static reHSL = "hsla?\\(\\d+,\\d+%,\\d+%(,[01]([.]\\d+)?)?\\)";
  static reColor = new RegExp(`^(${this.reHex}|${this.reRGB}|${this.reHSL})$`);
  static readonly webColors = [
    // pink
    "pink", // Pink
    "lightpink", // LightPink
    "hotpink", // HotPink
    "deeppink", // DeepPink
    "palevioletred", // PaleVioletRed
    "mediumvioletred", // MediumVioletRed
    // red
    "lightsalmon", // LightSalmon
    "salmon", // Salmon
    "darksalmon", // DarkSalmon
    "lightcoral", // LightCoral
    "indianred", // IndianRed
    "crimson", // Crimson
    "firebrick", // Firebrick
    "darkred", // DarkRed
    "red", // Red
    // green
    "darkolivegreen", // DarkOliveGreen
    "olive", // Olive
    "olivedrab", // OliveDrab
    "yellowgreen", // YellowGreen
    "limegreen", // LimeGreen
    "lime", // Lime
    "lawngreen", // LawnGreen
    "chartreuse", // Chartreuse
    "greenyellow", // GreenYellow
    "springgreen", // SpringGreen
    "mediumspringgreen", // MediumSpringGreen
    "lightgreen", // LightGreen
    "palegreen", // PaleGreen
    "darkseagreen", // DarkSeaGreen
    "mediumaquamarine", // MediumAquamarine
    "mediumseagreen", // MediumSeaGreen
    "seagreen", // SeaGreen
    "forestgreen", // ForestGreen
    "green", // Green
    "darkgreen", // DarkGreen
    // cyan
    "aqua", // Aqua
    "cyan", // Cyan
    "lightcyan", // LightCyan
    "paleturquoise", // PaleTurquoise
    "aquamarine", // Aquamarine
    "turquoise", // Turquoise
    "mediumturquoise", // MediumTurquoise
    "darkturquoise", // DarkTurquoise
    "lightseagreen", // LightSeaGreen
    "cadetblue", // CadetBlue
    "darkcyan", // DarkCyan
    "teal", // Teal
    // blue
    "lightsteelblue", // LightSteelBlue
    "powderblue", // PowderBlue
    "lightblue", // LightBlue
    "skyblue", // SkyBlue
    "lightskyblue", // LightSkyBlue
    "deepskyblue", // DeepSkyBlue
    "dodgerblue", // DodgerBlue
    "cornflowerblue", // CornflowerBlue
    "steelblue", // SteelBlue
    "royalblue", // RoyalBlue
    "blue", // Blue
    "mediumblue", // MediumBlue
    "darkblue", // DarkBlue
    "navy", // Navy
    "midnightblue", // MidnightBlue
    // orange
    "orangered", // OrangeRed
    "tomato", // Tomato
    "coral", // Coral
    "darkorange", // DarkOrange
    "orange", // Orange
    // yellow
    "yellow", // Yellow
    "lightyellow", // LightYellow
    "lemonchiffon", // LemonChiffon
    "lightgoldenrodyellow", // LightGoldenrodYellow
    "papayawhip", // PapayaWhip
    "moccasin", // Moccasin
    "peachpuff", // PeachPuff
    "palegoldenrod", // PaleGoldenrod
    "khaki", // Khaki
    "darkkhaki", // DarkKhaki
    "gold", // Gold
    // brown
    "cornsilk", // Cornsilk
    "blanchedalmond", // BlanchedAlmond
    "bisque", // Bisque
    "navajowhite", // NavajoWhite
    "wheat", // Wheat
    "burlywood", // Burlywood
    "tan", // Tan
    "rosybrown", // RosyBrown
    "sandybrown", // SandyBrown
    "goldenrod", // Goldenrod
    "darkgoldenrod", // DarkGoldenrod
    "peru", // Peru
    "chocolate", // Chocolate
    "saddlebrown", // SaddleBrown
    "sienna", // Sienna
    "brown", // Brown
    "maroon", // Maroon
    // purple
    "lavender", // Lavender
    "thistle", // Thistle
    "plum", // Plum
    "violet", // Violet
    "orchid", // Orchid
    "fuchsia", // Fuchsia
    "magenta", // Magenta
    "mediumorchid", // MediumOrchid
    "mediumpurple", // MediumPurple
    "blueviolet", // BlueViolet
    "darkviolet", // DarkViolet
    "darkorchid", // DarkOrchid
    "darkmagenta", // DarkMagenta
    "purple", // Purple
    "indigo", // Indigo
    "darkslateblue", // DarkSlateBlue
    "slateblue", // SlateBlue
    "mediumslateblue", // MediumSlateBlue
    // white
    "white", // White
    "snow", // Snow
    "honeydew", // Honeydew
    "mintcream", // MintCream
    "azure", // Azure
    "aliceblue", // AliceBlue
    "ghostwhite", // GhostWhite
    "whitesmoke", // WhiteSmoke
    "seashell", // Seashell
    "beige", // Beige
    "oldlace", // OldLace
    "floralwhite", // FloralWhite
    "ivory", // Ivory
    "antiquewhite", // AntiqueWhite
    "linen", // Linen
    "lavenderblush", // LavenderBlush
    "mistyrose", // MistyRose
    // black
    "gainsboro", // Gainsboro
    "lightgray", // LightGray
    "silver", // Silver
    "darkgray", // DarkGray
    "gray", // Gray
    "dimgray", // DimGray
    "lightslategray", // LightSlateGray
    "slategray", // SlateGray
    "darkslategray", // DarkSlateGray
  ] as const;
  static isSize(size: string) {
    // absolute-sizeであればそれを返す
    size = size.trim();
    if (size.match(this.reLength)) {
      return `font-size:${size};`;
    }
    size = this.absolutes[size];
    if (size) {
      return `font-size:${size};`;
    }
    return "";
  }

  static isDisplay(style: string) {
    style = style.trim();
    switch (style) {
      case "inline":
      case "block":
        return `display:${style};`;
      case "center":
        return `display:block;text-align:center;`;
      case "right":
        return `display:block;text-align:right;`;
      case "left":
        return `display:block;`;
    }
    return "";
  }
  static isColor(color: string) {
    color = color.trim();
    if (color.match(this.reColor)) {
      return `color:${color};`;
    }
    // ここは高速化の余地あり
    const c = color.trim() as typeof this.webColors[number];
    if (this.webColors.includes(c)) {
      return `color:${c};`;
    }
    return "";
  }

  static test() {
    console.log("---------------- Style.test()");
    console.log(this.isSize("10px") === "10px");
    console.log(this.isSize("10cm") === "10cm");
    console.log(this.isSize("10mm") === "10mm");
    console.log(this.isSize("10Q") === "10Q");
    console.log(this.isSize("10in") === "10in");
    console.log(this.isSize("10pc") === "10pc");
    console.log(this.isSize("10pt") === "10pt");
    console.log(this.isSize("10%") === "10%");
    console.log(this.isSize("10.1px") === "10.1px");
    console.log(this.isSize("10.1cm") === "10.1cm");
    console.log(this.isSize("10.1mm") === "10.1mm");
    console.log(this.isSize("10.1Q") === "10.1Q");
    console.log(this.isSize("10.1in") === "10.1in");
    console.log(this.isSize("10.1pc") === "10.1pc");
    console.log(this.isSize("10.1pt") === "10.1pt");
    console.log(this.isSize("10.1%") === "10.1%");
    console.log(this.isSize("s") === "small");
    console.log(this.isSize("xs") === "x-small");
    console.log(this.isSize("xxs") === "xx-small");
    console.log(this.isSize("m") === "medium");
    console.log(this.isSize("l") === "large");
    console.log(this.isSize("xl") === "x-large");
    console.log(this.isSize("xxl") === "xx-large");
    console.log(this.isSize("xxxl") === "xxx-large");
    console.log(this.isSize("L") === "larger");
    console.log(this.isSize("S") === "smaller");
    console.log(this.isSize("10.1xx") === "");
    console.log(this.isSize("hoge") === "");
    console.log(this.isColor("#ghijk") === "");
    console.log(this.isColor("#808080") === "#808080");
    console.log(this.isColor("rgb(0,0,0)") === "rgb(0,0,0)");
    console.log(this.isColor("rgba(0,0,0,0.5)") === "rgba(0,0,0,0.5)");
    console.log(this.isColor("hsl(0,0%,0%)") === "hsl(0,0%,0%)");
    console.log(this.isColor("hsla(0,0%,0%,0.5)") === "hsla(0,0%,0%,0.5)");
  }
}
