module.exports = function sortCategoriesForInsert(inputJson) {
  if (inputJson.length === 1) return inputJson;
  const result = [];
  const heads = [];
  const parentMap = new Map();
  inputJson.forEach((item) => {
    if (item.parent_id !== null) {
      if (parentMap.has(item.parent_id)) {
        const prev = parentMap.get(item.parent_id);
        parentMap.set(item.parent_id, [...prev, item]);
      } else {
        parentMap.set(item.parent_id, [item]);
      }
    } else {
      heads.push(item);
    }
  });

  heads.forEach((head) => {
    result.push(head);
    let children = parentMap.get(head.id);
    result.push(...recurseHelper(children, parentMap));
  });
  return result;
};

const recurseHelper = (children, parentMap, result = []) => {
  if (children === undefined) return;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    result.push(child);
    let next = parentMap.get(child.id);
    recurseHelper(next, parentMap, result);
  }
  return result;
};
