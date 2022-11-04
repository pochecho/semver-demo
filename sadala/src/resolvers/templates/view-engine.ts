import { DOMHelpers } from "../../helpers/DOMHelpers";
import { TransformedState } from "./HTMLTemplate.resolver";

const RESPONSE_VARIABLE_NAME = "__responnse__";
const NODE_VARIABLE_NAME = "__node__";
export interface GenericControlStructure {
  transpile: (expresion: string) => string;
  resolve: (transpiledExpression: string) => string;
}

export class ConditionControlStructure implements GenericControlStructure {
  transpile(expression: string): string {
    return `!!(${expression.replace("&amp", "&&")})`;
  }
  resolve(transpiledExpression: string): string {
    return `const ${RESPONSE_VARIABLE_NAME} = ${transpiledExpression} ? [${NODE_VARIABLE_NAME}.cloneNode(true)] : [];`;
  }
}

export class LoopControlStructure implements GenericControlStructure {
  transpile(expression: string) {
    const validPatterns = [
      {
        pattern: "(\\w+)[ ]*,[ ]*(\\w+)[ ]*:[ ]*(\\w+)",
        resolver: (founded: RegExpExecArray) => {
          return "";
        },
      },
      {
        pattern: "(\\w+)[ ]*:[ ]*(\\w+)[ ]*,[ ]*(\\w+)",
        resolver: (founded: RegExpExecArray) => {
          return `
for (let ${founded[1]} = ${founded[2]}; ${founded[1]} < ${founded[3]}; ${founded[1]}++) {
  ${RESPONSE_VARIABLE_NAME}.push(${NODE_VARIABLE_NAME}.cloneNode(true));
}
          `;
        },
      },
    ];

    let transpiledExpression = "";
    for (const patternConfig of validPatterns) {
      const pattern = new RegExp(patternConfig.pattern);

      let founded: RegExpExecArray | null = pattern.exec(expression);
      console.log(patternConfig, founded, expression, 321);

      if (founded) {
        const resolver = patternConfig.resolver;
        transpiledExpression = resolver(founded);
        break;
      }
    }

    return transpiledExpression;
  }

  resolve(transpiledExpression: string): string {
    return `let ${RESPONSE_VARIABLE_NAME} = [];\n${transpiledExpression}\n`;
  }
}

export class ViewEngine {
  controlStructurePipeline: { name: string; gear: GenericControlStructure }[];

  prefixControlStructure: string;

  domHelpers: DOMHelpers;

  constructor() {
    this.domHelpers = new DOMHelpers();
    this.prefixControlStructure = "#";

    this.controlStructurePipeline = [
      {
        name: "if",
        gear: new ConditionControlStructure(),
      },
      {
        name: "for",
        gear: new LoopControlStructure(),
      },
    ];
  }

  public transformNameToLowerCamelCase(name: string) {
    const fragments = name.split("-");
    let response = "";
    if (fragments.length > 0) {
      response = fragments[0];
    }
    if (fragments.length > 1) {
      for (let i = 1; i < fragments.length; i++) {
        const fragment = fragments[i];
        response +=
          fragment.charAt(0).toUpperCase() + fragment.slice(1, fragment.length);
      }
    }
    return response;
  }
  /**
   *
   * @param state State of the component. It is a general object
   * @returns A Javascript piece of code that has constants for each key inside the state.
   */
  private createScope(state: any) {
    let context = "\n";
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const value = state[key];

        const formattedKey = this.transformNameToLowerCamelCase(key);
        if (typeof value === "string") {
          context += `const ${formattedKey} = '${value}';\n`;
        } else {
          context += `const ${formattedKey} = ${value};\n`;
        }
      }
    }
    return context;
  }

  private evalControlStructureExpression(
    controlStructureName: string,
    expression: string,
    state: TransformedState,
    scope: string,
    node: Element
  ) {
    const handler = this.controlStructurePipeline
      .filter((x) => x.name === controlStructureName)
      .pop();

    let result = undefined;
    const dependentProperties = [];

    if (handler) {
      const transpiledExpression = handler.gear.transpile(expression);
      const efectiveExpression = handler.gear.resolve(transpiledExpression);
      const evalCode = `${scope}\n${efectiveExpression}`;
      console.log(controlStructureName);

      result = this.eval(evalCode, node);
      for (const property in state) {
        if (Object.prototype.hasOwnProperty.call(state, property)) {
          const index = efectiveExpression.indexOf(property);
          if (index > -1) {
            dependentProperties.push(property);
          }
        }
      }
    }
    return { result, dependentProperties };
  }

  private eval(evalCode: string, node: Element): any {
    const bodyFunction = `${evalCode}\nreturn ${RESPONSE_VARIABLE_NAME};`;
    console.log("bodyFunction", bodyFunction);

    const evalFunction = new Function(NODE_VARIABLE_NAME, bodyFunction);
    return evalFunction(node);
  }
  public searchControlStructures(
    templateNodes: NodeListOf<Element>,
    state: TransformedState
  ) {
    const response: any = [];
    const scope = this.createScope(state);

    templateNodes.forEach((node: Element) => {
      const nodeMetada: any = {};

      const fullNodes = [];
      for (const controlStructure of this.controlStructurePipeline) {
        const attribute = `${this.prefixControlStructure}${controlStructure.name}`;
        if (node.hasAttribute(attribute)) {
          const attributeValue = node.getAttribute(attribute) || "";

          const result = this.evalControlStructureExpression(
            controlStructure.name,
            attributeValue,
            state,
            scope,
            node
          );

          fullNodes.push(...result.result);

          nodeMetada[controlStructure.name] = {
            value: attributeValue,
            ...result,
          };
        }
      }
      if (fullNodes.length === 0 && !( 'if' in nodeMetada) && !( 'for' in nodeMetada)) {
        fullNodes.push(node.cloneNode(true));
      }

      response.push({
        node,
        metadata: nodeMetada,
        fullNodes,
      });
    });

    return response;
  }

  public getDependentsVariables() {}
  // goli(nodes: NodeListOf<Node>): Array<Node> {
  //   const response: Array<Node> = [];
  //   nodes.forEach((node: Node) => {
  //     let newNode: Node | null = null;

  //     const children: NodeListOf<Node> = node.childNodes;
  //     const controlStructurePattern = new RegExp(
  //       `${this.prefixControlStructure}`
  //     );

  //     // let founded = controlStructurePattern.exec(templateString);

  //     for (const attributeConfig of this.controlStructurePipeline) {
  //       const attributeName = `${this.prefixControlStructure}${attributeConfig["name"]}`;
  //     }

  //     newNode = { ...node };
  //     this.domHelpers.removeAllChildren(newNode as HTMLElement);
  //     const subTrees = this.goli(children);
  //     for (const subTree of subTrees) {
  //       newNode.appendChild(subTree);
  //     }
  //     response.push(newNode);

  //     // newNode.chi
  //   });
  //   return response;
  // }
}
