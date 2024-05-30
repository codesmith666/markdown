import Token from "../Token.js";
import plantumlEncoder from "plantuml-encoder";

/**
 * ItalicBold
 */
export default class PlantUmlToken extends Token {
  htmlize(text: string) {
    const plantuml = "https://www.plantuml.com/plantuml/svg/";
    const encoded = plantumlEncoder.encode(text);
    return `<img src="${plantuml + encoded}"/>`;
  }
}
