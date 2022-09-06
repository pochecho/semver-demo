class LevelAssigner {
  findLevel(levels, identifier) {
    const keys = Object.keys(levels);
    for (const key of keys) {
      const element = levels[key];
      const index = element.indexOf(identifier);

      if (index >= 0) {
        return [key, index];
      }
    }
    return null;
  }

  assingLevelToComponents(oldComponents) {
    const components = [...oldComponents];
    const pendings = [...components];
    this.r(components, pendings);

    return components;
  }
  itsAValidComponent(components, identifier) {
    for (const component of components) {
      if (component["name"] == identifier) {
        return true;
      }
    }
    return false;
  }

  r(table, pendings) {
    const levels = {};
    let i = 0;
    while (i < pendings.length) {
      console.log();
      console.log();
      console.log("Pendings");
      console.log(pendings.map(x=>x.name));
      console.log(levels);
      console.log(i);
      console.log();
      console.log();
      const component = pendings[i];
      const relations = component["components"];

      let max = -1;
      let allComponentsRealized = true;
      for (const relation of relations) {
        if (this.itsAValidComponent(table,relation)) {
          const indexes = this.findLevel(levels, relation);
          console.log('\t',relation,indexes);
          allComponentsRealized = allComponentsRealized && !!indexes;
          if (!!indexes) {
            if (indexes[0] > max) {
              max = indexes[0];
            }
          }
        }
      }
      if (allComponentsRealized) {
        const myIndex = parseInt(max) + 1;
        if (!levels[myIndex]) {
          levels[myIndex] = [];
        }
        levels[myIndex].push(component["name"]);

        for (const com of table) {
          if (com["name"] == component["name"]) {
            com["level"] = myIndex;
            break;
          }
        }
        pendings.splice(i, 1);
        i=0
      } else {
        // pendings.push(component);
        i++;
      }

    }
  }
}

exports.LevelAssigner = LevelAssigner;
