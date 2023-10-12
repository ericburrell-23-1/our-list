const createFilterParams = (filters) => {
  // Manually construct the query string
  const params = new URLSearchParams();

  for (const filter in filters) {
    if (filters.hasOwnProperty(filter)) {
      const values = Array.isArray(filters[filter])
        ? filters[filter]
        : [filters[filter]];
      for (const value of values) {
        if (filter === "name" && typeof value === "object" && value.$regex) {
          const regex = encodeURIComponent(value.$regex);
          const options = "i"; // 'i' means case-insensitive
          params.append(`${filter}[$regex]`, regex);
          params.append(`${filter}[$options]`, options);
        } else if (typeof value === "object" && value.$regex) {
          const regex = encodeURIComponent(value.$regex);
          params.append(`${filter}[$regex]`, regex);
        } else {
          params.append(filter, value);
        }
      }
    }
  }
  return params.toString();
};

module.exports = createFilterParams;
