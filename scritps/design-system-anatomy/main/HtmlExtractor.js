const fs = require("fs");

class HtmlExtractor {
  configuration;
  constructor(configuration) {
    this.configuration = configuration;
  }
  extract() {
    const COMPONENTS_FOLDER_PATH = this.configuration["components-folder-path"];

    const DEPENDENCY_FOLDERS = this.configuration["dependency-folders"];

    const TEMPLATE_FOLDER_PATTERN = "templates";
    const COMPONENT_IDENTIFIER_NAME =
      this.configuration["component-identifier"];
    //  /<{prefix}-([a-zA-Z\-]+)>/gm;
    // const componentsFolders = this.listComponentsNames(COMPONENTS_FOLDER_PATH);

    const componentsTemplates = this.listComponentsNames(COMPONENTS_FOLDER_PATH)
      .map((componentFolder) => {
        return {
          name: componentFolder,
          level: 0,
          path: `${COMPONENTS_FOLDER_PATH}/${componentFolder}`,
        };
      })
      .map((x) => {
        const data = {};
        for (const config of DEPENDENCY_FOLDERS) {
          data[config["folder"]] = [
            ...this.getAllTemplatesByComponent(
              COMPONENTS_FOLDER_PATH,
              x.name,
              config["folder"]
            ).map((templateName) => {
              return {
                file: templateName,
                components: this.getComponentsInsideTemplate(
                  x.path,
                  templateName,
                  config["folder"],
                  config["patterns"]
                ),
              };
            }),
          ];
        }

        return { ...x, ...data };
      })
      .map((x) => {
        const toDelete = ["name", "level", "path"];
        const temp = { ...x };
        for (const to of toDelete) {
          delete temp[to];
        }
        const allComponents = [];
        for (const folder in temp) {
          if (Object.hasOwnProperty.call(temp, folder)) {
            const files = temp[folder];
            for (const fi of files) {
              allComponents.push(...fi["components"]);
            }
          }
        }
        return {
          ...x,
          components: Array.from(new Set(allComponents)),
        };
      });

    return [...componentsTemplates];
  }

  listComponentsNames(componentsPath) {
    const folders = fs.readdirSync(componentsPath);
    return folders;
  }

  getAllTemplatesByComponent(componentsPath, componentFolder, templatePath) {
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
    templateName,
    templateFolderName,
    componentIdentifierPatterns
  ) {
    const path = `${componentPath}/${templateFolderName}/${templateName}`;
    return Array.from(
      componentIdentifierPatterns
        .map((componentIdentifierPattern) => {
          const REGEX = new RegExp(componentIdentifierPattern, "gm");
          const TEMPLATE_CONTENT = fs.readFileSync(path);
          const COMPONENTS = new Set();
          let temp = REGEX.exec(TEMPLATE_CONTENT);
          while (!!temp) {
            COMPONENTS.add(temp[1]);
            temp = REGEX.exec(TEMPLATE_CONTENT);
          }

          return COMPONENTS;
        })
        .reduce((prev, curre) => {
          if (curre.size > 0) {
            prev.add(...curre);
          }
          return prev;
        })
    );
  }
}
exports.HtmlExtractor = HtmlExtractor;
