import { StylesResolver } from "./styles.resolver";

export class SCSSStylesResolver extends StylesResolver {
  public formatStyles(styles: any): string {
    let stylesStr: string = styles[0][1];

    stylesStr = stylesStr.replace("<br>", "");
    stylesStr = stylesStr.replace("\n", "");

    return stylesStr;
  }
}
