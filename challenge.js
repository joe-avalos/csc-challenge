module.exports = function sortCategoriesForInsert(inputJson) {
  if (inputJson.length === 1) return inputJson;
  const result = [];
  const heads = [];
  const parentMap = new Map();
  inputJson.forEach((item) => {
    if (item.parent_id !== null) {
      parentMap.set(item.parent_id, item);
    } else {
      heads.push(item);
    }
  });

  heads.forEach((head) => {
    result.push(head);
    let next = parentMap.get(head.id);
    while (next !== undefined) {
      result.push(next);
      next = parentMap.get(next.id);
    }
  });
  return result;
};
