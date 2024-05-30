export default class Emoji {
  private static groups: { [key: string]: string[] } = {};
  private static _groupNames: string[] = [];

  /** 初期化 */
  static initialize() {
    if (this._groupNames.length > 0) return;

    let currentGroup = "";
    this.emojis.forEach((code, name) => {
      switch (code) {
        case "category":
          break;
        case "group":
          currentGroup = name;
          this.groups[currentGroup] = [];
          this._groupNames.push(name);
          break;
        default:
          if (!currentGroup) break;
          this.groups[currentGroup].push(name);
          break;
      }
    });
  }

  /** グループ名の一覧を返す */
  static get groupNames() {
    this.initialize();
    return this._groupNames;
  }

  /** 指定された名前はグループ名か？ */
  static isGroupName(group: string) {
    return this.groupNames.includes(group);
  }

  /** グループ内の絵文字名を返す */
  static getEmojiNames(group: string) {
    return this.groups[group];
  }

  /** 絵文字名から絵文字コードを取得 */
  static getEmojiCode(name: string) {
    return this.emojis.get(name) || `unknown emoji - ${name}`;
  }

  // https://unicode.org/emoji/charts/full-emoji-list.html
  static emojis = new Map<string, string>([
    ["Smileys & Emotion", "category"], // ----------------
    ["face-smiling", "group"], // --------
    ["grinning face", "&#x1f600;"], // 1
    ["grinning face with big eyes", "&#x1f603;"], // 2
    ["grinning face with smiling eyes", "&#x1f604;"], // 3
    ["beaming face with smiling eyes", "&#x1f601;"], // 4
    ["grinning squinting face", "&#x1f606;"], // 5
    ["grinning face with sweat", "&#x1f605;"], // 6
    ["rolling on the floor laughing", "&#x1f923;"], // 7
    ["face with tears of joy", "&#x1f602;"], // 8
    ["slightly smiling face", "&#x1f642;"], // 9
    ["upside-down face", "&#x1f643;"], // 10
    ["melting face", "&#x1fae0;"], // 11
    ["winking face", "&#x1f609;"], // 12
    ["smiling face with smiling eyes", "&#x1f60a;"], // 13
    ["smiling face with halo", "&#x1f607;"], // 14
    ["face-affection", "group"], // --------
    ["smiling face with hearts", "&#x1f970;"], // 15
    ["smiling face with heart-eyes", "&#x1f60d;"], // 16
    ["star-struck", "&#x1f929;"], // 17
    ["face blowing a kiss", "&#x1f618;"], // 18
    ["kissing face", "&#x1f617;"], // 19
    ["smiling face", "&#x263a;"], // 20
    ["kissing face with closed eyes", "&#x1f61a;"], // 21
    ["kissing face with smiling eyes", "&#x1f619;"], // 22
    ["smiling face with tear", "&#x1f972;"], // 23
    ["face-tongue", "group"], // --------
    ["face savoring food", "&#x1f60b;"], // 24
    ["face with tongue", "&#x1f61b;"], // 25
    ["winking face with tongue", "&#x1f61c;"], // 26
    ["zany face", "&#x1f92a;"], // 27
    ["squinting face with tongue", "&#x1f61d;"], // 28
    ["money-mouth face", "&#x1f911;"], // 29
    ["face-hand", "group"], // --------
    ["smiling face with open hands", "&#x1f917;"], // 30
    ["face with hand over mouth", "&#x1f92d;"], // 31
    ["face with open eyes and hand over mouth", "&#x1fae2;"], // 32
    ["face with peeking eye", "&#x1fae3;"], // 33
    ["shushing face", "&#x1f92b;"], // 34
    ["thinking face", "&#x1f914;"], // 35
    ["saluting face", "&#x1fae1;"], // 36
    ["face-neutral-skeptical", "group"], // --------
    ["zipper-mouth face", "&#x1f910;"], // 37
    ["face with raised eyebrow", "&#x1f928;"], // 38
    ["neutral face", "&#x1f610;"], // 39
    ["expressionless face", "&#x1f611;"], // 40
    ["face without mouth", "&#x1f636;"], // 41
    ["dotted line face", "&#x1fae5;"], // 42
    ["face in clouds", "&#x1f636;&#x200d;&#x1f32b;&#xfe0f;"], // 43
    ["smirking face", "&#x1f60f;"], // 44
    ["unamused face", "&#x1f612;"], // 45
    ["face with rolling eyes", "&#x1f644;"], // 46
    ["grimacing face", "&#x1f62c;"], // 47
    ["face exhaling", "&#x1f62e;&#x200d;&#x1f4a8;"], // 48
    ["lying face", "&#x1f925;"], // 49
    ["shaking face", "&#x1fae8;"], // 50
    ["face-sleepy", "group"], // --------
    ["relieved face", "&#x1f60c;"], // 51
    ["pensive face", "&#x1f614;"], // 52
    ["sleepy face", "&#x1f62a;"], // 53
    ["drooling face", "&#x1f924;"], // 54
    ["sleeping face", "&#x1f634;"], // 55
    ["face-unwell", "group"], // --------
    ["face with medical mask", "&#x1f637;"], // 56
    ["face with thermometer", "&#x1f912;"], // 57
    ["face with head-bandage", "&#x1f915;"], // 58
    ["nauseated face", "&#x1f922;"], // 59
    ["face vomiting", "&#x1f92e;"], // 60
    ["sneezing face", "&#x1f927;"], // 61
    ["hot face", "&#x1f975;"], // 62
    ["cold face", "&#x1f976;"], // 63
    ["woozy face", "&#x1f974;"], // 64
    ["face with crossed-out eyes", "&#x1f635;"], // 65
    ["face with spiral eyes", "&#x1f635;&#x200d;&#x1f4ab;"], // 66
    ["exploding head", "&#x1f92f;"], // 67
    ["face-hat", "group"], // --------
    ["cowboy hat face", "&#x1f920;"], // 68
    ["partying face", "&#x1f973;"], // 69
    ["disguised face", "&#x1f978;"], // 70
    ["face-glasses", "group"], // --------
    ["smiling face with sunglasses", "&#x1f60e;"], // 71
    ["nerd face", "&#x1f913;"], // 72
    ["face with monocle", "&#x1f9d0;"], // 73
    ["face-concerned", "group"], // --------
    ["confused face", "&#x1f615;"], // 74
    ["face with diagonal mouth", "&#x1fae4;"], // 75
    ["worried face", "&#x1f61f;"], // 76
    ["slightly frowning face", "&#x1f641;"], // 77
    ["frowning face", "&#x2639;"], // 78
    ["face with open mouth", "&#x1f62e;"], // 79
    ["hushed face", "&#x1f62f;"], // 80
    ["astonished face", "&#x1f632;"], // 81
    ["flushed face", "&#x1f633;"], // 82
    ["pleading face", "&#x1f97a;"], // 83
    ["face holding back tears", "&#x1f979;"], // 84
    ["frowning face with open mouth", "&#x1f626;"], // 85
    ["anguished face", "&#x1f627;"], // 86
    ["fearful face", "&#x1f628;"], // 87
    ["anxious face with sweat", "&#x1f630;"], // 88
    ["sad but relieved face", "&#x1f625;"], // 89
    ["crying face", "&#x1f622;"], // 90
    ["loudly crying face", "&#x1f62d;"], // 91
    ["face screaming in fear", "&#x1f631;"], // 92
    ["confounded face", "&#x1f616;"], // 93
    ["persevering face", "&#x1f623;"], // 94
    ["disappointed face", "&#x1f61e;"], // 95
    ["downcast face with sweat", "&#x1f613;"], // 96
    ["weary face", "&#x1f629;"], // 97
    ["tired face", "&#x1f62b;"], // 98
    ["yawning face", "&#x1f971;"], // 99
    ["face-negative", "group"], // --------
    ["face with steam from nose", "&#x1f624;"], // 100
    ["enraged face", "&#x1f621;"], // 101
    ["angry face", "&#x1f620;"], // 102
    ["face with symbols on mouth", "&#x1f92c;"], // 103
    ["smiling face with horns", "&#x1f608;"], // 104
    ["angry face with horns", "&#x1f47f;"], // 105
    ["skull", "&#x1f480;"], // 106
    ["skull and crossbones", "&#x2620;"], // 107
    ["face-costume", "group"], // --------
    ["pile of poo", "&#x1f4a9;"], // 108
    ["clown face", "&#x1f921;"], // 109
    ["ogre", "&#x1f479;"], // 110
    ["goblin", "&#x1f47a;"], // 111
    ["ghost", "&#x1f47b;"], // 112
    ["alien", "&#x1f47d;"], // 113
    ["alien monster", "&#x1f47e;"], // 114
    ["robot", "&#x1f916;"], // 115
    ["cat-face", "group"], // --------
    ["grinning cat", "&#x1f63a;"], // 116
    ["grinning cat with smiling eyes", "&#x1f638;"], // 117
    ["cat with tears of joy", "&#x1f639;"], // 118
    ["smiling cat with heart-eyes", "&#x1f63b;"], // 119
    ["cat with wry smile", "&#x1f63c;"], // 120
    ["kissing cat", "&#x1f63d;"], // 121
    ["weary cat", "&#x1f640;"], // 122
    ["crying cat", "&#x1f63f;"], // 123
    ["pouting cat", "&#x1f63e;"], // 124
    ["monkey-face", "group"], // --------
    ["see-no-evil monkey", "&#x1f648;"], // 125
    ["hear-no-evil monkey", "&#x1f649;"], // 126
    ["speak-no-evil monkey", "&#x1f64a;"], // 127
    ["heart", "group"], // --------
    ["love letter", "&#x1f48c;"], // 128
    ["heart with arrow", "&#x1f498;"], // 129
    ["heart with ribbon", "&#x1f49d;"], // 130
    ["sparkling heart", "&#x1f496;"], // 131
    ["growing heart", "&#x1f497;"], // 132
    ["beating heart", "&#x1f493;"], // 133
    ["revolving hearts", "&#x1f49e;"], // 134
    ["two hearts", "&#x1f495;"], // 135
    ["heart decoration", "&#x1f49f;"], // 136
    ["heart exclamation", "&#x2763;"], // 137
    ["broken heart", "&#x1f494;"], // 138
    ["heart on fire", "&#x2764;&#xfe0f;&#x200d;&#x1f525;"], // 139
    ["mending heart", "&#x2764;&#xfe0f;&#x200d;&#x1fa79;"], // 140
    ["red heart", "&#x2764;"], // 141
    ["pink heart", "&#x1fa77;"], // 142
    ["orange heart", "&#x1f9e1;"], // 143
    ["yellow heart", "&#x1f49b;"], // 144
    ["green heart", "&#x1f49a;"], // 145
    ["blue heart", "&#x1f499;"], // 146
    ["light blue heart", "&#x1fa75;"], // 147
    ["purple heart", "&#x1f49c;"], // 148
    ["brown heart", "&#x1f90e;"], // 149
    ["black heart", "&#x1f5a4;"], // 150
    ["grey heart", "&#x1fa76;"], // 151
    ["white heart", "&#x1f90d;"], // 152
    ["emotion", "group"], // --------
    ["kiss mark", "&#x1f48b;"], // 153
    ["hundred points", "&#x1f4af;"], // 154
    ["anger symbol", "&#x1f4a2;"], // 155
    ["collision", "&#x1f4a5;"], // 156
    ["dizzy", "&#x1f4ab;"], // 157
    ["sweat droplets", "&#x1f4a6;"], // 158
    ["dashing away", "&#x1f4a8;"], // 159
    ["hole", "&#x1f573;"], // 160
    ["speech balloon", "&#x1f4ac;"], // 161
    ["eye in speech bubble", "&#x1f441;&#xfe0f;&#x200d;&#x1f5e8;&#xfe0f;"], // 162
    ["left speech bubble", "&#x1f5e8;"], // 163
    ["right anger bubble", "&#x1f5ef;"], // 164
    ["thought balloon", "&#x1f4ad;"], // 165
    ["zzz", "&#x1f4a4;"], // 166
    ["People & Body", "category"], // ----------------
    ["hand-fingers-open", "group"], // --------
    ["waving hand", "&#x1f44b;"], // 167
    ["raised back of hand", "&#x1f91a;"], // 168
    ["hand with fingers splayed", "&#x1f590;"], // 169
    ["raised hand", "&#x270b;"], // 170
    ["vulcan salute", "&#x1f596;"], // 171
    ["rightwards hand", "&#x1faf1;"], // 172
    ["leftwards hand", "&#x1faf2;"], // 173
    ["palm down hand", "&#x1faf3;"], // 174
    ["palm up hand", "&#x1faf4;"], // 175
    ["leftwards pushing hand", "&#x1faf7;"], // 176
    ["rightwards pushing hand", "&#x1faf8;"], // 177
    ["hand-fingers-partial", "group"], // --------
    ["ok hand", "&#x1f44c;"], // 178
    ["pinched fingers", "&#x1f90c;"], // 179
    ["pinching hand", "&#x1f90f;"], // 180
    ["victory hand", "&#x270c;"], // 181
    ["crossed fingers", "&#x1f91e;"], // 182
    ["hand with index finger and thumb crossed", "&#x1faf0;"], // 183
    ["love-you gesture", "&#x1f91f;"], // 184
    ["sign of the horns", "&#x1f918;"], // 185
    ["call me hand", "&#x1f919;"], // 186
    ["hand-single-finger", "group"], // --------
    ["backhand index pointing left", "&#x1f448;"], // 187
    ["backhand index pointing right", "&#x1f449;"], // 188
    ["backhand index pointing up", "&#x1f446;"], // 189
    ["middle finger", "&#x1f595;"], // 190
    ["backhand index pointing down", "&#x1f447;"], // 191
    ["index pointing up", "&#x261d;"], // 192
    ["index pointing at the viewer", "&#x1faf5;"], // 193
    ["hand-fingers-closed", "group"], // --------
    ["thumbs up", "&#x1f44d;"], // 194
    ["thumbs down", "&#x1f44e;"], // 195
    ["raised fist", "&#x270a;"], // 196
    ["oncoming fist", "&#x1f44a;"], // 197
    ["left-facing fist", "&#x1f91b;"], // 198
    ["right-facing fist", "&#x1f91c;"], // 199
    ["hands", "group"], // --------
    ["clapping hands", "&#x1f44f;"], // 200
    ["raising hands", "&#x1f64c;"], // 201
    ["heart hands", "&#x1faf6;"], // 202
    ["open hands", "&#x1f450;"], // 203
    ["palms up together", "&#x1f932;"], // 204
    ["handshake", "&#x1f91d;"], // 205
    ["folded hands", "&#x1f64f;"], // 206
    ["hand-prop", "group"], // --------
    ["writing hand", "&#x270d;"], // 207
    ["nail polish", "&#x1f485;"], // 208
    ["selfie", "&#x1f933;"], // 209
    ["body-parts", "group"], // --------
    ["flexed biceps", "&#x1f4aa;"], // 210
    ["mechanical arm", "&#x1f9be;"], // 211
    ["mechanical leg", "&#x1f9bf;"], // 212
    ["leg", "&#x1f9b5;"], // 213
    ["foot", "&#x1f9b6;"], // 214
    ["ear", "&#x1f442;"], // 215
    ["ear with hearing aid", "&#x1f9bb;"], // 216
    ["nose", "&#x1f443;"], // 217
    ["brain", "&#x1f9e0;"], // 218
    ["anatomical heart", "&#x1fac0;"], // 219
    ["lungs", "&#x1fac1;"], // 220
    ["tooth", "&#x1f9b7;"], // 221
    ["bone", "&#x1f9b4;"], // 222
    ["eyes", "&#x1f440;"], // 223
    ["eye", "&#x1f441;"], // 224
    ["tongue", "&#x1f445;"], // 225
    ["mouth", "&#x1f444;"], // 226
    ["biting lip", "&#x1fae6;"], // 227
    ["person", "group"], // --------
    ["baby", "&#x1f476;"], // 228
    ["child", "&#x1f9d2;"], // 229
    ["boy", "&#x1f466;"], // 230
    ["girl", "&#x1f467;"], // 231
    ["person", "&#x1f9d1;"], // 232
    ["person: blond hair", "&#x1f471;"], // 233
    ["man", "&#x1f468;"], // 234
    ["person: beard", "&#x1f9d4;"], // 235
    ["man: beard", "&#x1f9d4;&#x200d;&#x2642;&#xfe0f;"], // 236
    ["woman: beard", "&#x1f9d4;&#x200d;&#x2640;&#xfe0f;"], // 237
    ["man: red hair", "&#x1f468;&#x200d;&#x1f9b0;"], // 238
    ["man: curly hair", "&#x1f468;&#x200d;&#x1f9b1;"], // 239
    ["man: white hair", "&#x1f468;&#x200d;&#x1f9b3;"], // 240
    ["man: bald", "&#x1f468;&#x200d;&#x1f9b2;"], // 241
    ["woman", "&#x1f469;"], // 242
    ["woman: red hair", "&#x1f469;&#x200d;&#x1f9b0;"], // 243
    ["person: red hair", "&#x1f9d1;&#x200d;&#x1f9b0;"], // 244
    ["woman: curly hair", "&#x1f469;&#x200d;&#x1f9b1;"], // 245
    ["person: curly hair", "&#x1f9d1;&#x200d;&#x1f9b1;"], // 246
    ["woman: white hair", "&#x1f469;&#x200d;&#x1f9b3;"], // 247
    ["person: white hair", "&#x1f9d1;&#x200d;&#x1f9b3;"], // 248
    ["woman: bald", "&#x1f469;&#x200d;&#x1f9b2;"], // 249
    ["person: bald", "&#x1f9d1;&#x200d;&#x1f9b2;"], // 250
    ["woman: blond hair", "&#x1f471;&#x200d;&#x2640;&#xfe0f;"], // 251
    ["man: blond hair", "&#x1f471;&#x200d;&#x2642;&#xfe0f;"], // 252
    ["older person", "&#x1f9d3;"], // 253
    ["old man", "&#x1f474;"], // 254
    ["old woman", "&#x1f475;"], // 255
    ["person-gesture", "group"], // --------
    ["person frowning", "&#x1f64d;"], // 256
    ["man frowning", "&#x1f64d;&#x200d;&#x2642;&#xfe0f;"], // 257
    ["woman frowning", "&#x1f64d;&#x200d;&#x2640;&#xfe0f;"], // 258
    ["person pouting", "&#x1f64e;"], // 259
    ["man pouting", "&#x1f64e;&#x200d;&#x2642;&#xfe0f;"], // 260
    ["woman pouting", "&#x1f64e;&#x200d;&#x2640;&#xfe0f;"], // 261
    ["person gesturing no", "&#x1f645;"], // 262
    ["man gesturing no", "&#x1f645;&#x200d;&#x2642;&#xfe0f;"], // 263
    ["woman gesturing no", "&#x1f645;&#x200d;&#x2640;&#xfe0f;"], // 264
    ["person gesturing ok", "&#x1f646;"], // 265
    ["man gesturing ok", "&#x1f646;&#x200d;&#x2642;&#xfe0f;"], // 266
    ["woman gesturing ok", "&#x1f646;&#x200d;&#x2640;&#xfe0f;"], // 267
    ["person tipping hand", "&#x1f481;"], // 268
    ["man tipping hand", "&#x1f481;&#x200d;&#x2642;&#xfe0f;"], // 269
    ["woman tipping hand", "&#x1f481;&#x200d;&#x2640;&#xfe0f;"], // 270
    ["person raising hand", "&#x1f64b;"], // 271
    ["man raising hand", "&#x1f64b;&#x200d;&#x2642;&#xfe0f;"], // 272
    ["woman raising hand", "&#x1f64b;&#x200d;&#x2640;&#xfe0f;"], // 273
    ["deaf person", "&#x1f9cf;"], // 274
    ["deaf man", "&#x1f9cf;&#x200d;&#x2642;&#xfe0f;"], // 275
    ["deaf woman", "&#x1f9cf;&#x200d;&#x2640;&#xfe0f;"], // 276
    ["person bowing", "&#x1f647;"], // 277
    ["man bowing", "&#x1f647;&#x200d;&#x2642;&#xfe0f;"], // 278
    ["woman bowing", "&#x1f647;&#x200d;&#x2640;&#xfe0f;"], // 279
    ["person facepalming", "&#x1f926;"], // 280
    ["man facepalming", "&#x1f926;&#x200d;&#x2642;&#xfe0f;"], // 281
    ["woman facepalming", "&#x1f926;&#x200d;&#x2640;&#xfe0f;"], // 282
    ["person shrugging", "&#x1f937;"], // 283
    ["man shrugging", "&#x1f937;&#x200d;&#x2642;&#xfe0f;"], // 284
    ["woman shrugging", "&#x1f937;&#x200d;&#x2640;&#xfe0f;"], // 285
    ["person-role", "group"], // --------
    ["health worker", "&#x1f9d1;&#x200d;&#x2695;&#xfe0f;"], // 286
    ["man health worker", "&#x1f468;&#x200d;&#x2695;&#xfe0f;"], // 287
    ["woman health worker", "&#x1f469;&#x200d;&#x2695;&#xfe0f;"], // 288
    ["student", "&#x1f9d1;&#x200d;&#x1f393;"], // 289
    ["man student", "&#x1f468;&#x200d;&#x1f393;"], // 290
    ["woman student", "&#x1f469;&#x200d;&#x1f393;"], // 291
    ["teacher", "&#x1f9d1;&#x200d;&#x1f3eb;"], // 292
    ["man teacher", "&#x1f468;&#x200d;&#x1f3eb;"], // 293
    ["woman teacher", "&#x1f469;&#x200d;&#x1f3eb;"], // 294
    ["judge", "&#x1f9d1;&#x200d;&#x2696;&#xfe0f;"], // 295
    ["man judge", "&#x1f468;&#x200d;&#x2696;&#xfe0f;"], // 296
    ["woman judge", "&#x1f469;&#x200d;&#x2696;&#xfe0f;"], // 297
    ["farmer", "&#x1f9d1;&#x200d;&#x1f33e;"], // 298
    ["man farmer", "&#x1f468;&#x200d;&#x1f33e;"], // 299
    ["woman farmer", "&#x1f469;&#x200d;&#x1f33e;"], // 300
    ["cook", "&#x1f9d1;&#x200d;&#x1f373;"], // 301
    ["man cook", "&#x1f468;&#x200d;&#x1f373;"], // 302
    ["woman cook", "&#x1f469;&#x200d;&#x1f373;"], // 303
    ["mechanic", "&#x1f9d1;&#x200d;&#x1f527;"], // 304
    ["man mechanic", "&#x1f468;&#x200d;&#x1f527;"], // 305
    ["woman mechanic", "&#x1f469;&#x200d;&#x1f527;"], // 306
    ["factory worker", "&#x1f9d1;&#x200d;&#x1f3ed;"], // 307
    ["man factory worker", "&#x1f468;&#x200d;&#x1f3ed;"], // 308
    ["woman factory worker", "&#x1f469;&#x200d;&#x1f3ed;"], // 309
    ["office worker", "&#x1f9d1;&#x200d;&#x1f4bc;"], // 310
    ["man office worker", "&#x1f468;&#x200d;&#x1f4bc;"], // 311
    ["woman office worker", "&#x1f469;&#x200d;&#x1f4bc;"], // 312
    ["scientist", "&#x1f9d1;&#x200d;&#x1f52c;"], // 313
    ["man scientist", "&#x1f468;&#x200d;&#x1f52c;"], // 314
    ["woman scientist", "&#x1f469;&#x200d;&#x1f52c;"], // 315
    ["technologist", "&#x1f9d1;&#x200d;&#x1f4bb;"], // 316
    ["man technologist", "&#x1f468;&#x200d;&#x1f4bb;"], // 317
    ["woman technologist", "&#x1f469;&#x200d;&#x1f4bb;"], // 318
    ["singer", "&#x1f9d1;&#x200d;&#x1f3a4;"], // 319
    ["man singer", "&#x1f468;&#x200d;&#x1f3a4;"], // 320
    ["woman singer", "&#x1f469;&#x200d;&#x1f3a4;"], // 321
    ["artist", "&#x1f9d1;&#x200d;&#x1f3a8;"], // 322
    ["man artist", "&#x1f468;&#x200d;&#x1f3a8;"], // 323
    ["woman artist", "&#x1f469;&#x200d;&#x1f3a8;"], // 324
    ["pilot", "&#x1f9d1;&#x200d;&#x2708;&#xfe0f;"], // 325
    ["man pilot", "&#x1f468;&#x200d;&#x2708;&#xfe0f;"], // 326
    ["woman pilot", "&#x1f469;&#x200d;&#x2708;&#xfe0f;"], // 327
    ["astronaut", "&#x1f9d1;&#x200d;&#x1f680;"], // 328
    ["man astronaut", "&#x1f468;&#x200d;&#x1f680;"], // 329
    ["woman astronaut", "&#x1f469;&#x200d;&#x1f680;"], // 330
    ["firefighter", "&#x1f9d1;&#x200d;&#x1f692;"], // 331
    ["man firefighter", "&#x1f468;&#x200d;&#x1f692;"], // 332
    ["woman firefighter", "&#x1f469;&#x200d;&#x1f692;"], // 333
    ["police officer", "&#x1f46e;"], // 334
    ["man police officer", "&#x1f46e;&#x200d;&#x2642;&#xfe0f;"], // 335
    ["woman police officer", "&#x1f46e;&#x200d;&#x2640;&#xfe0f;"], // 336
    ["detective", "&#x1f575;"], // 337
    ["man detective", "&#x1f575;&#xfe0f;&#x200d;&#x2642;&#xfe0f;"], // 338
    ["woman detective", "&#x1f575;&#xfe0f;&#x200d;&#x2640;&#xfe0f;"], // 339
    ["guard", "&#x1f482;"], // 340
    ["man guard", "&#x1f482;&#x200d;&#x2642;&#xfe0f;"], // 341
    ["woman guard", "&#x1f482;&#x200d;&#x2640;&#xfe0f;"], // 342
    ["ninja", "&#x1f977;"], // 343
    ["construction worker", "&#x1f477;"], // 344
    ["man construction worker", "&#x1f477;&#x200d;&#x2642;&#xfe0f;"], // 345
    ["woman construction worker", "&#x1f477;&#x200d;&#x2640;&#xfe0f;"], // 346
    ["person with crown", "&#x1fac5;"], // 347
    ["prince", "&#x1f934;"], // 348
    ["princess", "&#x1f478;"], // 349
    ["person wearing turban", "&#x1f473;"], // 350
    ["man wearing turban", "&#x1f473;&#x200d;&#x2642;&#xfe0f;"], // 351
    ["woman wearing turban", "&#x1f473;&#x200d;&#x2640;&#xfe0f;"], // 352
    ["person with skullcap", "&#x1f472;"], // 353
    ["woman with headscarf", "&#x1f9d5;"], // 354
    ["person in tuxedo", "&#x1f935;"], // 355
    ["man in tuxedo", "&#x1f935;&#x200d;&#x2642;&#xfe0f;"], // 356
    ["woman in tuxedo", "&#x1f935;&#x200d;&#x2640;&#xfe0f;"], // 357
    ["person with veil", "&#x1f470;"], // 358
    ["man with veil", "&#x1f470;&#x200d;&#x2642;&#xfe0f;"], // 359
    ["woman with veil", "&#x1f470;&#x200d;&#x2640;&#xfe0f;"], // 360
    ["pregnant woman", "&#x1f930;"], // 361
    ["pregnant man", "&#x1fac3;"], // 362
    ["pregnant person", "&#x1fac4;"], // 363
    ["breast-feeding", "&#x1f931;"], // 364
    ["woman feeding baby", "&#x1f469;&#x200d;&#x1f37c;"], // 365
    ["man feeding baby", "&#x1f468;&#x200d;&#x1f37c;"], // 366
    ["person feeding baby", "&#x1f9d1;&#x200d;&#x1f37c;"], // 367
    ["person-fantasy", "group"], // --------
    ["baby angel", "&#x1f47c;"], // 368
    ["santa claus", "&#x1f385;"], // 369
    ["mrs. claus", "&#x1f936;"], // 370
    ["mx claus", "&#x1f9d1;&#x200d;&#x1f384;"], // 371
    ["superhero", "&#x1f9b8;"], // 372
    ["man superhero", "&#x1f9b8;&#x200d;&#x2642;&#xfe0f;"], // 373
    ["woman superhero", "&#x1f9b8;&#x200d;&#x2640;&#xfe0f;"], // 374
    ["supervillain", "&#x1f9b9;"], // 375
    ["man supervillain", "&#x1f9b9;&#x200d;&#x2642;&#xfe0f;"], // 376
    ["woman supervillain", "&#x1f9b9;&#x200d;&#x2640;&#xfe0f;"], // 377
    ["mage", "&#x1f9d9;"], // 378
    ["man mage", "&#x1f9d9;&#x200d;&#x2642;&#xfe0f;"], // 379
    ["woman mage", "&#x1f9d9;&#x200d;&#x2640;&#xfe0f;"], // 380
    ["fairy", "&#x1f9da;"], // 381
    ["man fairy", "&#x1f9da;&#x200d;&#x2642;&#xfe0f;"], // 382
    ["woman fairy", "&#x1f9da;&#x200d;&#x2640;&#xfe0f;"], // 383
    ["vampire", "&#x1f9db;"], // 384
    ["man vampire", "&#x1f9db;&#x200d;&#x2642;&#xfe0f;"], // 385
    ["woman vampire", "&#x1f9db;&#x200d;&#x2640;&#xfe0f;"], // 386
    ["merperson", "&#x1f9dc;"], // 387
    ["merman", "&#x1f9dc;&#x200d;&#x2642;&#xfe0f;"], // 388
    ["mermaid", "&#x1f9dc;&#x200d;&#x2640;&#xfe0f;"], // 389
    ["elf", "&#x1f9dd;"], // 390
    ["man elf", "&#x1f9dd;&#x200d;&#x2642;&#xfe0f;"], // 391
    ["woman elf", "&#x1f9dd;&#x200d;&#x2640;&#xfe0f;"], // 392
    ["genie", "&#x1f9de;"], // 393
    ["man genie", "&#x1f9de;&#x200d;&#x2642;&#xfe0f;"], // 394
    ["woman genie", "&#x1f9de;&#x200d;&#x2640;&#xfe0f;"], // 395
    ["zombie", "&#x1f9df;"], // 396
    ["man zombie", "&#x1f9df;&#x200d;&#x2642;&#xfe0f;"], // 397
    ["woman zombie", "&#x1f9df;&#x200d;&#x2640;&#xfe0f;"], // 398
    ["troll", "&#x1f9cc;"], // 399
    ["person-activity", "group"], // --------
    ["person getting massage", "&#x1f486;"], // 400
    ["man getting massage", "&#x1f486;&#x200d;&#x2642;&#xfe0f;"], // 401
    ["woman getting massage", "&#x1f486;&#x200d;&#x2640;&#xfe0f;"], // 402
    ["person getting haircut", "&#x1f487;"], // 403
    ["man getting haircut", "&#x1f487;&#x200d;&#x2642;&#xfe0f;"], // 404
    ["woman getting haircut", "&#x1f487;&#x200d;&#x2640;&#xfe0f;"], // 405
    ["person walking", "&#x1f6b6;"], // 406
    ["man walking", "&#x1f6b6;&#x200d;&#x2642;&#xfe0f;"], // 407
    ["woman walking", "&#x1f6b6;&#x200d;&#x2640;&#xfe0f;"], // 408
    ["person standing", "&#x1f9cd;"], // 409
    ["man standing", "&#x1f9cd;&#x200d;&#x2642;&#xfe0f;"], // 410
    ["woman standing", "&#x1f9cd;&#x200d;&#x2640;&#xfe0f;"], // 411
    ["person kneeling", "&#x1f9ce;"], // 412
    ["man kneeling", "&#x1f9ce;&#x200d;&#x2642;&#xfe0f;"], // 413
    ["woman kneeling", "&#x1f9ce;&#x200d;&#x2640;&#xfe0f;"], // 414
    ["person with white cane", "&#x1f9d1;&#x200d;&#x1f9af;"], // 415
    ["man with white cane", "&#x1f468;&#x200d;&#x1f9af;"], // 416
    ["woman with white cane", "&#x1f469;&#x200d;&#x1f9af;"], // 417
    ["person in motorized wheelchair", "&#x1f9d1;&#x200d;&#x1f9bc;"], // 418
    ["man in motorized wheelchair", "&#x1f468;&#x200d;&#x1f9bc;"], // 419
    ["woman in motorized wheelchair", "&#x1f469;&#x200d;&#x1f9bc;"], // 420
    ["person in manual wheelchair", "&#x1f9d1;&#x200d;&#x1f9bd;"], // 421
    ["man in manual wheelchair", "&#x1f468;&#x200d;&#x1f9bd;"], // 422
    ["woman in manual wheelchair", "&#x1f469;&#x200d;&#x1f9bd;"], // 423
    ["person running", "&#x1f3c3;"], // 424
    ["man running", "&#x1f3c3;&#x200d;&#x2642;&#xfe0f;"], // 425
    ["woman running", "&#x1f3c3;&#x200d;&#x2640;&#xfe0f;"], // 426
    ["woman dancing", "&#x1f483;"], // 427
    ["man dancing", "&#x1f57a;"], // 428
    ["person in suit levitating", "&#x1f574;"], // 429
    ["people with bunny ears", "&#x1f46f;"], // 430
    ["men with bunny ears", "&#x1f46f;&#x200d;&#x2642;&#xfe0f;"], // 431
    ["women with bunny ears", "&#x1f46f;&#x200d;&#x2640;&#xfe0f;"], // 432
    ["person in steamy room", "&#x1f9d6;"], // 433
    ["man in steamy room", "&#x1f9d6;&#x200d;&#x2642;&#xfe0f;"], // 434
    ["woman in steamy room", "&#x1f9d6;&#x200d;&#x2640;&#xfe0f;"], // 435
    ["person climbing", "&#x1f9d7;"], // 436
    ["man climbing", "&#x1f9d7;&#x200d;&#x2642;&#xfe0f;"], // 437
    ["woman climbing", "&#x1f9d7;&#x200d;&#x2640;&#xfe0f;"], // 438
    ["person-sport", "group"], // --------
    ["person fencing", "&#x1f93a;"], // 439
    ["horse racing", "&#x1f3c7;"], // 440
    ["skier", "&#x26f7;"], // 441
    ["snowboarder", "&#x1f3c2;"], // 442
    ["person golfing", "&#x1f3cc;"], // 443
    ["man golfing", "&#x1f3cc;&#xfe0f;&#x200d;&#x2642;&#xfe0f;"], // 444
    ["woman golfing", "&#x1f3cc;&#xfe0f;&#x200d;&#x2640;&#xfe0f;"], // 445
    ["person surfing", "&#x1f3c4;"], // 446
    ["man surfing", "&#x1f3c4;&#x200d;&#x2642;&#xfe0f;"], // 447
    ["woman surfing", "&#x1f3c4;&#x200d;&#x2640;&#xfe0f;"], // 448
    ["person rowing boat", "&#x1f6a3;"], // 449
    ["man rowing boat", "&#x1f6a3;&#x200d;&#x2642;&#xfe0f;"], // 450
    ["woman rowing boat", "&#x1f6a3;&#x200d;&#x2640;&#xfe0f;"], // 451
    ["person swimming", "&#x1f3ca;"], // 452
    ["man swimming", "&#x1f3ca;&#x200d;&#x2642;&#xfe0f;"], // 453
    ["woman swimming", "&#x1f3ca;&#x200d;&#x2640;&#xfe0f;"], // 454
    ["person bouncing ball", "&#x26f9;"], // 455
    ["man bouncing ball", "&#x26f9;&#xfe0f;&#x200d;&#x2642;&#xfe0f;"], // 456
    ["woman bouncing ball", "&#x26f9;&#xfe0f;&#x200d;&#x2640;&#xfe0f;"], // 457
    ["person lifting weights", "&#x1f3cb;"], // 458
    ["man lifting weights", "&#x1f3cb;&#xfe0f;&#x200d;&#x2642;&#xfe0f;"], // 459
    ["woman lifting weights", "&#x1f3cb;&#xfe0f;&#x200d;&#x2640;&#xfe0f;"], // 460
    ["person biking", "&#x1f6b4;"], // 461
    ["man biking", "&#x1f6b4;&#x200d;&#x2642;&#xfe0f;"], // 462
    ["woman biking", "&#x1f6b4;&#x200d;&#x2640;&#xfe0f;"], // 463
    ["person mountain biking", "&#x1f6b5;"], // 464
    ["man mountain biking", "&#x1f6b5;&#x200d;&#x2642;&#xfe0f;"], // 465
    ["woman mountain biking", "&#x1f6b5;&#x200d;&#x2640;&#xfe0f;"], // 466
    ["person cartwheeling", "&#x1f938;"], // 467
    ["man cartwheeling", "&#x1f938;&#x200d;&#x2642;&#xfe0f;"], // 468
    ["woman cartwheeling", "&#x1f938;&#x200d;&#x2640;&#xfe0f;"], // 469
    ["people wrestling", "&#x1f93c;"], // 470
    ["men wrestling", "&#x1f93c;&#x200d;&#x2642;&#xfe0f;"], // 471
    ["women wrestling", "&#x1f93c;&#x200d;&#x2640;&#xfe0f;"], // 472
    ["person playing water polo", "&#x1f93d;"], // 473
    ["man playing water polo", "&#x1f93d;&#x200d;&#x2642;&#xfe0f;"], // 474
    ["woman playing water polo", "&#x1f93d;&#x200d;&#x2640;&#xfe0f;"], // 475
    ["person playing handball", "&#x1f93e;"], // 476
    ["man playing handball", "&#x1f93e;&#x200d;&#x2642;&#xfe0f;"], // 477
    ["woman playing handball", "&#x1f93e;&#x200d;&#x2640;&#xfe0f;"], // 478
    ["person juggling", "&#x1f939;"], // 479
    ["man juggling", "&#x1f939;&#x200d;&#x2642;&#xfe0f;"], // 480
    ["woman juggling", "&#x1f939;&#x200d;&#x2640;&#xfe0f;"], // 481
    ["person-resting", "group"], // --------
    ["person in lotus position", "&#x1f9d8;"], // 482
    ["man in lotus position", "&#x1f9d8;&#x200d;&#x2642;&#xfe0f;"], // 483
    ["woman in lotus position", "&#x1f9d8;&#x200d;&#x2640;&#xfe0f;"], // 484
    ["person taking bath", "&#x1f6c0;"], // 485
    ["person in bed", "&#x1f6cc;"], // 486
    ["family", "group"], // --------
    ["people holding hands", "&#x1f9d1;&#x200d;&#x1f91d;&#x200d;&#x1f9d1;"], // 487
    ["women holding hands", "&#x1f46d;"], // 488
    ["woman and man holding hands", "&#x1f46b;"], // 489
    ["men holding hands", "&#x1f46c;"], // 490
    ["kiss", "&#x1f48f;"], // 491
    [
      "kiss: woman, man",
      "&#x1f469;&#x200d;&#x2764;&#xfe0f;&#x200d;&#x1f48b;&#x200d;&#x1f468;",
    ], // 492
    [
      "kiss: man, man",
      "&#x1f468;&#x200d;&#x2764;&#xfe0f;&#x200d;&#x1f48b;&#x200d;&#x1f468;",
    ], // 493
    [
      "kiss: woman, woman",
      "&#x1f469;&#x200d;&#x2764;&#xfe0f;&#x200d;&#x1f48b;&#x200d;&#x1f469;",
    ], // 494
    ["couple with heart", "&#x1f491;"], // 495
    [
      "couple with heart: woman, man",
      "&#x1f469;&#x200d;&#x2764;&#xfe0f;&#x200d;&#x1f468;",
    ], // 496
    [
      "couple with heart: man, man",
      "&#x1f468;&#x200d;&#x2764;&#xfe0f;&#x200d;&#x1f468;",
    ], // 497
    [
      "couple with heart: woman, woman",
      "&#x1f469;&#x200d;&#x2764;&#xfe0f;&#x200d;&#x1f469;",
    ], // 498
    ["family", "&#x1f46a;"], // 499
    ["family: man, woman, boy", "&#x1f468;&#x200d;&#x1f469;&#x200d;&#x1f466;"], // 500
    ["family: man, woman, girl", "&#x1f468;&#x200d;&#x1f469;&#x200d;&#x1f467;"], // 501
    [
      "family: man, woman, girl, boy",
      "&#x1f468;&#x200d;&#x1f469;&#x200d;&#x1f467;&#x200d;&#x1f466;",
    ], // 502
    [
      "family: man, woman, boy, boy",
      "&#x1f468;&#x200d;&#x1f469;&#x200d;&#x1f466;&#x200d;&#x1f466;",
    ], // 503
    [
      "family: man, woman, girl, girl",
      "&#x1f468;&#x200d;&#x1f469;&#x200d;&#x1f467;&#x200d;&#x1f467;",
    ], // 504
    ["family: man, man, boy", "&#x1f468;&#x200d;&#x1f468;&#x200d;&#x1f466;"], // 505
    ["family: man, man, girl", "&#x1f468;&#x200d;&#x1f468;&#x200d;&#x1f467;"], // 506
    [
      "family: man, man, girl, boy",
      "&#x1f468;&#x200d;&#x1f468;&#x200d;&#x1f467;&#x200d;&#x1f466;",
    ], // 507
    [
      "family: man, man, boy, boy",
      "&#x1f468;&#x200d;&#x1f468;&#x200d;&#x1f466;&#x200d;&#x1f466;",
    ], // 508
    [
      "family: man, man, girl, girl",
      "&#x1f468;&#x200d;&#x1f468;&#x200d;&#x1f467;&#x200d;&#x1f467;",
    ], // 509
    [
      "family: woman, woman, boy",
      "&#x1f469;&#x200d;&#x1f469;&#x200d;&#x1f466;",
    ], // 510
    [
      "family: woman, woman, girl",
      "&#x1f469;&#x200d;&#x1f469;&#x200d;&#x1f467;",
    ], // 511
    [
      "family: woman, woman, girl, boy",
      "&#x1f469;&#x200d;&#x1f469;&#x200d;&#x1f467;&#x200d;&#x1f466;",
    ], // 512
    [
      "family: woman, woman, boy, boy",
      "&#x1f469;&#x200d;&#x1f469;&#x200d;&#x1f466;&#x200d;&#x1f466;",
    ], // 513
    [
      "family: woman, woman, girl, girl",
      "&#x1f469;&#x200d;&#x1f469;&#x200d;&#x1f467;&#x200d;&#x1f467;",
    ], // 514
    ["family: man, boy", "&#x1f468;&#x200d;&#x1f466;"], // 515
    ["family: man, boy, boy", "&#x1f468;&#x200d;&#x1f466;&#x200d;&#x1f466;"], // 516
    ["family: man, girl", "&#x1f468;&#x200d;&#x1f467;"], // 517
    ["family: man, girl, boy", "&#x1f468;&#x200d;&#x1f467;&#x200d;&#x1f466;"], // 518
    ["family: man, girl, girl", "&#x1f468;&#x200d;&#x1f467;&#x200d;&#x1f467;"], // 519
    ["family: woman, boy", "&#x1f469;&#x200d;&#x1f466;"], // 520
    ["family: woman, boy, boy", "&#x1f469;&#x200d;&#x1f466;&#x200d;&#x1f466;"], // 521
    ["family: woman, girl", "&#x1f469;&#x200d;&#x1f467;"], // 522
    ["family: woman, girl, boy", "&#x1f469;&#x200d;&#x1f467;&#x200d;&#x1f466;"], // 523
    [
      "family: woman, girl, girl",
      "&#x1f469;&#x200d;&#x1f467;&#x200d;&#x1f467;",
    ], // 524
    ["person-symbol", "group"], // --------
    ["speaking head", "&#x1f5e3;"], // 525
    ["bust in silhouette", "&#x1f464;"], // 526
    ["busts in silhouette", "&#x1f465;"], // 527
    ["people hugging", "&#x1fac2;"], // 528
    ["footprints", "&#x1f463;"], // 529
    ["Component", "category"], // ----------------
    ["hair-style", "group"], // --------
    ["red hair", "&#x1f9b0;"], // 530
    ["curly hair", "&#x1f9b1;"], // 531
    ["white hair", "&#x1f9b3;"], // 532
    ["bald", "&#x1f9b2;"], // 533
    ["Animals & Nature", "category"], // ----------------
    ["animal-mammal", "group"], // --------
    ["monkey face", "&#x1f435;"], // 534
    ["monkey", "&#x1f412;"], // 535
    ["gorilla", "&#x1f98d;"], // 536
    ["orangutan", "&#x1f9a7;"], // 537
    ["dog face", "&#x1f436;"], // 538
    ["dog", "&#x1f415;"], // 539
    ["guide dog", "&#x1f9ae;"], // 540
    ["service dog", "&#x1f415;&#x200d;&#x1f9ba;"], // 541
    ["poodle", "&#x1f429;"], // 542
    ["wolf", "&#x1f43a;"], // 543
    ["fox", "&#x1f98a;"], // 544
    ["raccoon", "&#x1f99d;"], // 545
    ["cat face", "&#x1f431;"], // 546
    ["cat", "&#x1f408;"], // 547
    ["black cat", "&#x1f408;&#x200d;&#x2b1b;"], // 548
    ["lion", "&#x1f981;"], // 549
    ["tiger face", "&#x1f42f;"], // 550
    ["tiger", "&#x1f405;"], // 551
    ["leopard", "&#x1f406;"], // 552
    ["horse face", "&#x1f434;"], // 553
    ["moose", "&#x1face;"], // 554
    ["donkey", "&#x1facf;"], // 555
    ["horse", "&#x1f40e;"], // 556
    ["unicorn", "&#x1f984;"], // 557
    ["zebra", "&#x1f993;"], // 558
    ["deer", "&#x1f98c;"], // 559
    ["bison", "&#x1f9ac;"], // 560
    ["cow face", "&#x1f42e;"], // 561
    ["ox", "&#x1f402;"], // 562
    ["water buffalo", "&#x1f403;"], // 563
    ["cow", "&#x1f404;"], // 564
    ["pig face", "&#x1f437;"], // 565
    ["pig", "&#x1f416;"], // 566
    ["boar", "&#x1f417;"], // 567
    ["pig nose", "&#x1f43d;"], // 568
    ["ram", "&#x1f40f;"], // 569
    ["ewe", "&#x1f411;"], // 570
    ["goat", "&#x1f410;"], // 571
    ["camel", "&#x1f42a;"], // 572
    ["two-hump camel", "&#x1f42b;"], // 573
    ["llama", "&#x1f999;"], // 574
    ["giraffe", "&#x1f992;"], // 575
    ["elephant", "&#x1f418;"], // 576
    ["mammoth", "&#x1f9a3;"], // 577
    ["rhinoceros", "&#x1f98f;"], // 578
    ["hippopotamus", "&#x1f99b;"], // 579
    ["mouse face", "&#x1f42d;"], // 580
    ["mouse", "&#x1f401;"], // 581
    ["rat", "&#x1f400;"], // 582
    ["hamster", "&#x1f439;"], // 583
    ["rabbit face", "&#x1f430;"], // 584
    ["rabbit", "&#x1f407;"], // 585
    ["chipmunk", "&#x1f43f;"], // 586
    ["beaver", "&#x1f9ab;"], // 587
    ["hedgehog", "&#x1f994;"], // 588
    ["bat", "&#x1f987;"], // 589
    ["bear", "&#x1f43b;"], // 590
    ["polar bear", "&#x1f43b;&#x200d;&#x2744;&#xfe0f;"], // 591
    ["koala", "&#x1f428;"], // 592
    ["panda", "&#x1f43c;"], // 593
    ["sloth", "&#x1f9a5;"], // 594
    ["otter", "&#x1f9a6;"], // 595
    ["skunk", "&#x1f9a8;"], // 596
    ["kangaroo", "&#x1f998;"], // 597
    ["badger", "&#x1f9a1;"], // 598
    ["paw prints", "&#x1f43e;"], // 599
    ["animal-bird", "group"], // --------
    ["turkey", "&#x1f983;"], // 600
    ["chicken", "&#x1f414;"], // 601
    ["rooster", "&#x1f413;"], // 602
    ["hatching chick", "&#x1f423;"], // 603
    ["baby chick", "&#x1f424;"], // 604
    ["front-facing baby chick", "&#x1f425;"], // 605
    ["bird", "&#x1f426;"], // 606
    ["penguin", "&#x1f427;"], // 607
    ["dove", "&#x1f54a;"], // 608
    ["eagle", "&#x1f985;"], // 609
    ["duck", "&#x1f986;"], // 610
    ["swan", "&#x1f9a2;"], // 611
    ["owl", "&#x1f989;"], // 612
    ["dodo", "&#x1f9a4;"], // 613
    ["feather", "&#x1fab6;"], // 614
    ["flamingo", "&#x1f9a9;"], // 615
    ["peacock", "&#x1f99a;"], // 616
    ["parrot", "&#x1f99c;"], // 617
    ["wing", "&#x1fabd;"], // 618
    ["black bird", "&#x1f426;&#x200d;&#x2b1b;"], // 619
    ["goose", "&#x1fabf;"], // 620
    ["animal-amphibian", "group"], // --------
    ["frog", "&#x1f438;"], // 621
    ["animal-reptile", "group"], // --------
    ["crocodile", "&#x1f40a;"], // 622
    ["turtle", "&#x1f422;"], // 623
    ["lizard", "&#x1f98e;"], // 624
    ["snake", "&#x1f40d;"], // 625
    ["dragon face", "&#x1f432;"], // 626
    ["dragon", "&#x1f409;"], // 627
    ["sauropod", "&#x1f995;"], // 628
    ["t-rex", "&#x1f996;"], // 629
    ["animal-marine", "group"], // --------
    ["spouting whale", "&#x1f433;"], // 630
    ["whale", "&#x1f40b;"], // 631
    ["dolphin", "&#x1f42c;"], // 632
    ["seal", "&#x1f9ad;"], // 633
    ["fish", "&#x1f41f;"], // 634
    ["tropical fish", "&#x1f420;"], // 635
    ["blowfish", "&#x1f421;"], // 636
    ["shark", "&#x1f988;"], // 637
    ["octopus", "&#x1f419;"], // 638
    ["spiral shell", "&#x1f41a;"], // 639
    ["coral", "&#x1fab8;"], // 640
    ["jellyfish", "&#x1fabc;"], // 641
    ["animal-bug", "group"], // --------
    ["snail", "&#x1f40c;"], // 642
    ["butterfly", "&#x1f98b;"], // 643
    ["bug", "&#x1f41b;"], // 644
    ["ant", "&#x1f41c;"], // 645
    ["honeybee", "&#x1f41d;"], // 646
    ["beetle", "&#x1fab2;"], // 647
    ["lady beetle", "&#x1f41e;"], // 648
    ["cricket", "&#x1f997;"], // 649
    ["cockroach", "&#x1fab3;"], // 650
    ["spider", "&#x1f577;"], // 651
    ["spider web", "&#x1f578;"], // 652
    ["scorpion", "&#x1f982;"], // 653
    ["mosquito", "&#x1f99f;"], // 654
    ["fly", "&#x1fab0;"], // 655
    ["worm", "&#x1fab1;"], // 656
    ["microbe", "&#x1f9a0;"], // 657
    ["bouquet", "&#x1f490;"], // 658
    ["plant-flower", "group"], // --------
    ["cherry blossom", "&#x1f338;"], // 659
    ["white flower", "&#x1f4ae;"], // 660
    ["lotus", "&#x1fab7;"], // 661
    ["rosette", "&#x1f3f5;"], // 662
    ["rose", "&#x1f339;"], // 663
    ["wilted flower", "&#x1f940;"], // 664
    ["hibiscus", "&#x1f33a;"], // 665
    ["sunflower", "&#x1f33b;"], // 666
    ["blossom", "&#x1f33c;"], // 667
    ["tulip", "&#x1f337;"], // 668
    ["hyacinth", "&#x1fabb;"], // 669
    ["plant-other", "group"], // --------
    ["seedling", "&#x1f331;"], // 670
    ["potted plant", "&#x1fab4;"], // 671
    ["evergreen tree", "&#x1f332;"], // 672
    ["deciduous tree", "&#x1f333;"], // 673
    ["palm tree", "&#x1f334;"], // 674
    ["cactus", "&#x1f335;"], // 675
    ["sheaf of rice", "&#x1f33e;"], // 676
    ["herb", "&#x1f33f;"], // 677
    ["shamrock", "&#x2618;"], // 678
    ["four leaf clover", "&#x1f340;"], // 679
    ["maple leaf", "&#x1f341;"], // 680
    ["fallen leaf", "&#x1f342;"], // 681
    ["leaf fluttering in wind", "&#x1f343;"], // 682
    ["empty nest", "&#x1fab9;"], // 683
    ["nest with eggs", "&#x1faba;"], // 684
    ["mushroom", "&#x1f344;"], // 685
    ["Food & Drink", "category"], // ----------------
    ["food-fruit", "group"], // --------
    ["grapes", "&#x1f347;"], // 686
    ["melon", "&#x1f348;"], // 687
    ["watermelon", "&#x1f349;"], // 688
    ["tangerine", "&#x1f34a;"], // 689
    ["lemon", "&#x1f34b;"], // 690
    ["banana", "&#x1f34c;"], // 691
    ["pineapple", "&#x1f34d;"], // 692
    ["mango", "&#x1f96d;"], // 693
    ["red apple", "&#x1f34e;"], // 694
    ["green apple", "&#x1f34f;"], // 695
    ["pear", "&#x1f350;"], // 696
    ["peach", "&#x1f351;"], // 697
    ["cherries", "&#x1f352;"], // 698
    ["strawberry", "&#x1f353;"], // 699
    ["blueberries", "&#x1fad0;"], // 700
    ["kiwi fruit", "&#x1f95d;"], // 701
    ["tomato", "&#x1f345;"], // 702
    ["olive", "&#x1fad2;"], // 703
    ["coconut", "&#x1f965;"], // 704
    ["food-vegetable", "group"], // --------
    ["avocado", "&#x1f951;"], // 705
    ["eggplant", "&#x1f346;"], // 706
    ["potato", "&#x1f954;"], // 707
    ["carrot", "&#x1f955;"], // 708
    ["ear of corn", "&#x1f33d;"], // 709
    ["hot pepper", "&#x1f336;"], // 710
    ["bell pepper", "&#x1fad1;"], // 711
    ["cucumber", "&#x1f952;"], // 712
    ["leafy green", "&#x1f96c;"], // 713
    ["broccoli", "&#x1f966;"], // 714
    ["garlic", "&#x1f9c4;"], // 715
    ["onion", "&#x1f9c5;"], // 716
    ["peanuts", "&#x1f95c;"], // 717
    ["beans", "&#x1fad8;"], // 718
    ["chestnut", "&#x1f330;"], // 719
    ["ginger root", "&#x1fada;"], // 720
    ["pea pod", "&#x1fadb;"], // 721
    ["food-prepared", "group"], // --------
    ["bread", "&#x1f35e;"], // 722
    ["croissant", "&#x1f950;"], // 723
    ["baguette bread", "&#x1f956;"], // 724
    ["flatbread", "&#x1fad3;"], // 725
    ["pretzel", "&#x1f968;"], // 726
    ["bagel", "&#x1f96f;"], // 727
    ["pancakes", "&#x1f95e;"], // 728
    ["waffle", "&#x1f9c7;"], // 729
    ["cheese wedge", "&#x1f9c0;"], // 730
    ["meat on bone", "&#x1f356;"], // 731
    ["poultry leg", "&#x1f357;"], // 732
    ["cut of meat", "&#x1f969;"], // 733
    ["bacon", "&#x1f953;"], // 734
    ["hamburger", "&#x1f354;"], // 735
    ["french fries", "&#x1f35f;"], // 736
    ["pizza", "&#x1f355;"], // 737
    ["hot dog", "&#x1f32d;"], // 738
    ["sandwich", "&#x1f96a;"], // 739
    ["taco", "&#x1f32e;"], // 740
    ["burrito", "&#x1f32f;"], // 741
    ["tamale", "&#x1fad4;"], // 742
    ["stuffed flatbread", "&#x1f959;"], // 743
    ["falafel", "&#x1f9c6;"], // 744
    ["egg", "&#x1f95a;"], // 745
    ["cooking", "&#x1f373;"], // 746
    ["shallow pan of food", "&#x1f958;"], // 747
    ["pot of food", "&#x1f372;"], // 748
    ["fondue", "&#x1fad5;"], // 749
    ["bowl with spoon", "&#x1f963;"], // 750
    ["green salad", "&#x1f957;"], // 751
    ["popcorn", "&#x1f37f;"], // 752
    ["butter", "&#x1f9c8;"], // 753
    ["salt", "&#x1f9c2;"], // 754
    ["canned food", "&#x1f96b;"], // 755
    ["food-asian", "group"], // --------
    ["bento box", "&#x1f371;"], // 756
    ["rice cracker", "&#x1f358;"], // 757
    ["rice ball", "&#x1f359;"], // 758
    ["cooked rice", "&#x1f35a;"], // 759
    ["curry rice", "&#x1f35b;"], // 760
    ["steaming bowl", "&#x1f35c;"], // 761
    ["spaghetti", "&#x1f35d;"], // 762
    ["roasted sweet potato", "&#x1f360;"], // 763
    ["oden", "&#x1f362;"], // 764
    ["sushi", "&#x1f363;"], // 765
    ["fried shrimp", "&#x1f364;"], // 766
    ["fish cake with swirl", "&#x1f365;"], // 767
    ["moon cake", "&#x1f96e;"], // 768
    ["dango", "&#x1f361;"], // 769
    ["dumpling", "&#x1f95f;"], // 770
    ["fortune cookie", "&#x1f960;"], // 771
    ["takeout box", "&#x1f961;"], // 772
    ["food-marine", "group"], // --------
    ["crab", "&#x1f980;"], // 773
    ["lobster", "&#x1f99e;"], // 774
    ["shrimp", "&#x1f990;"], // 775
    ["squid", "&#x1f991;"], // 776
    ["oyster", "&#x1f9aa;"], // 777
    ["food-sweet", "group"], // --------
    ["soft ice cream", "&#x1f366;"], // 778
    ["shaved ice", "&#x1f367;"], // 779
    ["ice cream", "&#x1f368;"], // 780
    ["doughnut", "&#x1f369;"], // 781
    ["cookie", "&#x1f36a;"], // 782
    ["birthday cake", "&#x1f382;"], // 783
    ["shortcake", "&#x1f370;"], // 784
    ["cupcake", "&#x1f9c1;"], // 785
    ["pie", "&#x1f967;"], // 786
    ["chocolate bar", "&#x1f36b;"], // 787
    ["candy", "&#x1f36c;"], // 788
    ["lollipop", "&#x1f36d;"], // 789
    ["custard", "&#x1f36e;"], // 790
    ["honey pot", "&#x1f36f;"], // 791
    ["drink", "group"], // --------
    ["baby bottle", "&#x1f37c;"], // 792
    ["glass of milk", "&#x1f95b;"], // 793
    ["hot beverage", "&#x2615;"], // 794
    ["teapot", "&#x1fad6;"], // 795
    ["teacup without handle", "&#x1f375;"], // 796
    ["sake", "&#x1f376;"], // 797
    ["bottle with popping cork", "&#x1f37e;"], // 798
    ["wine glass", "&#x1f377;"], // 799
    ["cocktail glass", "&#x1f378;"], // 800
    ["tropical drink", "&#x1f379;"], // 801
    ["beer mug", "&#x1f37a;"], // 802
    ["clinking beer mugs", "&#x1f37b;"], // 803
    ["clinking glasses", "&#x1f942;"], // 804
    ["tumbler glass", "&#x1f943;"], // 805
    ["pouring liquid", "&#x1fad7;"], // 806
    ["cup with straw", "&#x1f964;"], // 807
    ["bubble tea", "&#x1f9cb;"], // 808
    ["beverage box", "&#x1f9c3;"], // 809
    ["mate", "&#x1f9c9;"], // 810
    ["ice", "&#x1f9ca;"], // 811
    ["dishware", "group"], // --------
    ["chopsticks", "&#x1f962;"], // 812
    ["fork and knife with plate", "&#x1f37d;"], // 813
    ["fork and knife", "&#x1f374;"], // 814
    ["spoon", "&#x1f944;"], // 815
    ["kitchen knife", "&#x1f52a;"], // 816
    ["jar", "&#x1fad9;"], // 817
    ["amphora", "&#x1f3fa;"], // 818
    ["Travel & Places", "category"], // ----------------
    ["place-map", "group"], // --------
    ["globe showing europe-africa", "&#x1f30d;"], // 819
    ["globe showing americas", "&#x1f30e;"], // 820
    ["globe showing asia-australia", "&#x1f30f;"], // 821
    ["globe with meridians", "&#x1f310;"], // 822
    ["world map", "&#x1f5fa;"], // 823
    ["map of japan", "&#x1f5fe;"], // 824
    ["compass", "&#x1f9ed;"], // 825
    ["place-geographic", "group"], // --------
    ["snow-capped mountain", "&#x1f3d4;"], // 826
    ["mountain", "&#x26f0;"], // 827
    ["volcano", "&#x1f30b;"], // 828
    ["mount fuji", "&#x1f5fb;"], // 829
    ["camping", "&#x1f3d5;"], // 830
    ["beach with umbrella", "&#x1f3d6;"], // 831
    ["desert", "&#x1f3dc;"], // 832
    ["desert island", "&#x1f3dd;"], // 833
    ["national park", "&#x1f3de;"], // 834
    ["place-building", "group"], // --------
    ["stadium", "&#x1f3df;"], // 835
    ["classical building", "&#x1f3db;"], // 836
    ["building construction", "&#x1f3d7;"], // 837
    ["brick", "&#x1f9f1;"], // 838
    ["rock", "&#x1faa8;"], // 839
    ["wood", "&#x1fab5;"], // 840
    ["hut", "&#x1f6d6;"], // 841
    ["houses", "&#x1f3d8;"], // 842
    ["derelict house", "&#x1f3da;"], // 843
    ["house", "&#x1f3e0;"], // 844
    ["house with garden", "&#x1f3e1;"], // 845
    ["office building", "&#x1f3e2;"], // 846
    ["japanese post office", "&#x1f3e3;"], // 847
    ["post office", "&#x1f3e4;"], // 848
    ["hospital", "&#x1f3e5;"], // 849
    ["bank", "&#x1f3e6;"], // 850
    ["hotel", "&#x1f3e8;"], // 851
    ["love hotel", "&#x1f3e9;"], // 852
    ["convenience store", "&#x1f3ea;"], // 853
    ["school", "&#x1f3eb;"], // 854
    ["department store", "&#x1f3ec;"], // 855
    ["factory", "&#x1f3ed;"], // 856
    ["japanese castle", "&#x1f3ef;"], // 857
    ["castle", "&#x1f3f0;"], // 858
    ["wedding", "&#x1f492;"], // 859
    ["tokyo tower", "&#x1f5fc;"], // 860
    ["statue of liberty", "&#x1f5fd;"], // 861
    ["place-religious", "group"], // --------
    ["church", "&#x26ea;"], // 862
    ["mosque", "&#x1f54c;"], // 863
    ["hindu temple", "&#x1f6d5;"], // 864
    ["synagogue", "&#x1f54d;"], // 865
    ["shinto shrine", "&#x26e9;"], // 866
    ["kaaba", "&#x1f54b;"], // 867
    ["place-other", "group"], // --------
    ["fountain", "&#x26f2;"], // 868
    ["tent", "&#x26fa;"], // 869
    ["foggy", "&#x1f301;"], // 870
    ["night with stars", "&#x1f303;"], // 871
    ["cityscape", "&#x1f3d9;"], // 872
    ["sunrise over mountains", "&#x1f304;"], // 873
    ["sunrise", "&#x1f305;"], // 874
    ["cityscape at dusk", "&#x1f306;"], // 875
    ["sunset", "&#x1f307;"], // 876
    ["bridge at night", "&#x1f309;"], // 877
    ["hot springs", "&#x2668;"], // 878
    ["carousel horse", "&#x1f3a0;"], // 879
    ["playground slide", "&#x1f6dd;"], // 880
    ["ferris wheel", "&#x1f3a1;"], // 881
    ["roller coaster", "&#x1f3a2;"], // 882
    ["barber pole", "&#x1f488;"], // 883
    ["circus tent", "&#x1f3aa;"], // 884
    ["transport-ground", "group"], // --------
    ["locomotive", "&#x1f682;"], // 885
    ["railway car", "&#x1f683;"], // 886
    ["high-speed train", "&#x1f684;"], // 887
    ["bullet train", "&#x1f685;"], // 888
    ["train", "&#x1f686;"], // 889
    ["metro", "&#x1f687;"], // 890
    ["light rail", "&#x1f688;"], // 891
    ["station", "&#x1f689;"], // 892
    ["tram", "&#x1f68a;"], // 893
    ["monorail", "&#x1f69d;"], // 894
    ["mountain railway", "&#x1f69e;"], // 895
    ["tram car", "&#x1f68b;"], // 896
    ["bus", "&#x1f68c;"], // 897
    ["oncoming bus", "&#x1f68d;"], // 898
    ["trolleybus", "&#x1f68e;"], // 899
    ["minibus", "&#x1f690;"], // 900
    ["ambulance", "&#x1f691;"], // 901
    ["fire engine", "&#x1f692;"], // 902
    ["police car", "&#x1f693;"], // 903
    ["oncoming police car", "&#x1f694;"], // 904
    ["taxi", "&#x1f695;"], // 905
    ["oncoming taxi", "&#x1f696;"], // 906
    ["automobile", "&#x1f697;"], // 907
    ["oncoming automobile", "&#x1f698;"], // 908
    ["sport utility vehicle", "&#x1f699;"], // 909
    ["pickup truck", "&#x1f6fb;"], // 910
    ["delivery truck", "&#x1f69a;"], // 911
    ["articulated lorry", "&#x1f69b;"], // 912
    ["tractor", "&#x1f69c;"], // 913
    ["racing car", "&#x1f3ce;"], // 914
    ["motorcycle", "&#x1f3cd;"], // 915
    ["motor scooter", "&#x1f6f5;"], // 916
    ["manual wheelchair", "&#x1f9bd;"], // 917
    ["motorized wheelchair", "&#x1f9bc;"], // 918
    ["auto rickshaw", "&#x1f6fa;"], // 919
    ["bicycle", "&#x1f6b2;"], // 920
    ["kick scooter", "&#x1f6f4;"], // 921
    ["skateboard", "&#x1f6f9;"], // 922
    ["roller skate", "&#x1f6fc;"], // 923
    ["bus stop", "&#x1f68f;"], // 924
    ["motorway", "&#x1f6e3;"], // 925
    ["railway track", "&#x1f6e4;"], // 926
    ["oil drum", "&#x1f6e2;"], // 927
    ["fuel pump", "&#x26fd;"], // 928
    ["wheel", "&#x1f6de;"], // 929
    ["police car light", "&#x1f6a8;"], // 930
    ["horizontal traffic light", "&#x1f6a5;"], // 931
    ["vertical traffic light", "&#x1f6a6;"], // 932
    ["stop sign", "&#x1f6d1;"], // 933
    ["construction", "&#x1f6a7;"], // 934
    ["transport-water", "group"], // --------
    ["anchor", "&#x2693;"], // 935
    ["ring buoy", "&#x1f6df;"], // 936
    ["sailboat", "&#x26f5;"], // 937
    ["canoe", "&#x1f6f6;"], // 938
    ["speedboat", "&#x1f6a4;"], // 939
    ["passenger ship", "&#x1f6f3;"], // 940
    ["ferry", "&#x26f4;"], // 941
    ["motor boat", "&#x1f6e5;"], // 942
    ["ship", "&#x1f6a2;"], // 943
    ["transport-air", "group"], // --------
    ["airplane", "&#x2708;"], // 944
    ["small airplane", "&#x1f6e9;"], // 945
    ["airplane departure", "&#x1f6eb;"], // 946
    ["airplane arrival", "&#x1f6ec;"], // 947
    ["parachute", "&#x1fa82;"], // 948
    ["seat", "&#x1f4ba;"], // 949
    ["helicopter", "&#x1f681;"], // 950
    ["suspension railway", "&#x1f69f;"], // 951
    ["mountain cableway", "&#x1f6a0;"], // 952
    ["aerial tramway", "&#x1f6a1;"], // 953
    ["satellite", "&#x1f6f0;"], // 954
    ["rocket", "&#x1f680;"], // 955
    ["flying saucer", "&#x1f6f8;"], // 956
    ["hotel", "group"], // --------
    ["bellhop bell", "&#x1f6ce;"], // 957
    ["luggage", "&#x1f9f3;"], // 958
    ["time", "group"], // --------
    ["hourglass done", "&#x231b;"], // 959
    ["hourglass not done", "&#x23f3;"], // 960
    ["watch", "&#x231a;"], // 961
    ["alarm clock", "&#x23f0;"], // 962
    ["stopwatch", "&#x23f1;"], // 963
    ["timer clock", "&#x23f2;"], // 964
    ["mantelpiece clock", "&#x1f570;"], // 965
    ["twelve o’clock", "&#x1f55b;"], // 966
    ["twelve-thirty", "&#x1f567;"], // 967
    ["one o’clock", "&#x1f550;"], // 968
    ["one-thirty", "&#x1f55c;"], // 969
    ["two o’clock", "&#x1f551;"], // 970
    ["two-thirty", "&#x1f55d;"], // 971
    ["three o’clock", "&#x1f552;"], // 972
    ["three-thirty", "&#x1f55e;"], // 973
    ["four o’clock", "&#x1f553;"], // 974
    ["four-thirty", "&#x1f55f;"], // 975
    ["five o’clock", "&#x1f554;"], // 976
    ["five-thirty", "&#x1f560;"], // 977
    ["six o’clock", "&#x1f555;"], // 978
    ["six-thirty", "&#x1f561;"], // 979
    ["seven o’clock", "&#x1f556;"], // 980
    ["seven-thirty", "&#x1f562;"], // 981
    ["eight o’clock", "&#x1f557;"], // 982
    ["eight-thirty", "&#x1f563;"], // 983
    ["nine o’clock", "&#x1f558;"], // 984
    ["nine-thirty", "&#x1f564;"], // 985
    ["ten o’clock", "&#x1f559;"], // 986
    ["ten-thirty", "&#x1f565;"], // 987
    ["eleven o’clock", "&#x1f55a;"], // 988
    ["eleven-thirty", "&#x1f566;"], // 989
    ["sky & weather", "group"], // --------
    ["new moon", "&#x1f311;"], // 990
    ["waxing crescent moon", "&#x1f312;"], // 991
    ["first quarter moon", "&#x1f313;"], // 992
    ["waxing gibbous moon", "&#x1f314;"], // 993
    ["full moon", "&#x1f315;"], // 994
    ["waning gibbous moon", "&#x1f316;"], // 995
    ["last quarter moon", "&#x1f317;"], // 996
    ["waning crescent moon", "&#x1f318;"], // 997
    ["crescent moon", "&#x1f319;"], // 998
    ["new moon face", "&#x1f31a;"], // 999
    ["first quarter moon face", "&#x1f31b;"], // 1000
    ["last quarter moon face", "&#x1f31c;"], // 1001
    ["thermometer", "&#x1f321;"], // 1002
    ["sun", "&#x2600;"], // 1003
    ["full moon face", "&#x1f31d;"], // 1004
    ["sun with face", "&#x1f31e;"], // 1005
    ["ringed planet", "&#x1fa90;"], // 1006
    ["star", "&#x2b50;"], // 1007
    ["glowing star", "&#x1f31f;"], // 1008
    ["shooting star", "&#x1f320;"], // 1009
    ["milky way", "&#x1f30c;"], // 1010
    ["cloud", "&#x2601;"], // 1011
    ["sun behind cloud", "&#x26c5;"], // 1012
    ["cloud with lightning and rain", "&#x26c8;"], // 1013
    ["sun behind small cloud", "&#x1f324;"], // 1014
    ["sun behind large cloud", "&#x1f325;"], // 1015
    ["sun behind rain cloud", "&#x1f326;"], // 1016
    ["cloud with rain", "&#x1f327;"], // 1017
    ["cloud with snow", "&#x1f328;"], // 1018
    ["cloud with lightning", "&#x1f329;"], // 1019
    ["tornado", "&#x1f32a;"], // 1020
    ["fog", "&#x1f32b;"], // 1021
    ["wind face", "&#x1f32c;"], // 1022
    ["cyclone", "&#x1f300;"], // 1023
    ["rainbow", "&#x1f308;"], // 1024
    ["closed umbrella", "&#x1f302;"], // 1025
    ["umbrella", "&#x2602;"], // 1026
    ["umbrella with rain drops", "&#x2614;"], // 1027
    ["umbrella on ground", "&#x26f1;"], // 1028
    ["high voltage", "&#x26a1;"], // 1029
    ["snowflake", "&#x2744;"], // 1030
    ["snowman", "&#x2603;"], // 1031
    ["snowman without snow", "&#x26c4;"], // 1032
    ["comet", "&#x2604;"], // 1033
    ["fire", "&#x1f525;"], // 1034
    ["droplet", "&#x1f4a7;"], // 1035
    ["water wave", "&#x1f30a;"], // 1036
    ["Activities", "category"], // ----------------
    ["event", "group"], // --------
    ["jack-o-lantern", "&#x1f383;"], // 1037
    ["christmas tree", "&#x1f384;"], // 1038
    ["fireworks", "&#x1f386;"], // 1039
    ["sparkler", "&#x1f387;"], // 1040
    ["firecracker", "&#x1f9e8;"], // 1041
    ["sparkles", "&#x2728;"], // 1042
    ["balloon", "&#x1f388;"], // 1043
    ["party popper", "&#x1f389;"], // 1044
    ["confetti ball", "&#x1f38a;"], // 1045
    ["tanabata tree", "&#x1f38b;"], // 1046
    ["pine decoration", "&#x1f38d;"], // 1047
    ["japanese dolls", "&#x1f38e;"], // 1048
    ["carp streamer", "&#x1f38f;"], // 1049
    ["wind chime", "&#x1f390;"], // 1050
    ["moon viewing ceremony", "&#x1f391;"], // 1051
    ["red envelope", "&#x1f9e7;"], // 1052
    ["ribbon", "&#x1f380;"], // 1053
    ["wrapped gift", "&#x1f381;"], // 1054
    ["reminder ribbon", "&#x1f397;"], // 1055
    ["admission tickets", "&#x1f39f;"], // 1056
    ["ticket", "&#x1f3ab;"], // 1057
    ["award-medal", "group"], // --------
    ["military medal", "&#x1f396;"], // 1058
    ["trophy", "&#x1f3c6;"], // 1059
    ["sports medal", "&#x1f3c5;"], // 1060
    ["st place medal", "&#x1f947;"], // 1061
    ["nd place medal", "&#x1f948;"], // 1062
    ["rd place medal", "&#x1f949;"], // 1063
    ["sport", "group"], // --------
    ["soccer ball", "&#x26bd;"], // 1064
    ["baseball", "&#x26be;"], // 1065
    ["softball", "&#x1f94e;"], // 1066
    ["basketball", "&#x1f3c0;"], // 1067
    ["volleyball", "&#x1f3d0;"], // 1068
    ["american football", "&#x1f3c8;"], // 1069
    ["rugby football", "&#x1f3c9;"], // 1070
    ["tennis", "&#x1f3be;"], // 1071
    ["flying disc", "&#x1f94f;"], // 1072
    ["bowling", "&#x1f3b3;"], // 1073
    ["cricket game", "&#x1f3cf;"], // 1074
    ["field hockey", "&#x1f3d1;"], // 1075
    ["ice hockey", "&#x1f3d2;"], // 1076
    ["lacrosse", "&#x1f94d;"], // 1077
    ["ping pong", "&#x1f3d3;"], // 1078
    ["badminton", "&#x1f3f8;"], // 1079
    ["boxing glove", "&#x1f94a;"], // 1080
    ["martial arts uniform", "&#x1f94b;"], // 1081
    ["goal net", "&#x1f945;"], // 1082
    ["flag in hole", "&#x26f3;"], // 1083
    ["ice skate", "&#x26f8;"], // 1084
    ["fishing pole", "&#x1f3a3;"], // 1085
    ["diving mask", "&#x1f93f;"], // 1086
    ["running shirt", "&#x1f3bd;"], // 1087
    ["skis", "&#x1f3bf;"], // 1088
    ["sled", "&#x1f6f7;"], // 1089
    ["curling stone", "&#x1f94c;"], // 1090
    ["bullseye", "&#x1f3af;"], // 1091
    ["game", "group"], // --------
    ["yo-yo", "&#x1fa80;"], // 1092
    ["kite", "&#x1fa81;"], // 1093
    ["water pistol", "&#x1f52b;"], // 1094
    ["pool 8 ball", "&#x1f3b1;"], // 1095
    ["crystal ball", "&#x1f52e;"], // 1096
    ["magic wand", "&#x1fa84;"], // 1097
    ["video game", "&#x1f3ae;"], // 1098
    ["joystick", "&#x1f579;"], // 1099
    ["slot machine", "&#x1f3b0;"], // 1100
    ["game die", "&#x1f3b2;"], // 1101
    ["puzzle piece", "&#x1f9e9;"], // 1102
    ["teddy bear", "&#x1f9f8;"], // 1103
    ["piñata", "&#x1fa85;"], // 1104
    ["mirror ball", "&#x1faa9;"], // 1105
    ["nesting dolls", "&#x1fa86;"], // 1106
    ["spade suit", "&#x2660;"], // 1107
    ["heart suit", "&#x2665;"], // 1108
    ["diamond suit", "&#x2666;"], // 1109
    ["club suit", "&#x2663;"], // 1110
    ["chess pawn", "&#x265f;"], // 1111
    ["joker", "&#x1f0cf;"], // 1112
    ["mahjong red dragon", "&#x1f004;"], // 1113
    ["flower playing cards", "&#x1f3b4;"], // 1114
    ["arts & crafts", "group"], // --------
    ["performing arts", "&#x1f3ad;"], // 1115
    ["framed picture", "&#x1f5bc;"], // 1116
    ["artist palette", "&#x1f3a8;"], // 1117
    ["thread", "&#x1f9f5;"], // 1118
    ["sewing needle", "&#x1faa1;"], // 1119
    ["yarn", "&#x1f9f6;"], // 1120
    ["knot", "&#x1faa2;"], // 1121
    ["Objects", "group"], // --------
    ["clothing", "group"], // --------
    ["glasses", "&#x1f453;"], // 1122
    ["sunglasses", "&#x1f576;"], // 1123
    ["goggles", "&#x1f97d;"], // 1124
    ["lab coat", "&#x1f97c;"], // 1125
    ["safety vest", "&#x1f9ba;"], // 1126
    ["necktie", "&#x1f454;"], // 1127
    ["t-shirt", "&#x1f455;"], // 1128
    ["jeans", "&#x1f456;"], // 1129
    ["scarf", "&#x1f9e3;"], // 1130
    ["gloves", "&#x1f9e4;"], // 1131
    ["coat", "&#x1f9e5;"], // 1132
    ["socks", "&#x1f9e6;"], // 1133
    ["dress", "&#x1f457;"], // 1134
    ["kimono", "&#x1f458;"], // 1135
    ["sari", "&#x1f97b;"], // 1136
    ["one-piece swimsuit", "&#x1fa71;"], // 1137
    ["briefs", "&#x1fa72;"], // 1138
    ["shorts", "&#x1fa73;"], // 1139
    ["bikini", "&#x1f459;"], // 1140
    ["woman’s clothes", "&#x1f45a;"], // 1141
    ["folding hand fan", "&#x1faad;"], // 1142
    ["purse", "&#x1f45b;"], // 1143
    ["handbag", "&#x1f45c;"], // 1144
    ["clutch bag", "&#x1f45d;"], // 1145
    ["shopping bags", "&#x1f6cd;"], // 1146
    ["backpack", "&#x1f392;"], // 1147
    ["thong sandal", "&#x1fa74;"], // 1148
    ["man’s shoe", "&#x1f45e;"], // 1149
    ["running shoe", "&#x1f45f;"], // 1150
    ["hiking boot", "&#x1f97e;"], // 1151
    ["flat shoe", "&#x1f97f;"], // 1152
    ["high-heeled shoe", "&#x1f460;"], // 1153
    ["woman’s sandal", "&#x1f461;"], // 1154
    ["ballet shoes", "&#x1fa70;"], // 1155
    ["woman’s boot", "&#x1f462;"], // 1156
    ["hair pick", "&#x1faae;"], // 1157
    ["crown", "&#x1f451;"], // 1158
    ["woman’s hat", "&#x1f452;"], // 1159
    ["top hat", "&#x1f3a9;"], // 1160
    ["graduation cap", "&#x1f393;"], // 1161
    ["billed cap", "&#x1f9e2;"], // 1162
    ["military helmet", "&#x1fa96;"], // 1163
    ["rescue worker’s helmet", "&#x26d1;"], // 1164
    ["prayer beads", "&#x1f4ff;"], // 1165
    ["lipstick", "&#x1f484;"], // 1166
    ["ring", "&#x1f48d;"], // 1167
    ["gem stone", "&#x1f48e;"], // 1168
    ["sound", "group"], // --------
    ["muted speaker", "&#x1f507;"], // 1169
    ["speaker low volume", "&#x1f508;"], // 1170
    ["speaker medium volume", "&#x1f509;"], // 1171
    ["speaker high volume", "&#x1f50a;"], // 1172
    ["loudspeaker", "&#x1f4e2;"], // 1173
    ["megaphone", "&#x1f4e3;"], // 1174
    ["postal horn", "&#x1f4ef;"], // 1175
    ["bell", "&#x1f514;"], // 1176
    ["bell with slash", "&#x1f515;"], // 1177
    ["music", "group"], // --------
    ["musical score", "&#x1f3bc;"], // 1178
    ["musical note", "&#x1f3b5;"], // 1179
    ["musical notes", "&#x1f3b6;"], // 1180
    ["studio microphone", "&#x1f399;"], // 1181
    ["level slider", "&#x1f39a;"], // 1182
    ["control knobs", "&#x1f39b;"], // 1183
    ["microphone", "&#x1f3a4;"], // 1184
    ["headphone", "&#x1f3a7;"], // 1185
    ["radio", "&#x1f4fb;"], // 1186
    ["musical-instrument", "group"], // --------
    ["saxophone", "&#x1f3b7;"], // 1187
    ["accordion", "&#x1fa97;"], // 1188
    ["guitar", "&#x1f3b8;"], // 1189
    ["musical keyboard", "&#x1f3b9;"], // 1190
    ["trumpet", "&#x1f3ba;"], // 1191
    ["violin", "&#x1f3bb;"], // 1192
    ["banjo", "&#x1fa95;"], // 1193
    ["drum", "&#x1f941;"], // 1194
    ["long drum", "&#x1fa98;"], // 1195
    ["maracas", "&#x1fa87;"], // 1196
    ["flute", "&#x1fa88;"], // 1197
    ["phone", "group"], // --------
    ["mobile phone", "&#x1f4f1;"], // 1198
    ["mobile phone with arrow", "&#x1f4f2;"], // 1199
    ["telephone", "&#x260e;"], // 1200
    ["telephone receiver", "&#x1f4de;"], // 1201
    ["pager", "&#x1f4df;"], // 1202
    ["fax machine", "&#x1f4e0;"], // 1203
    ["computer", "group"], // --------
    ["battery", "&#x1f50b;"], // 1204
    ["low battery", "&#x1faab;"], // 1205
    ["electric plug", "&#x1f50c;"], // 1206
    ["laptop", "&#x1f4bb;"], // 1207
    ["desktop computer", "&#x1f5a5;"], // 1208
    ["printer", "&#x1f5a8;"], // 1209
    ["keyboard", "&#x2328;"], // 1210
    ["computer mouse", "&#x1f5b1;"], // 1211
    ["trackball", "&#x1f5b2;"], // 1212
    ["computer disk", "&#x1f4bd;"], // 1213
    ["floppy disk", "&#x1f4be;"], // 1214
    ["optical disk", "&#x1f4bf;"], // 1215
    ["dvd", "&#x1f4c0;"], // 1216
    ["abacus", "&#x1f9ee;"], // 1217
    ["light & video", "group"], // --------
    ["movie camera", "&#x1f3a5;"], // 1218
    ["film frames", "&#x1f39e;"], // 1219
    ["film projector", "&#x1f4fd;"], // 1220
    ["clapper board", "&#x1f3ac;"], // 1221
    ["television", "&#x1f4fa;"], // 1222
    ["camera", "&#x1f4f7;"], // 1223
    ["camera with flash", "&#x1f4f8;"], // 1224
    ["video camera", "&#x1f4f9;"], // 1225
    ["videocassette", "&#x1f4fc;"], // 1226
    ["magnifying glass tilted left", "&#x1f50d;"], // 1227
    ["magnifying glass tilted right", "&#x1f50e;"], // 1228
    ["candle", "&#x1f56f;"], // 1229
    ["light bulb", "&#x1f4a1;"], // 1230
    ["flashlight", "&#x1f526;"], // 1231
    ["red paper lantern", "&#x1f3ee;"], // 1232
    ["diya lamp", "&#x1fa94;"], // 1233
    ["book-paper", "group"], // --------
    ["notebook with decorative cover", "&#x1f4d4;"], // 1234
    ["closed book", "&#x1f4d5;"], // 1235
    ["open book", "&#x1f4d6;"], // 1236
    ["green book", "&#x1f4d7;"], // 1237
    ["blue book", "&#x1f4d8;"], // 1238
    ["orange book", "&#x1f4d9;"], // 1239
    ["books", "&#x1f4da;"], // 1240
    ["notebook", "&#x1f4d3;"], // 1241
    ["ledger", "&#x1f4d2;"], // 1242
    ["page with curl", "&#x1f4c3;"], // 1243
    ["scroll", "&#x1f4dc;"], // 1244
    ["page facing up", "&#x1f4c4;"], // 1245
    ["newspaper", "&#x1f4f0;"], // 1246
    ["rolled-up newspaper", "&#x1f5de;"], // 1247
    ["bookmark tabs", "&#x1f4d1;"], // 1248
    ["bookmark", "&#x1f516;"], // 1249
    ["label", "&#x1f3f7;"], // 1250
    ["money", "group"], // --------
    ["money bag", "&#x1f4b0;"], // 1251
    ["coin", "&#x1fa99;"], // 1252
    ["yen banknote", "&#x1f4b4;"], // 1253
    ["dollar banknote", "&#x1f4b5;"], // 1254
    ["euro banknote", "&#x1f4b6;"], // 1255
    ["pound banknote", "&#x1f4b7;"], // 1256
    ["money with wings", "&#x1f4b8;"], // 1257
    ["credit card", "&#x1f4b3;"], // 1258
    ["receipt", "&#x1f9fe;"], // 1259
    ["chart increasing with yen", "&#x1f4b9;"], // 1260
    ["mail", "group"], // --------
    ["envelope", "&#x2709;"], // 1261
    ["e-mail", "&#x1f4e7;"], // 1262
    ["incoming envelope", "&#x1f4e8;"], // 1263
    ["envelope with arrow", "&#x1f4e9;"], // 1264
    ["outbox tray", "&#x1f4e4;"], // 1265
    ["inbox tray", "&#x1f4e5;"], // 1266
    ["package", "&#x1f4e6;"], // 1267
    ["closed mailbox with raised flag", "&#x1f4eb;"], // 1268
    ["closed mailbox with lowered flag", "&#x1f4ea;"], // 1269
    ["open mailbox with raised flag", "&#x1f4ec;"], // 1270
    ["open mailbox with lowered flag", "&#x1f4ed;"], // 1271
    ["postbox", "&#x1f4ee;"], // 1272
    ["ballot box with ballot", "&#x1f5f3;"], // 1273
    ["writing", "group"], // --------
    ["pencil", "&#x270f;"], // 1274
    ["black nib", "&#x2712;"], // 1275
    ["fountain pen", "&#x1f58b;"], // 1276
    ["pen", "&#x1f58a;"], // 1277
    ["paintbrush", "&#x1f58c;"], // 1278
    ["crayon", "&#x1f58d;"], // 1279
    ["memo", "&#x1f4dd;"], // 1280
    ["office", "group"], // --------
    ["briefcase", "&#x1f4bc;"], // 1281
    ["file folder", "&#x1f4c1;"], // 1282
    ["open file folder", "&#x1f4c2;"], // 1283
    ["card index dividers", "&#x1f5c2;"], // 1284
    ["calendar", "&#x1f4c5;"], // 1285
    ["tear-off calendar", "&#x1f4c6;"], // 1286
    ["spiral notepad", "&#x1f5d2;"], // 1287
    ["spiral calendar", "&#x1f5d3;"], // 1288
    ["card index", "&#x1f4c7;"], // 1289
    ["chart increasing", "&#x1f4c8;"], // 1290
    ["chart decreasing", "&#x1f4c9;"], // 1291
    ["bar chart", "&#x1f4ca;"], // 1292
    ["clipboard", "&#x1f4cb;"], // 1293
    ["pushpin", "&#x1f4cc;"], // 1294
    ["round pushpin", "&#x1f4cd;"], // 1295
    ["paperclip", "&#x1f4ce;"], // 1296
    ["linked paperclips", "&#x1f587;"], // 1297
    ["straight ruler", "&#x1f4cf;"], // 1298
    ["triangular ruler", "&#x1f4d0;"], // 1299
    ["scissors", "&#x2702;"], // 1300
    ["card file box", "&#x1f5c3;"], // 1301
    ["file cabinet", "&#x1f5c4;"], // 1302
    ["wastebasket", "&#x1f5d1;"], // 1303
    ["lock", "group"], // --------
    ["locked", "&#x1f512;"], // 1304
    ["unlocked", "&#x1f513;"], // 1305
    ["locked with pen", "&#x1f50f;"], // 1306
    ["locked with key", "&#x1f510;"], // 1307
    ["key", "&#x1f511;"], // 1308
    ["old key", "&#x1f5dd;"], // 1309
    ["tool", "group"], // --------
    ["hammer", "&#x1f528;"], // 1310
    ["axe", "&#x1fa93;"], // 1311
    ["pick", "&#x26cf;"], // 1312
    ["hammer and pick", "&#x2692;"], // 1313
    ["hammer and wrench", "&#x1f6e0;"], // 1314
    ["dagger", "&#x1f5e1;"], // 1315
    ["crossed swords", "&#x2694;"], // 1316
    ["bomb", "&#x1f4a3;"], // 1317
    ["boomerang", "&#x1fa83;"], // 1318
    ["bow and arrow", "&#x1f3f9;"], // 1319
    ["shield", "&#x1f6e1;"], // 1320
    ["carpentry saw", "&#x1fa9a;"], // 1321
    ["wrench", "&#x1f527;"], // 1322
    ["screwdriver", "&#x1fa9b;"], // 1323
    ["nut and bolt", "&#x1f529;"], // 1324
    ["gear", "&#x2699;"], // 1325
    ["clamp", "&#x1f5dc;"], // 1326
    ["balance scale", "&#x2696;"], // 1327
    ["white cane", "&#x1f9af;"], // 1328
    ["link", "&#x1f517;"], // 1329
    ["chains", "&#x26d3;"], // 1330
    ["hook", "&#x1fa9d;"], // 1331
    ["toolbox", "&#x1f9f0;"], // 1332
    ["magnet", "&#x1f9f2;"], // 1333
    ["ladder", "&#x1fa9c;"], // 1334
    ["science", "group"], // --------
    ["alembic", "&#x2697;"], // 1335
    ["test tube", "&#x1f9ea;"], // 1336
    ["petri dish", "&#x1f9eb;"], // 1337
    ["dna", "&#x1f9ec;"], // 1338
    ["microscope", "&#x1f52c;"], // 1339
    ["telescope", "&#x1f52d;"], // 1340
    ["satellite antenna", "&#x1f4e1;"], // 1341
    ["medical", "group"], // --------
    ["syringe", "&#x1f489;"], // 1342
    ["drop of blood", "&#x1fa78;"], // 1343
    ["pill", "&#x1f48a;"], // 1344
    ["adhesive bandage", "&#x1fa79;"], // 1345
    ["crutch", "&#x1fa7c;"], // 1346
    ["stethoscope", "&#x1fa7a;"], // 1347
    ["x-ray", "&#x1fa7b;"], // 1348
    ["household", "group"], // --------
    ["door", "&#x1f6aa;"], // 1349
    ["elevator", "&#x1f6d7;"], // 1350
    ["mirror", "&#x1fa9e;"], // 1351
    ["window", "&#x1fa9f;"], // 1352
    ["bed", "&#x1f6cf;"], // 1353
    ["couch and lamp", "&#x1f6cb;"], // 1354
    ["chair", "&#x1fa91;"], // 1355
    ["toilet", "&#x1f6bd;"], // 1356
    ["plunger", "&#x1faa0;"], // 1357
    ["shower", "&#x1f6bf;"], // 1358
    ["bathtub", "&#x1f6c1;"], // 1359
    ["mouse trap", "&#x1faa4;"], // 1360
    ["razor", "&#x1fa92;"], // 1361
    ["lotion bottle", "&#x1f9f4;"], // 1362
    ["safety pin", "&#x1f9f7;"], // 1363
    ["broom", "&#x1f9f9;"], // 1364
    ["basket", "&#x1f9fa;"], // 1365
    ["roll of paper", "&#x1f9fb;"], // 1366
    ["bucket", "&#x1faa3;"], // 1367
    ["soap", "&#x1f9fc;"], // 1368
    ["bubbles", "&#x1fae7;"], // 1369
    ["toothbrush", "&#x1faa5;"], // 1370
    ["sponge", "&#x1f9fd;"], // 1371
    ["fire extinguisher", "&#x1f9ef;"], // 1372
    ["shopping cart", "&#x1f6d2;"], // 1373
    ["other-object", "group"], // --------
    ["cigarette", "&#x1f6ac;"], // 1374
    ["coffin", "&#x26b0;"], // 1375
    ["headstone", "&#x1faa6;"], // 1376
    ["funeral urn", "&#x26b1;"], // 1377
    ["nazar amulet", "&#x1f9ff;"], // 1378
    ["hamsa", "&#x1faac;"], // 1379
    ["moai", "&#x1f5ff;"], // 1380
    ["placard", "&#x1faa7;"], // 1381
    ["identification card", "&#x1faaa;"], // 1382
    ["Symbols", "category"], // ----------------
    ["transport-sign", "group"], // --------
    ["atm sign", "&#x1f3e7;"], // 1383
    ["litter in bin sign", "&#x1f6ae;"], // 1384
    ["potable water", "&#x1f6b0;"], // 1385
    ["wheelchair symbol", "&#x267f;"], // 1386
    ["men’s room", "&#x1f6b9;"], // 1387
    ["women’s room", "&#x1f6ba;"], // 1388
    ["restroom", "&#x1f6bb;"], // 1389
    ["baby symbol", "&#x1f6bc;"], // 1390
    ["water closet", "&#x1f6be;"], // 1391
    ["passport control", "&#x1f6c2;"], // 1392
    ["customs", "&#x1f6c3;"], // 1393
    ["baggage claim", "&#x1f6c4;"], // 1394
    ["left luggage", "&#x1f6c5;"], // 1395
    ["warning", "group"], // --------
    ["warning", "&#x26a0;"], // 1396
    ["children crossing", "&#x1f6b8;"], // 1397
    ["no entry", "&#x26d4;"], // 1398
    ["prohibited", "&#x1f6ab;"], // 1399
    ["no bicycles", "&#x1f6b3;"], // 1400
    ["no smoking", "&#x1f6ad;"], // 1401
    ["no littering", "&#x1f6af;"], // 1402
    ["non-potable water", "&#x1f6b1;"], // 1403
    ["no pedestrians", "&#x1f6b7;"], // 1404
    ["no mobile phones", "&#x1f4f5;"], // 1405
    ["no one under eighteen", "&#x1f51e;"], // 1406
    ["radioactive", "&#x2622;"], // 1407
    ["biohazard", "&#x2623;"], // 1408
    ["arrow", "group"], // --------
    ["up arrow", "&#x2b06;"], // 1409
    ["up-right arrow", "&#x2197;"], // 1410
    ["right arrow", "&#x27a1;"], // 1411
    ["down-right arrow", "&#x2198;"], // 1412
    ["down arrow", "&#x2b07;"], // 1413
    ["down-left arrow", "&#x2199;"], // 1414
    ["left arrow", "&#x2b05;"], // 1415
    ["up-left arrow", "&#x2196;"], // 1416
    ["up-down arrow", "&#x2195;"], // 1417
    ["left-right arrow", "&#x2194;"], // 1418
    ["right arrow curving left", "&#x21a9;"], // 1419
    ["left arrow curving right", "&#x21aa;"], // 1420
    ["right arrow curving up", "&#x2934;"], // 1421
    ["right arrow curving down", "&#x2935;"], // 1422
    ["clockwise vertical arrows", "&#x1f503;"], // 1423
    ["counterclockwise arrows button", "&#x1f504;"], // 1424
    ["back arrow", "&#x1f519;"], // 1425
    ["end arrow", "&#x1f51a;"], // 1426
    ["on! arrow", "&#x1f51b;"], // 1427
    ["soon arrow", "&#x1f51c;"], // 1428
    ["top arrow", "&#x1f51d;"], // 1429
    ["religion", "group"], // --------
    ["place of worship", "&#x1f6d0;"], // 1430
    ["atom symbol", "&#x269b;"], // 1431
    ["om", "&#x1f549;"], // 1432
    ["star of david", "&#x2721;"], // 1433
    ["wheel of dharma", "&#x2638;"], // 1434
    ["yin yang", "&#x262f;"], // 1435
    ["latin cross", "&#x271d;"], // 1436
    ["orthodox cross", "&#x2626;"], // 1437
    ["star and crescent", "&#x262a;"], // 1438
    ["peace symbol", "&#x262e;"], // 1439
    ["menorah", "&#x1f54e;"], // 1440
    ["dotted six-pointed star", "&#x1f52f;"], // 1441
    ["khanda", "&#x1faaf;"], // 1442
    ["zodiac", "group"], // --------
    ["aries", "&#x2648;"], // 1443
    ["taurus", "&#x2649;"], // 1444
    ["gemini", "&#x264a;"], // 1445
    ["cancer", "&#x264b;"], // 1446
    ["leo", "&#x264c;"], // 1447
    ["virgo", "&#x264d;"], // 1448
    ["libra", "&#x264e;"], // 1449
    ["scorpio", "&#x264f;"], // 1450
    ["sagittarius", "&#x2650;"], // 1451
    ["capricorn", "&#x2651;"], // 1452
    ["aquarius", "&#x2652;"], // 1453
    ["pisces", "&#x2653;"], // 1454
    ["ophiuchus", "&#x26ce;"], // 1455
    ["av-symbol", "group"], // --------
    ["shuffle tracks button", "&#x1f500;"], // 1456
    ["repeat button", "&#x1f501;"], // 1457
    ["repeat single button", "&#x1f502;"], // 1458
    ["play button", "&#x25b6;"], // 1459
    ["fast-forward button", "&#x23e9;"], // 1460
    ["next track button", "&#x23ed;"], // 1461
    ["play or pause button", "&#x23ef;"], // 1462
    ["reverse button", "&#x25c0;"], // 1463
    ["fast reverse button", "&#x23ea;"], // 1464
    ["last track button", "&#x23ee;"], // 1465
    ["upwards button", "&#x1f53c;"], // 1466
    ["fast up button", "&#x23eb;"], // 1467
    ["downwards button", "&#x1f53d;"], // 1468
    ["fast down button", "&#x23ec;"], // 1469
    ["pause button", "&#x23f8;"], // 1470
    ["stop button", "&#x23f9;"], // 1471
    ["record button", "&#x23fa;"], // 1472
    ["eject button", "&#x23cf;"], // 1473
    ["cinema", "&#x1f3a6;"], // 1474
    ["dim button", "&#x1f505;"], // 1475
    ["bright button", "&#x1f506;"], // 1476
    ["antenna bars", "&#x1f4f6;"], // 1477
    ["wireless", "&#x1f6dc;"], // 1478
    ["vibration mode", "&#x1f4f3;"], // 1479
    ["mobile phone off", "&#x1f4f4;"], // 1480
    ["gender", "group"], // --------
    ["female sign", "&#x2640;"], // 1481
    ["male sign", "&#x2642;"], // 1482
    ["transgender symbol", "&#x26a7;"], // 1483
    ["math", "group"], // --------
    ["multiply", "&#x2716;"], // 1484
    ["plus", "&#x2795;"], // 1485
    ["minus", "&#x2796;"], // 1486
    ["divide", "&#x2797;"], // 1487
    ["heavy equals sign", "&#x1f7f0;"], // 1488
    ["infinity", "&#x267e;"], // 1489
    ["punctuation", "group"], // --------
    ["double exclamation mark", "&#x203c;"], // 1490
    ["exclamation question mark", "&#x2049;"], // 1491
    ["red question mark", "&#x2753;"], // 1492
    ["white question mark", "&#x2754;"], // 1493
    ["white exclamation mark", "&#x2755;"], // 1494
    ["red exclamation mark", "&#x2757;"], // 1495
    ["wavy dash", "&#x3030;"], // 1496
    ["currency", "group"], // --------
    ["currency exchange", "&#x1f4b1;"], // 1497
    ["heavy dollar sign", "&#x1f4b2;"], // 1498
    ["other-symbol", "group"], // --------
    ["medical symbol", "&#x2695;"], // 1499
    ["recycling symbol", "&#x267b;"], // 1500
    ["fleur-de-lis", "&#x269c;"], // 1501
    ["trident emblem", "&#x1f531;"], // 1502
    ["name badge", "&#x1f4db;"], // 1503
    ["japanese symbol for beginner", "&#x1f530;"], // 1504
    ["hollow red circle", "&#x2b55;"], // 1505
    ["check mark button", "&#x2705;"], // 1506
    ["check box with check", "&#x2611;"], // 1507
    ["check mark", "&#x2714;"], // 1508
    ["cross mark", "&#x274c;"], // 1509
    ["cross mark button", "&#x274e;"], // 1510
    ["curly loop", "&#x27b0;"], // 1511
    ["double curly loop", "&#x27bf;"], // 1512
    ["part alternation mark", "&#x303d;"], // 1513
    ["eight-spoked asterisk", "&#x2733;"], // 1514
    ["eight-pointed star", "&#x2734;"], // 1515
    ["sparkle", "&#x2747;"], // 1516
    ["copyright", "&#x00a9;"], // 1517
    ["registered", "&#x00ae;"], // 1518
    ["trade mark", "&#x2122;"], // 1519
    ["keycap", "group"], // --------
    ["keycap: #", "&#x0023;&#xfe0f;&#x20e3;"], // 1520
    ["keycap: *", "&#x002a;&#xfe0f;&#x20e3;"], // 1521
    ["keycap: 0", "&#x0030;&#xfe0f;&#x20e3;"], // 1522
    ["keycap: 1", "&#x0031;&#xfe0f;&#x20e3;"], // 1523
    ["keycap: 2", "&#x0032;&#xfe0f;&#x20e3;"], // 1524
    ["keycap: 3", "&#x0033;&#xfe0f;&#x20e3;"], // 1525
    ["keycap: 4", "&#x0034;&#xfe0f;&#x20e3;"], // 1526
    ["keycap: 5", "&#x0035;&#xfe0f;&#x20e3;"], // 1527
    ["keycap: 6", "&#x0036;&#xfe0f;&#x20e3;"], // 1528
    ["keycap: 7", "&#x0037;&#xfe0f;&#x20e3;"], // 1529
    ["keycap: 8", "&#x0038;&#xfe0f;&#x20e3;"], // 1530
    ["keycap: 9", "&#x0039;&#xfe0f;&#x20e3;"], // 1531
    ["keycap: 10", "&#x1f51f;"], // 1532
    ["alphanum", "group"], // --------
    ["input latin uppercase", "&#x1f520;"], // 1533
    ["input latin lowercase", "&#x1f521;"], // 1534
    ["input numbers", "&#x1f522;"], // 1535
    ["input symbols", "&#x1f523;"], // 1536
    ["input latin letters", "&#x1f524;"], // 1537
    ["a button (blood type)", "&#x1f170;"], // 1538
    ["ab button (blood type)", "&#x1f18e;"], // 1539
    ["b button (blood type)", "&#x1f171;"], // 1540
    ["cl button", "&#x1f191;"], // 1541
    ["cool button", "&#x1f192;"], // 1542
    ["free button", "&#x1f193;"], // 1543
    ["information", "&#x2139;"], // 1544
    ["id button", "&#x1f194;"], // 1545
    ["circled m", "&#x24c2;"], // 1546
    ["new button", "&#x1f195;"], // 1547
    ["ng button", "&#x1f196;"], // 1548
    ["o button (blood type)", "&#x1f17e;"], // 1549
    ["ok button", "&#x1f197;"], // 1550
    ["p button", "&#x1f17f;"], // 1551
    ["sos button", "&#x1f198;"], // 1552
    ["up! button", "&#x1f199;"], // 1553
    ["vs button", "&#x1f19a;"], // 1554
    ["japanese “here” button", "&#x1f201;"], // 1555
    ["japanese “service charge” button", "&#x1f202;"], // 1556
    ["japanese “monthly amount” button", "&#x1f237;"], // 1557
    ["japanese “not free of charge” button", "&#x1f236;"], // 1558
    ["japanese “reserved” button", "&#x1f22f;"], // 1559
    ["japanese “bargain” button", "&#x1f250;"], // 1560
    ["japanese “discount” button", "&#x1f239;"], // 1561
    ["japanese “free of charge” button", "&#x1f21a;"], // 1562
    ["japanese “prohibited” button", "&#x1f232;"], // 1563
    ["japanese “acceptable” button", "&#x1f251;"], // 1564
    ["japanese “application” button", "&#x1f238;"], // 1565
    ["japanese “passing grade” button", "&#x1f234;"], // 1566
    ["japanese “vacancy” button", "&#x1f233;"], // 1567
    ["japanese “congratulations” button", "&#x3297;"], // 1568
    ["japanese “secret” button", "&#x3299;"], // 1569
    ["japanese “open for business” button", "&#x1f23a;"], // 1570
    ["japanese “no vacancy” button", "&#x1f235;"], // 1571
    ["geometric", "group"], // --------
    ["red circle", "&#x1f534;"], // 1572
    ["orange circle", "&#x1f7e0;"], // 1573
    ["yellow circle", "&#x1f7e1;"], // 1574
    ["green circle", "&#x1f7e2;"], // 1575
    ["blue circle", "&#x1f535;"], // 1576
    ["purple circle", "&#x1f7e3;"], // 1577
    ["brown circle", "&#x1f7e4;"], // 1578
    ["black circle", "&#x26ab;"], // 1579
    ["white circle", "&#x26aa;"], // 1580
    ["red square", "&#x1f7e5;"], // 1581
    ["orange square", "&#x1f7e7;"], // 1582
    ["yellow square", "&#x1f7e8;"], // 1583
    ["green square", "&#x1f7e9;"], // 1584
    ["blue square", "&#x1f7e6;"], // 1585
    ["purple square", "&#x1f7ea;"], // 1586
    ["brown square", "&#x1f7eb;"], // 1587
    ["black large square", "&#x2b1b;"], // 1588
    ["white large square", "&#x2b1c;"], // 1589
    ["black medium square", "&#x25fc;"], // 1590
    ["white medium square", "&#x25fb;"], // 1591
    ["black medium-small square", "&#x25fe;"], // 1592
    ["white medium-small square", "&#x25fd;"], // 1593
    ["black small square", "&#x25aa;"], // 1594
    ["white small square", "&#x25ab;"], // 1595
    ["large orange diamond", "&#x1f536;"], // 1596
    ["large blue diamond", "&#x1f537;"], // 1597
    ["small orange diamond", "&#x1f538;"], // 1598
    ["small blue diamond", "&#x1f539;"], // 1599
    ["red triangle pointed up", "&#x1f53a;"], // 1600
    ["red triangle pointed down", "&#x1f53b;"], // 1601
    ["diamond with a dot", "&#x1f4a0;"], // 1602
    ["radio button", "&#x1f518;"], // 1603
    ["white square button", "&#x1f533;"], // 1604
    ["black square button", "&#x1f532;"], // 1605
    ["Flags", "category"], // ----------------
    ["flag", "group"], // --------
    ["chequered flag", "&#x1f3c1;"], // 1606
    ["triangular flag", "&#x1f6a9;"], // 1607
    ["crossed flags", "&#x1f38c;"], // 1608
    ["black flag", "&#x1f3f4;"], // 1609
    ["white flag", "&#x1f3f3;"], // 1610
    ["rainbow flag", "&#x1f3f3;&#xfe0f;&#x200d;&#x1f308;"], // 1611
    ["transgender flag", "&#x1f3f3;&#xfe0f;&#x200d;&#x26a7;&#xfe0f;"], // 1612
    ["pirate flag", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f;"], // 1613
  ]);
}
