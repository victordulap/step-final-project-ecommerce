export const filterItemsByCategoryOrBrandExact = (items, filter) => {
  return items
    .map((item) => {
      if (
        item.brand.name.toLowerCase() === filter.toLowerCase() ||
        item.categories.find(
          (category) => category.name.toLowerCase() === filter.toLowerCase()
        )
      )
        return item;
      else return null;
    })
    .filter((item) => item !== null);
};

/**
 *
 *
 * @param {Array} items
 * @param {string} filter
 * @returns filtered items
 */
export const filterItems = (items, filter) => {
  filter = removeWhiteSpaces(filter.toLowerCase());
  return items
    .map((item) => {
      if (
        item.brand.name.toLowerCase().startsWith(filter) ||
        item.categories.find((category) =>
          removeWhiteSpaces(category.name.toLowerCase()).startsWith(filter)
        ) ||
        removeWhiteSpaces(item.title.toLowerCase()).includes(filter)
      )
        return item;
      else return null;
    })
    .filter((item) => item !== null);
};

const removeWhiteSpaces = (string) => {
  return string.replace(/\s/g, '');
};
