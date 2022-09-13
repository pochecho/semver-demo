const myDiv = document.getElementById("myDiagramDiv");
const frameWidth = window.innerWidth;
const frameHeight = window.innerHeight;
myDiv.style.width = `${frameWidth}px`;
myDiv.style.height = `${frameHeight}px`;

const CATEGORY_IMG = [
  {
    label: "Atom",
    img: "./assets/atom.jpg",
  },
  { label: "Molecule", img: "./assets/molecule.jpg" },
  { label: "Cell", img: "./assets/cell.jpg" },
  { label: "Tissue", img: "./assets/tissue.jpg" },
  { label: "Organ", img: "./assets/organ.jpg" },
  { label: "Organism", img: "./assets/organism.jpg" },
];

function createModel(data, categoryImgMapper) {
  const nodeDataArray = [];
  const linkDataArray = [];
  for (const component of data) {
    const category = categoryImgMapper[component["level"]];
    nodeDataArray.push({
      key: component["name"],
      name: component["name"].split("-").join(" ").toUpperCase(),
      category: category["label"],
      level: component["level"],
      source: category["img"],
    });
    const links = component["components"];
    for (const link of links) {
      linkDataArray.push({ from: component["name"], to: link });
    }
  }
  return {
    nodeDataArray,
    linkDataArray,
  };
}

(() => {
  const Diagram = go.Diagram;
  const Node = go.Node;

  const MODEL = createModel(DATA, CATEGORY_IMG);
  const myDiagram = new Diagram("myDiagramDiv", {
    "undoManager.isEnabled": true,
  });

  myDiagram.nodeTemplate = new go.Node("Vertical", {
    background: "#fff",
    border: " black",
  })
    .add(
      new go.Picture({
        margin: 5,
        width: 70,
        height: 70,
        background: "white",
      }).bind("source")
    )

    .add(
      new go.TextBlock("Default Text", {
        margin: 6,
        stroke: "dodgerblue",
        font: "bold 16px sans-serif",
      }).bind("text", "name")
    )
    // .add(new go.Panel("Auto", {name: "PANEL"},))
    .add(
      new go.TextBlock("Default Text", {
        margin: 6,
        stroke: "black",
        font: " 13px sans-serif",
      }).bind("text", "category")
    )
    .add(
      new go.TextBlock("Default Text", {
        margin: 6,
        stroke: "gray",
        font: " 10px sans-serif",
      }).bind("text", "level")
    );

  const model = new go.GraphLinksModel();
  model.nodeDataArray = MODEL.nodeDataArray;
  model.linkDataArray = MODEL.linkDataArray;

  myDiagram.model = model;
})();
