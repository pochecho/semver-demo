const fs = require("fs");

const HTML_EXTRACTOR_IMPORT = require("./HtmlExtractor");
const SCSS_EXTRACTOR_IMPORT = require("./SCSSExtractor");
const LEVEL_ASSIGNER_IMPORT = require("./LevelAssigner");

const HtmlExtractor = HTML_EXTRACTOR_IMPORT.HtmlExtractor;
const SCSSExtractor = SCSS_EXTRACTOR_IMPORT.SCSSExtractor;
const LevelAssigner = LEVEL_ASSIGNER_IMPORT.LevelAssigner;

const CONFIGURATION = JSON.parse(fs.readFileSync("./main/config.json"));

const HTML_EXTRACTOR = new HtmlExtractor(CONFIGURATION);
const SCSS_EXTRACTOR = new SCSSExtractor(CONFIGURATION);
const LEVEL_ASSIGNER = new LevelAssigner();

const htmlData = HTML_EXTRACTOR.extract();
const result = LEVEL_ASSIGNER.assingLevelToComponents(htmlData);

fs.writeFileSync(
  CONFIGURATION["output-file"],
  `
  const DATA = ${JSON.stringify(result, null, 2)}
  `
);
