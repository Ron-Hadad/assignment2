import React from "react";

interface PaginationProps {
  numOfPages: number;
  currentPage: number;
  handleNavButtonClick: (action: string) => void;
  handlePaginationButtonClick: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  numOfPages,
  currentPage,
  handleNavButtonClick,
  handlePaginationButtonClick,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button className="first" onClick={() => handleNavButtonClick("First")}>
        First
      </button>
      <button
        className="previous"
        onClick={() => handleNavButtonClick("Prev")}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          className={`page-${page}`}
          key={page}
          onClick={() => handlePaginationButtonClick(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        className="next"
        onClick={() => handleNavButtonClick("Next")}
        disabled={currentPage === numOfPages}
      >
        Next
      </button>
      <button className="last" onClick={() => handleNavButtonClick("Last")}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
