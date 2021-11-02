const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getSearchSuggestions = (search) => {
  return request.get(
    `${BASE_URL}/items?search=${search}&fields=_id,title,color,brand`
  );
};

export const searchService = {
  getSearchSuggestions,
};
