const fs = require("fs");

class SCSSExtractor {
  configuration;
  constructor(configuration) {
    this.configuration = configuration;
  }
  extract() {
    const COMPONENTS_FOLDER_PATH = this.configuration["components-folder-path"];
    const TEMPLATE_FOLDER_PATTERN = "styles";
    const COMPONENT_IDENTIFIER_NAME =
      this.configuration["component-identifier"];
    //  /<prefix@-([a-zA-Z\-]+)>/gm;

    const componentsFolders = this.listComponentsNames(COMPONENTS_FOLDER_PATH);

    const componentsTemplates = componentsFolders.map((componentFolder) => {
      return {
        name: componentFolder,
        level: 0,
        path: `${COMPONENTS_FOLDER_PATH}/${componentFolder}`,
        styles: [
          ...this.getAllStylesByComponent(
            COMPONENTS_FOLDER_PATH,
            componentFolder,
            TEMPLATE_FOLDER_PATTERN
          ).map((templateName) => {
            return {
              style: templateName,
              components: [],
            };
          }),
        ],
      };
    });
    const COMPONENTS_DATA = componentsTemplates.map((component) => {
      return {
        ...component,
        components: this.getComponentsInsideTemplate(
          component.path,
          component.templates,
          TEMPLATE_FOLDER_PATTERN,
          COMPONENT_IDENTIFIER_NAME
        ),
      };
    });

    console.log(JSON.stringify(COMPONENTS_DATA,null,2), 12);

    return COMPONENTS_DATA;
  }

  listComponentsNames(componentsPath) {
    const folders = fs.readdirSync(componentsPath);
    return folders;
  }

  getAllStylesByComponent(componentsPath, componentFolder, templatePath) {
    const COMPONENT_FOLDER = `${componentsPath}/${componentFolder}`;
    const FOLDERS_TEMPLATES = fs.readdirSync(COMPONENT_FOLDER);
    if (FOLDERS_TEMPLATES.indexOf(templatePath) >= 0) {
      const TEMPLATES_PATHS = fs.readdirSync(
        `${COMPONENT_FOLDER}/${templatePath}`
      );
      return TEMPLATES_PATHS;
    }
    return [];
  }

  getComponentsInsideTemplate(
    componentPath,
    templates,
    templateFolderName,
    componentIdentifierPattern
  ) {
    const REGEX = new RegExp(componentIdentifierPattern, "gm");
    if (!templates) {
      return [];
    }
    const TEMPLATES_CONTENTS = templates.map((templateObj) => {
      const PATH = `${componentPath}/${templateFolderName}/${templateObj.template}`;
      const TEMPLATE_CONTENT = fs.readFileSync(PATH);

      const COMPONENTS = new Set();

      let temp = REGEX.exec(TEMPLATE_CONTENT);
      while (!!temp) {
        COMPONENTS.add(temp[1]);
        temp = REGEX.exec(TEMPLATE_CONTENT);
      }

      return COMPONENTS;
    });
    const ALL_COMPONENTS = TEMPLATES_CONTENTS.reduce((prev, curre) => {
      if (!!curre) {
        prev.push(...Array.from(curre));
      }
      return prev;
    }, []);

    return ALL_COMPONENTS;
  }
}
exports.SCSSExtractor = SCSSExtractor;
