export const defaultSettings = {
  noDataIndication: "No data to display.",
  bootstrap4: true,
  bordered: false,
  hover: true,
};

export const getDefaultColumn = (title) => {
  const defaultSelectedColumn = JSON.parse(
    localStorage.getItem(`selectedColumns`)
  );
  return defaultSelectedColumn && defaultSelectedColumn[title]
    ? defaultSelectedColumn[title]
    : [];
};

export const setDefaultColumn = (title, column) => {
  let defaultSelectedColumn = JSON.parse(localStorage.getItem(`selectedColumns`)) || {};
  defaultSelectedColumn[title]
    ? (defaultSelectedColumn[title] = column)
    : (defaultSelectedColumn = { [title]: column });
  localStorage.setItem(`selectedColumns`, JSON.stringify(defaultSelectedColumn));
};
