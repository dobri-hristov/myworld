const customTotal = (from, to, size) => (
  <span className="m-2">
    Showing {from} to {to} of {size} Results
  </span>
);

export const paginationOptions = (records) => ({
  paginationSize: 10,
  pageStartIndex: 1,
  firstPageText: "First",
  prePageText: "Back",
  nextPageText: "Next",
  lastPageText: "Last",
  nextPageTitle: "First page",
  prePageTitle: "Pre page",
  firstPageTitle: "Next page",
  lastPageTitle: "Last page",
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [
    10,
    20,
    50,
    {
      text: "All",
      value: records.length,
    },
  ],
});
