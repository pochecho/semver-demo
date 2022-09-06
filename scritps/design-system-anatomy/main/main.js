const fs = require("fs");

const HTML_EXTRACTOR_IMPORT = require("./HtmlExtractor");
const LEVEL_ASSIGNER_IMPORT = require("./LevelAssigner");

const HtmlExtractor = HTML_EXTRACTOR_IMPORT.HtmlExtractor;
const LevelAssigner = LEVEL_ASSIGNER_IMPORT.LevelAssigner;

const CONFIGURATION = JSON.parse(fs.readFileSync("./main/config.json"));

const HTML_EXTRACTOR = new HtmlExtractor(CONFIGURATION);
const LEVEL_ASSIGNER = new LevelAssigner();

const data = HTML_EXTRACTOR.extract();
const result = LEVEL_ASSIGNER.assingLevelToComponents(data);

fs.writeFileSync(
  CONFIGURATION["output-file"],
  `
  const DATA = ${JSON.stringify(result, null, 2)}
  `
);
